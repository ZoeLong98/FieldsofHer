"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useStartConversation = (name: string) => {
  const router = useRouter();

  useEffect(() => {
    if (name) {
      router.push(`/conversation?name=${encodeURIComponent(name)}`);
    }
  }, [name, router]);
};

export default useStartConversation;
