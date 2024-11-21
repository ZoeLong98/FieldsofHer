import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from "./firebase.config";
import { ref, get, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
if (!apiKey) {
  throw new Error("API key is missing");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

async function getUserUsageCount(
  userId: string,
  date: string
): Promise<number> {
  const usageRef = ref(db, `usage/${userId}/${date}`);
  const snapshot = await get(usageRef);
  if (!snapshot.exists()) {
    await set(usageRef, 0); // 如果记录不存在，则创建一个新的记录并设置为 0
    return 0;
  }
  return snapshot.val();
}

async function incrementUserUsageCount(
  userId: string,
  date: string
): Promise<void> {
  const usageRef = ref(db, `usage/${userId}/${date}`);
  const currentCount = await getUserUsageCount(userId, date);
  await set(usageRef, currentCount + 1);
}

export async function generateStory(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Please sign in to use this feature.");
        reject(new Error("User is not authenticated"));
        return;
      }

      const userId = user.uid;
      const today = new Date().toISOString().split("T")[0];
      const usageCount = await getUserUsageCount(userId, today);

      if (usageCount >= 10) {
        alert("You have reached the daily limit of 10 requests.");
        reject(new Error("You have reached the daily limit of 10 requests."));
        return;
      }

      try {
        const result = await model.generateContent(prompt);
        await incrementUserUsageCount(userId, today);
        resolve(result.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
        reject(error);
      }
    });
  });
}
