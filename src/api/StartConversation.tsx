"use client";
import { useRouter } from "next/router";

const useStartConversation = (name: string) => {
  const router = useRouter();

  if (name) {
    router.push(`/conversation?name=${encodeURIComponent(name)}`);
  }
};

export default useStartConversation;
