import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,

) {
  try {
  

    const admins = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: admins },
      { status: 200 }
    );

  } catch (error) {
    console.error("[GET /api/admin]", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
