import { whatsappNumber } from "./env";

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  buy: "Hola, quiero comprar sirope o salsa de chamoy en Colombia.",
  advice:
    "Hola, quiero asesoria para usar chamoy en mi negocio. Esta es mi ciudad y tipo de negocio:",
  recipes: "Hola, quiero recetas e ideas para vender productos con chamoy."
};
