import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const idSchema = z.object({
    id: z.string().uuid(),
});

// GET /api/register/[id] - Get a specific registration by ID
export async function GET(req:Request,{ params }: { params: { id: string } }) {
    const { id } = await params

    try {
        const registration = await prisma.registration.findMany({
            where: { id },
        });

        if (!registration || registration.length === 0) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json(registration);

    } 
    catch (error) {

        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });

    }


}