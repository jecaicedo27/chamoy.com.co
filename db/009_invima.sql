-- Registro sanitario confirmado por el dueño (2026-07-05):
-- Sirope de chamoy Skarchamoy -> INVIMA NSA-2482-2025 (solo sirope).

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS invima_registro text;

UPDATE products
SET invima_registro = 'NSA-2482-2025',
    updated_at = now()
WHERE slug = 'sirope-de-chamoy'
  AND (invima_registro IS DISTINCT FROM 'NSA-2482-2025');

INSERT INTO faqs (question, answer, page, sort_order, active)
VALUES (
  '¿Skarchamoy tiene registro INVIMA?',
  'Sí. El sirope de chamoy Skarchamoy cuenta con notificación sanitaria INVIMA NSA-2482-2025, lo que certifica que cumple los requisitos sanitarios para alimentos en Colombia. Es un respaldo importante si compras para un negocio: puedes exigir y verificar el registro.',
  'general',
  3,
  true
)
ON CONFLICT (lower(question), page) DO UPDATE SET
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();
