INSERT INTO products (slug, name, format, short_description, description, best_for, highlights, sort_order)
VALUES
  (
    'sirope-de-chamoy',
    'Sirope de chamoy',
    'Liquido fluido',
    'Chamoy pensado para bebidas frias, micheladas, sodas, cocteles y granizados.',
    'El sirope de chamoy se integra mejor en preparaciones liquidas. Es la opcion recomendada cuando quieres sabor a chamoy dentro de la bebida, no solo en el borde o como decoracion.',
    ARRAY['Micheladas', 'Sodas', 'Granizados', 'Cocteleria', 'Limonadas'],
    '["Se mezcla rapido", "Ayuda a estandarizar porciones", "Ideal para barras y bebidas frias"]'::jsonb,
    10
  ),
  (
    'salsa-de-chamoy',
    'Salsa de chamoy',
    'Salsa con cuerpo',
    'Chamoy para frutas, snacks, helados, toppings y escarchado de vasos.',
    'La salsa de chamoy tiene mas cuerpo y se queda mejor sobre fruta, snacks, helados y bordes de vaso. Es la opcion recomendada cuando necesitas cobertura, brillo y presencia visual.',
    ARRAY['Mango biche', 'Fruta picada', 'Gomitas', 'Helados', 'Escarchado'],
    '["Mayor cobertura", "Mejor para topping", "Aporta color y textura al plato"]'::jsonb,
    20
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  format = EXCLUDED.format,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  best_for = EXCLUDED.best_for,
  highlights = EXCLUDED.highlights,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO recipes (slug, title, intent, description, prep_minutes, servings, ingredients, steps, product_slug, sort_order)
VALUES
  (
    'michelada-con-chamoy',
    'Michelada con chamoy',
    'bebidas',
    'Receta rapida para bares y restaurantes: borde con salsa, base fria y toque de sirope para sabor uniforme.',
    5,
    '1 vaso',
    '["Salsa de chamoy para el borde", "Sirope de chamoy", "Limon", "Hielo", "Cerveza o base sin alcohol", "Sal o mix picante"]'::jsonb,
    '["Escarcha el borde con salsa de chamoy", "Agrega hielo y limon", "Suma una medida pequena de sirope", "Completa con la base fria y mezcla suave"]'::jsonb,
    'sirope-de-chamoy',
    10
  ),
  (
    'mango-biche-con-chamoy',
    'Mango biche con chamoy',
    'frutas',
    'Antojo de alta rotacion para fruteras, eventos y puntos de snack.',
    3,
    '1 porcion',
    '["Mango biche frio", "Salsa de chamoy", "Limon", "Sal o chile en polvo"]'::jsonb,
    '["Corta el mango en tiras o cubos", "Agrega salsa de chamoy encima", "Termina con limon y polvo al gusto"]'::jsonb,
    'salsa-de-chamoy',
    20
  ),
  (
    'soda-tropical-con-chamoy',
    'Soda tropical con chamoy',
    'bebidas',
    'Bebida vistosa para menus de soda, bubble tea y granizados suaves.',
    4,
    '1 vaso',
    '["Sirope de chamoy", "Soda fria", "Pulpa o sirope de maracuya", "Hielo", "Limon"]'::jsonb,
    '["Llena el vaso con hielo", "Agrega chamoy y fruta", "Completa con soda", "Mezcla una vez y sirve"]'::jsonb,
    'sirope-de-chamoy',
    30
  ),
  (
    'granizado-tropical-con-chamoy',
    'Granizado tropical con chamoy',
    'heladerias',
    'Base fria con fruta, hielo y chamoy para negocios de helados y bebidas.',
    6,
    '1 vaso',
    '["Hielo", "Fruta tropical", "Sirope de chamoy", "Salsa de chamoy para topping"]'::jsonb,
    '["Procesa hielo con fruta", "Agrega sirope de chamoy", "Sirve y termina con salsa encima"]'::jsonb,
    'sirope-de-chamoy',
    40
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  intent = EXCLUDED.intent,
  description = EXCLUDED.description,
  prep_minutes = EXCLUDED.prep_minutes,
  servings = EXCLUDED.servings,
  ingredients = EXCLUDED.ingredients,
  steps = EXCLUDED.steps,
  product_slug = EXCLUDED.product_slug,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO faqs (question, answer, page, sort_order)
VALUES
  ('Que es el chamoy?', 'El chamoy es una salsa o condimento mexicano de sabor dulce, acido, salado y ligeramente picante. Se usa en frutas, snacks, bebidas, helados, micheladas y recetas tipo antojo.', 'general', 5),
  ('Que diferencia hay entre sirope de chamoy y salsa de chamoy?', 'El sirope de chamoy fluye mejor y se mezcla facil en bebidas, granizados, sodas y micheladas. La salsa de chamoy tiene mas cuerpo y funciona mejor sobre frutas, snacks, helados y bordes de vaso.', 'general', 10),
  ('Como se usa el chamoy en Colombia?', 'En Colombia el chamoy se usa sobre mango biche y frutas frescas, en micheladas, escarchados, sodas, granizados, gomitas, helados y snacks. Para bebidas conviene sirope; para topping conviene salsa.', 'general', 15),
  ('Donde comprar chamoy en Colombia?', 'Puedes cotizar chamoy por WhatsApp. Te pedimos ciudad, uso principal y cantidad estimada para recomendar sirope, salsa o ambos formatos.', 'comprar', 20),
  ('El chamoy sirve para micheladas?', 'Si. Para micheladas puedes usar salsa de chamoy en el borde del vaso y sirope de chamoy dentro de la bebida para mantener un sabor uniforme.', 'recetas', 30),
  ('Que chamoy conviene para mango biche?', 'Para mango biche conviene salsa de chamoy porque cubre mejor la fruta, se queda visible y aporta brillo. El sirope es mas util si vas a preparar bebidas.', 'recetas', 40),
  ('Venden chamoy para negocios?', 'Si. La asesoria esta pensada para bares, fruteras, heladerias, restaurantes, dark kitchens, eventos y emprendimientos de bebidas o snacks.', 'asesoria', 50),
  ('Hacen envios a ciudades de Colombia?', 'La cobertura se confirma por WhatsApp segun ciudad, cantidad y disponibilidad. La idea es coordinar despacho y tiempos antes de cerrar la compra.', 'comprar', 60),
  ('Como calculo cuanto chamoy necesito?', 'Depende del uso. En bebidas importa la dosis por vaso; en fruta y snacks importa la cobertura por porcion. Por eso recomendamos cotizar con el menu o producto que quieres vender.', 'asesoria', 70)
ON CONFLICT (lower(question), page) DO UPDATE SET
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();
