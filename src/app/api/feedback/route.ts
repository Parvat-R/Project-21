import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";

const createFeedbackSchema = z.object({
  registrationId: z.string().cuid(),
  description: z.string().max(500, "Description must be at most 500 characters."),
  stars: z.number().min(1, "Rating must be at least 1 star.").max(5, "Rating cannot exceed 5 stars.")
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationId, description, stars } = body;
    console.log("==Received feedback data:", { registrationId, description, stars });  

    const feedbackData = {
      registrationId,
      description,
      stars,
    };

    const updatedFeedback = await prisma.feedback.upsert({
      where: { registrationId },
      update: {
        description,
        stars,
      },
      create: feedbackData,
    });
  
    return NextResponse.json(
      { success: true, data: updatedFeedback },
      { status: 201 }
    );
    
  } 
  catch (error) {
    console.error("[POST /api/feedback]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}






