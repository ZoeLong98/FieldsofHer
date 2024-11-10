import { db, auth } from "@/api/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { ref, remove } from "firebase/database";

const deleteBookMark = async (herkey: number | null): Promise<boolean> => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user && herkey) {
        // User is signed in, get the UID
        const uid = user.uid;
        const userRef = ref(db, "users/" + uid + "/bookmarks/" + herkey); // Use ref(db, 'path')
        remove(userRef)
          .then(() => {
            console.log("Data deleted successfully!");
            return true;
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            return false;
          });
      } else {
        console.log("Failed to save to Firestore");
        return false;
      }
    });
  } catch (error) {
    console.error("Error deleting person to Firestore:", error);
    return false;
  }
  return true;
};
export default deleteBookMark;
