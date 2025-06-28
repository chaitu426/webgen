import express from "express";
import UserRouter from "./routes/User.router";
import AigenRouter from "./routes/Aigen.router";
import AuthMiddleware from "./middlewares/auth";
import DeployRouter from "./routes/Deploy.router";
import { rateLimit } from 'express-rate-limit';
import cors from "cors";

const app = express();
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

app.use(cors({
	origin: ["https://webgen-three.vercel.app", "http://localhost:3001"],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
	credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//register the UserRouter
app.use("/api/user", UserRouter);
//register the AigenRouter
app.use("/api/aigen"  , AuthMiddleware , AigenRouter);
//register the DeployRouter
app.use("/api/deploy", DeployRouter);


export default app;