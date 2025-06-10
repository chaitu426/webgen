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


export const Enhance = async (req: Request, res: Response) => {
    try {
        const Id = req.params.id;
        const { enhancePrompt } = req.body;
        if (!enhancePrompt) {
            res.status(400).json({ message: "Enhance prompt is required" });
            return;
        }
        const user = req.user;
        if (!user || (typeof user !== "object" || !("userId" in user))) {
            res.status(401).json({ message: "Unauthorized" });
        }

        // Find the existing AigenModel entry
        const existingAigen = await AigenModel.findById(Id);
        if (!existingAigen) {
            res.status(404).json({ message: "AigenModel not found" });
            return;
        }
        
        // Combine context: previous code + new enhance prompt
        const combinedPrompt = `
        Enhance the following code based on the instruction below:

        ---Instruction---
        ${enhancePrompt}

        ---Previous Code---
        ${existingAigen.code}
        `;

        // Refine and generate AI response
        const refined_code = await Aigen(combinedPrompt);
        const { explanation, code } = splitExplanationAndCode(refined_code);

        // Append current version to refinement history
        const refinementHistory = existingAigen.refinementHistory || [];
        refinementHistory.push({
            code: existingAigen.code,
            version: existingAigen.version,
            refinedAt: new Date(),
        });

        // Update the existing AigenModel entry
        const updatedAigen = await AigenModel.findByIdAndUpdate(
             Id
            ,{
            code:code,
            description: explanation,
            version: (parseFloat(existingAigen.version) + 0.1).toFixed(1),
            refinementHistory,
        }
        
        , {
            new: true, // Return the updated document
            runValidators: true // Ensure validation rules are applied
        });
        // Respond with the updated data
        res.status(200).json({
            message: "Enhanced successfully",
            explanation,
            code,
            data: updatedAigen
        }
    )


    } catch (error) {
        // Ensure response isn't sent multiple times
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}