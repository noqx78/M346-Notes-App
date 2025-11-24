import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "sonner";

export async function deleteUserFromDatabase(userId: string) {
  if (!userId) {
    toast.error("Missing user ID.");
    return;
  }

  try {
    const notesRef = collection(db, "users", userId, "notes");
    const snapshot = await getDocs(notesRef);

    if (snapshot.empty) {
      toast.info("No notes to delete.");
      return;
    }

    const deletePromises = snapshot.docs.map((docItem) => deleteDoc(docItem.ref));
    await Promise.all(deletePromises);

    toast.success("All notes deleted successfully.");
  } catch (error) {
    console.error("Error deleting notes:", error);
    toast.error("Failed to delete notes.");
  }
}
