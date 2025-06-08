import express from "express";
import OpenAI from "openai";
import config from "./config/config";
import { system_prompt, query_prompt} from "./config/prompt"
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const client = new OpenAI({
            baseURL: 'https://api.studio.nebius.com/v1/', // ✅ Correct baseURL
            apiKey: config.nebiusApiKey,
        });

        const completion = await client.chat.completions.create({
            model: "deepseek-ai/DeepSeek-R1-0528",
            max_tokens: 20000,
            temperature: 0.7,
            messages: [
                {
                    role: "system",
                    content: system_prompt,
                }, {
                    role: "user",
                    content: query_prompt,
                }
            ],
        });

        res.json(completion.choices[0].message.content);
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


export default app;