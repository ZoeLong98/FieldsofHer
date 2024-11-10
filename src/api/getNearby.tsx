import { ref, get, onValue } from "firebase/database";
import { db } from "./firebase.config";
import { PersonNearby } from "@/components/types";
const getNearby = async (): Promise<Record<string, PersonNearby>> => {
  return new Promise((resolve) => {
    const userRef = ref(db, "storyNearby");
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        resolve(data as Record<string, PersonNearby>); // Resolve the promise with data
      } else {
        console.log("No data available"); // Add this line for debugging
        resolve({}); // Resolve the promise with an empty dictionary
      }
    });
  });
};

export default getNearby;
