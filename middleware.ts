import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGIN = process.env.FRONTEND_URL || ""; // must be set in backend runtime

console.log("Allowed Origins: ", ALLOWED_ORIGIN)

function setCors(res: NextResponse, origin: string) {
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  // Optional: cache preflight for 10 minutes
  res.headers.set("Access-Control-Max-Age", "600");
  return res;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";

  // If FRONTEND_URL is not configured, fail closed
  if (!ALLOWED_ORIGIN) {
    return new NextResponse(
      JSON.stringify({ error: "CORS misconfigured: FRONTEND_URL not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Reject any origin that isn't exactly the configured frontend
  const isAllowed = origin === ALLOWED_ORIGIN;

  // Preflight
  if (req.method === "OPTIONS") {
    if (!isAllowed) return new NextResponse(null, { status: 403 });
    return setCors(new NextResponse(null, { status: 204 }), ALLOWED_ORIGIN);
  }

  // Non-OPTIONS: for API, block if origin not allowed
  if (req.nextUrl.pathname.startsWith("/api/")) {
    if (!isAllowed) {
      return new NextResponse(
        JSON.stringify({ error: "CORS: origin not allowed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    const res = NextResponse.next();
    return setCors(res, ALLOWED_ORIGIN);
  }

  // For non-API routes, just continue (usually SSR/HTML)
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};