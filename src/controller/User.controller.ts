import { Request } from "express";
import { ILoginUser, IRegisterUser } from "../interface/request/User.interface";
import User from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ILoginUserResponse } from "../interface/response/UserResponse";
import { client } from "../config/redis.config";
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
            const accessToken = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "1h" });
            const refreshToken = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "7d" });

            // Store refresh token in Redis with a 7-day TTL
            await client.set(`refresh_token:${user.id}`, refreshToken, { EX: 60 * 60 * 24 * 7 });

            const loginResponse: ILoginUserResponse = {
                id: user.id,
                email: user.email,
                username: user.username,
                phone: user.phone,
                status: user.status,
                token: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    token_type: "Bearer",
                    expiresIn: "1h",
                },
            };
            return res.successResponse("User logged in successfully", loginResponse);
        } catch (error) {
            console.error("error", error);

            return res.errorResponse("Failed to login user", error);
        }
    }

    public static async refreshToken(req: Request, res: any) {
        try {
            const refreshToken = req.body.refresh_token;
            if (!refreshToken) {
                return res.errorResponse("Refresh token is required", "Refresh token is required");
            }

            // Verify JWT signature and expiry
            const decodedToken = jwt.verify(refreshToken, "secret") as jwt.JwtPayload;

            // Validate token exists in Redis (guards against revoked/logged-out tokens)
            const storedToken = await client.get(`refresh_token:${decodedToken.id}`);
            if (!storedToken || storedToken !== refreshToken) {
                return res.errorResponse("Invalid or expired refresh token", "Invalid or expired refresh token");
            }

            const user = await User.findOne({ where: { id: decodedToken.id } });
            if (!user) {
                return res.errorResponse("User not found", "User not found");
            }

            const newAccessToken = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "1h" });
            const newRefreshToken = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "7d" });

            await client.set(`refresh_token:${user.id}`, newRefreshToken, { EX: 60 * 60 * 24 * 7 });

            const loginResponse: ILoginUserResponse = {
                id: user.id,
                email: user.email,
                username: user.username,
                phone: user.phone,
                status: user.status,
                token: {
                    access_token: newAccessToken,
                    refresh_token: newRefreshToken,
                    token_type: "Bearer",
                    expiresIn: "1h",
                },
            };
            return res.successResponse("Token refreshed successfully", loginResponse);
        } catch (error) {
            return res.errorResponse("Failed to refresh token", error);
        }
    }
}