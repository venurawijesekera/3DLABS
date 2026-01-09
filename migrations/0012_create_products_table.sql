-- migrations/0012_create_products_table.sql
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  original_price REAL,
  category TEXT,
  images TEXT, -- JSON array of image URLs (up to 10)
  labels TEXT, -- comma-separated or JSON list for SEO search
  brand_name TEXT,
  material TEXT,
  stock_status TEXT DEFAULT 'In Stock',
  warranty TEXT,
  shipping_delivery TEXT,
  has_variants INTEGER DEFAULT 0, -- 0 for no, 1 for yes
  variants TEXT, -- JSON array of variants: [{name, color, price, stock}]
  rating REAL DEFAULT 5.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
