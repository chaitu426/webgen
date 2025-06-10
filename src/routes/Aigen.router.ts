import express from "express";
import { Generate,Enhance, project } from "../controllers/Aigen";

const AigenRouter = express.Router();


AigenRouter.post("/generate", Generate);

AigenRouter.put("/enhance/:id", Enhance);

AigenRouter.get("/project/:id", project);






export default AigenRouter