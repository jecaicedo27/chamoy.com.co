-- Precio confirmado por el dueño (2026-07-05): Skarchalito 500 g -> $35.000 COP.

UPDATE products
SET presentations = '[{"size": "500 g", "price_cop": 35000}]'::jsonb,
    price_note = 'Precio directo de fábrica: producimos en Colombia. Precios al por mayor por WhatsApp.',
    updated_at = now()
WHERE slug = 'skarchalito';

-- El gel sigue sin precio publicado: revertir cualquier contaminación del
-- backfill antiguo de 003 (corría sin filtro de slug).
UPDATE products
SET presentations = '[]'::jsonb,
    updated_at = now()
WHERE slug = 'gel-de-chamoy'
  AND presentations = '[{"size": "500 ml", "price_cop": 35000}, {"size": "1 litro", "price_cop": 55000}]'::jsonb;
