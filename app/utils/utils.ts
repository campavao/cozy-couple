import firebase_app from "../api/firebase/firebase.config";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Delivery, Item, Pickup } from "../types/types";
import { parseISO } from "date-fns";

export function formatDate(date: Date) {
  const number = date.toLocaleDateString("default", {
    day: "numeric",
    timeZone: "UTC",
  });

  const dayOfWeek = date.toLocaleDateString("default", {
    weekday: "long",
    timeZone: "UTC",
  });

  const ordinal = nthNumber(Number(number));
  return `${number}${ordinal} ${dayOfWeek}`;
}

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export function formatDateForInput(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function deleteImage(name: string) {
  const storage = getStorage(firebase_app);
  const storageRef = ref(storage, `images/${name}`);
  await deleteObject(storageRef);
}

export const sortByDeliveryTime = (itemA: Delivery, itemB: Delivery) => {
  const a = itemA.deliveryDate;
  const b = itemB.deliveryDate;

  if (!a) {
    return 1;
  }
  if (!b) {
    return -1;
  }

  const dateA = setHourAndMinuteDelivery(parseISO(a), itemA);
  const dateB = setHourAndMinuteDelivery(parseISO(b), itemB);

  return dateA.getTime() - dateB.getTime();
};

export const sortByPickupTime = (itemA: Pickup, itemB: Pickup) => {
  const a = itemA.pickupDate;
  const b = itemB.pickupDate;

  if (!a) {
    return 1;
  }
  if (!b) {
    return -1;
  }

  const dateA = setHourAndMinutePickup(parseISO(a), itemA);
  const dateB = setHourAndMinutePickup(parseISO(b), itemB);

  return dateA.getTime() - dateB.getTime();
};

const setHourAndMinuteDelivery = (date: Date, item: Delivery) => {
  if (item.deliveryWindow.from) {
    const [hourString, minuteWithAmPm] = item.deliveryWindow.from.split(":");
    let hour = Number(hourString);
    const [minute, amOrPm] = minuteWithAmPm.split(" ");
    if (amOrPm === "PM" && hour !== 12) {
      hour += 12;
    }

    date.setUTCHours(hour);
    date.setUTCMinutes(Number(minute));
  }

  return date;
};

const setHourAndMinutePickup = (date: Date, item: Pickup) => {
  if (item.pickupWindow.from) {
    const [hourString, minuteWithAmPm] = item.pickupWindow.from.split(":");
    let hour = Number(hourString);
    const [minute, amOrPm] = minuteWithAmPm.split(" ");
    if (amOrPm === "PM" && hour !== 12) {
      hour += 12;
    }

    date.setUTCHours(hour);
    date.setUTCMinutes(Number(minute));
  }

  return date;
};

export function getTotal<T extends object>(
  items: T[] | [string, T[]][],
  key: keyof T
) {
  let list: T[] = [];
  if (isTupleOfStringAndArrayOfT(items)) {
    list = items.flatMap(([_, i]) => i);
  } else {
    list = items as T[];
  }

  return list
    .map((item) => item[key])
    .reduce((acc, curr) => Number(acc) + Number(curr), 0);
}

function isTupleOfStringAndArrayOfT<T>(
  item: T[] | [string, T[]][]
): item is [string, T[]][] {
  return Array.isArray(item) && Array.isArray(item[0]);
}

function isArrayOfT<T>(item: any): item is T[] {
  return Array.isArray(item) && item.every((x: any) => typeof x === "number");
}

export function isiOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export function pluralize(word: string, count: number) {
  return count > 1 ? word + "s" : word;
}

export function getUrlBase(item: Item) {
  switch (item.type) {
    case "delivery":
      return "deliveries";
    case "pickup":
      return "pickups";
    default:
      return item.type;
  }
}

export function fileType(url: string) {
  const lower = url.toLowerCase();
  if (lower.includes("mov") || lower.includes("quicktime")) {
    return "quicktime";
  }
  if (lower.includes("mp4")) {
    return "mp4";
  }
  if (lower.includes("png")) {
    return "png";
  }

  return "jpeg";
}

export function isVideo(url: string) {
  const type = fileType(url);
  return type === "quicktime" || type === "mp4";
}
