import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // hsh the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const role_ =
      role === "admin" ? "ADMIN" : role === "user" ? "USER" : "ORGANISER";
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role_ as "ADMIN" | "USER" | "ORGANISER",
        dateOfJoin: new Date(),
        walletBalance: 1000,
      },
    });

    return NextResponse.json({
      success: true,
      status: 201,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "An error occurred during signup. Please try again later.",
    });
  }
}
