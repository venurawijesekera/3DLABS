import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const { id } = await params;

    try {
        const product = await db.prepare("SELECT * FROM products WHERE id = ?").bind(id).first();
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (e) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
