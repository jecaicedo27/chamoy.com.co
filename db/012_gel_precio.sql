-- Precios confirmados por el dueño (2026-07-05):
-- Gel de chamoy 500 g -> $35.000 COP, 1000 g -> $65.000 COP.

UPDATE products
SET presentations = '[{"size": "500 g", "price_cop": 35000}, {"size": "1 kilo", "price_cop": 65000}]'::jsonb,
    price_note = 'Precio directo de fábrica: producimos en Colombia. Precios al por mayor por WhatsApp.',
    updated_at = now()
WHERE slug = 'gel-de-chamoy';
