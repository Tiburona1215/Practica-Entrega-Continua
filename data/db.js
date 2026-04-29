import pkg from "pg";
const { Pool } = pkg;

console.log("DATABASE_URL definida:", process.env.DATABASE_URL ? "SÍ ✅" : "NO ❌");

if (!process.env.DATABASE_URL) {
  console.error("FATAL: DATABASE_URL no está definida.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

export default pool;