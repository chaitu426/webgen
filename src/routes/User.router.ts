import express from "express";
import { register , login  } from "../controllers/User";

const UserRouter = express.Router();



UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.get("/profile", async (req, res) => {
    res.json({ message: "Profile endpoint" });
});

export default UserRouter;