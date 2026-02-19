import prisma from "@/lib/prisma";


export async function GET(req:Request,{ params }: { params: { id: string } }) {
    const { id } = await params
    console.log(id)

    try {
        const registration = await prisma.registration.findMany({
            where: { userId : id },
        });

        console.log(registration)

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