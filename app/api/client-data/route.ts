import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const data = await request.json();

    // 1. Verify Client Token
    const client: any = await db.prepare("SELECT id FROM clients WHERE token = ?").bind(data.token).first();

    if (!client) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    // 2. Fetch Quotes for THIS client only
    if (data.action === 'get_my_quotes') {
        const { results } = await db.prepare(
            "SELECT * FROM quotes WHERE client_id = ? ORDER BY id DESC"
        ).bind(client.id).all();
        return NextResponse.json(results);
    }

    // 3. Get Notifications for THIS client
    if (data.action === 'get_notifications') {
        try {
            const { results } = await db.prepare(
                "SELECT n.* FROM notifications n JOIN quotes q ON n.order_id = q.id WHERE q.client_id = ? ORDER BY n.created_at DESC LIMIT 20"
            ).bind(client.id).all();
            return NextResponse.json(results);
        } catch (e) {
            return NextResponse.json([]);
        }
    }

    // 4. Get Messages
    if (data.action === 'get_messages') {
        try {
            const { results } = await db.prepare(
                "SELECT * FROM messages WHERE client_id = ? ORDER BY created_at ASC"
            ).bind(client.id).all();
            return NextResponse.json(results);
        } catch (e) {
            return NextResponse.json([]);
        }
    }

    // 5. Send Message
    if (data.action === 'send_message') {
        if (!data.message) return NextResponse.json("Message required", { status: 400 });

        try {
            await db.prepare(
                "INSERT INTO messages (client_id, sender, message) VALUES (?, 'client', ?)"
            ).bind(client.id, data.message).run();
            return NextResponse.json({ success: true });
        } catch (e) {
            return NextResponse.json("Error sending message", { status: 500 });
        }
    }

    // 6. Get Unread Count
    if (data.action === 'get_unread_count') {
        try {
            const result: any = await db.prepare(
                "SELECT COUNT(*) as count FROM messages WHERE client_id = ? AND sender = 'admin' AND is_read = 0"
            ).bind(client.id).first();
            return NextResponse.json({ count: result.count });
        } catch (e) {
            return NextResponse.json({ count: 0 });
        }
    }

    // 7. Mark Messages as Read
    if (data.action === 'mark_read') {
        try {
            await db.prepare(
                "UPDATE messages SET is_read = 1 WHERE client_id = ? AND sender = 'admin'"
            ).bind(client.id).run();
            return NextResponse.json({ success: true });
        } catch (e) {
            return NextResponse.json("Error", { status: 500 });
        }
    }

    return NextResponse.json("Invalid Action", { status: 400 });
}
