ALTER TABLE products ADD COLUMN images TEXT;
ALTER TABLE products ADD COLUMN labels TEXT;
ALTER TABLE products ADD COLUMN brand_name TEXT;
ALTER TABLE products ADD COLUMN material TEXT;
ALTER TABLE products ADD COLUMN warranty TEXT;
ALTER TABLE products ADD COLUMN shipping_delivery TEXT;
ALTER TABLE products ADD COLUMN has_variants INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN variants TEXT;
