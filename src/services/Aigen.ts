import OpenAI from "openai";
import config from "../config/config";
import {system_prompt} from "../config/prompt";

const Aigen = async(prompt:string)=>{
    try {
        const client = new OpenAI({
            baseURL: 'https://api.studio.nebius.com/v1/', // ✅ Correct baseURL
            apiKey: config.nebiusApiKey,
        });

        const completion = await client.chat.completions.create({
            model: "deepseek-ai/DeepSeek-R1-0528",
            max_tokens: 20000,
            temperature: 0.5,
            messages: [
                {
                    role: "system",
                    content: system_prompt,
                }, {
                    role: "user",
                    content: prompt,
                }
            ],
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        return "An error occurred while processing your request.";
    }
}

export default Aigen;