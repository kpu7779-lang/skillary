import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export function handleApiError(err: unknown) {
  if (err instanceof ZodError) {
    return jsonError(err.issues[0]?.message ?? "参数无效", 400);
  }
  console.error("[API]", err);
  return jsonError("服务器错误", 500);
}

const ALLOWED_ORIGINS = new Set([
  "http://localhost:8765",
  "http://127.0.0.1:8765",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

export function withCors(res: NextResponse, req?: Request) {
  const origin = req?.headers.get("origin") ?? "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}