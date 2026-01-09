-- migrations/0013_create_materials_table.sql
CREATE TABLE IF NOT EXISTS materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,           -- e.g. "PLA"
  long_name TEXT,               -- e.g. "Polylactic Acid"
  image TEXT,                   -- Main card image
  tag TEXT,                     -- e.g. "Standard Material" (Material Title)
  short_description TEXT,       -- For the listing card
  description_2 TEXT,           -- For the detail page header

  -- Progress Bar Stats (JSON): { strength: 80, stiffness: 70, durability: 60, heat_resistance: 40, chemical_resistance: 50, surface_quality: 90 }
  properties TEXT, 

  -- Technical Specifications (JSON): { density, tensile_strength, elongation, flexural_strength, temp_deflection, hardness, print_temp, bed_temp }
  specifications TEXT,

  -- Typical Applications (JSON): { description: "...", list: ["App 1", "App 2"], image: "..." }
  applications TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
