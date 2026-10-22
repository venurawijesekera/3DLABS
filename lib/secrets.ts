// Server-side secrets kept in D1 (made on first use), so nothing secret lives in this public repository.
type DB = any;

export async function getSecret(db: DB, name: string, make: () => Promise<string>): Promise<string> {
    await db.prepare('CREATE TABLE IF NOT EXISTS app_secrets (name TEXT PRIMARY KEY, value TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)').run();
    const row = await db.prepare('SELECT value FROM app_secrets WHERE name = ?').bind(name).first();
    if (row) return row.value as string;
    const value = await make();
    // Two requests racing here: keep whichever was stored first.
    await db.prepare('INSERT OR IGNORE INTO app_secrets (name, value) VALUES (?, ?)').bind(name, value).run();
    const stored = await db.prepare('SELECT value FROM app_secrets WHERE name = ?').bind(name).first();
    return stored.value as string;
}

export function b64url(bytes: Uint8Array): string {
    let s = '';
    for (const b of bytes) s += String.fromCharCode(b);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function unb64url(s: string): Uint8Array<ArrayBuffer> {
    const t = s.replace(/-/g, '+').replace(/_/g, '/');
    const bin = atob(t + '='.repeat((4 - (t.length % 4)) % 4));
    const out = new Uint8Array(new ArrayBuffer(bin.length));
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
}
