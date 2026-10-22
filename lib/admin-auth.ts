// Admin sign-in: the password comes from the ADMIN_PASSWORD setting in Cloudflare Pages, and a successful
// sign-in gets a token signed with a secret only the server knows, valid for 7 days.
import { b64url, getSecret, unb64url } from './secrets';

const TOKEN_DAYS = 7;
const enc = new TextEncoder();

async function hmacKey(db: any): Promise<CryptoKey> {
    const raw = await getSecret(db, 'admin_token_key', async () => b64url(crypto.getRandomValues(new Uint8Array(32))));
    return crypto.subtle.importKey('raw', unb64url(raw), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function sameText(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

/** Until ADMIN_PASSWORD is set in Cloudflare, the old password keeps working so nobody is locked out. */
export function checkAdminPassword(env: any, password: unknown): boolean {
    const want = typeof env.ADMIN_PASSWORD === 'string' && env.ADMIN_PASSWORD ? env.ADMIN_PASSWORD : 'admin123';
    return typeof password === 'string' && sameText(password, want);
}

export async function makeAdminToken(db: any): Promise<string> {
    const exp = String(Date.now() + TOKEN_DAYS * 86_400_000);
    const sig = new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(db), enc.encode(exp)));
    return `${exp}.${b64url(sig)}`;
}

export async function isAdminToken(db: any, token: unknown): Promise<boolean> {
    if (typeof token !== 'string') return false;
    const [exp, sig] = token.split('.');
    if (!exp || !sig || !(Number(exp) > Date.now())) return false;
    try {
        return await crypto.subtle.verify('HMAC', await hmacKey(db), unb64url(sig), enc.encode(exp));
    } catch {
        return false;
    }
}
