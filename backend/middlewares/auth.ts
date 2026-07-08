import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

export const isAuthenticated = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as any;

  req.user = await User.findById(decoded.id);

  next();
});
