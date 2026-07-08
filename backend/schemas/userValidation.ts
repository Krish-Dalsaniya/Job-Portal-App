import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(30, "Name cannot exceed 30 characters"),
  email: z.string().email("Please provide a valid email"),
  phone: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
  password: z.string().min(8, "Password must contain at least 8 characters").max(32, "Password cannot exceed 32 characters"),
  role: z.enum(["Job Seeker", "Employer"], { required_error: "Please select a role" }),
});

export const userLoginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["Job Seeker", "Employer"], { required_error: "Please select a role" }),
});
