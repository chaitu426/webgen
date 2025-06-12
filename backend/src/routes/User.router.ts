import express from "express";
import { register , login , getProfile } from "../controllers/User";
import AuthMiddleware from '../middlewares/auth';

const UserRouter = express.Router();



UserRouter.post("/register", register);

UserRouter.post("/login", login);

UserRouter.get("/profile/:userId", AuthMiddleware , getProfile);



export default UserRouter;