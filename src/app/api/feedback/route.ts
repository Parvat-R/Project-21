import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";

const createFeedbackSchema = z.object({
  id: z.string().cuid(),
  registrationId: z.string().cuid(),
  description: z.string().max(500, "Description must be at most 500 characters."),
  stars: z.number().min(1, "Rating must be at least 1 star.").max(5, "Rating cannot exceed 5 stars.")
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, registrationId, description, stars } = body;

    const newFeedback = await prisma.feedback.create({
      data: {
        id,
        registrationId,
        description,
        stars,
      },
    });
  
    return NextResponse.json(
      { success: true, data: newFeedback },
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




















/*
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const eventId = searchParams.get("eventId");

    let where: any = {};
    if (userId) where.userId = userId;
    if (eventId) where.eventId = eventId;

    const feedbacks = await prisma.feedback.findMany({
      where,
      include: {
        user: true,
        event: true,
      },
    });

    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/feedback]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

*/
/*export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const eventId = searchParams.get("eventId");

    let where: any = {};
    if (userId) where.userId = userId;
    if (eventId) where.eventId = eventId;

    const feedbacks = await prisma.feedback.findMany({
      where,
      include: {
        user: true,
        event: true,
      },
    });

    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/feedback]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userIdParam = searchParams.get("userId");
    const eventIdParam = searchParams.get("eventId");

    const where: any = {};

    if (userIdParam) {
      const userId = Number(userIdParam);
      if (!isNaN(userId)) {
        where.userId = userId;
      }
    }

    if (eventIdParam) {
      const eventId = Number(eventIdParam);
      if (!isNaN(eventId)) {
        where.eventId = eventId;
      }
    }

    const feedbacks = await prisma.feedback.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        event: {
          select: { id: true, title: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/feedback]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
*/





