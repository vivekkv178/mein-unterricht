import { Pool } from "pg";
import { ENV_CONFIG } from "./env-config";

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: ENV_CONFIG.DATABASE_URL,
});

// Test database connection
pool
  .connect()
  .then(() => console.log("🟢 Connected to Supabase PostgreSQL"))
  .catch((err: Error) =>
    console.error("🔴 Error connecting to database:", err)
  );

export default pool;
