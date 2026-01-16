// app/api/contact/route.ts
import { NextResponse } from "next/server";
import {  saveContactForm } from "../../../actions/action"; // Reuse logic
// ,sendEmail
// You may need to refactor slightly to not depend on `"use server"`

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message, token } = body;
console.log(body,token, "body");

  try {
    // Add recaptcha validation here if needed

    const saved = await saveContactForm({ name, email, message });
    // const sent = await sendEmail({ name, email, message });
//!sent.success ||
    if (  !saved.success) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
