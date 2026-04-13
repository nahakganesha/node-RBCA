import { Router } from "express";
import { UserController } from "../controller/User.controller";
import { validate } from "../middleware/validate";
import { loginUserSchema, registerUserSchema } from "../schema/user.schema";

const userRouter = Router();

userRouter.post("/register", validate(registerUserSchema), UserController.register);
userRouter.post("/login", validate(loginUserSchema), UserController.login);

export default userRouter;
