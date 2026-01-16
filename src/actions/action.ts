"use server";

import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";
import htmltemplate from "../app/contactme/html";
import { db } from "@/lib/firebaseConfig";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.SBREVO_API_NAME,
      pass: process.env.SBREVO_API_KEY
    }
  });


  export async function sendEmail(data: { name: string; email: string; message: string }) {
    try {
        const { email, name } = data;
      const mailOptions = {
        from: "bavelytawfik@gmail.com",
        to: email,
        subject: "Thanks for your message",
        html: htmltemplate(name),
      };

      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Error sending email: ", error);
      return { success: false, message: "Failed to send email" };
    }
  } 


export async function saveContactForm(data: { name: string; email: string; message: string }) {
    try {
        const docRef = await addDoc(collection(db, "contacts"), data);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, message: "Failed to save contact form" };
    }
}

export async function submitContactForm(
    formData: { name: string; email: string; message: string },
    token: string
) {
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

    if (!RECAPTCHA_SECRET_KEY) {
        console.error("reCAPTCHA secret key not configured");
        return { success: false, message: "Server configuration error" };
    }

    // Verify reCAPTCHA token
    try {
        const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
        });
 
        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return { success: false, message: "reCAPTCHA verification failed. Please try again." };
        }
    } catch (error) {
        console.error("reCAPTCHA verification error: ", error);
        return { success: false, message: "Verification failed" };
    }

    try {
        await saveContactForm(formData);
        await sendEmail(formData);
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error submitting contact form: ", error);
        return { success: false, message: "Failed to submit form" };
    }
}