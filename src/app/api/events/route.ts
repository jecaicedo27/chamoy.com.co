import { NextResponse } from "next/server";
import { createEvent } from "@/lib/content";

const ALLOWED_TYPES = new Set([
  "whatsapp_click",
  "lead_submit",
  "calc_use",
  "cta_click"
]);

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 120;
const MAX_BODY_BYTES = 2048;

function getIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || current.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const raw = await request.text().catch(() => "");
  if (!raw || raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  let body: { type?: unknown; path?: unknown; meta?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = String(body.type || "");
  const path = String(body.path || "").slice(0, 200);
  const meta = body.meta && typeof body.meta === "object" ? (body.meta as Record<string, unknown>) : {};

  if (!ALLOWED_TYPES.has(type) || !path.startsWith("/")) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  try {
    await createEvent(type, path, meta);
  } catch (error) {
    console.error("createEvent failed", error);
  }

  return NextResponse.json({ ok: true });
}
