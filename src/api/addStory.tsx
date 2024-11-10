import { db } from "@/api/firebase.config";
import { PersonNearby } from "@/components/types";
import { User } from "firebase/auth";
import { ref, get, update, push, set } from "firebase/database";

const addStory = async (person: PersonNearby, user: User): Promise<boolean> => {
  try {
    if (!user.uid) {
      console.log("User is not signed in");
      return false;
    }

    const userRef = ref(db, `storyNearby`);
    const lastAddedRef = ref(db, `users/${user.uid}/lastAdded`);

    // Use get method to check if the user folder exists
    const snapshot = await get(userRef);

    // Check if the user has added a story today
    const lastAddedSnapshot = await get(lastAddedRef);
    const lastAdded = lastAddedSnapshot.val();
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (lastAdded === today) {
      console.log("User has already added a story today");
      return false;
    }

    if (!snapshot.exists()) {
      await set(userRef, {
        ["0"]: person,
      });
      await set(lastAddedRef, today);
      console.log("User folder created:", user.uid);
      return true;
    } else {
      const newPersonRef = push(userRef);
      const uniqueKey = newPersonRef.key;
      // Use the unique key to add data
      await update(userRef, {
        [uniqueKey as string]: person,
        lastAdded: today,
      });
      await set(lastAddedRef, today);
      console.log("Person added with key:", uniqueKey);
      return true;
    }
  } catch (error) {
    console.error("Error saving person to Firestore:", error);
    return false;
  }
};

export default addStory;
