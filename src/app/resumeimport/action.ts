"use server";
import fs from "fs";
import path from "path";

export async function upload(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  // Convert file to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Define the file save location (adjust as needed)
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, "resume.pdf");

  // Ensure the directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Write the file to the server
  fs.writeFileSync(filePath, buffer);

  return { message: "File uploaded successfully", path: `/uploads/resume.docx` };
}