import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import config from "../config/config"
import AigenModel from '../models/Aigen';
import DeployModel from '../models/deploy';


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Validate the input
        if (!username || !email || !password) {
            res.status(400).json({ message: "Missing required fields" });
        } else if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters long" });
        }


        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        }


        // Hash the password
        const hashed_password = await bcrypt.hash(password, 10);
        if (!hashed_password) {
            res.status(500).json({ message: "Internal server error" });
        }

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashed_password
        });

        // If user creation failed
        if (!newUser) {
            res.status(500).json({ message: "User registration failed" });
        } else {

            // Generate a JWT token
            const token = jwt.sign(
                { userId: newUser._id },
                config.jwtSecret as string,
                { expiresIn: '1d' }
            );
            res.status(201).json({ message: "User registered successfully", user: newUser, token: token });
        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // destructure email and password from the request body
        const { email, password } = req.body;

        // Validate the input
        if (!email || !password) {
            res.status(400).json({ message: "Missing required fields" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {

            // Compare the password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // If the password is invalid, return an error
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid credentials" });
            } else {
                // Generate a JWT token
                const token = jwt.sign(
                    { userId: user?._id },
                    config.jwtSecret as string,
                    { expiresIn: '1d' }
                );

                res.status(200).json({ message: "Login successful", user, token });
            };
        };
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        // Get the user ID from the request parameters
        //const userId = req.params.userId;
        const getuser = req.user

        if (!getuser || (typeof getuser !== "object" || !("userId" in getuser))) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const userId = (getuser as { userId: string }).userId;

        // Find the user by ID
        const user = await User.findById(userId).select('-password'); // Exclude password from the response

        const generations = await AigenModel.find({
            createdBy: userId
        })

        const deployments = await DeployModel.find({
            createdBy: userId,
            projectId: generations.map(gen => gen._id)
        });
    

        // If user not found, return an error
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ user, projects:generations, deployments: deployments});
        };

        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};

