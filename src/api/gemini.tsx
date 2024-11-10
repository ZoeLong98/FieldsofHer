import { GoogleGenerativeAI } from "@google/generative-ai";
// const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyC643FhmOxKMgbB7McPLSvNyL9itWJCktE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateStory(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
