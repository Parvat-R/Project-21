import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Role = "USER" | "ORGANISER" | "ADMIN";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { role } = body as { role?: Role };

    if (!role || !["USER", "ORGANISER", "ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
