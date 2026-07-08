import { User, IUser } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";

export class UserService {
  async registerUser(userData: any): Promise<IUser> {
    const isEmail = await User.findOne({ email: userData.email });
    if (isEmail) {
      throw new ErrorHandler("Email already registered !", 400);
    }
    const user = await User.create(userData);
    return user;
  }

  async loginUser(email: string, password: string, role: string): Promise<IUser> {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ErrorHandler("Invalid Email Or Password.", 400);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      throw new ErrorHandler("Invalid Email Or Password !", 400);
    }
    if (user.role !== role) {
      throw new ErrorHandler(`User with provided email and ${role} not found !`, 404);
    }
    return user;
  }
}

export const userService = new UserService();
