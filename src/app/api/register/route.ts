import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";



// GET /api/register - Get all registrations
export async function GET() {
    try{
        const data = await prisma.registration.findMany();
        return NextResponse.json(data);
    }
    catch(error){
        console.error(error)
        return NextResponse.json({message : "Failed to fetch registrations"}, {status: 500})
    }
}