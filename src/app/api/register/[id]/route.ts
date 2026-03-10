import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/register/[id] - Get a specific registration by ID
export async function GET(req: Request, { params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    try {
        const registration = await prisma.registration.findUnique({
            where: { id },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json(registration);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}