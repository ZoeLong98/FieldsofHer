import React, { useState } from "react";

interface PromptInputProps {
  placeholder: string;
  sendPrompt: (input: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  placeholder,
  sendPrompt,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      sendPrompt(inputValue);
      setInputValue(""); // 清空输入框
    }
  };
  return (
    <form className="flex whitespace-nowrap gap-0.5 items-start text-xs text-center w-4/5 max-w-[793px] text-zinc-400">
      <label htmlFor="promptInput" className="sr-only">
        Enter a prompt
      </label>
      <input
        id="promptInput"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="grow shrink self-stretch px-4 py-4 rounded-xl bg-neutral-700 min-h-[48px] min-w-[240px] w-[737px] max-md:max-w-full"
        aria-label="Enter a prompt"
      />
      <button
        type="submit"
        aria-label="Submit prompt"
        className=" text-white font-bold py-2 px-4 rounded-full"
        onClick={handleSubmit}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b802f4fc5ef5fb2ec17d27fe68388944ce26434ac4b2289f646dc78a937613e6?placeholderIfAbsent=true&apiKey=8b37e39a71bd4bd3b190d9d326dd5d75"
          alt=""
          className="object-contain shrink-0 min-w-8 rounded-full aspect-[0.92]"
        />
      </button>
    </form>
  );
};

export default PromptInput;
