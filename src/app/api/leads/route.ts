import { NextResponse } from "next/server";
import { createLead } from "@/lib/content";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;

function field(value: unknown, max: number) {
  return String(value || "")
    .trim()
    .slice(0, max);
}

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
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (field(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const ip = getIp(request);
  if (isLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const name = field(body.name, 200);
  const phone = field(body.phone, 200);
  const need = field(body.need, 2000);

  if (name.length < 2 || phone.length < 7 || need.length < 8) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = await createLead({
    name,
    phone,
    need,
    city: field(body.city, 200),
    businessType: field(body.businessType, 200),
    sourcePath: field(body.sourcePath, 200)
  });

  return NextResponse.json({ ok: true, id: lead.id });
}
