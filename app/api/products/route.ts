import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
    const { env } = getRequestContext();
    const db = (env as any).DB;

    try {
        const { results } = await db.prepare("SELECT * FROM products ORDER BY id DESC").all();
        return NextResponse.json(results);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
