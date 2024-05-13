"use client";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import "jimp";
import firebase_app from "../api/firebase/firebase.config";
import { isVideo } from "./utils";

const TEN_MEGABITS = 10000000;
// const TEN_MEGABITS = 100;

export async function uploadImage(image: File, itemId: string) {
  const { Jimp } = window as any;
  const storage = getStorage(firebase_app);
  const file = await image.arrayBuffer();
  const storageRef = ref(storage, `images/${itemId}/${image.name}`);

  if (isVideo(image.type)) {
    // await compressVideo(image, storageRef);
    if (image.size > TEN_MEGABITS) {
      throw new Error("Too large");
    }
    await uploadBytes(storageRef, image);
  } else {
    const smallerImage = await Jimp.read(Buffer.from(file)).then((img: any) => {
      return img.resize(600, Jimp.AUTO).quality(60);
    });
    const buffer = await smallerImage.getBufferAsync(Jimp.MIME_JPEG);
    await uploadBytes(storageRef, buffer);
  }
  const url = await getDownloadURL(storageRef);
  return url;
}


