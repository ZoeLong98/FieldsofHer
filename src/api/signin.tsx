import { auth } from "@/api/firebase.config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
// 设置自定义参数，强制显示账号选择界面
provider.setCustomParameters({
  prompt: "select_account",
});

const signInWithGoogle = async (): Promise<void> => {
  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user = result.user;
    // User is signed in.
    console.log(user);
    // ...
  } catch (error) {
    // Handle Errors here.
    if (error instanceof Error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.error("Unexpected error signing in with Google:", error);
    }
  }
};

export default signInWithGoogle;
