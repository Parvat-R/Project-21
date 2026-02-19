import prisma from "@/lib/prisma";

export async function PUT(req:Request,{ params }: { params: { id: string } }) {
    const { id } = await params
    try {
        const registration = await prisma.registration.update({
            where: { id },
            data: {
                attendance: true
            },
        });

        return  Response.json(registration);
    } catch (error) {
        return  Response.json({ error: "Internal server error" }, {
            status: 500,
        });
    }


}