import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User, IUser } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import { Request, Response, NextFunction } from "express";

export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form !", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered !", 400));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered Sucessfully !");
});

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role !", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password !", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found !`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In Sucessfully !");
});

export const logout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully !",
    });
});


export const getUser = catchAsyncErrors((req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});