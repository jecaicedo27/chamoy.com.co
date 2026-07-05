import { AdminNav } from "@/components/AdminNav";
import { listLeads } from "@/lib/admin";
import { requireAdmin } from "@/lib/adminAuth";
import { leadDeleteAction, leadStatusAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await listLeads();

  return (
    <main className="admin-main">
      <AdminNav current="leads" />

      <section className="card card-pad">
        <h1>Leads ({leads.length})</h1>
        <p>
          Cada fila es una persona que dejó sus datos pidiendo asesoría. Cambia el estado al
          contactarla para no perder seguimiento.
        </p>

        {leads.length ? (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>WhatsApp</th>
                  <th>Ciudad</th>
                  <th>Negocio</th>
                  <th>Necesita</th>
                  <th>Origen</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      {new Date(lead.created_at).toLocaleDateString("es-CO", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td>{lead.name}</td>
                    <td>
                      <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                        {lead.phone}
                      </a>
                    </td>
                    <td>{lead.city || "—"}</td>
                    <td>{lead.business_type || "—"}</td>
                    <td className="admin-need">{lead.need}</td>
                    <td>{lead.source_path || "—"}</td>
                    <td>
                      <form action={leadStatusAction} className="admin-inline-form">
                        <input type="hidden" name="id" value={lead.id} />
                        <select name="status" defaultValue={lead.status}>
                          <option value="new">Nuevo</option>
                          <option value="contacted">Contactado</option>
                          <option value="closed">Cerrado</option>
                          <option value="discarded">Descartado</option>
                        </select>
                        <button className="btn btn-secondary btn-compact" type="submit">
                          Guardar
                        </button>
                      </form>
                    </td>
                    <td>
                      <form action={leadDeleteAction}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button className="btn btn-danger btn-compact" type="submit">
                          Borrar
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Sin leads todavía.</p>
        )}
      </section>
    </main>
  );
}
