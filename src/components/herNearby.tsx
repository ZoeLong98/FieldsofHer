"use client";

import React, { useEffect, useState } from "react";
import FigureDisplay from "./SharedStory";
import getNearby from "@/api/getNearby";
import { PersonNearby } from "./types";

const HerNearby = () => {
  const [figures, setFigures] = useState<Record<string, PersonNearby> | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      const data = await getNearby();
      setFigures(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="font-bold text-2xl ml-8 mt-3 text-white">
        We have{" "}
        <span className="text-3xl text-blue-300">
          {figures ? Object.keys(figures).length : 0}
        </span>{" "}
        story nearby
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-1 list-none">
        {figures &&
          Object.entries(figures).map(([key, figure]) => (
            <li key={key} className="list-none">
              <FigureDisplay person={figure} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HerNearby;
