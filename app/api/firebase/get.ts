import {
  collection,
  FieldPath,
  getDocs,
  getFirestore,
  query,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import firebase_app from "./firebase.config";

const db = getFirestore(firebase_app);

export async function getDocuments<T extends object>(
  collectionString: string,
  conditions: {
    fieldPath: string | FieldPath;
    opStr: WhereFilterOp;
    value: unknown;
  }[]
): Promise<T[]> {
  const wheres = conditions.map(({ fieldPath, opStr, value }) =>
    where(fieldPath, opStr, value)
  );
  const collectionRef = query(collection(db, collectionString), ...wheres);

  try {
    const result = await getDocs(collectionRef);
    const docs = result.docs
      .map<T | undefined>((d) =>
        d.exists() ? ({ ...d.data(), id: d.id } as T) : undefined
      )
      .filter<T>((d): d is T => d != null);

    return docs;
  } catch (e: any) {
    throw new Error(e);
  }
}
