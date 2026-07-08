import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import ErrorHandler from "./error.js";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
        return next(new ErrorHandler(`Validation failed: ${errorMessages}`, 400));
      }
      return next(error);
    }
  };
};
