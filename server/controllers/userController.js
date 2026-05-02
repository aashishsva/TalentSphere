import User from "../models/User.js";
import path from "path";
import cloudinary from "../utils/cloudinary.js";
import { extractSkillsFromResume } from "../utils/resumeParser.js";

// ✏️ Update Profile (SAFE VERSION)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Only allow specific fields
    const allowedFields = [
      "name",
      "phone",
      "location",
      "education",
      "skills",
      "company",
      "position",
      "website",
      "about",
      "photo",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      message: "Profile updated",
      user,
    });
  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 Upload Resume
export const uploadResume = async (req, res) => {
  console.log("FILE:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "File not received" });
  }

  // 🔥 FIX: Cloudinary PDF inline open
  const fileUrl = (req.file.path || req.file.secure_url).replace(
    "/upload/",
    "/upload/fl_attachment:false/",
  );

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { resume: fileUrl },
    { returnDocument: "after" },
  ).select("-password");

  res.json({
    message: "Uploaded",
    user: updatedUser,
  });
};
// ❌ Delete Resume (FINAL FIX)
export const deleteResume = async (req, res) => {
  const user = await User.findById(req.user.id);

  // 🔥 Cloudinary delete
  if (user.resume) {
    try {
      const publicId = user.resume
        .split("/upload/")[1]
        .split("/")
        .slice(1)
        .join("/");

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw", // 🔥 IMPORTANT for PDF
      });

      console.log("Deleted from cloud:", publicId);
    } catch (err) {
      console.log("Cloud delete error:", err.message);
    }
  }

  // 🔥 DB update
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { resume: null },
    { returnDocument: "after" },
  ).select("-password");

  res.json({
    message: "Resume deleted",
    user: updatedUser,
  });
};

// 🔐 Get Logged-in User (VERY USEFUL)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      message: "Authorized ✅",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 Upload Photo (auto replace)
export const uploadPhoto = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.photo = req.file.path; // 🔥 cloud url

  await user.save();

  res.json({ photo: user.photo });
};

export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -__v -createdAt -updatedAt",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleSaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.id;

    const exists = user.savedJobs.some((j) => j.toString() === jobId);

    if (exists) {
      user.savedJobs = user.savedJobs.filter((j) => j.toString() !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("savedJobs")
      .select("savedJobs skills");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 user skills normalize
    const userSkills = (user.skills || []).map((s) => s.toLowerCase());

    // 🔥 हर saved job में matchScore add
    const jobsWithScore = user.savedJobs.map((job) => {
      const jobSkills = (job.skills || []).map((s) => s.toLowerCase());

      const matched = jobSkills.filter((skill) => userSkills.includes(skill));

      const score =
        jobSkills.length === 0
          ? 0
          : Math.round((matched.length / jobSkills.length) * 100);

      return {
        ...job.toObject(),
        matchScore: score,
      };
    });

    // 🔥 optional: sort by best match
    jobsWithScore.sort((a, b) => b.matchScore - a.matchScore);

    res.json(jobsWithScore);
  } catch (err) {
    console.log("SAVED JOB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const parseResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.resume) {
      return res.status(400).json({ message: "No resume found" });
    }

    const skills = await extractSkillsFromResume(user.resume);

    // 🔥 save to DB
    user.skills = skills;
    await user.save();

    res.json({
      message: "Skills extracted",
      skills,
      user,
    });
  } catch (err) {
    console.log("PARSER ERROR:", err); // 👈 ADD THIS
    console.log("RESUME URL:", req.user?.id); // (optional)
    res.status(500).json({ message: "Parser failed" });
  }
};
