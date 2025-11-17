import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

async function getNotes(userId: string) {
  const colRef = collection(db, "users", userId, "notes");
  const snapshot = await getDocs(colRef);

  const noteNames = snapshot.docs.map(doc => doc.id);
  return noteNames;
}

export { getNotes }
