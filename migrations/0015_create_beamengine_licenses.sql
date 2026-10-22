-- BeamEngine licence keys. The site also creates these on first use (lib/beamengine-license.ts ensureSchema),
-- so running this migration is optional.
CREATE TABLE IF NOT EXISTS beam_licenses (
  key TEXT PRIMARY KEY,
  owner TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  plan TEXT NOT NULL DEFAULT 'lifetime',   -- lifetime | subscription | trial
  seats INTEGER NOT NULL DEFAULT 1,        -- computers signed in at the same time
  expires INTEGER,                         -- ms since 1970, NULL = never
  revoked INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  created INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS beam_sessions (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  machine TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  created INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS beam_sessions_key ON beam_sessions(key);
CREATE TABLE IF NOT EXISTS beam_ended (id TEXT PRIMARY KEY, reason TEXT NOT NULL, at INTEGER NOT NULL);
-- Server-made secrets (admin token key, licence signing key).
CREATE TABLE IF NOT EXISTS app_secrets (name TEXT PRIMARY KEY, value TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
