"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/api/firebase.config";
import { useAuth } from "@/context/AuthContext";
import { ref, get } from "firebase/database";

const Usage: React.FC = () => {
  const [usageCount, setUsageCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUsageCount = async (userId: string, date: string) => {
    try {
      const usageRef = ref(db, `usage/${userId}/${date}`);
      const snapshot = await get(usageRef);
      if (snapshot.exists()) {
        setUsageCount(snapshot.val());
      } else {
        setUsageCount(0);
      }
    } catch (err) {
      setError("Failed to fetch usage count");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const today = new Date().toISOString().split("T")[0];
      fetchUsageCount(userId, today);

      const intervalId = setInterval(() => {
        fetchUsageCount(userId, today);
      }, 5000); // 每5秒刷新一次

      return () => clearInterval(intervalId); // 清除定时器
    } else {
      setError("User is not authenticated");
    }
  }, [user]);

  if (!user) {
    return <div className="text-white text-sm">{error}</div>;
  }

  if (usageCount === null) {
    return <div className="text-white text-sm">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-white text-sm text-right font-bold">
        Today&#39;s Gemini
      </h1>
      <p className="text-white text-sm text-right">{usageCount} / 10</p>
    </div>
  );
};

export default Usage;
