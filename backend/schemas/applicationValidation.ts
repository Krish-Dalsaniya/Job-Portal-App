import { z } from "zod";

export const applicationPostSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(30, "Name cannot exceed 30 characters"),
  email: z.string().email("Please provide a valid email"),
  coverLetter: z.string().min(1, "Please provide a cover letter"),
  phone: z.number().or(z.string().regex(/^\d+$/).transform(Number)),
  address: z.string().min(1, "Please enter your address"),
  jobId: z.string().min(1, "Job ID is required"),
});
