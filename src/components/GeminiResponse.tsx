import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface ResponseSectionProps {
  content: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({ content }) => {
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

  return (
    <div className="flex flex-col mt-8 w-full max-md:max-w-full">
      <div className="flex flex-wrap gap-4 items-center w-full max-md:max-w-full">
        <div className="flex gap-2 items-center self-stretch my-auto">
          <div className="flex gap-2.5 justify-center items-center self-stretch px-1.5 my-auto w-8 h-8 bg-white rounded-lg min-h-[32px]">
            <Image
              src="/gemini.png"
              alt=""
              width={400} // 设置图片宽度
              height={450} // 设置图片高度
              className="object-contain self-stretch my-auto w-4 aspect-[0.89]"
            />
          </div>
          <div className="text-white self-stretch my-auto text-base font-semibold bg-clip-text bg-[linear-gradient(90deg,#7468FC_-26.21%,#A7A0F8_8.68%,#A7A0F8_80.18%,#847EC8_116.78%)]">
            Response
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden flex-col py-5 pr-9 pl-2.5 mt-4 w-full text-sm rounded-2xl border border-solid bg-white bg-opacity-10 border-slate-400 border-opacity-20 text-neutral-100 max-md:pr-5 max-md:max-w-full">
        <div className="ml-4 max-md:max-w-full leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
        <Image
          src="/duplicate.png"
          alt=""
          width={20} // 设置图片宽度
          height={21} // 设置图片高度（根据 aspect ratio 3.25 计算得出）
          className="object-contain ml-3 mt-7 rounded hover:cursor-pointer"
          onClick={handleCopy}
        />
      </div>
    </div>
  );
};

export default ResponseSection;
