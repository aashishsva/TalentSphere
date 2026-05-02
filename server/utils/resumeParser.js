import axios from "axios";
import PDFParser from "pdf2json";
import { SKILLS } from "./skillDictionary.js";

export const extractSkillsFromResume = async (fileUrl) => {
  console.log("PARSING FILE:", fileUrl);

  // Cloudinary inline (no forced download)
  const safeUrl = fileUrl.replace(
    "/upload/",
    "/upload/fl_attachment:false/"
  );

  // fetch pdf as buffer
  const res = await axios.get(safeUrl, {
    responseType: "arraybuffer",
    headers: { Accept: "application/pdf" },
  });

  // parse with pdf2json
  const pdfParser = new PDFParser();

  const text = await new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (err) => {
      console.log("PDF ERROR:", err);
      reject(err);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        // extract text
        let fullText = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((t) => {
            t.R.forEach((r) => {
              fullText += decodeURIComponent(r.T) + " ";
            });
          });
        });

        resolve(fullText.toLowerCase());
      } catch (e) {
        reject(e);
      }
    });

    pdfParser.parseBuffer(res.data);
  });

  // skill matching
  const foundSkills = SKILLS.filter((skill) =>
    text.includes(skill)
  );

  console.log("EXTRACTED:", foundSkills);

  return foundSkills;
};