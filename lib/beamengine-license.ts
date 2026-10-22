// BeamEngine licence keys (TECHNOTRONIC FUTURISTICS laser software), served from this site.
// The app activates a key, checks in every few minutes and gets back a token signed with an Ed25519 key that only
// this server holds; the app checks it with the matching public key built into it.
// When a key is over its computer limit, the computer seen least recently is signed out.
import { b64url, getSecret, unb64url } from './secrets';

export interface LicensePayload {
    key: string; machine: string; session: string; owner: string;
    plan: 'lifetime' | 'subscription' | 'trial'; seats: number;
    issued: number; validUntil: number; expires: number | null;
}
interface LicenseRow {
    key: string; owner: string; email: string; plan: LicensePayload['plan']; seats: number;
    expires: number | null; revoked: number; notes: string; created: number;
}
interface SessionRow { id: string; key: string; machine: string; name: string; created: number; last_seen: number }

/** Days the app keeps working without reaching this server. */
const GRACE_DAYS = 7;
const PLANS = ['lifetime', 'subscription', 'trial'];

const SCHEMA = [
    `CREATE TABLE IF NOT EXISTS beam_licenses (key TEXT PRIMARY KEY, owner TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '',
      plan TEXT NOT NULL DEFAULT 'lifetime', seats INTEGER NOT NULL DEFAULT 1, expires INTEGER, revoked INTEGER NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '', created INTEGER NOT NULL)`,
    `CREATE TABLE IF NOT EXISTS beam_sessions (id TEXT PRIMARY KEY, key TEXT NOT NULL, machine TEXT NOT NULL, name TEXT NOT NULL DEFAULT '',
      created INTEGER NOT NULL, last_seen INTEGER NOT NULL)`,
    `CREATE INDEX IF NOT EXISTS beam_sessions_key ON beam_sessions(key)`,
    `CREATE TABLE IF NOT EXISTS beam_ended (id TEXT PRIMARY KEY, reason TEXT NOT NULL, at INTEGER NOT NULL)`,
];
let schemaReady = false;
export async function ensureSchema(db: any): Promise<void> {
    if (schemaReady) return;
    await db.batch(SCHEMA.map((s) => db.prepare(s)));
    schemaReady = true;
}

/** Licence keys look like BEAM-XXXX-XXXX-XXXX-XXXX; accept them typed in any case, with or without dashes. */
export function normaliseKey(input: string): string | null {
    const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const body = raw.startsWith('BEAM') ? raw.slice(4) : raw;
    if (!/^[A-Z0-9]{16}$/.test(body)) return null;
    return `BEAM-${body.match(/.{4}/g)!.join('-')}`;
}

export function newKey(): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const chars = [...crypto.getRandomValues(new Uint8Array(16))].map((b) => alphabet[b % alphabet.length]).join('');
    return normaliseKey(chars)!;
}

async function keyPair(db: any): Promise<{ priv: CryptoKey; pub: string }> {
    const stored = await getSecret(db, 'beamengine_signing_key', async () => {
        const k = (await crypto.subtle.generateKey({ name: 'Ed25519' }, true, ['sign', 'verify'])) as CryptoKeyPair;
        return JSON.stringify({
            priv: b64url(new Uint8Array(await crypto.subtle.exportKey('pkcs8', k.privateKey) as ArrayBuffer)),
            pub: b64url(new Uint8Array(await crypto.subtle.exportKey('raw', k.publicKey) as ArrayBuffer)),
        });
    });
    const { priv, pub } = JSON.parse(stored);
    return { priv: await crypto.subtle.importKey('pkcs8', unb64url(priv), { name: 'Ed25519' }, false, ['sign']), pub };
}

/** The public key to build into BeamEngine. */
export async function publicKey(db: any): Promise<string> {
    return (await keyPair(db)).pub;
}

async function sign(db: any, payload: LicensePayload): Promise<string> {
    const body = new TextEncoder().encode(JSON.stringify(payload));
    const sig = new Uint8Array(await crypto.subtle.sign('Ed25519', (await keyPair(db)).priv, body));
    return `${b64url(body)}.${b64url(sig)}`;
}

/** Reads a token this server issued. Ed25519 signatures are deterministic, so re-signing the body must match. */
async function readToken(db: any, token: unknown): Promise<LicensePayload | null> {
    if (typeof token !== 'string') return null;
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const again = new Uint8Array(await crypto.subtle.sign('Ed25519', (await keyPair(db)).priv, unb64url(body)));
    if (b64url(again) !== sig) return null;
    try { return JSON.parse(new TextDecoder().decode(unb64url(body))); } catch { return null; }
}

function problem(l: LicenseRow | null, now: number): string | null {
    if (!l) return 'That licence key was not found. Check it and try again.';
    if (l.revoked) return 'This licence key has been turned off. Contact TECHNOTRONIC FUTURISTICS.';
    if (l.expires !== null && now >= l.expires) return l.plan === 'trial' ? 'Your trial has ended.' : 'This licence has expired.';
    return null;
}

async function issue(db: any, l: LicenseRow, s: SessionRow, now: number): Promise<string> {
    const grace = GRACE_DAYS * 86_400_000;
    return sign(db, {
        key: l.key, machine: s.machine, session: s.id, owner: l.owner, plan: l.plan, seats: l.seats,
        issued: now, validUntil: l.expires !== null ? Math.min(now + grace, l.expires) : now + grace, expires: l.expires,
    });
}

/** Keeps at most `seats` computers signed in, signing out the ones seen least recently. */
async function enforceSeats(db: any, l: LicenseRow, keep: string, now: number): Promise<void> {
    const { results } = await db.prepare('SELECT * FROM beam_sessions WHERE key = ? ORDER BY last_seen DESC').bind(l.key).all();
    const extra = (results as SessionRow[]).filter((s) => s.id !== keep).slice(Math.max(0, l.seats - 1));
    for (const s of extra) {
        await db.batch([
            db.prepare('DELETE FROM beam_sessions WHERE id = ?').bind(s.id),
            db.prepare('INSERT OR REPLACE INTO beam_ended (id, reason, at) VALUES (?, ?, ?)').bind(s.id, 'This licence was signed in on another computer.', now),
        ]);
    }
}

const getLicense = (db: any, key: string) => db.prepare('SELECT * FROM beam_licenses WHERE key = ?').bind(key).first() as Promise<LicenseRow | null>;

export async function activate(db: any, body: any, now = Date.now()): Promise<{ token?: string; error?: string; status?: number }> {
    const key = normaliseKey(String(body.key ?? ''));
    const machine = String(body.machine ?? '').slice(0, 100);
    if (!key) return { error: 'A licence key looks like BEAM-XXXX-XXXX-XXXX-XXXX.', status: 400 };
    if (!machine) return { error: 'Missing computer id.', status: 400 };
    const l = await getLicense(db, key);
    const p = problem(l, now);
    if (p) return { error: p, status: 403 };
    const name = String(body.name ?? '').slice(0, 100);
    let s: SessionRow | null = await db.prepare('SELECT * FROM beam_sessions WHERE key = ? AND machine = ?').bind(key, machine).first();
    if (s) {
        await db.prepare('UPDATE beam_sessions SET last_seen = ?, name = ? WHERE id = ?').bind(now, name, s.id).run();
    } else {
        s = { id: crypto.randomUUID(), key, machine, name, created: now, last_seen: now };
        await db.prepare('INSERT INTO beam_sessions (id, key, machine, name, created, last_seen) VALUES (?, ?, ?, ?, ?, ?)').bind(s.id, key, machine, name, now, now).run();
    }
    await enforceSeats(db, l!, s.id, now);
    return { token: await issue(db, l!, s, now) };
}

export async function checkin(db: any, body: any, now = Date.now()): Promise<{ token?: string; signedOut?: boolean; reason?: string }> {
    const p = await readToken(db, body.token);
    if (!p) return { signedOut: true, reason: 'The saved licence is not valid. Enter your key again.' };
    const s: SessionRow | null = await db.prepare('SELECT * FROM beam_sessions WHERE id = ?').bind(p.session).first();
    if (!s) {
        const ended = await db.prepare('SELECT reason FROM beam_ended WHERE id = ?').bind(p.session).first();
        return { signedOut: true, reason: ended?.reason ?? 'This computer was signed out of the licence.' };
    }
    const l = await getLicense(db, s.key);
    const pr = problem(l, now);
    if (pr) return { signedOut: true, reason: pr };
    await db.prepare('UPDATE beam_sessions SET last_seen = ? WHERE id = ?').bind(now, s.id).run();
    return { token: await issue(db, l!, s, now) };
}

export async function deactivate(db: any, body: any): Promise<{ ok: true }> {
    const p = await readToken(db, body.token);
    if (p) await db.prepare('DELETE FROM beam_sessions WHERE id = ?').bind(p.session).run();
    return { ok: true };
}

// ---------- admin ----------

export async function listLicenses(db: any) {
    const lic = await db.prepare('SELECT * FROM beam_licenses ORDER BY created DESC').all();
    const ses = await db.prepare('SELECT * FROM beam_sessions ORDER BY last_seen DESC').all();
    return {
        now: Date.now(),
        publicKey: await publicKey(db),
        licenses: (lic.results as LicenseRow[]).map((l) => ({ ...l, revoked: !!l.revoked, sessions: (ses.results as SessionRow[]).filter((s) => s.key === l.key) })),
    };
}

const seatsOf = (v: unknown) => Math.max(1, Math.min(1000, Math.round(Number(v) || 1)));
const expiresOf = (v: unknown) => (v === null || v === undefined || v === '' ? null : Number(v));

export async function createLicense(db: any, b: any) {
    const key = newKey();
    const plan = PLANS.includes(String(b.plan)) ? String(b.plan) : 'lifetime';
    await db.prepare('INSERT INTO beam_licenses (key, owner, email, plan, seats, expires, revoked, notes, created) VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)')
        .bind(key, String(b.owner ?? ''), String(b.email ?? ''), plan, seatsOf(b.seats), expiresOf(b.expires), String(b.notes ?? ''), Date.now()).run();
    return { key };
}

export async function updateLicense(db: any, b: any) {
    const l = await getLicense(db, String(b.key ?? ''));
    if (!l) return { error: 'No such key.' };
    const next: LicenseRow = {
        ...l,
        owner: b.owner !== undefined ? String(b.owner) : l.owner,
        email: b.email !== undefined ? String(b.email) : l.email,
        notes: b.notes !== undefined ? String(b.notes) : l.notes,
        plan: b.plan !== undefined && PLANS.includes(String(b.plan)) ? b.plan : l.plan,
        seats: b.seats !== undefined ? seatsOf(b.seats) : l.seats,
        expires: b.expires !== undefined ? expiresOf(b.expires) : l.expires,
        revoked: b.revoked !== undefined ? (b.revoked ? 1 : 0) : l.revoked,
    };
    await db.prepare('UPDATE beam_licenses SET owner = ?, email = ?, notes = ?, plan = ?, seats = ?, expires = ?, revoked = ? WHERE key = ?')
        .bind(next.owner, next.email, next.notes, next.plan, next.seats, next.expires, next.revoked, l.key).run();
    // Fewer computers allowed: sign out the ones seen least recently.
    const newest = await db.prepare('SELECT id FROM beam_sessions WHERE key = ? ORDER BY last_seen DESC LIMIT 1').bind(l.key).first();
    if (newest) await enforceSeats(db, next, newest.id, Date.now());
    return { ok: true };
}

export async function signOutSession(db: any, id: string) {
    await db.batch([
        db.prepare('DELETE FROM beam_sessions WHERE id = ?').bind(id),
        db.prepare('INSERT OR REPLACE INTO beam_ended (id, reason, at) VALUES (?, ?, ?)').bind(id, 'This computer was signed out by TECHNOTRONIC FUTURISTICS.', Date.now()),
    ]);
    return { ok: true };
}
