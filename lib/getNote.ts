import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

async function getNoteValue(userId: string, noteName: string) {
  const docRef = doc(db, "users", userId, "notes", noteName);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return snapshot.data(); 
  } else {
    return null; 
  }
}

export { getNoteValue };
