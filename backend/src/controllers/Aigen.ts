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
        // const refined_prompt = await refine(prompt);

        const aiResponse = await Aigen(prompt);
        const { explanation, code } = splitExplanationAndCode(aiResponse);

        // Save generated data to the database
        const newAigen = await AigenModel.create({
            modelName: "AigenModel",
            prompt:prompt,
            code: code,
            description: explanation,
            version: "1.0",
            createdBy: (user as { userId: string }).userId
        });

        // Respond once, after everything is done
        res.status(201).json({
            message: "Generated and saved successfully",
            refined_prompt:"null",
            prompt,
            description:explanation,
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
        const { Prompt } = req.body;
        if (!Prompt) {
            res.status(400).json({ message: "prompt is required" });
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

        // Check if current user is the creator
        if (existingAigen.createdBy.toString() !== (user as { userId: string }).userId.toString()) {
            res.status(403).json({ message: "Forbidden: You don't own this project" });
        }
        
        // Combine context: previous code + new enhance prompt
        const combinedPrompt = `
        Enhance the following code based on the instruction below:

        ---Instruction---
        ${Prompt}

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
            prompt: existingAigen.prompt,
            version: existingAigen.version,
            refinedAt: new Date(),
        });

        // Update the existing AigenModel entry
        const updatedAigen = await AigenModel.findByIdAndUpdate(
             Id
            ,{
            code:code,
            prompt:Prompt,
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
        };
    };
};

export const project = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({ message: "Project ID is required" });
            
        }
        const project = await AigenModel.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({
            message: "Project retrieved successfully",
            code: project?.code || null,
            prompt: project?.prompt || null,
            version: project?.version || null,

        });

    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
        };
    };
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        //only delete project if user is authenticated
        const user = req.user;
        if (!user || (typeof user !== "object" || !("userId" in user))) {
            res.status(401).json({ message: "Unauthorized" });
        }
        // Get the project ID from the request parameters
        const id = req.params.id;

        if (!id) {
            res.status(400).json({ message: "Project ID is required" });
            
        }
        const project = await AigenModel.findById(id);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
        }
        // Check if current user is the creator
        if (project && project.createdBy.toString() !== (user as { userId: string }).userId.toString()) {
            res.status(403).json({ message: "Forbidden: You don't own this project" });
        }
        

        const deletedProject = await AigenModel.findByIdAndDelete(id);
        if (!deletedProject) {
            res.status(404).json({ message: "Project not found" });
            
        }

        res.status(200).json({
            message: "Project deleted successfully",
            data: deletedProject
        });

    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
        };
    };
};

