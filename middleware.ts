// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * CORS configuration
 * - If you truly want allow-all with credentials, keep "*" and we'll reflect the Origin.
 * - For production, prefer explicit origins and remove "*".
 */
const RAW_ALLOWED = [
  process.env.FRONTEND_URL?.replace(/\/$/, "") || "",
  // Add more allowed origins as needed:
  // "http://localhost:3000",
  "*", // remove in prod if you can
].filter(Boolean);

const ALLOW_ALL = RAW_ALLOWED.includes("*");
const ALLOWED_ORIGINS = RAW_ALLOWED.filter((o) => o !== "*");

function isOriginAllowed(origin: string): boolean {
  if (!origin) return false;
  const normalized = origin.replace(/\/$/, "");
  return ALLOW_ALL ? true : ALLOWED_ORIGINS.includes(normalized);
}

function applyCors(res: NextResponse, origin: string, req: NextRequest) {
  // With credentials=true, ACAO cannot be "*"; reflect specific origin.
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Credentials", "true");

  const reqMethod = req.headers.get("access-control-request-method");
  const reqHeaders = req.headers.get("access-control-request-headers");

  res.headers.set("Access-Control-Allow-Methods", reqMethod || "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    reqHeaders || "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  res.headers.set("Access-Control-Max-Age", "600"); // cache preflight 10 mins
  return res;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const isPreflight = req.method === "OPTIONS";

  // Fail closed only if nothing is configured at all (no "*" and no concrete origins)
  if (!ALLOW_ALL && ALLOWED_ORIGINS.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "CORS misconfigured: no allowed origins configured" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const allowed = isOriginAllowed(origin);

  // Handle preflight
  if (isPreflight) {
    if (!allowed) return new NextResponse(null, { status: 403 });
    const res = new NextResponse(null, { status: 204 });
    return applyCors(res, origin, req);
  }

  // Simple requests
  if (origin && !allowed) {
    return new NextResponse(
      JSON.stringify({ error: "CORS: origin not allowed" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // Pass through and attach CORS headers for allowed cross-origin requests
  const res = NextResponse.next();
  if (origin && allowed) applyCors(res, origin, req);
  return res;
}

// Run for /api and all subpaths; use Node runtime (experimental in canary)
export const config = {
  matcher: ["/api/:path*"],
  runtime: "nodejs", // <<< requires Next.js 15.2 canary + experimental flag
};