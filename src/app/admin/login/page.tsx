import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { loginAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin/");
  const { error } = await searchParams;

  return (
    <main className="admin-main">
      <form className="card card-pad admin-login" action={loginAction}>
        <h1>Panel Chamoy Colombia</h1>
        <p>Acceso privado para gestión de leads, contenido y precios.</p>
        {error ? <p className="form-message error">Contraseña incorrecta.</p> : null}
        <label>
          Contraseña
          <input type="password" name="password" required autoFocus autoComplete="current-password" />
        </label>
        <button className="btn btn-primary" type="submit">
          Entrar
        </button>
      </form>
    </main>
  );
}
