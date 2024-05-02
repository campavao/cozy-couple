import firebase_app from "./firebase.config";
import {
  getFirestore,
  doc,
  setDoc,
  PartialWithFieldValue,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function upsertDocument<T extends object>(
  collection: string,
  id: string,
  data: PartialWithFieldValue<T>
): Promise<void> {
  try {
    await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteDocument(
  collection: string,
  id: string
): Promise<void> {
  try {
    await deleteDoc(doc(db, collection, id));
  } catch (e: any) {
    throw new Error(e);
  }
}
