import firebase_app from "../api/firebase/firebase.config";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

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
