"use client";
// HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import HerNearby from "@/components/herNearby";

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/herNearby/uploadForm");
    window.location.reload();
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
