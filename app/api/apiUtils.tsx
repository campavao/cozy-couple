import getDocument from "./firebase/getData";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { upsertDocument, deleteDocument } from "./firebase/upsertDocument";
import { getDocuments } from "./firebase/get";
import { cache } from "react";
import { Delivery, Inventory, Pickup, UserId } from "../types/types";
import { v4 as uuid } from "uuid";

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
  const deliveries = await getDocuments<Delivery>(
    "deliveries",
    "userId",
    "==",
    userId
  );
  return deliveries;
};

export const getDelivery = cache(async (id: string) => {
  const item = await getDocument("deliveries", id);
  return item.data();
});

export const getInventory = cache(async () => {
  const userId = await getUserId();
  const items = await getDocuments<Inventory>(
    "inventory",
    "userId",
    "==",
    userId
  );
  return items;
});

export const getInventoryItem = cache(async (id: string) => {
  const item = await getDocument("inventory", id);
  return item.data();
});

export const getPickups = cache(async () => {
  const userId = await getUserId();
  const pickups = await getDocuments<Pickup>("pickups", "userId", "==", userId);
  return pickups;
});

export const getPickup = cache(async (id: string) => {
  const item = await getDocument("pickups", id);
  return item.data();
});

// UPSERTERS
export async function upsertDelivery(delivery: Partial<Delivery>) {
  const userId = await getUserId();
  const id = delivery?.id ?? getRandomId();
  await upsertDocument("deliveries", id, { ...delivery, userId });
}

export async function upsertInventory(inventory: Partial<Inventory>) {
  const userId = await getUserId();
  const id = inventory.id ?? getRandomId();
  await upsertDocument("inventory", id, { ...inventory, userId });
}

export async function upsertPickup(pickup: Partial<Pickup>) {
  const userId = await getUserId();
  const id = pickup.id ?? getRandomId();
  await upsertDocument("pickups", id, { ...pickup, userId });
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
