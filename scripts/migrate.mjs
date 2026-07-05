import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import pg from "pg";

const { Client } = pg;

function loadEnv() {
  const file = path.resolve(".env.local");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    process.env[key] ??= raw.replace(/^["']|["']$/g, "");
  }
}

loadEnv();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required. Copy .env.example to .env.local first.");
  process.exit(1);
}

const includeSeed = process.argv.includes("--seed");
const dbDir = path.resolve("db");
const files = fs
  .readdirSync(dbDir)
  .filter((file) => file.endsWith(".sql"))
  .filter((file) => includeSeed || !file.includes("seed"))
  .sort();

const client = new Client({ connectionString: databaseUrl });

try {
  await client.connect();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(dbDir, file), "utf8");
    await client.query(sql);
    console.log(`applied ${file}`);
  }
} finally {
  await client.end();
}
