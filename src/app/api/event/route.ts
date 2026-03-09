import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { eventSchema } from "@/lib/validation/event";
import { Role } from "@/app/generated/prisma/browser";

function parseBase64Image(imageData?: string) {
  if (!imageData) return null;

  const rawBase64 = imageData.startsWith("data:")
    ? imageData.split(",")[1]
    : imageData;

  if (!rawBase64) return null;

  try {
    return Buffer.from(rawBase64, "base64");
  } catch {
    return null;
  }
}

// GET /api/event -> returns events with optional filters
// Query params:
// - creatorId: string
// - visibility: INTERNAL | PUBLIC
// - approvalStatus: PENDING | APPROVED | REJECTED
// - includeImage: true | false (default false)
// - take: number (default 50, max 100)
// - skip: number (default 0)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const creatorId = searchParams.get("creatorId") ?? undefined;
    const visibility = searchParams.get("visibility") as "INTERNAL" | "PUBLIC" | null;
    const approvalStatus = searchParams.get("approvalStatus") as "PENDING" | "APPROVED" | "REJECTED" | null;
    const includeImage = searchParams.get("includeImage") === "true";

    const parsedTake = Number(searchParams.get("take") ?? 50);
    const parsedSkip = Number(searchParams.get("skip") ?? 0);
    const take = Number.isFinite(parsedTake) ? Math.min(Math.max(parsedTake, 1), 100) : 50;
    const skip = Number.isFinite(parsedSkip) ? Math.max(parsedSkip, 0) : 0;

    const events = await prisma.event.findMany({
      where: {
        ...(creatorId ? { creatorId } : {}),
        ...(visibility ? { visibility } : {}),
        ...(approvalStatus ? { approvalStatus } : {}),
      },
      select: {
        id: true,
        title: true,
        description: true,
        visibility: true,
        creatorId: true,
        startDatetime: true,
        endDatetime: true,
        amount: true,
        seats: true,
        approvalStatus: true,
        createdOn: true,
        ...(includeImage ? { imageData: true } : {}),
      },
      orderBy: { createdOn: "desc" },
      take,
      skip,
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
    const imageBuffer = parseBase64Image(validatedData.imageData);

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
        title: validatedData.title,
        slug: validatedData.slug,
        startDatetime: validatedData.startDatetime,
        endDatetime: validatedData.endDatetime,
        seats: validatedData.seats,
        amount: validatedData.amount,
        visibility: validatedData.visibility,
        creatorId: validatedData.creatorId,
        description: validatedData.description ?? "",
        imageData: imageBuffer,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Error: " + error.message }, { status: 400 });
  }
}


