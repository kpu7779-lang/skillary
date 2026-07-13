import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "http://localhost:8765",
  "http://127.0.0.1:8765",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

export function proxy(req: NextRequest) {
  const origin = req.headers.get("origin") ?? "";
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : null;

  if (req.method === "OPTIONS") {
    const res = new NextResponse(null, { status: 204 });
    if (allowOrigin) {
      res.headers.set("Access-Control-Allow-Origin", allowOrigin);
      res.headers.set("Access-Control-Allow-Credentials", "true");
    }
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    return res;
  }

  const res = NextResponse.next();
  if (allowOrigin) {
    res.headers.set("Access-Control-Allow-Origin", allowOrigin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return res;
}

export const config = {
  matcher: "/api/:path*",
};