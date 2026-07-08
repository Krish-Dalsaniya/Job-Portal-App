import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { applicationService } from "../services/applicationService.js";
import { Request, Response, NextFunction } from "express";

export const postApplication = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumeFile = req.files ? req.files.resume : null;
    const application = await applicationService.postApplication(req.body, resumeFile, req.user);
    res.status(200).json({ success: true, message: "Application Submitted!", application });
  } catch (error: any) {
    if (error.message && error.message.includes("api_key")) {
      console.error("Cloudinary API key error:", error.message);
      return next(new ErrorHandler("File upload service configuration error", 500));
    }
    return next(error);
  }
});

export const employerGetAllApplications = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const applications = await applicationService.getEmployerApplications(req.user);
  res.status(200).json({ success: true, applications });
});

export const jobseekerGetAllApplications = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const applications = await applicationService.getJobSeekerApplications(req.user);
  res.status(200).json({ success: true, applications });
});

export const jobseekerDeleteApplication = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await applicationService.deleteApplication(id, req.user);
  res.status(200).json({ success: true, message: "Application Deleted!" });
});
