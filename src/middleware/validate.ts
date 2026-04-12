import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
      },
      { abortEarly: false }
    );

    if (error) {
      const errorBody = error.details.map((detail) => ({
        [detail.path.join(".")]: detail.message.replace(/['"]/g, ""),
      }));

      return res.status(403).json({
        success: "failed",
        status: false,
        message: "Validation failed",
        error: errorBody,
      });
    }

    next();
  };
};