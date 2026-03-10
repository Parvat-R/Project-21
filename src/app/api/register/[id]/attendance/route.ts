import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const AttendanceSchema = z.object({
    attendance: z.boolean(),
});

// PUT /api/register/[id]/attendance - Toggle attendance for a registration
// body: { attendance: boolean }
export async function PUT(req: Request, { params }: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    try {
        const body = await req.json();
        const parsed = AttendanceSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "attendance (boolean) is required" }, { status: 400 });
        }

        const { attendance } = parsed.data;

        const registration = await prisma.registration.update({
            where: { id },
            data: {
                attendance,
                attendanceTime: attendance ? new Date() : null,
            },
        });

        return NextResponse.json(registration);
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}