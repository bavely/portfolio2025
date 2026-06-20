// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { saveContactForm } from "../../../actions/action";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const saved = await saveContactForm({ name, email, message });

    if (!saved.success) {
      return NextResponse.json(
        { success: false, message: "Failed to save contact form" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
