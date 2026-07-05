import { AdminNav } from "@/components/AdminNav";
import { listProductsAdmin } from "@/lib/admin";
import { requireAdmin } from "@/lib/adminAuth";
import { productPricingAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  await requireAdmin();
  const products = await listProductsAdmin();

  return (
    <main className="admin-main">
      <AdminNav current="productos" />

      <section className="card card-pad">
        <h1>Precios y presentaciones</h1>
        <p>
          Cambiar un precio aquí lo actualiza en toda la web: páginas de producto, comprar,
          calculadora de la asesoría y datos estructurados para Google.
        </p>
      </section>

      {products.map((product) => (
        <section className="card card-pad" style={{ marginTop: 20 }} key={product.slug}>
          <h2>{product.name}</h2>
          <form action={productPricingAction} className="admin-faq-form">
            <input type="hidden" name="slug" value={product.slug} />
            <div className="admin-faq-meta">
              {product.presentations.map((presentation, index) => (
                <label key={presentation.size}>
                  {presentation.size} (COP)
                  <input
                    name={`price_${index}`}
                    type="number"
                    min={1000}
                    step={500}
                    defaultValue={presentation.price_cop}
                  />
                </label>
              ))}
            </div>
            <label>
              Nota de precio (opcional, ej. &quot;Precios al por mayor por WhatsApp&quot;)
              <input name="priceNote" defaultValue={product.price_note ?? ""} />
            </label>
            <button className="btn btn-secondary btn-compact" type="submit">
              Guardar precios
            </button>
          </form>
        </section>
      ))}
    </main>
  );
}
