import getDocument from "./firebase/getData";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { upsertDocument, deleteDocument } from "./firebase/upsertDocument";
import { getDocuments } from "./firebase/get";
import { cache } from "react";
import {
  Delivery,
  DeliveryUpload,
  Inventory,
  Pickup,
  UserId,
} from "../types/types";
import { v4 as uuid } from "uuid";
import { startOfToday } from "date-fns";
import { formatDateForInput } from "../utils/utils";

import Ffmpeg from "fluent-ffmpeg";
import { PassThrough, Readable } from "stream";
import {
  getDownloadURL,
  StorageReference,
  uploadBytes,
} from "firebase/storage";

export const getUserId = cache(async (): Promise<UserId> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (userId == null) {
    redirect("/");
  }

  return userId;
});

// GETTERS
export const getDeliveries = async () => {
  const userId = await getUserId();
  const deliveries = await getDocuments<Delivery>("deliveries", [
    { fieldPath: "userId", opStr: "==", value: userId },
  ]);
  return deliveries;
};

export const getDelivery = cache(async (id: string): Promise<Delivery> => {
  const item = await getDocument("deliveries", id);
  if (!item.exists()) {
    redirect("/deliveries");
  }
  return {
    ...item.data(),
    id,
  } as Delivery;
});

export const getInventory = cache(async () => {
  const userId = await getUserId();
  const items = await getDocuments<Inventory>("inventory", [
    { fieldPath: "userId", opStr: "==", value: userId },
  ]);
  return items;
});

export const getInventoryItem = cache(
  async (id: string): Promise<Inventory> => {
    const item = await getDocument("inventory", id);
    if (!item.exists()) {
      redirect("/inventory");
    }
    return {
      ...item.data(),
      id,
    } as Inventory;
  }
);

export const getPickups = cache(async () => {
  const userId = await getUserId();
  const pickups = await getDocuments<Pickup>("pickups", [
    { fieldPath: "userId", opStr: "==", value: userId },
  ]);
  return pickups;
});

export const getPickup = cache(async (id: string): Promise<Pickup> => {
  const item = await getDocument("pickups", id);
  if (!item.exists()) {
    redirect("/pickups");
  }
  return {
    ...item.data(),
    id,
  } as Pickup;
});

export const getTodaysItems = cache(
  async (): Promise<{ deliveries: Delivery[]; pickups: Pickup[] }> => {
    const userId = await getUserId();
    const today = formatDateForInput(startOfToday());

    const deliveries = await getDocuments<Delivery>("deliveries", [
      { fieldPath: "userId", opStr: "==", value: userId },
      { fieldPath: "deliveryDate", opStr: "==", value: today },
    ]);

    const pickups = await getDocuments<Pickup>("pickups", [
      { fieldPath: "userId", opStr: "==", value: userId },
      { fieldPath: "pickupDate", opStr: "==", value: today },
    ]);

    return {
      deliveries,
      pickups,
    };
  }
);

// UPSERTERS
export async function upsertDelivery(delivery: Partial<DeliveryUpload>) {
  const userId = await getUserId();
  const id = delivery?.id ?? getRandomId();
  await upsertDocument("deliveries", { ...delivery, userId }, id);
}

export async function upsertInventory(inventory: Partial<Inventory>) {
  const userId = await getUserId();
  const id = inventory.id ?? getRandomId();
  await upsertDocument("inventory", { ...inventory, userId }, id);
}

export async function upsertPickup(pickup: Partial<Pickup>) {
  const userId = await getUserId();
  const id = pickup.id ?? getRandomId();
  await upsertDocument("pickups", { ...pickup, userId }, id);
}

// UPSERTERS
export async function deleteDelivery(deliveryId: string) {
  const userId = await getUserId();
  const item = await getDelivery(deliveryId);
  if (!item || item.userId !== userId) {
    throw new Error("Item not found");
  }

  await deleteDocument("deliveries", deliveryId);
}

export async function deleteInventory(inventoryId: string) {
  const userId = await getUserId();
  const item = await getInventoryItem(inventoryId);
  if (!item || item.userId !== userId) {
    throw new Error("Item not found");
  }

  await deleteDocument("inventory", inventoryId);
}

export async function deletePickup(pickupId: string) {
  const userId = await getUserId();
  const item = await getPickup(pickupId);
  if (!item || item.userId !== userId) {
    throw new Error("Item not found");
  }

  await deleteDocument("pickups", pickupId);
}

// UTIL
export function getRandomId() {
  return uuid();
}

export async function compressVideo(video: File, storageRef: StorageReference) {
  const file = await video.arrayBuffer();
  let bufferStream = new PassThrough();
  const readable = new Readable();
  readable.push(file);
  const command = Ffmpeg(readable);
  command.fps(30).addOptions(["-crf 28"]).writeToStream(bufferStream);
  const buffers: Buffer[] = [];
  bufferStream.on("data", function (buf) {
    buffers.push(buf);
  });
  bufferStream.on("end", async () => {
    const outputBuffer = Buffer.concat(buffers);
    await uploadBytes(storageRef, outputBuffer);
    const url = await getDownloadURL(storageRef);
    return url;
  });
}

export async function isUserSubscribed() {
  const userId = await getUserId();
  const user = await getDocument("users", userId);
  if (!user.exists()) {
    return false;
  }

  return user.data().isPremium;
}
