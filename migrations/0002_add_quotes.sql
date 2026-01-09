CREATE TABLE quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  material TEXT,
  infill TEXT,
  supports TEXT,
  print_time TEXT,
  weight TEXT,
  cost TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);