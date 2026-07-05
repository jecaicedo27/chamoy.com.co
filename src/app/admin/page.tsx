import Link from "next/link";
import { AdminNav } from "@/components/AdminNav";
import { eventTypeCounts, leadStatusCounts, listLeads, topEventPaths, whatsappClicksByDay } from "@/lib/admin";
import { requireAdmin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const EVENT_LABELS: Record<string, string> = {
  whatsapp_click: "Clicks a WhatsApp",
  lead_submit: "Formularios enviados",
  calc_use: "Usos de la calculadora",
  cta_click: "Clicks en CTAs"
};

export default async function AdminDashboard() {
  await requireAdmin();

  const [leads, statusCounts, events30, clicksByDay, topPaths] = await Promise.all([
    listLeads(),
    leadStatusCounts(),
    eventTypeCounts(30),
    whatsappClicksByDay(14),
    topEventPaths(30)
  ]);

  const newLeads = statusCounts.find((row) => row.status === "new")?.total ?? "0";
  const recentLeads = leads.slice(0, 5);

  return (
    <main className="admin-main">
      <AdminNav current="dashboard" />

      <div className="admin-grid">
        <section className="card card-pad">
          <h2>Leads</h2>
          <p className="admin-big">{newLeads}</p>
          <p>leads nuevos sin contactar</p>
          <p>
            {statusCounts.map((row) => `${row.status}: ${row.total}`).join(" · ") || "Sin leads todavía"}
          </p>
          <Link className="btn btn-primary btn-compact" href="/admin/leads/">
            Gestionar leads
          </Link>
        </section>

        <section className="card card-pad">
          <h2>Interacción (30 días)</h2>
          {events30.length ? (
            <table className="admin-table">
              <tbody>
                {events30.map((row) => (
                  <tr key={row.type}>
                    <td>{EVENT_LABELS[row.type] || row.type}</td>
                    <td className="admin-num">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aún no hay eventos registrados. Cada click a WhatsApp y cada formulario quedan aquí.</p>
          )}
        </section>

        <section className="card card-pad">
          <h2>Clicks a WhatsApp por día (14 días)</h2>
          {clicksByDay.length ? (
            <table className="admin-table">
              <tbody>
                {clicksByDay.map((row) => (
                  <tr key={String(row.day)}>
                    <td>{new Date(row.day).toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}</td>
                    <td className="admin-num">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Sin clicks registrados aún.</p>
          )}
        </section>

        <section className="card card-pad">
          <h2>Páginas que más convierten (30 días)</h2>
          {topPaths.length ? (
            <table className="admin-table">
              <tbody>
                {topPaths.map((row) => (
                  <tr key={row.path}>
                    <td>{row.path}</td>
                    <td className="admin-num">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Sin datos todavía.</p>
          )}
        </section>
      </div>

      <section className="card card-pad" style={{ marginTop: 20 }}>
        <h2>Últimos leads</h2>
        {recentLeads.length ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>WhatsApp</th>
                <th>Ciudad</th>
                <th>Negocio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}</td>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.city || "—"}</td>
                  <td>{lead.business_type || "—"}</td>
                  <td>{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Sin leads todavía.</p>
        )}
      </section>
    </main>
  );
}
