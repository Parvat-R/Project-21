import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: {
        event: true,
      },
    });

    const totalRegistered = registrations.length;
    let amountSpent = 0;
    let attendedCount = 0;
    let missedCount = 0;

    const now = new Date();

    registrations.forEach((reg) => {
      amountSpent += Number(reg.event.amount);
      if (reg.attendance) {
        attendedCount++;
      } else if (new Date(reg.event.endDatetime) < now) {
        missedCount++;
      }
    });

    return NextResponse.json({
      totalRegistered,
      amountSpent,
      attendedCount,
      missedCount,
    });
  } catch (error) {
    console.error("[Dashboard Stats API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
