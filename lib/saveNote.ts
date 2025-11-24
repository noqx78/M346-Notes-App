import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { SerializedEditorState } from "lexical";

async function saveNoteValue(userId: string, noteName: string, text: SerializedEditorState) {
  const ref = doc(db, "users", userId, "notes", noteName);
    await setDoc(ref, { text });
    console.log("Note saved successfully");
}

export { saveNoteValue }