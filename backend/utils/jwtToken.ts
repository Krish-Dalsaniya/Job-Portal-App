import { Response } from "express";

export const sendToken = (user: any, statusCode: number, res: Response, message: string) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE || "7", 10) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
