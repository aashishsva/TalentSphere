import Job from "../models/Job.js";
import Application from "../models/Application.js";
import User from "../models/User.js";

// Create Job (Recruiter only)
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters can post jobs" });
    }

    const job = await Job.create({
      ...req.body,
      logo: req.body.logo || "",
      postedBy: req.user.id,
    });

    res.json({ message: "Job created", job });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { keyword, location, type, page = 1, limit = 6 } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Recruiter ke jobs
export const getMyJobs = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const jobs = await Job.find({
      postedBy: userId,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// Specific job ke applicants
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { sort = "top" } = req.query; // top | latest

    let applications = await Application.find({ job: jobId })
      .populate("applicant", "name email photo resume skills")
      .sort({ createdAt: -1 }); // default latest

    // 🔥 TOP MATCH SORT
    if (sort === "top") {
      applications = applications.sort(
        (a, b) => (b.matchScore || 0) - (a.matchScore || 0),
      );
    }

    res.json(applications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Only owner recruiter can edit
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    res.json({ message: "Job updated", job: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ❌ Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRecruiterStats = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // recruiter ke jobs
    const jobs = await Job.find({ postedBy: userId });

    const jobIds = jobs.map((j) => j._id);

    // agar koi job nahi hai
    if (jobIds.length === 0) {
      return res.json({
        totalJobs: 0,
        totalApplications: 0,
        accepted: 0,
        rejected: 0,
      });
    }

    // total applications
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    // accepted
    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: { $in: ["accepted", "Accepted"] },
    });

    // rejected
    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: { $in: ["rejected", "Rejected"] },
    });

    res.json({
      totalJobs: jobs.length,
      totalApplications,
      accepted,
      rejected,
    });
  } catch (err) {
    console.log("STATS ERROR:", err); // 👈 important
    res.status(500).json({ message: err.message });
  }
};

export const getRecommendedJobs = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { keyword, location, type } = req.query;

    const user = await User.findById(userId);

    const userSkills = (user.skills || []).map((s) => s.toLowerCase());

    // 🔥 FILTER QUERY
    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    // 🔥 FILTERED JOBS
    const jobs = await Job.find(query).sort({ createdAt: -1 });

    // 🔥 MATCH SCORE
    const scoredJobs = jobs.map((job) => {
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

    // 🔥 SORT
    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);

    res.json(scoredJobs);
  } catch (err) {
    console.log("RECOMMEND ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
