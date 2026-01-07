import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const data = await request.json();

    let clientId: any = null;

    if (data.token) {
        const client: any = await db.prepare("SELECT id FROM clients WHERE token = ?").bind(data.token).first();
        if (!client) {
            return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }
        clientId = client.id;
    } else {
        // Guest Mode: Validate Guest Details
        if (!data.guest_name || !data.guest_contact) {
            return NextResponse.json({ success: false, message: "Guest name and contact are required" }, { status: 400 });
        }
    }

    try {
        await db.prepare(
            "INSERT INTO quotes (client_id, guest_name, guest_contact, material, infill, supports, print_time, weight, cost, amount_paid, file_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)"
        ).bind(clientId, data.guest_name || null, data.guest_contact || null, data.material, data.infill, data.supports, data.time, data.weight, data.cost, JSON.stringify(data.file_details)).run();

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
