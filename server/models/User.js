import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },

    // 🔥 COMMON
    photo: String,
    phone: String,
    location: String,

    // 🎓 Candidate
    education: String,
    skills: {
      type: [String],
      set: (arr) => {
        if (typeof arr === "string") {
          arr = arr.split(",");
        }
        return (arr || [])
          .map((s) => String(s).trim().toLowerCase())
          .filter(Boolean);
      },
    },

    // 🧑‍💼 Recruiter
    company: String,
    position: String,
    website: String,
    about: String,

    // 🔥🔥 ADD THIS (MOST IMPORTANT)
    resume: {
      type: String,
      default: "",
    },

    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
