// middleware.ts (backend app)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configure exact allowed origins (no trailing slash)
const RAW_ALLOWED = [
  process.env.FRONTEND_URL?.replace(/\/$/, "") || "",
  // Add more origins as needed:
  // "http://localhost:3000",
].filter(Boolean);

function isOriginAllowed(origin: string): boolean {
  if (!origin) return false;
  const normalized = origin.replace(/\/$/, "");
  return RAW_ALLOWED.includes(normalized);
}

function applyCors(res: NextResponse, origin: string, req: NextRequest) {
  // Reflect origin; credentials require a specific origin (not "*")
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  const reqMethod = req.headers.get("access-control-request-method");
  const reqHeaders = req.headers.get("access-control-request-headers");

  res.headers.set("Access-Control-Allow-Methods", reqMethod || "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    reqHeaders || "*"
  );
  res.headers.set("Access-Control-Max-Age", "600");
  return res;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isPreflight = req.method === "OPTIONS";
  const allowed = isOriginAllowed(origin);

  // For preflight: return 204 and headers for allowed origins
  if (isPreflight) {
    if (!allowed) {
      // Respond 204 without ACAO; browser will block later request
      return new NextResponse(null, { status: 204 });
    }
    const res = new NextResponse(null, { status: 204 });
    return applyCors(res, origin, req);
  }

  // For non-preflight: block early if origin is present and not allowed
  if (origin && !allowed) {
    return new NextResponse(
      JSON.stringify({ error: "CORS: origin not allowed" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // Pass through, add CORS headers if allowed
  const res = NextResponse.next();
  if (origin && allowed) applyCors(res, origin, req);
  return res;
}

// Ensure it covers your backend API paths
export const config = {
  matcher: ["/api/:path*"],
  // Do not set runtime: middleware is Edge by default, which is stable
};