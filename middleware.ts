// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// NOTE: Middleware always runs on the Edge runtime in Next.js.
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL?.replace(/\/$/, "") || "", // ensure no trailing slash
  // You can add other allowed origins here if you have staging/localhost:
  // "http://localhost:3000"
].filter(Boolean);

function isOriginAllowed(origin: string) {
  if (!origin) return false;
  const normalized = origin.replace(/\/$/, "");
  return ALLOWED_ORIGINS.includes(normalized);
}

function setCors(res: NextResponse, origin: string, req: NextRequest) {
  res.headers.set("Access-Control-Allow-Origin", origin);
  res.headers.set("Vary", "Origin");

  // If you use cookies or auth headers cross-site, keep this true
  res.headers.set("Access-Control-Allow-Credentials", "true");

  // For preflight, reflect the requested method/headers if present
  const reqMethod = req.headers.get("access-control-request-method");
  const reqHeaders = req.headers.get("access-control-request-headers");

  // Fallbacks
  res.headers.set(
    "Access-Control-Allow-Methods",
    reqMethod || "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    reqHeaders || "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );

  // Optional: cache preflight for 10 minutes
  res.headers.set("Access-Control-Max-Age", "600");

  // Optional: expose headers you want the browser to read
  // res.headers.set("Access-Control-Expose-Headers", "X-Request-Id");

  return res;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";

  // If no FRONTEND_URL configured, fail closed
  if (ALLOWED_ORIGINS.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "CORS misconfigured: FRONTEND_URL not set in backend" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const isApi = req.nextUrl.pathname.startsWith("/api/");
  const isPreflight = req.method === "OPTIONS";

  // Only enforce CORS for cross-origin API calls
  if (isApi) {
    const allowed = isOriginAllowed(origin);

    if (isPreflight) {
      // Always answer preflight for known origins with 204 and CORS headers
      if (!allowed) {
        // For disallowed origins, you *can* reject with 403. The browser will show a CORS error.
        // This is fine. Alternatively, you can 204 with a restrictive ACAO to reduce noisy logs.
        return new NextResponse(null, { status: 403 });
      }
      const res = new NextResponse(null, { status: 204 });
      return setCors(res, origin, req);
    }

    // Non-OPTIONS: require allowed origin for cross-origin requests
    if (!allowed && origin) {
      return new NextResponse(
        JSON.stringify({ error: "CORS: origin not allowed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Pass through and attach CORS headers for allowed origins
    const res = NextResponse.next();
    if (allowed) setCors(res, origin, req);
    return res;
  }

  // Not an API route — continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};