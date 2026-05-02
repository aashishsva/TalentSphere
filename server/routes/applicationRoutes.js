import express from "express";
import {
  applyJob,
  getMyApplications,
  updateStatus,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", protect, applyJob);
router.get("/my", protect, getMyApplications);
router.put("/:id/status", protect, updateStatus);

export default router;
