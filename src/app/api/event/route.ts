import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { eventSchema } from "@/lib/validation/event";

// GET /api/event -> returns all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdOn: "desc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = eventSchema.parse(body);

    const newEvent = await prisma.event.create({
      data: validatedData,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
  }
}


