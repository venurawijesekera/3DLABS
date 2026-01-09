ALTER TABLE quotes ADD COLUMN status_order TEXT DEFAULT 'Pending';
ALTER TABLE quotes ADD COLUMN status_payment TEXT DEFAULT 'Unpaid';
ALTER TABLE quotes ADD COLUMN status_delivery TEXT DEFAULT 'Processing';