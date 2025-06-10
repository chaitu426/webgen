import express from "express";
import { Generate } from "../controllers/Aigen";

const AigenRouter = express.Router();


AigenRouter.post("/generate", Generate);




export default AigenRouter