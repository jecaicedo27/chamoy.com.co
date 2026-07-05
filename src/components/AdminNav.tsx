import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export function AdminNav({ current }: { current: string }) {
  const links = [
    { href: "/admin/", label: "Resumen", key: "dashboard" },
    { href: "/admin/pedidos/", label: "Pedidos", key: "pedidos" },
    { href: "/admin/leads/", label: "Leads", key: "leads" },
    { href: "/admin/faqs/", label: "FAQs", key: "faqs" },
    { href: "/admin/productos/", label: "Precios", key: "productos" }
  ];

  return (
    <nav className="admin-nav" aria-label="Navegación de administración">
      <strong>Chamoy Admin</strong>
      <div className="admin-nav-links">
        {links.map((link) => (
          <Link href={link.href} key={link.key} className={current === link.key ? "active" : undefined}>
            {link.label}
          </Link>
        ))}
      </div>
      <form action={logoutAction}>
        <button className="btn btn-secondary btn-compact" type="submit">
          Salir
        </button>
      </form>
    </nav>
  );
}
