import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/register/user/[id] - Get all registrations for a user
export async function GET(req:Request,{ params }: {params: Promise<{ id: string }>}) {
    const { id } = await params
    console.log(id)

    try {

        const registration = await prisma.registration.findMany({
            where: { userId : id },
        });

        console.log(registration)

        if (!registration || registration.length === 0) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json(registration);
        
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });
    }

}