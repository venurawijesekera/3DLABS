import { NextRequest, NextResponse } from 'next/server';

// Admin authentication helpers (edge runtime, Web Crypto only).
//
// Environment variables (set in Cloudflare Pages > Settings > Environment variables):
//   ADMIN_EMAILS          comma-separated emails allowed to be admins
//   ADMIN_SETUP_KEY       long random secret used to create an admin / reset a password
//   GOOGLE_CLIENT_ID      Google OAuth client ID (for "Continue with Google")
//   GOOGLE_CLIENT_SECRET  Google OAuth client secret

export const SESSION_COOKIE = '3dlabs_admin_session';
export const OAUTH_STATE_COOKIE = '3dlabs_admin_oauth_state';
const SESSION_DAYS = 7;
// Cloudflare Workers caps PBKDF2 at 100,000 iterations
const PBKDF2_ITERATIONS = 100000;

export type AdminUser = {
    id: number;
    email: string;
    name: string | null;
    password_hash: string | null;
    google_sub: string | null;
};

const toB64 = (buf: ArrayBuffer | Uint8Array) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)));
const fromB64 = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0)) as Uint8Array<ArrayBuffer>;
const toHex = (buf: ArrayBuffer | Uint8Array) =>
    [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');

export function randomToken(bytes = 32) {
    return toHex(crypto.getRandomValues(new Uint8Array(bytes)));
}

export async function sha256Hex(text: string) {
    return toHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
}

export function safeEqual(a: string, b: string) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number) {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
}

export async function hashPassword(password: string) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
    return `pbkdf2$${PBKDF2_ITERATIONS}$${toB64(salt)}$${toB64(hash)}`;
}

export async function verifyPassword(password: string, stored: string | null) {
    if (!stored) return false;
    const [scheme, iter, salt, hash] = stored.split('$');
    if (scheme !== 'pbkdf2' || !iter || !salt || !hash) return false;
    const candidate = await pbkdf2(password, fromB64(salt), parseInt(iter, 10));
    return safeEqual(toB64(candidate), hash);
}

export function allowedAdminEmails(env: any): string[] {
    return String(env.ADMIN_EMAILS || '')
        .split(',')
        .map(e => e.trim().toLowerCase())
        .filter(Boolean);
}

export async function createSession(db: any, adminId: number) {
    const token = randomToken();
    const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
    await db.prepare('INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES (?, ?, ?)')
        .bind(await sha256Hex(token), adminId, expiresAt).run();
    await db.prepare('UPDATE admin_users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').bind(adminId).run();
    await db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').bind(Date.now()).run();
    return token;
}

export function setSessionCookie(res: NextResponse, token: string) {
    res.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_DAYS * 24 * 60 * 60,
    });
    return res;
}

export function clearSessionCookie(res: NextResponse) {
    res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 });
    return res;
}

export async function getSessionAdmin(request: NextRequest, db: any): Promise<AdminUser | null> {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const admin = await db.prepare(`
        SELECT admin_users.* FROM admin_sessions
        JOIN admin_users ON admin_users.id = admin_sessions.admin_id
        WHERE admin_sessions.token_hash = ? AND admin_sessions.expires_at > ?
    `).bind(await sha256Hex(token), Date.now()).first();
    return admin || null;
}

export async function deleteSession(request: NextRequest, db: any) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (token) await db.prepare('DELETE FROM admin_sessions WHERE token_hash = ?').bind(await sha256Hex(token)).run();
}

export async function logAdminAction(db: any, type: string, description: string) {
    try {
        await db.prepare('INSERT INTO admin_logs (action_type, description) VALUES (?, ?)').bind(type, description).run();
    } catch (e) {
        console.error('Failed to write admin log', e);
    }
}
