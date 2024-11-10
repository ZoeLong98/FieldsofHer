import { ref, onValue } from "firebase/database";
import { db } from "./firebase.config";
import { Person } from "@/components/types";
import { User } from "firebase/auth";
const getUserArchive = async ({
  user,
}: {
  user: User;
}): Promise<Record<string, Person>> => {
  return new Promise((resolve) => {
    if (user) {
      const uid = user.uid;
      const userRef = ref(db, "users/" + uid + "/bookmarks");
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Fetched data:", data); // Add this line for debugging
          resolve(data as Record<string, Person>); // Resolve the promise with data
        } else {
          console.log("No data available"); // Add this line for debugging
          resolve({}); // Resolve the promise with an empty dictionary
        }
      });
    } else {
      resolve({});
    } // Resolve the promise with an empty dictionary
  });
};

export default getUserArchive;
