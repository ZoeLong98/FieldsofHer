"use client";
import getPantheon from "@/api/pantheon";
import React, { useState } from "react";
import { Person } from "@/components/types";
import { generateStory } from "@/api/gemini.mjs";
import FigureDisplay from "@/components/figureDisplay";
import { db, auth } from "@/api/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

interface brief_description_gemini {
  // 根据新的API返回的数据结构定义字段
  briefInfo: string;
}

const GetPersonButton: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);
  const [des, setNewData] = useState<brief_description_gemini | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [personKey, setPersonKey] = useState<number | null>(null);

  const handleButtonClick = async () => {
    const [her, herKey] = await getPantheon();
    setPersonKey(herKey);
    if (her) {
      // 生成简短介绍
      const briefInfo = await generateStory(
        `Write a brief introduction about ${her.name}, who was born in ${her.birthdate}, about 50 words.`
      );

      const additionalData: brief_description_gemini = {
        briefInfo,
      };
      setNewData(additionalData);

      // 更新人物的简短介绍
      if (additionalData && her) {
        her.description_brief = additionalData.briefInfo;
      }
      setPerson(her);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const userRef = ref(db, "users/" + uid + "/bookmarks/" + herKey); // Use ref(db, 'path')
          console.log("I am in the getPersonButton");
          console.log(herKey);
          // To read data, use the 'get()' method on the 'ref' object
          get(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                setIsBookmarked(true);
                console.log(snapshot.val());
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="w-60 bg-yellow-500 mt-7 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        onClick={handleButtonClick}
      >
        Discover Her Story
      </button>
      <div>
        {person && (
          <FigureDisplay
            person={person}
            ismarked={isBookmarked}
            herkey={personKey}
          />
        )}
      </div>
    </div>
  );
};

export default GetPersonButton;
