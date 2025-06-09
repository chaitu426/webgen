import express from "express";
import { register } from "../controllers/User";

const UserRouter = express.Router();



UserRouter.post("/register", register);

UserRouter.post("/login", async (req, res) => {
    // Placeholder for login logic
    res.json({ message: "Login endpoint" });
});

UserRouter.get("/profile", async (req, res) => {
    res.json({ message: "Profile endpoint" });
});

export default UserRouter;