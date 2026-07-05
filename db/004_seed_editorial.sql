INSERT INTO products (
  slug, name, format, short_description, description, best_for, highlights, presentations,
  image, image_alt, price_note, comparison, related_recipes, sort_order, active
)
VALUES
  (
    'sirope-de-chamoy',
    'Sirope de chamoy',
    'Líquido fluido',
    'Sirope de chamoy líquido para micheladas, raspados, mangonadas y cocteles.',
    $$<p>Nuestro <strong>sirope de chamoy</strong> es la versión líquida y fluida del chamoy: cae en hilo, cubre parejo y se mezcla sin grumos. Está pensado para todo lo que se toma o se sirve frío — <a href="/recetas/michelada-con-chamoy/">micheladas</a>, raspados, granizados, <a href="/recetas/mangonada/">mangonadas</a>, cocteles y hasta limonadas con un giro picosito.</p><p>Lo producimos en Colombia con fruta real, chile y el punto exacto de acidez, así que no pagas los sobrecostos ni las demoras de un producto importado.</p>$$,
    ARRAY['Micheladas', 'Raspados', 'Granizados', 'Mangonadas', 'Cocteles'],
    $$[
      "Escarchar vasos: baña el borde del vaso con sirope y gíralo sobre tajín o sal de chile. La base de toda michelada mexicana.",
      "Micheladas y cerveza preparada: un chorrito dentro del vaso le da el toque agridulce que hace la diferencia.",
      "Raspados y granizados: báñalos por encima como coulis picosito.",
      "Mangonadas y chamoyadas: el ingrediente que define estas bebidas virales de mango congelado.",
      "Cocteles: margaritas, mezcal y tequila combinan de maravilla con un borde de chamoy."
    ]$$::jsonb,
    $$[
      {"size":"500 ml","price_cop":35000,"yield":"25-35 vasos escarchados"},
      {"size":"1 litro","price_cop":55000,"yield":"50-70 vasos escarchados"}
    ]$$::jsonb,
    '/assets/img/sirope-de-chamoy.webp',
    'Sirope de chamoy líquido de 500 ml junto a una michelada con borde escarchado de chamoy y tajín',
    'Ahorra con el litro: la presentación de 1 litro cuesta $55 el mililitro frente a $70 del tarro de 500 ml. Si tienes un bar de micheladas o una frutería, es tu presentación.',
    $$Si tu plan es <strong>beber</strong> (micheladas, granizados, cocteles), el sirope es tu producto. Si tu plan es <strong>comer</strong> (mango biche, fruta picada, gomitas enchiladas, snacks), te conviene la <a href="/productos/salsa-de-chamoy/">salsa de chamoy</a>, que es más espesa y se adhiere mejor.$$,
    ARRAY['michelada-con-chamoy', 'mangonada'],
    10,
    true
  ),
  (
    'salsa-de-chamoy',
    'Salsa de chamoy',
    'Salsa con cuerpo',
    'Salsa de chamoy espesa para mango biche, fruta, gomitas enchiladas y snacks.',
    $$<p>Nuestra <strong>salsa de chamoy</strong> tiene el cuerpo y la textura del chamoy tradicional mexicano: espesa, brillante y con el balance perfecto entre lo dulce de la fruta, lo ácido del limón, la sal y el toque de chile. Es la compañera natural del <a href="/recetas/mango-con-chamoy-y-tajin/">mango biche</a>, la piña, la sandía, las <a href="/recetas/gomitas-enchiladas-con-chamoy/">gomitas enchiladas</a> y cualquier snack que quieras llevar al siguiente nivel.</p><p>La producimos en Colombia con fruta real. Nada de esperar importaciones ni pagar precios inflados: chamoy fresco, local y con envío a todo el país.</p>$$,
    ARRAY['Mango biche', 'Fruta fresca', 'Gomitas', 'Snacks', 'Helados'],
    $$[
      "Fruta fresca: mango biche, piña, sandía, fresas, manzana verde y pepino. El clásico absoluto.",
      "Gomitas enchiladas: baña las gomitas en salsa, espolvorea chile en polvo y deja reposar. El dulce viral de TikTok.",
      "Snacks: papas, chicharrones, palomitas de maíz y cueritos con un toque mexicano.",
      "Escarchado grueso: para vasos de mangonada donde quieres que el chamoy se sienta en cada sorbo.",
      "Paletas y helados: un hilo de salsa por encima transforma cualquier paleta de fruta."
    ]$$::jsonb,
    $$[
      {"size":"500 ml","price_cop":35000,"yield":"20-30 porciones de fruta"},
      {"size":"1 litro","price_cop":55000,"yield":"40-60 porciones de fruta"}
    ]$$::jsonb,
    '/assets/img/salsa-de-chamoy.webp',
    'Tarro de salsa de chamoy espesa con cuchara de madera y bastones de mango verde',
    'Ahorra con el litro: el tarro de 1 litro sale a $55 el mililitro frente a $70 del de 500 ml. Ideal para fruterías, dulcerías y emprendimientos de gomitas enchiladas.',
    $$Si tu plan es <strong>comer</strong> (frutas, gomitas, snacks), esta salsa es tu producto. Si tu plan es <strong>beber</strong> (micheladas, raspados, cocteles), te conviene el <a href="/productos/sirope-de-chamoy/">sirope de chamoy</a>, que es más fluido y se integra mejor en líquidos.$$,
    ARRAY['mango-con-chamoy-y-tajin', 'gomitas-enchiladas-con-chamoy'],
    20,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  format = EXCLUDED.format,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  best_for = EXCLUDED.best_for,
  highlights = EXCLUDED.highlights,
  presentations = EXCLUDED.presentations,
  image = EXCLUDED.image,
  image_alt = EXCLUDED.image_alt,
  price_note = EXCLUDED.price_note,
  comparison = EXCLUDED.comparison,
  related_recipes = EXCLUDED.related_recipes,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active,
  updated_at = now();

INSERT INTO recipes (
  slug, title, intent, description, intro, image, image_alt, prep_minutes, servings,
  ingredients, steps, tips, business_note, category, cuisine, keywords, date_published,
  total_time_iso, cook_time_iso, product_slug, related_slugs, sort_order, active
)
VALUES
  (
    'michelada-con-chamoy',
    'Michelada con chamoy: la receta mexicana auténtica',
    'bebidas',
    'Michelada al estilo mexicano con vaso escarchado en chamoy y tajín, jugo de limón y cerveza bien fría.',
    $$En Colombia la michelada es limón y sal. En México es un ritual completo: vaso <strong>escarchado con chamoy y tajín</strong>, jugo de limón, salsas y cerveza helada. Esa versión — la que ves en TikTok con el borde rojo y goteante — es la que te enseñamos aquí. Una vez la pruebes, la michelada de solo sal te va a saber a poco.$$,
    '/assets/img/michelada-con-chamoy.webp',
    'Michelada con cerveza dorada y borde escarchado de chamoy rojo con tajín',
    10,
    '1 michelada',
    $$[
      "1 cerveza clara bien fría (la lager que prefieras)",
      "2 cucharadas de sirope de chamoy",
      "2 cucharadas de tajín o sal de chile en polvo",
      "Jugo de 2 limones",
      "Hielo al gusto",
      "Opcional (estilo \"cubana\"): unas gotas de salsa picante y salsa inglesa"
    ]$$::jsonb,
    $$[
      {"name":"Escarcha el vaso","text":"Pon el sirope de chamoy en un plato pequeño y el tajín en otro. Pasa el borde del vaso por el chamoy, gíralo, y luego pásalo por el tajín. Debe quedar un borde rojo, grueso y parejo. Este paso es el 80% de la michelada."},
      {"name":"Prepara la base","text":"Adentro van el jugo de limón, un chorrito extra de sirope de chamoy y el hielo. ¿La quieres \"cubana\"? Agrega salsa picante y salsa inglesa."},
      {"name":"Sirve la cerveza","text":"Inclina el vaso y vierte despacio para controlar la espuma. Mezcla suave y toma de inmediato, mordiendo el borde de chamoy en cada sorbo — ahí está la magia."}
    ]$$::jsonb,
    $$[
      {"title":"Sirope, no salsa","text":"Para escarchar necesitas un chamoy fluido que se adhiera parejo. La <a href=\"/productos/salsa-de-chamoy/\">salsa espesa</a> es para frutas; el <a href=\"/productos/sirope-de-chamoy/\">sirope</a> es para vasos."},
      {"title":"Vaso congelado","text":"Mete el vaso al congelador 15 minutos antes de escarchar. El chamoy agarra mejor y la cerveza se mantiene fría."},
      {"title":"Gomitas de remate","text":"Corona con un par de <a href=\"/recetas/gomitas-enchiladas-con-chamoy/\">gomitas enchiladas</a> en el borde. Presentación de bar michelero profesional."},
      {"title":"Sin alcohol","text":"La misma receta funciona con cerveza sin alcohol, soda de toronja o agua con gas y limón."}
    ]$$::jsonb,
    $$<h2>¿Montando un negocio de micheladas?</h2><p>Un tarro de 1 litro de sirope de chamoy ($55.000) alcanza para escarchar entre 50 y 70 vasos: menos de $1.100 por michelada en el ingrediente que la diferencia de la competencia. <a href="/productos/sirope-de-chamoy/">Mira las presentaciones aquí</a> y pregúntanos por precios al por mayor.</p>$$,
    'Bebida',
    'Mexicana',
    ARRAY['michelada con chamoy', 'michelada mexicana', 'cerveza preparada con chamoy'],
    DATE '2026-07-05',
    'PT10M',
    NULL,
    'sirope-de-chamoy',
    ARRAY['gomitas-enchiladas-con-chamoy', 'mangonada', 'mango-con-chamoy-y-tajin'],
    10,
    true
  ),
  (
    'mangonada',
    'Mangonada: la chamoyada de mango que se volvió viral',
    'bebidas',
    'Bebida frappé mexicana de mango congelado con capas de chamoy, tajín y mango fresco picado.',
    $$La <strong>mangonada</strong> (también llamada <strong>chamoyada</strong>) es el postre-bebida más famoso de México: granizado de mango maduro en capas con chamoy, tajín, mango fresco picado y un palito de tamarindo de pitillo. Es dulce, ácida, picante y helada al mismo tiempo. Y Colombia, con el mejor mango del continente, es el lugar perfecto para prepararla.$$,
    '/assets/img/mangonada.webp',
    'Mangonada en vaso alto con granizado de mango, rayas de chamoy y palito de tamarindo',
    15,
    '2 mangonadas',
    $$[
      "3 tazas de mango maduro congelado (Tommy o de azúcar, congelado mínimo 4 horas)",
      "1/2 taza de jugo de mango o agua",
      "Jugo de 2 limones",
      "4 cucharadas de sirope de chamoy",
      "2 cucharadas de tajín",
      "1 mango fresco picado en cubos",
      "2 tarugos o palitos de tamarindo con chile (opcional, pero muy recomendado)"
    ]$$::jsonb,
    $$[
      {"name":"Licúa la base","text":"Mango congelado + jugo de mango + limón. Busca textura de granizado espeso, no de jugo: si queda muy líquido, agrega más mango congelado."},
      {"name":"Arma las capas","text":"Escarcha los vasos con chamoy y tajín. Luego alterna: chorro de chamoy en el fondo, capa de granizado, hilo de chamoy por las paredes, más granizado. Las rayas rojas en el vaso son la firma de la mangonada."},
      {"name":"Corónala","text":"Mango fresco picado encima, hilo final de chamoy, espolvoreado de tajín y el tarugo de tamarindo clavado como pitillo. Sirve con cuchara y pitillo grueso."}
    ]$$::jsonb,
    $$[
      {"title":"El mango manda","text":"Entre más dulce el mango, mejor el contraste con el chamoy. El mango de azúcar colombiano es simplemente superior para esta receta."},
      {"title":"No la mezcles toda","text":"La gracia es que cada cucharada sea distinta — a veces más dulce, a veces más chamoy."},
      {"title":"Versión para vender","text":"En vaso transparente de 12–16 oz con las rayas de chamoy visibles. Es la bebida más fotogénica que existe: se vende sola en redes."}
    ]$$::jsonb,
    $$<h2>Tu mangonada necesita chamoy de verdad</h2><p>Sirope de chamoy hecho en Colombia: 500 ml por $35.000 o 1 litro por $55.000.</p>$$,
    'Bebida',
    'Mexicana',
    ARRAY['mangonada', 'chamoyada', 'mangonada con chamoy', 'bebida de mango con chamoy'],
    DATE '2026-07-05',
    'PT15M',
    NULL,
    'sirope-de-chamoy',
    ARRAY['mango-con-chamoy-y-tajin', 'michelada-con-chamoy', 'gomitas-enchiladas-con-chamoy'],
    20,
    true
  ),
  (
    'mango-con-chamoy-y-tajin',
    'Mango con chamoy y tajín: la receta del snack más adictivo de México',
    'frutas',
    'El snack mexicano clásico: mango fresco bañado en salsa de chamoy y espolvoreado con tajín.',
    $$Si solo vas a probar una receta con chamoy en tu vida, que sea esta. El <strong>mango con chamoy y tajín</strong> es la combinación perfecta: la fruta dulce (o ácida, si eres team mango biche), la salsa agridulce y el chile en polvo con limón. En México se vende en cada esquina; en Colombia lo puedes hacer en tu casa en 10 minutos — y con la ventaja de que aquí el mango es mejor y más barato.$$,
    '/assets/img/mango-con-chamoy-y-tajin.webp',
    'Vaso estilo callejero mexicano con bastones de mango verde bañados en chamoy y tajín',
    10,
    '2 porciones',
    $$[
      "2 mangos — biches (verdes) si te gusta ácido y crocante, maduros (Tommy o de azúcar) si te gusta dulce",
      "4 cucharadas de salsa de chamoy",
      "2 cucharaditas de tajín o sal de chile en polvo",
      "Jugo de 1 limón (opcional, para los amantes del ácido)"
    ]$$::jsonb,
    $$[
      {"name":"Prepara el mango","text":"Pélalo y córtalo en bastones o cubos. Si es mango biche, corta tiras delgadas: la superficie extra hace que el chamoy se agarre mejor."},
      {"name":"Báñalo en chamoy","text":"Sirve el mango en un vaso (estilo callejero mexicano) o en un plato y cúbrelo con la salsa de chamoy. No seas tímido: la gracia es que cada pedazo quede pintado de rojo."},
      {"name":"Remata con tajín","text":"Espolvorea el chile en polvo por encima y, si quieres, unas gotas de limón. Se come de inmediato, idealmente con las manos."}
    ]$$::jsonb,
    $$[
      {"title":"Mango frío","text":"Mete el mango a la nevera una hora antes. El contraste frío-picante es otro nivel."},
      {"title":"Vaso escarchado","text":"Para presentación de venta, escarcha el borde del vaso con chamoy y tajín antes de servir la fruta."},
      {"title":"El orden importa","text":"Primero el chamoy, después el tajín. Si lo haces al revés, el polvo se disuelve y pierde textura."},
      {"title":"Piña con chamoy","text":"Misma técnica, ideal con piña oro miel."},
      {"title":"Sandía con chamoy","text":"El favorito de temporada de calor."},
      {"title":"Fresas con chamoy","text":"El contraste dulce-picante más elegante."},
      {"title":"Vasito mixto","text":"Mango + piña + pepino + chamoy, el \"vaso loco\" clásico de feria."}
    ]$$::jsonb,
    $$<h2>¿Te falta el ingrediente principal?</h2><p>Nuestra salsa de chamoy se hace en Colombia y llega a tu casa en días: 500 ml por $35.000 o 1 litro por $55.000.</p>$$,
    'Snack',
    'Mexicana',
    ARRAY['mango con chamoy', 'mango con chamoy y tajin', 'mango biche con chamoy'],
    DATE '2026-07-05',
    'PT10M',
    NULL,
    'salsa-de-chamoy',
    ARRAY['mangonada', 'gomitas-enchiladas-con-chamoy', 'michelada-con-chamoy'],
    30,
    true
  ),
  (
    'gomitas-enchiladas-con-chamoy',
    'Gomitas enchiladas con chamoy: la receta viral, paso a paso',
    'dulces',
    'Gomitas bañadas en salsa de chamoy y cubiertas con chile en polvo: el dulce mexicano viral.',
    $$Las <strong>gomitas enchiladas</strong> son el dulce mexicano que TikTok volvió fenómeno mundial: gomitas dulces bañadas en chamoy agridulce y cubiertas de chile en polvo. En Colombia se venden como pan caliente — y hacerlas en casa cuesta una fracción de lo que valen compradas. Aquí va la receta exacta, con los trucos para que queden como las de dulcería y no como un experimento pegajoso.$$,
    '/assets/img/gomitas-enchiladas.webp',
    'Bowl de gomitas enchiladas cubiertas de chamoy y chile en polvo',
    15,
    '500 g de gomitas',
    $$[
      "500 g de gomitas — las mejores: aros de durazno, ositos y lombrices ácidas",
      "6 cucharadas de salsa de chamoy (la espesa, no sirope)",
      "3 cucharadas de tajín o chile en polvo para dulces",
      "1 cucharada de jugo de limón (opcional, para más acidez)",
      "Azúcar con chile para el acabado (opcional)"
    ]$$::jsonb,
    $$[
      {"name":"Baña las gomitas","text":"En un bowl grande, mezcla las gomitas con la salsa de chamoy y el limón usando una espátula. La meta es una capa delgada y pareja — si nadan en salsa, quedarán babosas."},
      {"name":"Enchílalas","text":"Agrega el chile en polvo en 2–3 tandas, mezclando entre cada una, hasta que el polvo se pegue al chamoy y las gomitas queden completamente vestidas de rojo."},
      {"name":"Déjalas reposar","text":"Extiéndelas en una bandeja con papel encerado sin que se toquen entre sí. Dos horas a temperatura ambiente (o 30 minutos en nevera) y la cobertura se asienta con ese acabado brillante-mate de dulcería."}
    ]$$::jsonb,
    $$[
      {"title":"Exceso de chamoy","text":"Más no es mejor. Con demasiada salsa las gomitas sudan, se pegan y sueltan líquido en el empaque."},
      {"title":"Chamoy aguado","text":"El sirope es para bebidas. Para gomitas necesitas una <a href=\"/productos/salsa-de-chamoy/\">salsa espesa</a> que se adhiera y seque bien."},
      {"title":"Empacar de inmediato","text":"Si las guardas sin el reposo, la humedad las derrite. Paciencia: dos horas."}
    ]$$::jsonb,
    $$<h2>¿Quieres venderlas?</h2><p>Las gomitas enchiladas son uno de los emprendimientos de comida con mejor margen en Colombia ahora mismo. Los números básicos:</p><ul><li>Un tarro de 1 litro de salsa de chamoy ($55.000) alcanza para <strong>7–9 kilos de gomitas</strong>.</li><li>El kilo de gomitas al por mayor cuesta entre $15.000 y $25.000.</li><li>Las gomitas enchiladas se venden entre $8.000 y $15.000 por bolsa de 250 g.</li></ul><p>Haz las cuentas: el chamoy te cuesta menos de $700 por bolsa. Si vas en serio, <a href="/productos/salsa-de-chamoy/">empieza con el litro</a> y escríbenos por WhatsApp para precios al por mayor.</p>$$,
    'Dulce',
    'Mexicana',
    ARRAY['gomitas enchiladas', 'gomitas con chamoy', 'dulces enchilados', 'gomitas mexicanas'],
    DATE '2026-07-05',
    'PT2H15M',
    NULL,
    'salsa-de-chamoy',
    ARRAY['mango-con-chamoy-y-tajin', 'mangonada', 'como-hacer-chamoy-casero'],
    40,
    true
  ),
  (
    'como-hacer-chamoy-casero',
    'Cómo hacer chamoy casero: la receta tradicional mexicana',
    'salsa',
    'Receta de chamoy casero con ciruelas pasas, tamarindo, chile, limón, sal y azúcar.',
    $$¿Se puede hacer <strong>chamoy casero</strong> en Colombia? Absolutamente. La receta tradicional lleva fruta deshidratada, chile, limón, sal y azúcar — todo se consigue en cualquier plaza de mercado o supermercado del país. Aquí te damos la receta completa, con las proporciones exactas y los reemplazos colombianos para los ingredientes mexicanos.$$,
    '/assets/img/chamoy-casero.webp',
    'Olla con chamoy casero rodeada de ciruelas pasas, tamarindo, jamaica y chiles secos',
    40,
    '750 ml de chamoy',
    $$[
      "200 g de ciruelas pasas sin semilla",
      "100 g de pulpa de tamarindo",
      "150 g de flor de jamaica seca (le da el color rojo profundo y un toque ácido)",
      "3–4 chiles secos ancho o guajillo — reemplazo colombiano: 2 cucharadas de ají en polvo o chile de árbol seco, ajustando la cantidad",
      "1/2 taza de jugo de limón",
      "1/2 taza de azúcar",
      "1 cucharada de sal",
      "2 tazas de agua"
    ]$$::jsonb,
    $$[
      {"name":"Hidrata todo","text":"Hierve las ciruelas, el tamarindo, la jamaica y los chiles en 2 tazas de agua por 10 minutos, hasta que estén suaves."},
      {"name":"Licúa","text":"Todo a la licuadora con su líquido de cocción, el limón, el azúcar y la sal. Licúa hasta que quede una salsa completamente lisa; si tu licuadora no puede con las fibras del tamarindo, cuela."},
      {"name":"Reduce","text":"Regresa la salsa a la olla y cocínala a fuego bajo 10–15 minutos revolviendo. Aquí decides la textura: menos tiempo para un chamoy fluido tipo <a href=\"/productos/sirope-de-chamoy/\">sirope</a>, más tiempo para uno espeso tipo <a href=\"/productos/salsa-de-chamoy/\">salsa</a>."},
      {"name":"Prueba y ajusta","text":"El buen chamoy es un equilibrio: ¿muy ácido? más azúcar. ¿Muy dulce? más limón. ¿Le falta alma? una pizca más de sal."},
      {"name":"Envasa","text":"En frasco de vidrio esterilizado, refrigerado, dura hasta 1 mes."}
    ]$$::jsonb,
    '[]'::jsonb,
    $$<h2>La verdad sobre el chamoy casero</h2><p>Hacer chamoy en casa es un gran proyecto de cocina — y la mejor forma de entender por qué este sabor es tan especial. Pero seamos honestos: conseguir el <strong>equilibrio exacto</strong> entre dulce, ácido, sal y picante toma varios intentos, y la textura profesional (esa que se adhiere a la fruta sin escurrirse) requiere práctica.</p><p>Si lo tuyo es el resultado y no el proceso, nosotros ya hicimos los intentos por ti: nuestra <a href="/productos/salsa-de-chamoy/">salsa</a> y nuestro <a href="/productos/sirope-de-chamoy/">sirope de chamoy</a> se producen en Colombia con fruta real y el balance tradicional mexicano, desde $35.000 el tarro de 500 ml.</p>$$,
    'Salsa',
    'Mexicana',
    ARRAY['como hacer chamoy', 'chamoy casero', 'receta de chamoy', 'chamoy hecho en casa'],
    DATE '2026-07-05',
    'PT40M',
    'PT25M',
    'salsa-de-chamoy',
    ARRAY['mango-con-chamoy-y-tajin', 'gomitas-enchiladas-con-chamoy', 'michelada-con-chamoy', 'mangonada'],
    50,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  intent = EXCLUDED.intent,
  description = EXCLUDED.description,
  intro = EXCLUDED.intro,
  image = EXCLUDED.image,
  image_alt = EXCLUDED.image_alt,
  prep_minutes = EXCLUDED.prep_minutes,
  servings = EXCLUDED.servings,
  ingredients = EXCLUDED.ingredients,
  steps = EXCLUDED.steps,
  tips = EXCLUDED.tips,
  business_note = EXCLUDED.business_note,
  category = EXCLUDED.category,
  cuisine = EXCLUDED.cuisine,
  keywords = EXCLUDED.keywords,
  date_published = EXCLUDED.date_published,
  total_time_iso = EXCLUDED.total_time_iso,
  cook_time_iso = EXCLUDED.cook_time_iso,
  product_slug = EXCLUDED.product_slug,
  related_slugs = EXCLUDED.related_slugs,
  sort_order = EXCLUDED.sort_order,
  active = EXCLUDED.active,
  updated_at = now();

UPDATE recipes
SET active = false,
    updated_at = now()
WHERE slug IN ('mango-biche-con-chamoy', 'soda-tropical-con-chamoy', 'granizado-tropical-con-chamoy');

INSERT INTO faqs (question, answer, page, sort_order)
VALUES
  ('Cuanto cuesta el chamoy en Colombia?', 'El sirope y la salsa de chamoy cuestan $35.000 COP en presentacion de 500 ml y $55.000 COP en presentacion de 1 litro. Hacemos envios a todo Colombia.', 'comprar', 12),
  ('Que presentacion de chamoy me conviene?', 'Si es tu primera vez, empieza con 500 ml. Si tienes negocio o vendes micheladas, frutas o gomitas, la presentacion de 1 litro tiene mejor relacion precio por mililitro.', 'comprar', 13),
  ('El chamoy sirve para vender gomitas enchiladas?', 'Si. Para gomitas enchiladas conviene salsa de chamoy espesa, no sirope. Un litro puede alcanzar aproximadamente para 7 a 9 kilos de gomitas, segun la cobertura.', 'recetas', 35)
ON CONFLICT (lower(question), page) DO UPDATE SET
  answer = EXCLUDED.answer,
  sort_order = EXCLUDED.sort_order,
  active = true,
  updated_at = now();
