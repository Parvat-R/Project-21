import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


const createEventModSchema = z.object({
    eventId: z.string(),
    comments: z.string().max(200, "Max 200 characters only.")
})

const updateSchema = z.object({
    id: z.cuid(),
    status: z.enum([  "OPEN",
  "UNDER_REVIEW",
  "RESOLVED",
  "CLOSED",])
})


export async function GET() {
    try {
        return NextResponse.json(await prisma.eventMod.findMany({
            include: {
                event: true
            }
        }));
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            "error": "Internal Server Error"
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = createEventModSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                "error": result.error
            })


            
        }

        const { eventId, comments } = result.data;

        const mod = await prisma.eventMod.create({
            data: {
                eventId,
                comments
            }
        })

        return NextResponse.json({
            success: true,
            data: mod
        }, { status: 201 })
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            "error": "Internal Server Error"
        })
    }
}


export async function PUT(req: NextRequest) {
    const body = await req.json();

    const result = updateSchema.safeParse(body);


}