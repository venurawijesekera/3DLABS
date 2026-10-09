import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { OAUTH_STATE_COOKIE, randomToken } from '@/lib/adminAuth';

export const runtime = 'edge';

// Starts "Continue with Google" for the admin panel
export async function GET(request: NextRequest) {
    const { env } = getRequestContext();
    const clientId = (env as any).GOOGLE_CLIENT_ID;
    const origin = new URL(request.url).origin;
    if (!clientId) return NextResponse.redirect(`${origin}/admin?error=google_not_configured`);

    const state = randomToken(16);
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: `${origin}/api/admin-auth/google/callback`,
        response_type: 'code',
        scope: 'openid email profile',
        state,
        prompt: 'select_account',
    });

    const res = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
    res.cookies.set(OAUTH_STATE_COOKIE, state, {
        httpOnly: true, secure: true, sameSite: 'lax', path: '/api/admin-auth/google', maxAge: 600,
    });
    return res;
}
