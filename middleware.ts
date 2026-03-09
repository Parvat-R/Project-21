// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const runtime = 'nodejs';


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 },
    );
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: User not found" },
        { status: 401 },
      );
    }

    // Role-based access control
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admins only" },
        { status: 403 },
      );
    }

    if (pathname.startsWith("/organiser") && user.role !== "ORGANISER") {
      return NextResponse.json(
        { error: "Forbidden: Organisers only" },
        { status: 403 },
      );
    }

    // Allow request to continue
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 },
    );
  }
}

// Configure which routes use middleware
export const config = {
  matcher: ["/admin/:path*", "/organiser/:path*", "/user/:path*"],
};
