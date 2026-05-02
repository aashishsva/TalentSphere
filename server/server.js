import app from "./app.js";  // ✅ sirf ye use karo
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

dotenv.config();

app.use("/uploads", express.static("uploads"));
// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});