import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { createNote } from "./createNote";

async function createUser(userId: string, firstName: string, lastName: string, email: string) {
    try {
        await setDoc(doc(db, "users", userId), {
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        console.log("user created in database with ID:", userId);
        createNote(userId, "template")

    } catch (error) {
        console.error("Error creating user in database:", error);
    }
}

export { createUser }
