import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

const ALLOWED_ORIGINS = ["*,"];

function setCorsHeaders(res: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  return res;
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const origin = req.headers.get("origin");

  console.log(" MIDDLEWARE HIT:", req.method, req.nextUrl.pathname);
  console.log(" ORIGIN:", origin);
  console.log("ORIGIN:", origin);

  // Handle preflight OPTIONS requests — must respond before any auth checks
  if (req.method === "OPTIONS") {
    console.log("PREFLIGHT HANDLED");
    return setCorsHeaders(new NextResponse(null, { status: 204 }), origin);
  }

  const res = NextResponse.next();
  setCorsHeaders(res, origin); // attach CORS headers to every response

  // Allow public auth routes
  if (
    pathname.startsWith("/api/auth/signup") ||
    pathname.startsWith("/api/auth/login")
  ) {
    return res;
  }

  // JWT authentication
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401, headers: res.headers },
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: User not found" },
        { status: 401, headers: res.headers },
      );
    }

    // Role-based access control

    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden: Admins only" },
        { status: 403, headers: res.headers },
      );
    }

    if (pathname.startsWith("/organiser") && user.role !== "ORGANISER") {
      return NextResponse.json(
        { error: "Forbidden: Organisers only" },
        { status: 403, headers: res.headers },
      );
    }

    return res;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401, headers: res.headers },
    );
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/admin/:path*",
    "/organiser/:path*",
    "/user/:path*",
  ],
};
