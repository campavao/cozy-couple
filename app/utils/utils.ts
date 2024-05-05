import firebase_app from "../api/firebase/firebase.config";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Delivery } from "../types/types";
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

export async function uploadImage(image: File) {
  const storage = getStorage(firebase_app);
  const storageRef = ref(storage, `images/${image.name}`);
  await uploadBytes(storageRef, image);
  const url = await getDownloadURL(storageRef);
  return url;
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

  const dateA = setHourAndMinute(parseISO(a), itemA);
  const dateB = setHourAndMinute(parseISO(b), itemB);

  return dateA.getTime() - dateB.getTime();
};

const setHourAndMinute = (date: Date, item: Delivery) => {
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

function isTupleOfStringAndArrayOfT<T>(item: any): item is [string, T[]][] {
  return (
    Array.isArray(item) &&
    item.length === 2 &&
    typeof item[0] === "string" &&
    isArrayOfT(item[1])
  );
}

function isArrayOfT<T>(item: any): item is T[] {
  return Array.isArray(item) && item.every((x: any) => typeof x === "number");
}
