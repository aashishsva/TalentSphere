import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

// Apply to job
export const applyJob = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Only candidates can apply" });
    }

    const jobId = req.params.id;

    const exists = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const job = await Job.findById(jobId);
    const user = await User.findById(req.user.id);

    // 🔥 skills
    const userSkills = (user.skills || []).map((s) => s.toLowerCase());
    const jobSkills = (job.skills || []).map((s) => s.toLowerCase());

    // 🔥 match calculate
    const { score, matched, missing } = calculateMatch(userSkills, jobSkills);

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      matchScore: score,
      matchedSkills: matched,
      missingSkills: missing,
    });

    // 🔔 recruiter notify
    await Notification.create({
      user: job.postedBy,
      message: `New application for ${job.title}`,
    });

    res.json({ message: "Applied successfully", application });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "candidate") {
      return res.status(403).json({ message: "Only candidates allowed" });
    }

    const apps = await Application.find({
      applicant: req.user.id,
    })
      .populate("job") // 👈 full job details
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiter allowed" });
    }

    const { status } = req.body;

    const app = await Application.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    app.status = status;
    await app.save();

    // 🔔 candidate notify
    await Notification.create({
      user: app.applicant,
      message: `Your application is ${status}`,
    });

    res.json({ message: "Status updated", app });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const normalize = (arr = []) => arr.map((s) => s.trim().toLowerCase());

const calculateMatch = (userSkills = [], jobSkills = []) => {
  const uSkills = normalize(userSkills);
  const jSkills = normalize(jobSkills);

  const matched = jSkills.filter((skill) =>
    uSkills.some((u) => u.includes(skill) || skill.includes(u)),
  );

  const missing = jSkills.filter(
    (skill) => !uSkills.some((u) => u.includes(skill) || skill.includes(u)),
  );

  const score =
    jSkills.length === 0
      ? 0
      : Math.round((matched.length / jSkills.length) * 100);

  return { score, matched, missing };
};
