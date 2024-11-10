"use client";
import PromptInput from "@/components/PromptInput";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatBubble from "@/components/ChatBubble";
import { generateStory } from "@/api/gemini.mjs";
import ResponseSection from "@/components/GeminiResponse";
import "@/styles/global.css";

const ConverDetail = () => {
  console.log("I am in the ArchivePage");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 使用 decodeURIComponent 解码 URL 参数
  const uname = decodeURIComponent(queryParams.get("name") || "");
  const [chatMessages, setChatMessages] = useState<string[][]>(() => {
    // 从本地存储加载保存的消息
    const savedMessages = localStorage.getItem("chatMessages" + uname);
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [name, setName] = useState<string | null>(null);
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setName(uname);
    console.log(uname);
    const fetchData = async () => {
      // 如果 localStorage 中已经有 chatMessages，则跳出 useEffect
      if (localStorage.getItem("chatMessages" + uname)) {
        return;
      } else if (uname) {
        console.log("Fetching data for", uname);
        const message = `Give me detail information about ${uname}`;
        try {
          if (chatSessionRef.current) {
            chatSessionRef.current.classList.add("loading");
          }
          const response = await generateStory(message);
          setChatMessages((prevMessages) => {
            const newMessages = [...prevMessages, [message, response]];
            // 将新消息保存到本地存储
            localStorage.setItem(
              "chatMessages" + uname,
              JSON.stringify(newMessages)
            );
            return newMessages;
          });
        } catch (error) {
          console.error("Error generating story:", error);
        } finally {
          if (chatSessionRef.current) {
            chatSessionRef.current.classList.remove("loading");
          }
        }
      }
    };

    if (uname && !localStorage.getItem("chatMessages" + uname)) {
      fetchData();
    }
  }, [uname]);

  //   useEffect(() => {
  //     if (firstMessageRef.current) {
  //       firstMessageRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }, [chatMessages]);

  const sendPrompt = async (message: string) => {
    if (chatSessionRef.current) {
      chatSessionRef.current.classList.add("loading");
    }
    const response = await generateStory(message);
    setChatMessages((prevMessages) => {
      const newMessages = [...prevMessages, [message, response]];
      // 将新消息保存到本地存储
      localStorage.setItem("chatMessages" + uname, JSON.stringify(newMessages));
      return newMessages;
    });
    if (chatSessionRef.current) {
      chatSessionRef.current.classList.remove("loading");
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex justify-center py-7 h-screen ">
      <div className="w-4/5 max-w-5xl h-full">
        <div className="flex relative flex-col h-full w-full border border-white border-solid rounded-3xl">
          <button
            onClick={clearLocalStorage}
            className="absolute top-0 left-0 m-4 px-1 py-0 bg-red-500 text-white rounded"
          >
            X
          </button>
          <div
            id="ChatSession"
            ref={chatSessionRef}
            className="flex flex-col justify-start w-5/6 mx-auto mt-7 mb-3 flex-grow overflow-y-auto"
            style={{ maxHeight: "80vh" }}
          >
            {chatMessages.map((msg, index) => (
              <div key={index} ref={index === 0 ? firstMessageRef : null}>
                <ChatBubble message={msg[0]} />
                <ResponseSection content={msg[1]} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mx-auto p-4 w-full">
            <PromptInput
              placeholder="Enter a prompt here"
              sendPrompt={sendPrompt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverDetail;