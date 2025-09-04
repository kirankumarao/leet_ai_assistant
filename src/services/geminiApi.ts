// src/services/geminiApi.ts
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { REVEAL_ANSWER_PROMPT_TEMPLATE, HINTS_PROMPT_PARTS } from "../utils/constants";

// WARNING: Hardcoding the API key is for development only.
const API_KEY = "AIzaSyDLiClFgQ5eDOX_XnBlpKlEGOdyaaBnNxM";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
});

export const fetchHints = async (title: string, description: string): Promise<string[]> => {
  const generatedHints: string[] = [];

  for (const part of HINTS_PROMPT_PARTS) {
    const prompt = part.replace('${title}', title).replace('${description}', description);
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      generatedHints.push(response);
    } catch (error) {
      console.error("Error fetching a hint part:", error);
      generatedHints.push("Failed to generate this hint.");
    }
  }

  return generatedHints;
};

export const fetchSolution = async (title: string, description: string): Promise<string> => {
  const prompt = REVEAL_ANSWER_PROMPT_TEMPLATE.replace('${language}', 'Python')
    .replace('${title}', title)
    .replace('${description}', description);

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error fetching solution:", error);
    return "Failed to fetch the solution. Please check your API key or try again later.";
  }
};

export const chatWithAI = async (history: any[], userMessage: string): Promise<string> => {
  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  });

  try {
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Error in chat:", error);
    return "Sorry, I am unable to respond at the moment. Please try again later.";
  }
};