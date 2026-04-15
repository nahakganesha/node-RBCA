import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      ...req.body,
      ...req.params,
      ...req.query,
    });

    if (!result.success) {
      const errors = (result.error as ZodError).issues.reduce(
        (acc: Record<string, string>, issue) => {
          const key = issue.path.join(".");
          acc[key] = issue.message;
          return acc;
        },
        {}
      );

      return res.status(403).json({
        success: "failed",
        status: false,
        message: "Validation failed",
        errors: [errors],
      });
    }

    next();
  };
};