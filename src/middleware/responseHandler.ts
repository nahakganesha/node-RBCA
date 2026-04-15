import { Request, Response } from "express";

export const responseHandler = (req: Request, res: Response, next: Function) => {
  res.successResponse = function<T>(message: string, data?: T, statusCode: number = 200) {    
    return res.status(statusCode).json({
      success: true,
        status: "success",
        message,
        data,
    });
  }

    res.errorResponse = function(message: string, error: string, statusCode: number = 500) {
      return res.status(statusCode).json({  
      success: false,
      status: "error",
        message,
        error,
    });
  }

    next();
}

declare global {
  namespace Express {
    interface Response {
      successResponse<T>(message: string, data?: T, statusCode?: number): Response;
      errorResponse(message: string, error: string, statusCode?: number): Response;
    }
  }
}