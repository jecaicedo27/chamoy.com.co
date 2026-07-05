import { AdminNav } from "@/components/AdminNav";
import { listFaqsAdmin } from "@/lib/admin";
import { requireAdmin } from "@/lib/adminAuth";
import { faqSaveAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await requireAdmin();
  const faqs = await listFaqsAdmin();

  return (
    <main className="admin-main">
      <AdminNav current="faqs" />

      <section className="card card-pad">
        <h1>FAQs ({faqs.length})</h1>
        <p>
          Estas preguntas alimentan la página /faq/, la home y las páginas por sección. El campo
          &quot;página&quot; controla dónde aparece: general, comprar, asesoria, recetas.
        </p>
      </section>

      <section className="card card-pad" style={{ marginTop: 20 }}>
        <h2>Nueva FAQ</h2>
        <form action={faqSaveAction} className="admin-faq-form">
          <label>
            Pregunta
            <input name="question" required minLength={5} />
          </label>
          <label>
            Respuesta
            <textarea name="answer" required minLength={5} rows={3} />
          </label>
          <div className="admin-faq-meta">
            <label>
              Página
              <input name="page" defaultValue="general" />
            </label>
            <label>
              Orden
              <input name="sortOrder" type="number" defaultValue={0} />
            </label>
            <label className="admin-check">
              <input name="active" type="checkbox" defaultChecked /> Activa
            </label>
          </div>
          <button className="btn btn-primary btn-compact" type="submit">
            Crear FAQ
          </button>
        </form>
      </section>

      {faqs.map((faq) => (
        <section className="card card-pad" style={{ marginTop: 20 }} key={faq.id}>
          <form action={faqSaveAction} className="admin-faq-form">
            <input type="hidden" name="id" value={faq.id} />
            <label>
              Pregunta
              <input name="question" defaultValue={faq.question} required minLength={5} />
            </label>
            <label>
              Respuesta
              <textarea name="answer" defaultValue={faq.answer} required minLength={5} rows={3} />
            </label>
            <div className="admin-faq-meta">
              <label>
                Página
                <input name="page" defaultValue={faq.page} />
              </label>
              <label>
                Orden
                <input name="sortOrder" type="number" defaultValue={faq.sort_order} />
              </label>
              <label className="admin-check">
                <input name="active" type="checkbox" defaultChecked={faq.active} /> Activa
              </label>
            </div>
            <button className="btn btn-secondary btn-compact" type="submit">
              Guardar cambios
            </button>
          </form>
        </section>
      ))}
    </main>
  );
}
