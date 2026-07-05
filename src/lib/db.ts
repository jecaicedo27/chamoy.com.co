import pg, { type QueryResultRow } from "pg";

const { Pool } = pg;

type GlobalWithPool = typeof globalThis & {
  chamoyPool?: pg.Pool;
};

const globalForPg = globalThis as GlobalWithPool;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  globalForPg.chamoyPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 8,
    idleTimeoutMillis: 30_000
  });

  return globalForPg.chamoyPool;
}

export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  const result = await getPool().query<T>(text, params);
  return result.rows;
}
