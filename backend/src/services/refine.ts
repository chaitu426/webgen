import {GoogleGenAI} from '@google/genai';
import config from "../config/config";
import { refinement_prompt } from '../config/prompt';
import { text } from 'stream/consumers';


const refine = async (prompt: string) => {
    const ai = new GoogleGenAI({
      apiKey: config.geminiApiKey,
    });
    const configr = {
      responseMimeType: 'text/plain',
    };
    const model = 'gemini-1.5-flash';
    const mainPrompt = `SYSTEM PROMPT: ${refinement_prompt}
    USER PROMPT: ${prompt}`;
    const contents = [
          {
            role: 'user',
            parts: [{ text: mainPrompt }],
          },
    ];
  
    const response = await ai.models.generateContentStream({
      model,
      config: configr,
      contents,
    });
    let finalOutput = '';
  for await (const chunk of response) {
    finalOutput += chunk.text;
  }

  return finalOutput.trim();
  }
  
export default refine;
  