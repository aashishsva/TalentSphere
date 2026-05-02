import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("Auth Routes Loaded");

// Public routes
router.post("/register", register);
router.post("/login", login);

// 🔐 Protected route (test)
router.get("/me", protect, (req, res) => {
  res.json({
    message: "Authorized ✅",
    user: req.user, // comes from token
  });
});

export default router;