"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
const AccountImg = () => {
  const { user, signInWithGoogle, signOutUser, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src={user && user.photoURL ? user.photoURL : "/user_white.png"}
        alt="User Avatar"
        width={40} // 设置图片宽度
        height={40} // 设置图片高度
        className="rounded-full cursor-pointer"
        onClick={handleTogglePopup}
      />
      {showPopup && (
        <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4">
          {user ? (
            <button onClick={signOutUser} disabled={loading}>
              Sign Out
            </button>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="hover:cursor-pointer whitespace-nowrap"
              disabled={loading}
            >
              Sign in with Google
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountImg;
