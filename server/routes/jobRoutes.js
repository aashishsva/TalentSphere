import express from "express";
import {
  createJob,
  getJobs,
  getMyJobs,
  getApplicants,
  getJobById,
  updateJob,
  deleteJob,
  getRecruiterStats,
  getRecommendedJobs,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createJob);

// ✅ SPECIFIC ROUTES पहले
router.get("/stats", protect, getRecruiterStats);
router.get("/my-jobs", protect, getMyJobs);
router.get("/recommended", protect, getRecommendedJobs);

// ✅ GENERAL ROUTES बाद में
router.get("/", getJobs);
router.get("/:id", getJobById);
router.get("/:id/applicants", protect, getApplicants);

router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

export default router;
