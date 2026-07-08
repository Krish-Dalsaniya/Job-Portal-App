import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { jobService } from "../services/jobService.js";
import { Request, Response, NextFunction } from "express";

export const getAllJobs = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const jobs = await jobService.getAllJobs();
  res.status(200).json({ success: true, jobs });
});

export const postJob = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const job = await jobService.postJob(req.body, req.user);
  res.status(201).json({ success: true, message: "Job Posted Successfully!", job });
});

export const getMyJobs = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const myJobs = await jobService.getMyJobs(req.user);
  res.status(200).json({ success: true, myJobs });
});

export const updateJob = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const job = await jobService.updateJob(id, req.body, req.user);
  res.status(200).json({ success: true, message: "Job Updated!", job });
});

export const deleteJob = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await jobService.deleteJob(id, req.user);
  res.status(200).json({ success: true, message: "Job Deleted!" });
});

export const getSingleJob = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const job = await jobService.getSingleJob(id);
  res.status(200).json({ success: true, job });
});
