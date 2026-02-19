import prisma from "@/lib/prisma";
import z from "zod";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
)
 {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: params.id,
      },
      include: {
        creator: true,        // get user who created event
        registrations: true,  // optional
        payments: true,       // optional
      },
    });

    if (!event) {
      return Response.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return Response.json(event);
  } catch (error) {
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}


//patch
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, date } = body;

    const updatedEvent = await prisma.event.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    return Response.json(updatedEvent);
  } catch (error) {
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
//delete
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: {
        id: params.id,
      },
    });

    return Response.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    }
}
