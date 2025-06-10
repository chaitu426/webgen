import { Request, Response } from "express";
import refine from "../services/refine";
import Aigen from "../services/Aigen";
import splitExplanationAndCode from "../services/dataparse";
import AigenModel from "../models/Aigen";

export const Generate = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user || (typeof user !== "object" || !("userId" in user))) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).json({ message: "Prompt is required" });
        }

        // Refine and generate AI response
        const refined_prompt = await refine(prompt);

        const aiResponse = await Aigen(refined_prompt);
        const { explanation, code } = splitExplanationAndCode(aiResponse);

        // Save generated data to the database
        const newAigen = await AigenModel.create({
            modelName: "AigenModel",
            code: code,
            description: explanation,
            version: "1.0",
            createdBy: (user as { userId: string }).userId
        });

        // Respond once, after everything is done
        res.status(201).json({
            message: "Generated and saved successfully",
            refined_prompt,
            explanation,
            code,
            data: newAigen
        });

    } catch (error) {
        // Ensure response isn't sent multiple times
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
