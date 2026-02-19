import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";    




export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const userId : string= params.id;

    const feedbacks = await prisma.feedback.findMany({
      where: {
        registration: {
          userId: userId, 
        },
      },
      include: {
        registration: true, 
      },
      orderBy: {
        id: "desc",
      },
    });

  
    return NextResponse.json(
      { success: true, data: feedbacks },
      { status: 200 }
    );

  } catch (error) {
    console.error("[GET /api/feedback/user/[id]]", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
