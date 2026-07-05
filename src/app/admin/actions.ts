"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  deleteLead,
  listProductsAdmin,
  updateLeadStatus,
  updateProductPricing,
  upsertFaq
} from "@/lib/admin";
import { updateOrderStatus } from "@/lib/orders";
import { ADMIN_COOKIE, SESSION_SECONDS, createToken, requireAdmin, safeEquals } from "@/lib/adminAuth";

const LEAD_STATUSES = new Set(["new", "contacted", "closed", "discarded"]);

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD || "";

  if (!expected || !password || !safeEquals(password, expected)) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    redirect("/admin/login/?error=1");
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS
  });

  redirect("/admin/");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login/");
}

export async function leadStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !LEAD_STATUSES.has(status)) return;

  await updateLeadStatus(id, status);
  revalidatePath("/admin/leads");
}

export async function leadDeleteAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (!id) return;

  await deleteLead(id);
  revalidatePath("/admin/leads");
}

const ORDER_STATUSES = new Set([
  "created",
  "pending_payment",
  "paid",
  "whatsapp",
  "declined",
  "error",
  "voided",
  "shipped",
  "delivered",
  "cancelled"
]);

export async function orderStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !ORDER_STATUSES.has(status)) return;

  await updateOrderStatus(id, status);
  revalidatePath("/admin/pedidos");
}

export async function faqSaveAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  const page = String(formData.get("page") || "general").trim() || "general";
  const sortOrder = Number(formData.get("sortOrder") || 0);
  const active = formData.get("active") === "on";

  if (question.length < 5 || answer.length < 5) return;

  await upsertFaq({
    id: id || undefined,
    question,
    answer,
    page,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    active
  });

  revalidatePath("/", "layout");
}

export async function productPricingAction(formData: FormData) {
  await requireAdmin();

  const slug = String(formData.get("slug") || "");
  if (!slug) return;

  const products = await listProductsAdmin();
  const product = products.find((item) => item.slug === slug);
  if (!product) return;

  const presentations = product.presentations.map((presentation, index) => {
    const price = Number(formData.get(`price_${index}`));
    return {
      ...presentation,
      price_cop: Number.isFinite(price) && price > 0 ? Math.round(price) : presentation.price_cop
    };
  });

  const priceNote = String(formData.get("priceNote") || "").trim() || null;

  await updateProductPricing(slug, presentations, priceNote);
  revalidatePath("/", "layout");
}
