"use client";

import { useMemo, useState } from "react";
import { track } from "@/lib/track";
import { whatsappUrl } from "@/lib/whatsapp";

const LITER_PRICE = 55000;
const HALF_PRICE = 35000;

const USES = {
  micheladas: {
    label: "Micheladas y vasos escarchados",
    product: "Sirope de chamoy",
    unit: "vasos",
    perLiterMin: 50,
    perLiterMax: 70
  },
  fruta: {
    label: "Fruta con chamoy (mango biche, vasos de fruta)",
    product: "Salsa de chamoy",
    unit: "porciones",
    perLiterMin: 40,
    perLiterMax: 60
  }
} as const;

type UseKey = keyof typeof USES;

function formatCop(value: number) {
  return `$${Math.round(value).toLocaleString("es-CO")}`;
}

export function PortionCalculator() {
  const [useKey, setUseKey] = useState<UseKey>("micheladas");
  const [weekly, setWeekly] = useState(50);

  const result = useMemo(() => {
    const use = USES[useKey];
    const monthly = Math.max(1, Math.round(weekly * 4.33));
    const perLiterMid = (use.perLiterMin + use.perLiterMax) / 2;
    const litersNeeded = monthly / perLiterMid;

    const liters = Math.floor(litersNeeded);
    const remainder = litersNeeded - liters;
    const halves = remainder <= 0.01 ? 0 : remainder <= 0.5 ? 1 : 0;
    const fullLiters = halves === 1 ? liters : Math.ceil(litersNeeded);

    const monthlyCost = fullLiters * LITER_PRICE + halves * HALF_PRICE;
    const costPerPortionMin = LITER_PRICE / use.perLiterMax;
    const costPerPortionMax = LITER_PRICE / use.perLiterMin;

    const order =
      fullLiters === 0
        ? "1 botella de 500 ml"
        : `${fullLiters} ${fullLiters === 1 ? "litro" : "litros"}${halves ? " + 1 botella de 500 ml" : ""}`;

    return { use, monthly, order, monthlyCost, costPerPortionMin, costPerPortionMax };
  }, [useKey, weekly]);

  const whatsappMessage = `Hola, hice el cálculo en la web: vendo ~${weekly} ${result.use.unit} por semana de ${result.use.label.toLowerCase()} y me sugiere ${result.order} al mes. Quiero cotizar.`;

  return (
    <div className="card card-pad calculator" id="calculadora">
      <p className="section-kicker">Calculadora de porciones</p>
      <h3>¿Cuánto chamoy necesita tu negocio?</h3>
      <p>
        Basado en rendimientos reales: un litro de sirope escarcha 50-70 vasos y un litro de salsa
        cubre 40-60 porciones de fruta.
      </p>

      <label>
        ¿Qué vendes?
        <select value={useKey} onChange={(event) => setUseKey(event.target.value as UseKey)}>
          {Object.entries(USES).map(([key, use]) => (
            <option value={key} key={key}>
              {use.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        {result.use.unit === "vasos" ? "Vasos" : "Porciones"} que vendes por semana: <strong>{weekly}</strong>
        <input
          type="range"
          min={10}
          max={500}
          step={10}
          value={weekly}
          onChange={(event) => setWeekly(Number(event.target.value))}
        />
      </label>

      <div className="calc-result" aria-live="polite">
        <div>
          <span className="calc-label">Producto</span>
          <strong>{result.use.product}</strong>
        </div>
        <div>
          <span className="calc-label">Pedido mensual sugerido</span>
          <strong>{result.order}</strong>
        </div>
        <div>
          <span className="calc-label">Inversión mensual aprox.</span>
          <strong>{formatCop(result.monthlyCost)}</strong>
        </div>
        <div>
          <span className="calc-label">Costo por {result.use.unit === "vasos" ? "vaso" : "porción"}</span>
          <strong>
            {formatCop(result.costPerPortionMin)} – {formatCop(result.costPerPortionMax)}
          </strong>
        </div>
      </div>

      <a
        className="btn btn-primary"
        href={whatsappUrl(whatsappMessage)}
        data-cta="calculadora"
        onClick={() => track("calc_use", { use: useKey, weekly })}
      >
        Cotizar este pedido por WhatsApp
      </a>
      <p className="calc-note">
        Cálculo estimado para orientarte. El consumo real depende de tu dosis por porción — en la
        asesoría la definimos contigo.
      </p>
    </div>
  );
}
