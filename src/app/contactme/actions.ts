"use server";

import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";
import htmltemplate from "./html";
import { db } from "@/lib/firebaseConfig";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.NEXT_PUBLIC_SBREVO_API_NAME,
      pass: process.env.NEXT_PUBLIC_SBREVO_API_KEY
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
      return { success: false, error };
    }
  } 


export async function saveContactForm(data: { name: string; email: string; message: string }) {
    try {
        const docRef = await addDoc(collection(db, "contacts"), data);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error };
    }
}

export async function submitContactForm(
    formData: { name: string; email: string; message: string },
    token: string
) {

    const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY; // Replace with your actual secret key

    // Verify reCAPTCHA token
    const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
 
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
        return { success: false, message: "reCAPTCHA verification failed" };
    }

    // Simulating email sending (replace with actual email logic)

console.log("executing...2");
    try {
        await saveContactForm(formData);
        console.log("executing...3");
        await sendEmail(formData);
        console.log("executing...4");
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error };
    }

}