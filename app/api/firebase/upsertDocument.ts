import firebase_app from "./firebase.config";
import {
  getFirestore,
  doc,
  setDoc,
  PartialWithFieldValue,
  deleteDoc,
  addDoc,
  collection,
  DocumentData,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function upsertDocument<T extends object>(
  table: string,
  data: PartialWithFieldValue<T>,
  id?: string
): Promise<void> {
  try {
    if (!id) {
      const ref = collection(db, table);
      await addDoc<DocumentData, DocumentData>(ref, data);
    } else {
      await setDoc(doc(db, table, id), data, {
        merge: true,
      });
    }
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
