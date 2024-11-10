"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { app } from "@/api/firebase.config";
import { FirebaseError } from "firebase/app"; // Import FirebaseError

import {
  getAuth,
  onAuthStateChanged,
  User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();

  const signInWithGoogle = async () => {
    console.log("Signing in with Google...");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    // 设置自定义参数，强制显示账号选择界面
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in: ", user);
      router.push("/archive"); // 登录成功后跳转到 profile 页面
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Use FirebaseError in the type guard
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(
          "Error signing in with Google: ",
          errorCode,
          errorMessage,
          email,
          credential
        );
      } else {
        console.error("Unexpected error signing in with Google:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    router.push("/");
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
