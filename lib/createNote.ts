import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { SerializedEditorState } from "lexical";
import { toast } from "sonner";

const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Lorem ipsum dolor sit amet",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;


async function createNote(userId: string, noteName: string) {
  const amountNotesExist = await amountNotes(userId)
  const noteExistsAlready = await noteExists(userId, noteName);

  if (noteExistsAlready) {
    toast.warning(`Note with the name ${noteName} already exists`, {
      position: "top-center",
      action: {
        label: "Close",
        onClick: () => console.log("toast closed"),
      },
    });
  } else {

    if (amountNotesExist != 10 && amountNotesExist < 10) {
      try {
        await setDoc(
          doc(db, "users", userId, "notes", noteName),
          { template: initialValue }
        );
        console.log("note created for:", userId);
        toast.success(`note created.`, {
          position: "top-center",
          action: {
            label: "Close",
            onClick: () => console.log("toast closed"),
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
    else {
      toast.error(`User has reached the maximum number of notes (10). Note not created.`, {
        position: "top-center",
        action: {
          label: "Close",
          onClick: () => console.log("toast closed"),
        },
      });
    }
  }
}


async function amountNotes(userId: string) {
  const colRef = collection(db, "users", userId, "notes");
  const snapshot = await getDocs(colRef);
  console.log("snapshot size:", snapshot.size);
  return snapshot.size;
}

async function noteExists(userId: string, noteName: string) {
  const noteRef = doc(db, "users", userId, "notes", noteName);
  const snapshot = await getDoc(noteRef);
  return snapshot.exists();
}

export { createNote };
