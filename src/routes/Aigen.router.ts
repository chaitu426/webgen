import express from "express";
import { Generate,Enhance } from "../controllers/Aigen";

const AigenRouter = express.Router();


AigenRouter.post("/generate", Generate);

AigenRouter.put("/enhance/:id", Enhance);




export default AigenRouter