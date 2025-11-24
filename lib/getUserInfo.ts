// @/lib/getUserInfo.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export async function getUserInfo(): Promise<UserInfo[]> {
  const users: UserInfo[] = [];

  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    snapshot.forEach((doc) => {
      const data = doc.data() as UserInfo;
      if (data.firstName && data.lastName && data.email) {
        users.push(data);
      }
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
