import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    type: String,
    salary: String,
    description: String,
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
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
