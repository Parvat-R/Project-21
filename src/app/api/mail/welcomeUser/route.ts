// src/app/api/mail/welcome/route.ts
import { NextResponse } from "next/server";
import { mailSender } from "@/lib/mailsender";
import { welcomeEventAppTemplate } from "@/lib/emailTemplates/welcomeUser";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing required fields: email, name" },
        { status: 400 },
      );
    }

    // Generate the HTML body using your template
    const body = welcomeEventAppTemplate(name);

    const info = await mailSender({
      email,
      title: "Welcome to JEVENT ",
      body,
    });

    return NextResponse.json({
      success: true,
      message: "Welcome email sent successfully",
      info,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
