import { query } from "./db";
import type { Presentation } from "./types";

export type AdminLead = {
  id: string;
  name: string;
  phone: string;
  city: string | null;
  business_type: string | null;
  need: string;
  source_path: string | null;
  status: string;
  created_at: Date;
};

export type AdminFaq = {
  id: string;
  question: string;
  answer: string;
  page: string;
  sort_order: number;
  active: boolean;
};

export type AdminProduct = {
  slug: string;
  name: string;
  presentations: Array<{ size: string; price_cop: number; yield?: string }>;
  price_note: string | null;
  active: boolean;
};

export type EventTypeCount = { type: string; total: string };
export type EventDayCount = { day: Date; total: string };

export async function listLeads(): Promise<AdminLead[]> {
  return query<AdminLead>(
    `SELECT id, name, phone, city, business_type, need, source_path, status, created_at
     FROM leads
     ORDER BY created_at DESC
     LIMIT 300`
  );
}

export async function leadStatusCounts() {
  return query<{ status: string; total: string }>(
    `SELECT status, count(*) AS total FROM leads GROUP BY status ORDER BY status`
  );
}

export async function updateLeadStatus(id: string, status: string) {
  await query(`UPDATE leads SET status = $2 WHERE id = $1`, [id, status]);
}

export async function deleteLead(id: string) {
  await query(`DELETE FROM leads WHERE id = $1`, [id]);
}

export async function eventTypeCounts(days: number): Promise<EventTypeCount[]> {
  return query<EventTypeCount>(
    `SELECT type, count(*) AS total
     FROM events
     WHERE created_at > now() - ($1 || ' days')::interval
     GROUP BY type
     ORDER BY total DESC`,
    [days]
  );
}

export async function whatsappClicksByDay(days: number): Promise<EventDayCount[]> {
  return query<EventDayCount>(
    `SELECT date_trunc('day', created_at) AS day, count(*) AS total
     FROM events
     WHERE type = 'whatsapp_click'
       AND created_at > now() - ($1 || ' days')::interval
     GROUP BY day
     ORDER BY day DESC`,
    [days]
  );
}

export async function topEventPaths(days: number) {
  return query<{ path: string; total: string }>(
    `SELECT path, count(*) AS total
     FROM events
     WHERE created_at > now() - ($1 || ' days')::interval
     GROUP BY path
     ORDER BY total DESC
     LIMIT 15`,
    [days]
  );
}

export async function listFaqsAdmin(): Promise<AdminFaq[]> {
  return query<AdminFaq>(
    `SELECT id, question, answer, page, sort_order, active
     FROM faqs
     ORDER BY page, sort_order, id`
  );
}

export async function upsertFaq(faq: {
  id?: string;
  question: string;
  answer: string;
  page: string;
  sortOrder: number;
  active: boolean;
}) {
  if (faq.id) {
    await query(
      `UPDATE faqs
       SET question = $2, answer = $3, page = $4, sort_order = $5, active = $6, updated_at = now()
       WHERE id = $1`,
      [faq.id, faq.question, faq.answer, faq.page, faq.sortOrder, faq.active]
    );
  } else {
    await query(
      `INSERT INTO faqs (question, answer, page, sort_order, active)
       VALUES ($1, $2, $3, $4, $5)`,
      [faq.question, faq.answer, faq.page, faq.sortOrder, faq.active]
    );
  }
}

export async function listProductsAdmin(): Promise<AdminProduct[]> {
  return query<AdminProduct>(
    `SELECT slug, name, presentations, price_note, active
     FROM products
     ORDER BY sort_order, id`
  );
}

export async function updateProductPricing(
  slug: string,
  presentations: Array<{ size: string; price_cop: number; yield?: string }>,
  priceNote: string | null
) {
  await query(
    `UPDATE products
     SET presentations = $2::jsonb, price_note = $3, updated_at = now()
     WHERE slug = $1`,
    [slug, JSON.stringify(presentations), priceNote]
  );
}

export type { Presentation };
