"use server";
import fs from "fs";
import path from "path";

export async function loadDoc() {
    const filePath = path.join(process.cwd(), "public/uploads/resume.pdf");
    const buffer = fs.readFileSync(filePath);
    
    return `data:application/pdf;base64,${Buffer.from(buffer).toString("base64")}`;
}