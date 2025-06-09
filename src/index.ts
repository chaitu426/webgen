import express from "express";
import UserRouter from "./routes/User.router";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//register the UserRouter
app.use("/api/user", UserRouter);


export default app;