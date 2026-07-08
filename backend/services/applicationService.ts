import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export class ApplicationService {
  async postApplication(applicationData: any, resumeFile: any, user: any) {
    if (user.role === "Employer") {
      throw new ErrorHandler("Employer not allowed to access this resource.", 400);
    }
    
    if (!resumeFile) {
      throw new ErrorHandler("Resume File Required!", 400);
    }

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resumeFile.mimetype)) {
      throw new ErrorHandler("Invalid file type. Please upload a PNG, JPEG, or WEBP file.", 400);
    }
    
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      resumeFile.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary error"
      );
      throw new ErrorHandler("Failed to upload Resume to Cloudinary", 500);
    }
    
    const { name, email, coverLetter, phone, address, jobId } = applicationData;
    
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      throw new ErrorHandler("Job not found!", 404);
    }

    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID: {
        user: user._id,
        role: "Job Seeker",
      },
      employerID: {
        user: jobDetails.postedBy,
        role: "Employer",
      },
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    
    return application;
  }

  async getEmployerApplications(user: any) {
    if (user.role === "Job Seeker") {
      throw new ErrorHandler("Job Seeker not allowed to access this resource.", 400);
    }
    return await Application.find({ "employerID.user": user._id });
  }

  async getJobSeekerApplications(user: any) {
    if (user.role === "Employer") {
      throw new ErrorHandler("Employer not allowed to access this resource.", 400);
    }
    return await Application.find({ "applicantID.user": user._id });
  }

  async deleteApplication(id: string, user: any) {
    if (user.role === "Employer") {
      throw new ErrorHandler("Employer not allowed to access this resource.", 400);
    }
    const application = await Application.findById(id);
    if (!application) {
      throw new ErrorHandler("Application not found!", 404);
    }
    await application.deleteOne();
  }
}

export const applicationService = new ApplicationService();
