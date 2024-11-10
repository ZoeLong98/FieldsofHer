"use client";
// HomePage.tsx
import React from "react";
import { useRouter } from "next/navigation";
import HerNearby from "@/components/herNearby";

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/herNearby/uploadForm");
    // 如果你需要刷新页面，可以使用 router.reload() 或 window.location.reload()
    // router.reload();
    // window.location.reload();
  };

  return (
    <div>
      <button
        className="w-fit ml-7 bg-yellow-500 mt-7 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        onClick={handleButtonClick}
      >
        Add Story
      </button>
      <HerNearby />
    </div>
  );
};

export default HomePage;
