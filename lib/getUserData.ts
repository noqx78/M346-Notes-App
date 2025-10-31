import { db } from "./firebase";
// Create a reference to the cities collection
import { collection, query, where, getDocs} from "firebase/firestore";
const usersRef = collection(db, "users");

async function getUserData() {
    // Create a query against the collection.
    const q = query(usersRef, where("email", "==", "web@belastend.ch"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
}

export {getUserData}