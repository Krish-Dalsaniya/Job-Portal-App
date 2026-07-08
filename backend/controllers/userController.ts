import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { userService } from "../services/userService.js";
import { sendToken } from "../utils/jwtToken.js";
import { Request, Response, NextFunction } from "express";

export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.registerUser(req.body);
  sendToken(user, 201, res, "User Registered Successfully!");
});

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  const user = await userService.loginUser(email, password, role);
  sendToken(user, 200, res, "User Logged In Successfully!");
});

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});