-- migrations/0001_clients.sql
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  phone TEXT,
  token TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);