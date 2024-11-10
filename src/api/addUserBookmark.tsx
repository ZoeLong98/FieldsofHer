import { db, auth } from "@/api/firebase.config";
import { Person } from "@/components/types";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, update, push, set } from "firebase/database";

const addBookMark = async (
  person: Person,
  herkey: number | null
): Promise<boolean> => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user && herkey) {
        // User is signed in, get the UID
        const uid = user.uid;
        const userRef = ref(db, "users/" + uid + "/bookmarks"); // Use ref(db, 'path')
        console.log("I am in addUserBookmark");
        console.log(herkey);

        // Use get method to check if the user folder exists
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
          await set(userRef, {
            [`${herkey}`]: person,
          });
          console.log("User folder created:", uid);
          return true;
        } else {
          await update(userRef, {
            [`${herkey}`]: person, // Use the new key to add data
          });
          return true;
        }
      } else {
        console.log("Failed to save to Firestore");
        return false;
      }
    });
  } catch (error) {
    console.error("Error saving person to Firestore:", error);
    return false;
  }
  return true;
};

export default addBookMark;
