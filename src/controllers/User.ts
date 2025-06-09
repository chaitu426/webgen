import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import config from "../config/config"


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
            console.error("User registration failed");
            res.status(500).json({ message: "User registration failed" });
        } else {

            // Generate a JWT token
            const token = jwt.sign(
                { userId: newUser._id },
                config.jwtSecret as string,
                { expiresIn: '1d' }
              );
              

            console.log("User registered successfully");
            res.status(201).json({ message: "User registered successfully", user: newUser ,token: token});
        }

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}