import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // check if user exists or not
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "User does not exist. Please sign up to continue.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser.id,
          accountType: existingUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        },
      );

      // Save token to user document in database
      //   existingUser.token = token;
      existingUser.password = "user_password_hidden";

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return NextResponse.json({
        success: true,
        token,
        user: existingUser,
        message: `User Login Success`,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "An error occurred during signin. Please try again later.",
    });
  }
}
