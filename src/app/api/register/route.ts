import prisma from "@/lib/prisma";

prisma

export async function GET() {
    const data = await prisma.registration.findMany();
    return Response.json(data);
    
}