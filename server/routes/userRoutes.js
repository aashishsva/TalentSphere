import express from "express";
import {
  updateProfile,
  uploadResume,
  getMe,
  uploadPhoto,
  getPublicProfile,
  deleteResume,
  toggleSaveJob,
  getSavedJobs,
  parseResume,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadImage, uploadPDF } from "../middleware/upload.js";

const router = express.Router();

// 🔐 Get current user (optional)
router.get("/me", protect, getMe);

// ✏️ Update profile
router.put("/profile", protect, updateProfile);

//Photo profile
router.post("/photo", protect, uploadImage.single("photo"), uploadPhoto);

// 📄 Resume upload
router.post("/resume", protect, uploadPDF.single("resume"), uploadResume);

// 🔓 public (no auth)
router.get("/profile/:id", getPublicProfile);

router.delete("/resume", protect, deleteResume);

router.post("/save-job/:id", protect, toggleSaveJob);

router.get("/saved-jobs", protect, getSavedJobs);

router.post("/parse-resume", protect, parseResume);

export default router;
