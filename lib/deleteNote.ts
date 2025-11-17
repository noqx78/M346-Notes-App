import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase"; 

export async function deleteNote(userId: string, noteTitle: string) {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteTitle);
    await deleteDoc(noteRef);
    console.log("Note deleted:", noteTitle);
  } catch (error) {
      console.error(error);
  }
}
