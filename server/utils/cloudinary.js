import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // 🔥 ADD THIS (important)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

console.log("Cloudinary Config:", {
  name: process.env.CLOUD_NAME,
  key: process.env.CLOUD_KEY,
}); // 🔥 DEBUG

export default cloudinary;