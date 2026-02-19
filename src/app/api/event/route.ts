import prisma from "@/lib/prisma";

export async function GET() {
    try {
        return Response.json(await prisma.eventMod.findMany({
            include: {
                event: true
            }
        }));
    } catch (err) {
        console.error(err);
        return Response.json({
            "error": "Internal Server Error"
        })
    }
}