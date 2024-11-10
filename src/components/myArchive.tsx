"use client";

import React, { useEffect, useState } from "react";
import FigureDisplay from "@/components/FirgureDisplay_myArchive";
import getUserArchive from "@/api/getUserArchive";
import { useAuth } from "@/context/AuthContext";

const MyArchive = () => {
  const [figures, setFigures] = useState<Record<string, any> | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserArchive({ user });
        setFigures(data);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <div>No archive yet.</div>;
  }

  if (!figures) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="font-bold text-2xl ml-8 mt-3">
        You have{" "}
        <span className="text-3xl text-blue-300">
          {Object.keys(figures).length}
        </span>{" "}
        story in your archive
      </div>
      <div className="font-bold text-2xl ml-8 mt-3">
        Click
        <span className="w-fit  bg-yellow-500  text-sm m-2 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          Learn More
        </span>
        to explore with <span className="text-3xl text-blue-300">Gemini</span>{" "}
      </div>
      <ul className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 list-none">
        {Object.entries(figures).map(([key, figure]) => (
          <li key={key} className="list-none">
            <FigureDisplay
              person={figure}
              ismarked={true}
              herkey={Number(key)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyArchive;
