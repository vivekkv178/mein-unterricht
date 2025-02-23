CREATE USER mein_user WITH PASSWORD 'mein_password';
CREATE DATABASE mein_db;
\c mein_db;
GRANT ALL PRIVILEGES ON DATABASE mein_db TO mein_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO mein_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mein_user;
GRANT USAGE ON SCHEMA public TO mein_user;
GRANT CREATE ON SCHEMA public TO mein_user;