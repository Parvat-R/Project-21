import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import { eventSchema } from "@/lib/validation/event";

export async function GET(req: Request, {params}: {params: Promise<{ id: string }>}) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: (await params).id },
    });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    return NextResponse.json(event);
  }
   catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



// PATCH -> Edits an event
export async function PATCH(req: Request, {params}: {params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;

    const body = await req.json();
    const validatedData = eventSchema.partial().parse(body);

    const hasContentEdit =
      validatedData.title !== undefined ||
      validatedData.description !== undefined ||
      validatedData.slug !== undefined ||
      validatedData.startDatetime !== undefined ||
      validatedData.endDatetime !== undefined ||
      validatedData.seats !== undefined ||
      validatedData.amount !== undefined ||
      validatedData.visibility !== undefined ||
      validatedData.imageUrl !== undefined;

    const nextApprovalStatus =
      validatedData.approvalStatus !== undefined
        ? validatedData.approvalStatus
        : hasContentEdit
          ? "PENDING"
          : undefined;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...(validatedData.title !== undefined ? { title: validatedData.title } : {}),
        ...(validatedData.description !== undefined ? { description: validatedData.description } : {}),
        ...(validatedData.slug !== undefined ? { slug: validatedData.slug } : {}),
        ...(validatedData.startDatetime !== undefined ? { startDatetime: validatedData.startDatetime } : {}),
        ...(validatedData.endDatetime !== undefined ? { endDatetime: validatedData.endDatetime } : {}),
        ...(validatedData.seats !== undefined ? { seats: validatedData.seats } : {}),
        ...(validatedData.amount !== undefined ? { amount: validatedData.amount } : {}),
        ...(validatedData.visibility !== undefined ? { visibility: validatedData.visibility } : {}),
        ...(validatedData.imageUrl !== undefined ? { imageUrl: validatedData.imageUrl?.trim() || null } : {}),
        ...(nextApprovalStatus !== undefined ? { approvalStatus: nextApprovalStatus } : {}),
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: "failed to update event" }, { status: 400 });
  }
}

// DELETE -> Deletes an event
export async function DELETE(req: Request, {params}: {params: Promise<{ id: string }>}) {
  try {
    await prisma.event.delete({
      where: { id: (await params).id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}

