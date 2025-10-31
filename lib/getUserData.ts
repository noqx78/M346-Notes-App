import { db } from "./firebase";
// Create a reference to the cities collection
import { collection, query, where, getDocs} from "firebase/firestore";
const usersRef = collection(db, "users");

async function getUserData() {
    const q = query(usersRef, where("email", "==", "web@belastend.ch"));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    });
}

export {getUserData}