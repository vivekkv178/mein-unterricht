import pool from "../config/db";

// Function to execute a query
const executeQuery = async (
  query: string,
  values: any[] = []
): Promise<any[]> => {
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};

export default executeQuery;
