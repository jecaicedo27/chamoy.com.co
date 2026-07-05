import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "chamoy_admin";
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SECRET || "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createToken() {
  const expiry = String(Date.now() + SESSION_SECONDS * 1000);
  return `${expiry}.${sign(expiry)}`;
}

export function verifyToken(token: string) {
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature || !secret()) return false;
  if (!/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false;

  const expected = sign(expiry);
  if (signature.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function safeEquals(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) {
    timingSafeEqual(bufferB, bufferB);
    return false;
  }
  return timingSafeEqual(bufferA, bufferB);
}

export async function isAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return Boolean(token && verifyToken(token));
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin/login/");
  }
}
