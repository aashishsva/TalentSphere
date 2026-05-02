import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

// 🖼️ IMAGE (profile photo)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nexthire/images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// 📄 PDF (resume)
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nexthire/resumes",
    resource_type: "raw", // IMPORTANT for pdf
    allowed_formats: ["pdf"],
  },
});

export const uploadImage = multer({ storage: imageStorage });
export const uploadPDF = multer({ storage: pdfStorage });