// BeamEngine licence API. The app calls activate / checkin / deactivate; the admin panel calls admin.
import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { isAdminToken } from '@/lib/admin-auth';
import { activate, checkin, createLicense, deactivate, ensureSchema, listLicenses, publicKey, signOutSession, updateLicense } from '@/lib/beamengine-license';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// The desktop app isn't a web page on this site, so it needs CORS.
const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' };
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: CORS });

export async function OPTIONS() {
    return new NextResponse(null, { headers: CORS });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ action: string }> }) {
    const { action } = await params;
    const db = (getRequestContext().env as any).DB;
    await ensureSchema(db);
    if (action === 'public-key') return reply({ publicKey: await publicKey(db) });
    return reply({ error: 'Not found.' }, 404);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ action: string }> }) {
    const { action } = await params;
    const db = (getRequestContext().env as any).DB;
    const body = (await req.json().catch(() => ({}))) as any;
    try {
        await ensureSchema(db);
        if (action === 'activate') {
            const r = await activate(db, body);
            return reply(r.token ? { token: r.token } : { error: r.error }, r.token ? 200 : r.status ?? 400);
        }
        if (action === 'checkin') return reply(await checkin(db, body));
        if (action === 'deactivate') return reply(await deactivate(db, body));
        if (action === 'admin') {
            if (!(await isAdminToken(db, body.token))) return reply({ error: 'Please log in again.' }, 401);
            if (body.op === 'list') return reply(await listLicenses(db));
            if (body.op === 'create') return reply(await createLicense(db, body));
            if (body.op === 'update') return reply(await updateLicense(db, body));
            if (body.op === 'signout') return reply(await signOutSession(db, String(body.id ?? '')));
            return reply({ error: 'Unknown admin action.' }, 400);
        }
        return reply({ error: 'Not found.' }, 404);
    } catch (e) {
        return reply({ error: `Server error: ${(e as Error).message}` }, 500);
    }
}
