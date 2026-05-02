import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    matchScore: {
      type: Number,
      default: 0,
    },
    matchedSkills: [String],
    missingSkills: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Application", applicationSchema);
