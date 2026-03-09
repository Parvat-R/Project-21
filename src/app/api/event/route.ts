import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { eventSchema } from "@/lib/validation/event";
import { Role } from "@/app/generated/prisma/browser";

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

    const user = await prisma.user.findUnique({ where: { id: validatedData.creatorId } });
    if (!user) {
      return NextResponse.json({ error: "Invalid creatorId" }, { status: 400 });
    }
    if (user.role != Role.ORGANISER) {
        console.log("User is not an ORGANIZER or ADMIN, role: ", user.role);
        return NextResponse.json({ error: "User must be an ORGANIZER to create events" }, { status: 403 });
    }

    const newEvent = await prisma.event.create({
      data: {
        ...validatedData,
        description: validatedData.description ?? "",
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 400 });
  }
}


