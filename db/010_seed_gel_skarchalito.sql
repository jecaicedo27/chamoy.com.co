-- Dos productos nuevos confirmados por el dueño (2026-07-05):
-- Gel de chamoy (RSA-0037682-2025) y Skarchalito polvo agridulce (NSA-0324-2025).
-- Sin precios publicados aún: presentations vacío hasta confirmar.

INSERT INTO products (
  slug, name, format, short_description, description, best_for, highlights,
  presentations, image, image_alt, price_note, invima_registro, related_recipes, sort_order, active
)
VALUES
(
  'gel-de-chamoy',
  'Gel de chamoy',
  'Gel escarchador',
  'Chamoy en gel para escarchar: se adhiere al borde del vaso o al dulce y no escurre.',
  '<p>El <strong>gel de chamoy</strong> es el formato escarchador profesional: más denso que la salsa, hecho para quedarse donde lo pones. El borde de la michelada aguanta toda la bebida sin gotear, el dulce enchilado queda cubierto parejo y la paleta no suelta el chamoy en la vitrina.</p><p>Es el formato que las dulcerías y barras micheleras mexicanas usan para trabajar rápido: una pasada por el plato de gel y el vaso queda escarchado, listo para rebozar con <strong>Skarchalito</strong>, nuestro polvo agridulce picante.</p>',
  ARRAY['Escarchar vasos', 'Dulces enchilados', 'Paletas y copas', 'Gomitas'],
  '["Adherencia fuerte, no gotea", "Borde parejo en una pasada", "Par perfecto con Skarchalito"]'::jsonb,
  '[]'::jsonb,
  '/assets/img/hero-chamoy.webp',
  'Gel de chamoy Skarchamoy para escarchar vasos y dulces',
  'Producto de lanzamiento: presentaciones y precios por WhatsApp.',
  'RSA-0037682-2025',
  ARRAY['michelada-con-chamoy', 'gomitas-enchiladas-con-chamoy'],
  3,
  true
),
(
  'skarchalito',
  'Skarchalito',
  'Polvo agridulce picante',
  'Preparado sólido agridulce y picante: el polvito para fruta, gomitas, snacks y escarchados.',
  '<p><strong>Skarchalito</strong> es nuestro preparado sólido agridulce picante: el polvito estilo mexicano que convierte cualquier snack en antojo. Sobre mango biche, sandía, gomitas, palomitas o el borde de un vaso, aporta el contraste dulce-ácido-picosito que engancha.</p><p>Es el compañero natural del chamoy: el escarchado clásico se hace mojando el borde con <strong>gel o sirope de chamoy</strong> y rebozándolo con Skarchalito. Con los dos productos armas el combo completo sin depender de marcas importadas.</p>',
  ARRAY['Fruta fresca', 'Gomitas y dulces', 'Escarchados', 'Snacks y palomitas'],
  '["Agridulce y picosito", "El par del chamoy en escarchados", "Rinde muchísimo por porción"]'::jsonb,
  '[]'::jsonb,
  '/assets/img/mango-con-chamoy-y-tajin.webp',
  'Skarchalito, polvo agridulce picante, espolvoreado sobre mango',
  'Producto de lanzamiento: presentaciones y precios por WhatsApp.',
  'NSA-0324-2025',
  ARRAY['mango-con-chamoy-y-tajin', 'gomitas-enchiladas-con-chamoy'],
  4,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  format = EXCLUDED.format,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  best_for = EXCLUDED.best_for,
  highlights = EXCLUDED.highlights,
  image = EXCLUDED.image,
  image_alt = EXCLUDED.image_alt,
  price_note = EXCLUDED.price_note,
  invima_registro = EXCLUDED.invima_registro,
  related_recipes = EXCLUDED.related_recipes,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();

-- La familia completa en la FAQ de marca
INSERT INTO faqs (question, answer, page, sort_order, active)
VALUES
(
  '¿Qué es Skarchamoy?',
  'Skarchamoy es nuestra marca de chamoy fabricada en Colombia. La línea completa tiene cuatro productos: sirope de chamoy (bebidas y escarchados), salsa de chamoy (frutas y toppings), gel de chamoy (escarchador que no escurre) y Skarchalito, nuestro polvo agridulce picante. Venta directa de fábrica por WhatsApp y envío a todo el país.',
  'general',
  2,
  true
),
(
  '¿Cuál es la diferencia entre sirope, salsa y gel de chamoy?',
  'El sirope es líquido y fluido: para mezclar en bebidas, granizados y micheladas. La salsa tiene cuerpo: para bañar fruta, helados y snacks. El gel es el más denso: para escarchar bordes de vasos, dulces y paletas sin que gotee. Si además quieres el toque en polvo, ese es Skarchalito.',
  'general',
  4,
  true
)
ON CONFLICT (lower(question), page) DO UPDATE SET
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();
