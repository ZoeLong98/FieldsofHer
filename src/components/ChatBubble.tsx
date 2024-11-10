import React from "react";
import { useAuth } from "@/context/AuthContext";

interface ChatBubbleProps {
  message: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { user } = useAuth();
  return (
    <div className="flex justify-end items-center mt-4">
      <div className="flex flex-col items-end max-w-full mr-4">
        <div className="overflow-hidden px-6 py-3 max-w-max text-sm rounded-xl border border-solid bg-zinc-800 bg-opacity-90 border-slate-400 border-opacity-20 text-neutral-100">
          {message}
        </div>
      </div>
      <img
        src={user && user.photoURL ? user.photoURL : "/user_white.png"}
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer mr-3"
      />
    </div>
  );
};

export default ChatBubble;
