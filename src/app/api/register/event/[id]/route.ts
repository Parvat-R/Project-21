import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const registerSchema = z.object({
    userId: z.string().min(1, "userId is required"),
});

const deregisterSchema = z.object({
    id: z.string().min(1, "id is required"),
});

// GET /api/register/event/[id] - Get all registrations for an event
export async function GET(request: Request,{ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const data = await prisma.registration.findMany({
        include:{
            user:true
        },
        where:{eventId : id}
    })

    return NextResponse.json(data)
        
}

// POST /api/register/event/[id] - Register a user for an event
// body : { userId : string }
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: "userId is required", acknowledgement: false }, { status: 400 });
        }

        const { userId } = parsed.data;
        const { id: eventId } = await params;

        const event = await prisma.event.findUnique({ where: { id: eventId } });
        if (!event) {
            return NextResponse.json({ message: "Event not found", acknowledgement: false }, { status: 404 });
        }

        const alreadyRegistered = await prisma.registration.findFirst({
            where: { userId, eventId },
        });
        if (alreadyRegistered) {
            return NextResponse.json({ message: "Already registered for this event", acknowledgement: false }, { status: 409 });
        }

        await prisma.registration.create({
            data: { userId, eventId },
        });

        return NextResponse.json({ message: "Registered Successfully", acknowledgement: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Registration Failed", acknowledgement: false }, { status: 500 });
    }
}

// DELETE /api/register/event/[id] - Deregister a user from an event
// body : { id : string } (registration id)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const body = await request.json();
        const parsed = deregisterSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ message: "registration id is required", acknowledgement: false }, { status: 400 });
        }

        const { id: eventId } = await params;

        const deleted = await prisma.registration.deleteMany({
            where: { id: parsed.data.id, eventId },
        });

        if (deleted.count === 0) {
            return NextResponse.json({ message: "Registration not found", acknowledgement: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Deregistered Successfully", acknowledgement: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Deregistration Failed", acknowledgement: false }, { status: 500 });
    }
}
