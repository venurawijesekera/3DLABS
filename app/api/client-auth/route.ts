import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

async function hashPassword(text: string) {
    const myText = new TextEncoder().encode(text);
    const myDigest = await crypto.subtle.digest({ name: "SHA-256" }, myText);
    return [...new Uint8Array(myDigest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const data = await request.json();

    // 1. SIGN UP
    if (data.action === 'signup') {
        const { name, email, password, phone } = data;
        const hashed = await hashPassword(password);
        try {
            await db.prepare("INSERT INTO clients (name, email, password, phone) VALUES (?, ?, ?, ?)").bind(name, email, hashed, phone).run();
            return NextResponse.json({ success: true, message: "Account created!" });
        } catch {
            return NextResponse.json({ success: false, message: "Email exists." }, { status: 400 });
        }
    }

    // 2. LOGIN
    if (data.action === 'login') {
        const hashed = await hashPassword(data.password);
        const client: any = await db.prepare("SELECT * FROM clients WHERE email = ? AND password = ?").bind(data.email, hashed).first();
        if (!client) return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

        const token = crypto.randomUUID();
        await db.prepare("UPDATE clients SET token = ? WHERE id = ?").bind(token, client.id).run();

        // Return profile data immediately
        return NextResponse.json({
            success: true,
            client: { name: client.name, email: client.email, phone: client.phone, address: client.address, token: token }
        });
    }

    // 3. GET PROFILE
    if (data.action === 'get_profile') {
        const client: any = await db.prepare("SELECT name, email, phone, address FROM clients WHERE token = ?").bind(data.token).first();
        if (client) return NextResponse.json({ success: true, client });
        return NextResponse.json({ success: false }, { status: 401 });
    }

    // 4. UPDATE PROFILE
    if (data.action === 'update_profile') {
        // Verify token first
        const client: any = await db.prepare("SELECT id FROM clients WHERE token = ?").bind(data.token).first();
        if (!client) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        await db.prepare("UPDATE clients SET name = ?, phone = ?, address = ? WHERE id = ?")
            .bind(data.name, data.phone, data.address, client.id).run();

        return NextResponse.json({ success: true, message: "Profile Updated" });
    }

    return NextResponse.json("Invalid Action", { status: 400 });
}
