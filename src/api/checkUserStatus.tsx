import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.config"; // Adjust the path if needed
import { ref, onValue, update } from "firebase/database";

const checkUserStatus = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const user = auth.currentUser;
    if (user) {
      // User is signed in, get the UID
      const uid = user.uid;
      const userRef = ref(db, "users/" + uid); // Use ref(db, 'path')

      // Check if the user folder exists
      onValue(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          // User folder doesn't exist, create it
          update(userRef, {
            // Optional: Add some initial data
            email: user.email,
            // ... other initial data
          });
          console.log("User folder created:", uid);
        } else {
          console.log("User folder already exists:", uid);
        }
      });
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export default checkUserStatus;
