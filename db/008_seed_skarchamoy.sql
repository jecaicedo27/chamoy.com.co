-- Marca confirmada por el dueño: Skarchamoy (2026-07-05).
-- chamoy.com.co es el dominio SEO; Skarchamoy es la marca del producto.

INSERT INTO faqs (question, answer, page, sort_order, active)
VALUES (
  '¿Qué es Skarchamoy?',
  'Skarchamoy es nuestra marca de chamoy fabricada en Colombia. Producimos el sirope (para bebidas y escarchados) y la salsa (para frutas, snacks y toppings) en presentaciones de 500 ml y 1 litro, con venta directa de fábrica por WhatsApp y envío a todo el país.',
  'general',
  2,
  true
)
ON CONFLICT (lower(question), page) DO UPDATE SET
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();
