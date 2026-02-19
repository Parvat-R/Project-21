import { prisma } from "@/lib/prisma";

export async function GET() {
    const data = await prisma.registration.findMany();
    return Response.json(data);
    
}