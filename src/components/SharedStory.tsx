"use client";
import React from "react";
import { PersonNearby } from "./types";
import Image from "next/image";
const FigureDisplay: React.FC<{
  person: PersonNearby;
}> = ({ person }) => {
  return (
    <div className="relative box-glow bg-white bg-opacity-10 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto w-4/5 border border-none my-12">
      <div className="flex flex-col">
        <div className="mb-4 flex flex-row">
          <div>
            <h2 className={`text-md font-bold mb-2`}>{person.slug}</h2>
            <p className={`text-md mb-1`}>
              <b>Occupation:</b> {person.occupation}
            </p>

            {person.birthdate && (
              <p className={`text-md mb-1`}>
                <b>Birthdate: </b>
                {person.birthdate}
              </p>
            )}
          </div>
          <div className="w-12 ml-auto">
            <Image
              src={"/" + person.img + ".png"}
              alt="Person Image"
              width={500} // 设置图片宽度，根据实际情况调整
              height={500} // 设置图片高度，根据实际情况调整
            />
          </div>
        </div>
        <div>
          <p className={`text-md`}>{person.description}</p>
        </div>
        <div className="relative">
          <div className="absolute bottom--2 right-2 text-sm text-gray-500">
            <p>{person.uploadBY}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureDisplay;
