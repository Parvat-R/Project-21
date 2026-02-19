import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


const createEventModSchema = z.object({
    eventId: z.string(),
})

const updateSchema = z.object({
    id: z.cuid(),
    status: z.enum([
        "OPEN",
        "UNDER_REVIEW",
        "RESOLVED",
        "CLOSED",
    ]),
    comments: z.string().max(200, "Max 200 characters only."),
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
        }, {status: 500})
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
        
        const { eventId } = result.data;
        
        const event = await prisma.event.findUnique({where: {id: eventId}})
        
        if (!event) {
            return NextResponse.json({
                "error": "Invalid event id"
            })
        }
        


        const mod = await prisma.eventMod.create({
            data: {
                eventId
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
        }, {status: 500})
    }
}


export async function PUT(req: NextRequest) {
    try {

        const body = await req.json();
        
        const result = updateSchema.safeParse(body);
        
        if (!result.success) {
            return NextResponse.json({
                "error": result.error
            })
        }

        const { id, status, comments } = result.data;
        
        prisma.eventMod.update({
            where: { id },
            data: {
                status,
                comments
            }
        })

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            "error": "Internal Server Error"
        }, {status: 500})
    }
}