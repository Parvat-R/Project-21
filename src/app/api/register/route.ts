import prisma from "@/lib/prisma";
import z from "zod";


export async function GET() {
    const data = await prisma.registration.findMany();
    return Response.json(data);
    
}