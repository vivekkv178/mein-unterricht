/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255),
  plot TEXT,
  year INT,
  poster_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS errors (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,  -- 'fetch_api_error' or 'db_insert_error'
  message TEXT NOT NULL,
  page_number INT,  -- Relevant for fetch API errors
  movie_id VARCHAR(255),  -- Relevant for DB insert errors
  created_at TIMESTAMP DEFAULT NOW()
);