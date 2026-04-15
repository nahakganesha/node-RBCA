
import express, { Request, Response } from "express";
import { responseHandler } from "./middleware/responseHandler";
import masterRouter from "./route/master.route";
import userRouter from "./route/user.route";
import { connectRedis } from "./config/redis.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseHandler);

connectRedis();

app.use("/api/master", masterRouter);
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
    return res.successResponse("🚀 It works!", { name: "RBCA API" });
});

export default app;