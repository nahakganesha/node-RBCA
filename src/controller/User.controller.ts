import { Request, Response } from "express";
import { ILoginUser, IRegisterUser } from "../interface/request/User.interface";
import User from "../model/User";
import bcrypt from "bcrypt";
export class UserController {
    public static async register(req: Request, res: any) {
        try {
            const register: IRegisterUser = req.body;
            const password = register.password;
            console.log("password", password);
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email: register.email,
                username: register.username,
                phone: register.phone,
                password_hash: hashedPassword,
                status: register.status,
            });
            console.log("user", user);
            return res.successResponse("User registered successfully", user);
        } catch (error) {
            console.error("error", error);

            return res.errorResponse("Failed to register user", error);
        }
    }

    public static async login(req: Request, res: any) {
        try {
            const login: ILoginUser = req.body;
            const user = await User.findOne({ where: { email: login.email } });
            if (!user) {
                return res.errorResponse("User not found", "User not found");
            }
            const password = user.password_hash;
            const isPasswordValid = await bcrypt.compare(login.password, password);
            if (!isPasswordValid) {
                return res.errorResponse("Invalid password", "Invalid password");
            }
            return res.successResponse("User logged in successfully", user);
        } catch (error) {
            console.error("error", error);

            return res.errorResponse("Failed to login user", error);
        }
    }
}