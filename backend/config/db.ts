import { Pool } from "pg";
import { ENV_CONFIG } from "./env-config";
import logger from "../logger";

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: ENV_CONFIG.DATABASE_URL,
});

// Test database connection
pool
  .connect()
  .then(() => logger.info("🟢 Connected to PostgreSQL"))
  .catch((err: Error) => logger.error("🔴 Error connecting to database:", err));

export default pool;
