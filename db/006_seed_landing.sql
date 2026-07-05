INSERT INTO landing_pages (kind, slug, title, meta_description, h1, intro, sections, faqs, cta_label, whatsapp_message, related_recipes, sort_order)
VALUES
(
  'ciudad',
  'bogota',
  'Chamoy en Bogotá | Sirope y salsa con envío',
  'Compra sirope y salsa de chamoy en Bogotá para micheladas, frutas y negocios. Presentaciones de 500 ml y 1 litro, pedido y envío coordinado por WhatsApp.',
  'Chamoy en Bogotá: sirope y salsa para bares, fruterías y antojos',
  'En Bogotá el chamoy dejó de ser rareza: está en las micheladas de los gastrobares, en los vasos de fruta de las plazas y en las ferias de comida. Vendemos sirope y salsa de chamoy en presentaciones de 500 ml y 1 litro, con pedido por WhatsApp y envío coordinado en la ciudad.',
  '[
    {
      "heading": "Dónde pega el chamoy en Bogotá",
      "body": "La escena michelera bogotana crece rápido y el borde escarchado de chamoy con sal de chile es lo que diferencia una michelada corriente de una que se comparte en redes. A eso se suman las fruterías de barrio con mango biche, los food trucks de ferias y los bares que buscan un cóctel con identidad.",
      "items": [
        "Bares y gastrobares que quieren una michelada mexicana auténtica en la carta.",
        "Fruterías y puestos de mango biche que buscan subir el ticket con un topping premium.",
        "Food trucks y ferias gastronómicas que necesitan un producto vistoso y rápido de servir.",
        "Heladerías y sodas artesanales que quieren mangonadas y vasos escarchados."
      ]
    },
    {
      "heading": "Precios y presentaciones en Bogotá",
      "body": "Somos fabricantes, así que el precio es directo de fábrica y es el mismo en todo el país: $35.000 por 500 ml y $55.000 por 1 litro, tanto en sirope como en salsa. Para pedidos de negocio pregunta por precios al por mayor: te respondemos por WhatsApp con la cotización según volumen."
    }
  ]'::jsonb,
  '[
    {"question": "¿Hacen envíos en Bogotá?", "answer": "Sí. Coordinamos el envío dentro de Bogotá por WhatsApp al confirmar tu pedido, y te indicamos el costo y el tiempo estimado según tu zona."},
    {"question": "¿Atienden negocios en Bogotá?", "answer": "Sí. Trabajamos con bares, fruterías, heladerías y organizadores de eventos. Te asesoramos para escoger entre sirope y salsa según tu carta y te cotizamos por volumen."},
    {"question": "¿Cuál me conviene: sirope o salsa?", "answer": "Si va en bebidas o para escarchar vasos, sirope. Si va sobre fruta, snacks o helado, salsa. Si tu negocio hace ambas cosas, la mayoría arranca con un litro de cada uno."}
  ]'::jsonb,
  'Pedir chamoy en Bogotá',
  'Hola, estoy en Bogotá y quiero pedir chamoy.',
  ARRAY['michelada-con-chamoy', 'mango-con-chamoy-y-tajin'],
  1
),
(
  'ciudad',
  'medellin',
  'Chamoy en Medellín | Sirope y salsa con envío',
  'Compra sirope y salsa de chamoy en Medellín para fruterías, mango biche, mangonadas y micheladas. 500 ml y 1 litro, pedido por WhatsApp.',
  'Chamoy en Medellín: el aliado del mango biche y las mangonadas',
  'Medellín es territorio de fruta: mango biche con sal y limón en cada esquina, salpicón, heladerías de barrio. El chamoy encaja perfecto en esa cultura — le suma el toque agridulce y picosito que convierte un vaso de fruta común en un antojo que se vuelve costumbre. Vendemos sirope y salsa en 500 ml y 1 litro con pedido por WhatsApp.',
  '[
    {
      "heading": "El chamoy en la cultura frutera paisa",
      "body": "Si algo sobra en Medellín son puestos de fruta y heladerías. La salsa de chamoy sobre mango biche es la evolución natural del mango con sal y limón: mismo ritual, más sabor. Y en las heladerías, la mangonada — helado o granizado de mango con chamoy — es de los productos con mejor foto y mejor margen.",
      "items": [
        "Fruterías y carritos de mango biche que quieren diferenciarse.",
        "Heladerías que buscan sumar mangonadas y copas escarchadas.",
        "Bares y terrazas con micheladas y cocteles frutales.",
        "Emprendimientos de snacks: gomitas enchiladas, fresas con chamoy, ceviches de mango."
      ]
    },
    {
      "heading": "Precios y presentaciones en Medellín",
      "body": "Los precios son los mismos en todo el país: $35.000 por 500 ml y $55.000 por 1 litro, en sirope o salsa. Un litro de salsa rinde entre 40 y 60 porciones de fruta, así que el costo por porción queda entre $900 y $1.400. Para volumen de negocio, cotizamos por WhatsApp."
    }
  ]'::jsonb,
  '[
    {"question": "¿Hacen envíos en Medellín y el área metropolitana?", "answer": "Sí. Coordinamos por WhatsApp el envío a Medellín y municipios cercanos como Envigado, Itagüí y Bello, con costo y tiempo según la zona."},
    {"question": "¿Qué producto me sirve para mango biche?", "answer": "La salsa de chamoy: tiene cuerpo, se adhiere a la fruta y aporta color. El sirope es para bebidas y para escarchar vasos."},
    {"question": "¿Venden al por mayor para fruterías?", "answer": "Sí. Escríbenos por WhatsApp con tu volumen aproximado semanal y te cotizamos precios de negocio."}
  ]'::jsonb,
  'Pedir chamoy en Medellín',
  'Hola, estoy en Medellín y quiero pedir chamoy.',
  ARRAY['mango-con-chamoy-y-tajin', 'mangonada'],
  2
),
(
  'ciudad',
  'cali',
  'Chamoy en Cali | Sirope y salsa con envío',
  'Compra sirope y salsa de chamoy en Cali para cholados, raspados, micheladas y fruterías. Presentaciones de 500 ml y 1 litro, pedido por WhatsApp.',
  'Chamoy en Cali: del cholado al vaso michelero',
  'Cali ya domina el arte del hielo raspado con fruta: el cholado es prueba de eso. El chamoy entra ahí como en casa — un chorro de sirope sobre el raspado, salsa en el borde del vaso o sobre el mango biche, y el resultado es ese contraste dulce, ácido y picosito que engancha. Vendemos sirope y salsa en 500 ml y 1 litro con pedido por WhatsApp.',
  '[
    {
      "heading": "El chamoy le queda perfecto a Cali",
      "body": "Pocas ciudades tienen una cultura de bebidas frías y fruta tan fuerte: cholados, raspados, champús, jugos naturales, salpicón. El chamoy no reemplaza nada de eso — lo potencia. Un cholado con borde de chamoy o un raspado con sirope encima es un producto nuevo sin cambiar la operación del negocio.",
      "items": [
        "Cholaterías y raspaderos que quieren una versión premium de su producto.",
        "Fruterías con mango biche, grosellas y mezclas de fruta verde.",
        "Bares y estaderos con micheladas para el calor caleño.",
        "Negocios de eventos y ferias que necesitan productos llamativos."
      ]
    },
    {
      "heading": "Precios y presentaciones en Cali",
      "body": "Mismos precios en todo el país: $35.000 por 500 ml y $55.000 por 1 litro, en sirope o salsa. Un litro de sirope alcanza para escarchar entre 50 y 70 vasos. Para pedidos de negocio, cotizamos por volumen por WhatsApp."
    }
  ]'::jsonb,
  '[
    {"question": "¿Hacen envíos en Cali?", "answer": "Sí. Al confirmar tu pedido por WhatsApp coordinamos el envío dentro de Cali y te indicamos costo y tiempo según tu zona."},
    {"question": "¿El chamoy sirve para cholados y raspados?", "answer": "Sí, es de sus mejores usos: el sirope se integra con el hielo raspado y la fruta, y la salsa funciona para el borde del vaso o como topping final."},
    {"question": "¿Puedo pedir sirope y salsa en un mismo envío?", "answer": "Claro. De hecho, para negocios de bebidas y fruta recomendamos empezar con un litro de cada uno para cubrir ambos usos."}
  ]'::jsonb,
  'Pedir chamoy en Cali',
  'Hola, estoy en Cali y quiero pedir chamoy.',
  ARRAY['michelada-con-chamoy', 'mangonada'],
  3
),
(
  'negocio',
  'bares',
  'Chamoy para bares | Micheladas que suben el ticket',
  'Sirope de chamoy para bares y micheladas: 1 litro escarcha 50-70 vasos, menos de $1.100 por michelada. Asesoría y precios al por mayor por WhatsApp.',
  'Chamoy para bares: micheladas que se venden solas',
  'La michelada con borde de chamoy es de los pocos productos de barra que sube el precio de venta sin subir casi nada el costo: un litro de sirope ($55.000) escarcha entre 50 y 70 vasos, es decir, entre $800 y $1.100 por michelada en el ingrediente que la hace diferente. El resto es cerveza que ya tienes en la nevera.',
  '[
    {
      "heading": "La cuenta que le importa a tu barra",
      "body": "Una michelada sencilla y una michelada con borde de chamoy y sal de chile se preparan casi igual, pero se venden distinto: la segunda es un producto premium con foto. Con el rendimiento confirmado del sirope (50 a 70 vasos por litro), el chamoy agrega alrededor de mil pesos al costo del vaso. Ese margen extra queda para el negocio.",
      "items": [
        "Michelada clásica: borde de sirope de chamoy + sal de chile, limón, hielo y cerveza.",
        "Michelada cubana: la misma base más salsa picante y salsa inglesa.",
        "Versión sin alcohol: soda de toronja o agua con gas, mismo escarchado.",
        "Remate de gomitas enchiladas en el borde para presentación de bar michelero."
      ]
    },
    {
      "heading": "Sirope o salsa: qué va en la barra",
      "body": "Para escarchar vasos y saborizar bebidas usa el sirope: fluye, se adhiere parejo y es rápido en servicio. La salsa espesa entra si además vendes snacks, fruta o quieres un borde con más cuerpo. Muchos bares terminan usando ambos: sirope para el vaso, salsa para los acompañamientos."
    },
    {
      "heading": "Estandariza la porción desde el día uno",
      "body": "El error típico es escarchar a ojo: unos vasos quedan cargados y otros pobres, y el costo se descontrola. Define la dosis (dos pasadas por el plato de sirope, una por la sal de chile) y entrena a la barra con esa medida. Si quieres, te ayudamos a armar la ficha de porción para tu carta."
    }
  ]'::jsonb,
  '[
    {"question": "¿Cuánto rinde un litro de sirope de chamoy?", "answer": "Entre 50 y 70 vasos escarchados, según el tamaño del vaso y la dosis. Eso deja el costo del chamoy entre $800 y $1.100 por michelada."},
    {"question": "¿Manejan precios al por mayor para bares?", "answer": "Sí. Somos fabricantes, así que el precio de negocio sale directo de fábrica, sin intermediarios. Escríbenos por WhatsApp con tu consumo estimado semanal y te cotizamos."},
    {"question": "¿El chamoy necesita refrigeración en la barra?", "answer": "Te enviamos las indicaciones de manejo y conservación con tu pedido, según el producto y el ritmo de uso de tu barra."}
  ]'::jsonb,
  'Cotizar para mi bar',
  'Hola, tengo un bar y quiero cotizar chamoy para micheladas.',
  ARRAY['michelada-con-chamoy', 'gomitas-enchiladas-con-chamoy'],
  1
),
(
  'negocio',
  'fruteras',
  'Chamoy para fruterías | El topping que sube el ticket',
  'Salsa de chamoy para fruterías: 1 litro rinde 40-60 porciones de fruta. Mango biche, vasos de fruta y toppings premium. Cotización por WhatsApp.',
  'Chamoy para fruterías: el topping que sube el ticket promedio',
  'El mango biche con sal y limón ya lo vende todo el mundo. El mango biche con chamoy y sal de chile es otro producto: se ve distinto, sabe distinto y se puede cobrar distinto. Un litro de salsa ($55.000) rinde entre 40 y 60 porciones, así que el topping cuesta entre $900 y $1.400 por porción.',
  '[
    {
      "heading": "La matemática del topping premium",
      "body": "Si el adicional de chamoy se cobra como extra — por ejemplo a $1.500 o $2.000 sobre el precio del vaso de fruta — el producto se paga solo y deja margen desde la primera porción. Y el efecto vitrina cuenta: un vaso con el rojo del chamoy escurriendo vende los siguientes.",
      "items": [
        "Mango biche con chamoy y sal de chile: el clásico que más rota.",
        "Vasos de fruta picada (sandía, piña, pepino) con chamoy encima.",
        "Fresas con chamoy: presentación tipo postre.",
        "Gomitas enchiladas como producto de impulso en la vitrina."
      ]
    },
    {
      "heading": "Salsa para la fruta, sirope si vendes bebidas",
      "body": "Para fruta usa la salsa: tiene cuerpo, se adhiere y no escurre de inmediato. Si tu frutería también vende jugos, granizados o sodas, el sirope te abre esa segunda línea con el mismo sabor. El combo típico de frutería es un litro de salsa para empezar y el sirope cuando arranca la línea de bebidas."
    },
    {
      "heading": "Empieza pequeño, mide la rotación",
      "body": "No necesitas montar una carta nueva: agrega el chamoy como adicional opcional en tus productos actuales, mide cuántos clientes lo piden durante un par de semanas y a partir de ahí decides si pasa a producto fijo. Te acompañamos con recetas y porciones sugeridas."
    }
  ]'::jsonb,
  '[
    {"question": "¿Cuánto rinde un litro de salsa de chamoy en fruta?", "answer": "Entre 40 y 60 porciones según la generosidad del topping. El costo queda entre $900 y $1.400 por porción."},
    {"question": "¿Qué frutas combinan mejor con chamoy?", "answer": "Mango biche es el rey, pero también funciona con sandía, piña, pepino, fresas, grosellas y mezclas de fruta verde con limón."},
    {"question": "¿Tienen precios para compra recurrente?", "answer": "Sí. Fabricamos el producto nosotros mismos, así que podemos garantizar reposición constante y precio de fábrica para compra recurrente. Escríbenos por WhatsApp y te armamos precio de negocio."}
  ]'::jsonb,
  'Cotizar para mi frutería',
  'Hola, tengo una frutería y quiero cotizar salsa de chamoy.',
  ARRAY['mango-con-chamoy-y-tajin', 'gomitas-enchiladas-con-chamoy'],
  2
),
(
  'negocio',
  'heladerias',
  'Chamoy para heladerías | Mangonadas y copas escarchadas',
  'Chamoy para heladerías: mangonadas, chamoyadas, copas escarchadas y toppings. Sirope y salsa en 500 ml y 1 litro. Cotización por WhatsApp.',
  'Chamoy para heladerías: la mangonada que falta en tu vitrina',
  'La mangonada — granizado o helado de mango con chamoy, sal de chile y mango fresco — es de los productos de heladería con mejor relación foto-precio-costo. Se prepara con lo que ya tienes (mango, hielo, helado) más el chamoy que le da identidad. Vendemos el sirope y la salsa en 500 ml y 1 litro.',
  '[
    {
      "heading": "Productos que puedes montar esta semana",
      "body": "Ninguno de estos requiere maquinaria nueva ni cambiar tu operación: son combinaciones de tu vitrina actual con chamoy encima, adentro o en el borde.",
      "items": [
        "Mangonada clásica: granizado de mango + sirope de chamoy + mango picado + sal de chile.",
        "Copa escarchada: cualquier helado servido en copa con borde de chamoy.",
        "Paletas o helados con chorro de salsa de chamoy y gomitas enchiladas.",
        "Fresas con crema y chamoy: el contraste dulce-picosito en un clásico."
      ]
    },
    {
      "heading": "Sirope y salsa trabajan en equipo",
      "body": "En heladería los dos formatos tienen rol: el sirope se mezcla con el granizado y escarcha las copas; la salsa corona el helado y se queda donde la sirves. El combo de un litro de cada uno cubre toda la carta de arriba y rinde decenas de porciones de cada tipo."
    },
    {
      "heading": "El costo por porción es bajo",
      "body": "Con los rendimientos confirmados — 50 a 70 vasos escarchados por litro de sirope, 40 a 60 porciones por litro de salsa — el chamoy agrega entre $800 y $1.400 al costo de una copa que se vende como producto premium. La mangonada suele ser de los ítems con mejor margen de la vitrina."
    }
  ]'::jsonb,
  '[
    {"question": "¿Qué necesito para hacer mangonadas?", "answer": "Mango (fresco o pulpa), hielo o helado de mango, sirope de chamoy y sal de chile. Con un litro de sirope preparas decenas de mangonadas."},
    {"question": "¿El chamoy se lleva bien con el helado de crema?", "answer": "Sí. El contraste agridulce-picosito funciona especialmente bien con helados dulces y cremosos: vainilla, mango, coco y frutos rojos."},
    {"question": "¿Venden al por mayor para heladerías?", "answer": "Sí. Somos fabricantes en Colombia: precio directo de fábrica y producción constante para que tu vitrina nunca se quede sin chamoy. Cuéntanos por WhatsApp cuántas porciones vendes por semana y te cotizamos."}
  ]'::jsonb,
  'Cotizar para mi heladería',
  'Hola, tengo una heladería y quiero cotizar chamoy para mangonadas.',
  ARRAY['mangonada', 'como-hacer-chamoy-casero'],
  3
)
ON CONFLICT (kind, slug) DO UPDATE SET
  title = EXCLUDED.title,
  meta_description = EXCLUDED.meta_description,
  h1 = EXCLUDED.h1,
  intro = EXCLUDED.intro,
  sections = EXCLUDED.sections,
  faqs = EXCLUDED.faqs,
  cta_label = EXCLUDED.cta_label,
  whatsapp_message = EXCLUDED.whatsapp_message,
  related_recipes = EXCLUDED.related_recipes,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();
