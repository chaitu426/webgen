import express from "express";
import { register , login , getProfile } from "../controllers/User";

const UserRouter = express.Router();



UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.get("/profile/:userId", getProfile);

export default UserRouter;