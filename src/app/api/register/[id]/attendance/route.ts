import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const AttendanceSchema = z.object({
    id: z.string().uuid(),
});

// PUT /api/register/[id]/attendance - Mark attendance for a registration
export async function PUT(req:Request,{ params }: { params: { id: string } }) {
    const { id } = await params

    try {

        const registration = await prisma.registration.update({
            where: { id },
            data: {
                attendance: true
            },
        });

        return  NextResponse.json(registration);

    } 
    catch (error) {

        return  NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });

    }


}