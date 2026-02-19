import prisma from "@/lib/prisma";

export async function GET(req:Request,{ params }: { params: { id: string } }) {
    const { id } = await params
    try {
        const registration = await prisma.registration.findMany({
            where: { id },
        });

        if (!registration) {
            return new Response(JSON.stringify({ error: "Registration not found" }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify(registration));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
        });
    }


}