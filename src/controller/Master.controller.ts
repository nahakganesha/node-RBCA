import { Request, Response } from "express";
import UserRole from "../model/UserRole";

export class MasterController {
    public static async getUserRoles(req: Request, res: Response) {
        const userRoles = await UserRole.findAll();
        return res.successResponse("User roles fetched successfully", userRoles);
    }
}