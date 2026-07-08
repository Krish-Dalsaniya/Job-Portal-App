import { z } from "zod";

const jobBaseSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters").max(30, "Title cannot exceed 30 characters"),
  description: z.string().min(30, "Description must contain at least 30 characters").max(500, "Description cannot exceed 500 characters"),
  category: z.string().min(1, "Please provide a category"),
  country: z.string().min(1, "Please provide a country name"),
  city: z.string().min(1, "Please provide a city name"),
  location: z.string().min(20, "Location must contain at least 20 characters"),
  fixedSalary: z.number().min(1000, "Salary must contain at least 4 digits").max(999999999, "Salary cannot exceed 9 digits").optional(),
  salaryFrom: z.number().min(1000, "Salary must contain at least 4 digits").max(999999999, "Salary cannot exceed 9 digits").optional(),
  salaryTo: z.number().min(1000, "Salary must contain at least 4 digits").max(999999999, "Salary cannot exceed 9 digits").optional(),
});

export const jobPostSchema = jobBaseSchema.refine(data => {
  if (!data.fixedSalary && (!data.salaryFrom || !data.salaryTo)) {
    return false;
  }
  return true;
}, { message: "Please either provide fixed salary or ranged salary", path: ["salary"] }).refine(data => {
  if (data.fixedSalary && data.salaryFrom && data.salaryTo) {
    return false;
  }
  return true;
}, { message: "Cannot enter Fixed and Ranged Salary together", path: ["salary"] });

export const jobUpdateSchema = jobBaseSchema.partial();
