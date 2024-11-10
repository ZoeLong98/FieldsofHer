"use client";
import React, { useState } from "react";
import { Person } from "./types";
import checkUserStatus from "@/api/checkUserStatus";
import signInWithGoogle from "@/api/signin";
import addBookMark from "@/api/addUserBookmark";
import deleteBookMark from "@/api/deleteUserBookMark";

const FigureDisplay: React.FC<{
  person: Person;
  ismarked: boolean;
  herkey: number | null;
  customClass?: string;
}> = ({ person, ismarked, herkey, customClass }) => {
  console.log("I am in the figureDisplay");
  console.log(herkey);
  const [isBookmarked, setIsBookmarked] = useState(ismarked);

  const handleBookmarkClick = async () => {
    const isLoggedIn = await checkUserStatus();
    if (isLoggedIn) {
      console.log("About to add bookmark");
      console.log(isBookmarked);
      console.log(herkey);
      if (!isBookmarked) {
        const status = await addBookMark(person, herkey);
        if (status === true) {
          setIsBookmarked(!isBookmarked);
        } else {
          alert("Failed to add bookmark. Please try again.");
        }
      } else {
        const status = await deleteBookMark(herkey);
        if (status === true) {
          setIsBookmarked(!isBookmarked);
        } else {
          alert("Failed to delete bookmark. Please try again.");
        }
      }
    } else {
      alert("You are not logged in. Please log in to bookmark.");
      signInWithGoogle();
    }
  };

  return (
    <div className="relative box-glow bg-white bg-opacity-10 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto w-4/5 border border-none my-12">
      <div
        className="absolute top-0 right-4 cursor-pointer"
        onClick={handleBookmarkClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isBookmarked ? "red" : "currentColor"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0}
            d="M5 3v18l7-5 7 5V3z"
          />
        </svg>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 mb-4 md:mb-0 md:pr-8">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2  ${customClass}`}
          >
            {person.name}
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-1  ${customClass}`}
          >
            <b>Occupation:</b> {person.occupation}
          </p>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-1  ${customClass}`}
          >
            <b>Birthdate: </b>
            {person.birthdate}
          </p>
          {person.deathdate && (
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-1 ${customClass}`}
            >
              <b>Deathdate:</b> {person.deathdate}
            </p>
          )}
        </div>
        <div className="md:w-3/5">
          <p className={`text-lg ${customClass}`}>{person.description_brief}</p>
        </div>
      </div>
    </div>
  );
};

export default FigureDisplay;
