import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export class JobService {
  async getAllJobs() {
    return await Job.find({ expired: false });
  }

  async postJob(jobData: any, user: any) {
    if (user.role === "Job Seeker") {
      throw new ErrorHandler("Job Seeker not allowed to access this resource.", 400);
    }
    const postedBy = user._id;
    const job = await Job.create({
      ...jobData,
      postedBy,
    });
    return job;
  }

  async getMyJobs(user: any) {
    if (user.role === "Job Seeker") {
      throw new ErrorHandler("Job Seeker not allowed to access this resource.", 400);
    }
    return await Job.find({ postedBy: user._id });
  }

  async updateJob(id: string, updateData: any, user: any) {
    if (user.role === "Job Seeker") {
      throw new ErrorHandler("Job Seeker not allowed to access this resource.", 400);
    }
    let job = await Job.findById(id);
    if (!job) {
      throw new ErrorHandler("OOPS! Job not found.", 404);
    }
    job = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return job;
  }

  async deleteJob(id: string, user: any) {
    if (user.role === "Job Seeker") {
      throw new ErrorHandler("Job Seeker not allowed to access this resource.", 400);
    }
    const job = await Job.findById(id);
    if (!job) {
      throw new ErrorHandler("OOPS! Job not found.", 404);
    }
    await job.deleteOne();
  }

  async getSingleJob(id: string) {
    try {
      const job = await Job.findById(id);
      if (!job) {
        throw new ErrorHandler("Job not found.", 404);
      }
      return job;
    } catch (error) {
      throw new ErrorHandler(`Invalid ID / CastError`, 404);
    }
  }
}

export const jobService = new JobService();
