import React, { useState, useEffect } from "react";
import { format } from "date-fns";

interface ResponseSectionProps {
  content: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({ content }) => {
  const [currentTime, setCurrentTime] = useState(format(new Date(), "h:mm a"));
  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Content copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "h:mm a"));
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);
  return (
    <div className="flex flex-col mt-8 w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-4 items-center w-full max-md:max-w-full">
        <div className="flex gap-2 items-center self-stretch my-auto">
          <div className="flex gap-2.5 justify-center items-center self-stretch px-1.5 my-auto w-8 h-8 bg-white rounded-lg min-h-[32px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b47c3b9d50f4cb85a108e3f817cc9a2bcd3fd1f9726dbf533cce0c49ceab3b20?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
              alt=""
              className="object-contain self-stretch my-auto w-4 aspect-[0.89]"
            />
          </div>
          <div className="text-white self-stretch my-auto text-base font-semibold bg-clip-text bg-[linear-gradient(90deg,#7468FC_-26.21%,#A7A0F8_8.68%,#A7A0F8_80.18%,#847EC8_116.78%)]">
            Response
          </div>
        </div>
        {/* <time className="self-stretch my-auto text-xs leading-none text-zinc-400">
          {currentTime}
        </time> */}
      </div>
      <div className="flex overflow-hidden flex-col py-5 pr-9 pl-2.5 mt-4 w-full text-sm rounded-2xl border border-solid bg-white bg-opacity-10 border-slate-400 border-opacity-20 text-neutral-100 max-md:pr-5 max-md:max-w-full">
        <div className="ml-4 max-md:max-w-full">{content}</div>
        <img
          loading="lazy"
          src="/duplicate.png"
          alt=""
          className="object-contain mt-7 rounded aspect-[3.25] w-[66px] hover:cursor-pointer"
          onClick={handleCopy}
        />
      </div>
    </div>
  );
};

export default ResponseSection;
