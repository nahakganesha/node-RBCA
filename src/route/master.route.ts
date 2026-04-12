import { Router } from "express";
import { MasterController } from "../controller/Master.controller";

const masterRouter = Router();

masterRouter.get("/user-roles", MasterController.getUserRoles);

export default masterRouter;
