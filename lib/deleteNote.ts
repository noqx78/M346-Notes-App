import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { amountNotes } from "./createNote";
import { toast } from "sonner";

export async function deleteNote(userId: string, noteTitle: string) {

  const amountNotesExist = await amountNotes(userId)

  if (amountNotesExist != 1) {
    try {
      const noteRef = doc(db, "users", userId, "notes", noteTitle);
      await deleteDoc(noteRef);
      console.log("Note deleted:", noteTitle);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  }
  else {
    console.warn("Cannot delete the last remaining note.");
    toast.warning(`Cannot delete the last remaining note.`, {
      position: "top-center",
      action: {
        label: "Close",
        onClick: () => console.log("toast closed"),
      },
    });
  }
}

