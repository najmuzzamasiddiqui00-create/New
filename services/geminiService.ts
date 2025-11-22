import { GoogleGenAI } from "@google/genai";
import { ContentType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (
  type: ContentType,
  topic: string,
  tone: string
): Promise<string> => {
  
  const prompt = `
    Act as a professional content creator.
    Generate a ${type} about the topic: "${topic}".
    Tone: ${tone}.
    Format the output clearly with headings if necessary.
    Do not include conversational filler like "Here is your content".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate content. Please check your API key and try again.");
  }
};