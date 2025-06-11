import express from "express";
import { deployToVercel} from "../controllers/Deploy";
const DeployRouter = express.Router();
import AuthMiddleware from "../middlewares/auth";

DeployRouter.get("/", (req, res) => {
    res.send("Deployment endpoint is working");
});


DeployRouter.post('/vercel/:id',AuthMiddleware, deployToVercel);

export default DeployRouter;

