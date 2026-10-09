import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { OAUTH_STATE_COOKIE, allowedAdminEmails, createSession, logAdminAction, safeEqual, setSessionCookie } from '@/lib/adminAuth';

export const runtime = 'edge';

// Google redirects here after the admin picks an account.
// Sign-in order: account already linked to this Google ID -> existing admin with the same
// email (linked now, so password and Google share one account) -> new admin if the email is in ADMIN_EMAILS.
export async function GET(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const url = new URL(request.url);
    const origin = url.origin;

    const fail = (error: string) => {
        const res = NextResponse.redirect(`${origin}/admin?error=${error}`);
        res.cookies.set(OAUTH_STATE_COOKIE, '', { path: '/api/admin-auth/google', maxAge: 0 });
        return res;
    };

    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state') || '';
    const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value || '';
    if (!code || !expectedState || !safeEqual(state, expectedState)) return fail('google_failed');

    const clientId = (env as any).GOOGLE_CLIENT_ID;
    const clientSecret = (env as any).GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return fail('google_not_configured');

    let profile: any;
    try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: `${origin}/api/admin-auth/google/callback`,
                grant_type: 'authorization_code',
            }),
        });
        const tokens: any = await tokenRes.json();
        if (!tokenRes.ok || !tokens.access_token) return fail('google_failed');

        const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        profile = await userRes.json();
        if (!userRes.ok) return fail('google_failed');
    } catch (e) {
        console.error('Google sign-in error', e);
        return fail('google_failed');
    }

    const email = String(profile.email || '').trim().toLowerCase();
    if (!profile.sub || !email || profile.email_verified !== true) return fail('google_unverified');

    let admin: any = await db.prepare('SELECT * FROM admin_users WHERE google_sub = ?').bind(profile.sub).first();
    let how = 'signed in with Google';

    if (!admin) {
        admin = await db.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first();
        if (admin) {
            if (admin.google_sub) return fail('google_mismatch');
            await db.prepare('UPDATE admin_users SET google_sub = ?, name = COALESCE(name, ?) WHERE id = ?')
                .bind(profile.sub, profile.name || null, admin.id).run();
            how = 'linked Google to their admin account';
        } else if (allowedAdminEmails(env).includes(email)) {
            await db.prepare('INSERT INTO admin_users (email, name, google_sub) VALUES (?, ?, ?)')
                .bind(email, profile.name || null, profile.sub).run();
            admin = await db.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first();
            how = 'created their admin account with Google';
        } else {
            return fail('not_admin');
        }
    }

    const token = await createSession(db, admin.id);
    await logAdminAction(db, 'ADMIN_LOGIN', `${admin.email} ${how}`);

    const res = NextResponse.redirect(`${origin}/admin`);
    res.cookies.set(OAUTH_STATE_COOKIE, '', { path: '/api/admin-auth/google', maxAge: 0 });
    return setSessionCookie(res, token);
}
