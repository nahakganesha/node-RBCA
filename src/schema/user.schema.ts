import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    phone: z.string().min(10).max(15),
    password: z.string().min(6).max(20),
    status: z.string(),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
});