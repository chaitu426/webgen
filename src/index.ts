import express from "express";
import UserRouter from "./routes/User.router";
import AigenRouter from "./routes/Aigen.router";
import AuthMiddleware from "./middlewares/auth";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//register the UserRouter
app.use("/api/user", UserRouter);
//register the AigenRouter
app.use("/api/aigen" , AuthMiddleware , AigenRouter);


export default app;