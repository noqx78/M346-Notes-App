import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

async function createUser(userId: string, firstName: string, lastName: string, email: string) {
    try {
        await setDoc(doc(db, "users", userId), {
            firstName: firstName,
            lastName: lastName,
            email: email
        });
        console.log("user created in database with ID:", userId);
    } catch (error) {
        console.error("Error creating user in database:", error);
    }
}

export { createUser }
