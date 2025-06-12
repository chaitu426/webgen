import express from "express";
import { Generate,Enhance, project, deleteProject} from "../controllers/Aigen";

const AigenRouter = express.Router();


AigenRouter.post("/generate", Generate);

AigenRouter.put("/enhance/:id", Enhance);

AigenRouter.get("/project/:id", project);

AigenRouter.delete("/delete/:id", deleteProject );


  



export default AigenRouter