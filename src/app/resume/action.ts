"use server";
import fs from "fs";
import path from "path";

export async function loadDoc() {
    try {
        const filePath = path.join(process.cwd(), "public/uploads/resume.pdf");
        
        if (!fs.existsSync(filePath)) {
            throw new Error("Resume file not found");
        }
        
        const buffer = fs.readFileSync(filePath);
        return `data:application/pdf;base64,${Buffer.from(buffer).toString("base64")}`;
    } catch (error) {
        console.error("Error loading resume:", error);
        throw new Error("Failed to load resume");
    }
}