"use client";
import React, { useState, useEffect } from "react";
import { Person } from "./types";
import checkUserStatus from "@/api/checkUserStatus";
import signInWithGoogle from "@/api/signin";
import addBookMark from "@/api/addUserBookmark";
import deleteBookMark from "@/api/deleteUserBookMark";
import { useRouter } from "next/navigation";

const useStartConversation = (name: string) => {
  const router = useRouter();

  useEffect(() => {
    if (name) {
      router.push(`/conversation?name=${encodeURIComponent(name)}`);
    }
  }, [name, router]);
};

const FigureDisplay: React.FC<{
  person: Person;
  ismarked: boolean;
  herkey: number | null;
  customClass?: string;
}> = ({ person, ismarked, herkey, customClass }) => {
  console.log("I am in the figureDisplay");
  console.log(herkey);
  const [isBookmarked, setIsBookmarked] = useState(ismarked);
  const [isExpanded, setIsExpanded] = useState(false);
  const [conversationName, setConversationName] = useState<string | null>(null);

  useStartConversation(conversationName || "");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const briefDescription = person.description_brief || "";
  const truncatedDescription =
    briefDescription.length > 30
      ? `${briefDescription.substring(0, 30)}...`
      : briefDescription;

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

  const handleLearnMoreClick = () => {
    setConversationName(person.name);
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
      <div className="flex flex-col">
        <div className="mb-4 md:mb-0 md:pr-8">
          <h2 className={`text-md font-bold mb-2  ${customClass}`}>
            {person.name}
          </h2>
          <p className={`text-sm mb-1  ${customClass}`}>
            <b>Occupation:</b> {person.occupation}
          </p>
          <p className={`text-sm mb-1  ${customClass}`}>
            <b>Birthdate: </b>
            {person.birthdate}
          </p>
          {person.deathdate && (
            <p className={`text-sm mb-1 ${customClass}`}>
              <b>Deathdate:</b> {person.deathdate}
            </p>
          )}
        </div>
        <div>
          <p className={`text-sm ${customClass}`}>
            {isExpanded ? briefDescription : truncatedDescription}
            {briefDescription.length > 30 && (
              <span
                onClick={toggleExpand}
                className="text-blue-500 cursor-pointer"
              >
                {isExpanded ? " Show less" : " Show more"}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleLearnMoreClick}
          className="text-sm w-fit rounded-md p-2 bg-yellow-500 mt-7 hover:bg-yellow-600"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FigureDisplay;
