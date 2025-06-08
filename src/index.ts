import express from "express";
import OpenAI from "openai";
import config from "./config/config";
import { system_prompt, query_prompt} from "./config/prompt"
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    
});


export default app;