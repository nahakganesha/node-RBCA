
import express, { Request, Response } from "express";
import { responseHandler } from "./middleware/responseHandler";
import masterRouter from "./route/master.route";

const app = express();

app.use(responseHandler);

app.use("/api/master", masterRouter);
app.get("/", (req: Request, res: Response) => {
    return res.successResponse("🚀 It works!", { name: "RBCA API" });
});

export default app;