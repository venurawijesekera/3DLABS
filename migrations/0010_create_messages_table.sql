-- Migration number: 0010 	 2025-12-26T13:30:00.000Z
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    sender TEXT NOT NULL CHECK (sender IN ('admin', 'client')),
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_messages_client_id ON messages(client_id);
