"use server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


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
    console.log("Contact Form Data:", formData);

    try {
        await saveContactForm(formData);
        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error };
    }

}