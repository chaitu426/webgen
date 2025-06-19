import express from "express";
import { deployToVercel, getDeployments} from "../controllers/Deploy";
const DeployRouter = express.Router();
import AuthMiddleware from "../middlewares/auth";

DeployRouter.get("/", (req, res) => {
    res.send("Deployment endpoint is working");
});


DeployRouter.post('/vercel/:id',AuthMiddleware, deployToVercel);

DeployRouter.get('/url/:id', AuthMiddleware, getDeployments);

export default DeployRouter;

