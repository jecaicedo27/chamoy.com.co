-- Posicionamiento de fabricante (dato confirmado por el dueño 2026-07-05)

INSERT INTO faqs (question, answer, page, sort_order, active)
VALUES (
  '¿Ustedes fabrican el chamoy o lo revenden?',
  'Lo fabricamos nosotros en Colombia. Por eso el precio es directo de fábrica, la receta es consistente en cada lote y podemos garantizar reposición constante para negocios que compran todos los meses.',
  'general',
  1,
  true
)
ON CONFLICT (lower(question), page) DO UPDATE SET
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();

UPDATE products
SET price_note = 'Precio directo de fábrica: producimos en Colombia. Precios al por mayor por WhatsApp.',
    updated_at = now()
WHERE price_note IS NULL
   OR price_note NOT LIKE '%fábrica%';
