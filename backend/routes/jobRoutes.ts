import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { jobPostSchema, jobUpdateSchema } from "../schemas/jobValidation.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthenticated, validateRequest(jobPostSchema), postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.put("/update/:id", isAuthenticated, validateRequest(jobUpdateSchema), updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;
