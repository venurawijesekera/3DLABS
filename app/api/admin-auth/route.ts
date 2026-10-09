import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import {
    allowedAdminEmails, clearSessionCookie, createSession, deleteSession, getSessionAdmin,
    hashPassword, logAdminAction, safeEqual, setSessionCookie, verifyPassword,
} from '@/lib/adminAuth';

export const runtime = 'edge';

const MIN_PASSWORD_LENGTH = 10;

const publicAdmin = (admin: any) => ({
    email: admin.email,
    name: admin.name,
    hasPassword: !!admin.password_hash,
    hasGoogle: !!admin.google_sub,
});

export async function POST(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const data = await request.json().catch(() => ({}));

    // 1. Current session
    if (data.action === 'me') {
        const admin = await getSessionAdmin(request, db);
        if (!admin) return NextResponse.json({ success: false }, { status: 401 });
        return NextResponse.json({
            success: true,
            admin: publicAdmin(admin),
            googleEnabled: !!(env as any).GOOGLE_CLIENT_ID,
        });
    }

    // 2. Email + password login
    if (data.action === 'login') {
        const email = String(data.email || '').trim().toLowerCase();
        const admin: any = await db.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first();
        if (!admin || !(await verifyPassword(String(data.password || ''), admin.password_hash))) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }
        const token = await createSession(db, admin.id);
        await logAdminAction(db, 'ADMIN_LOGIN', `${admin.email} signed in with password`);
        return setSessionCookie(NextResponse.json({ success: true, admin: publicAdmin(admin) }), token);
    }

    // 3. Logout
    if (data.action === 'logout') {
        await deleteSession(request, db);
        return clearSessionCookie(NextResponse.json({ success: true }));
    }

    // 4. Create an admin or reset a forgotten password using ADMIN_SETUP_KEY
    if (data.action === 'setup') {
        const setupKey = String((env as any).ADMIN_SETUP_KEY || '');
        if (setupKey.length < 16) {
            return NextResponse.json({ success: false, message: 'Password reset is not enabled on this site.' }, { status: 403 });
        }
        if (!safeEqual(String(data.setupKey || ''), setupKey)) {
            return NextResponse.json({ success: false, message: 'Invalid setup key' }, { status: 401 });
        }
        const email = String(data.email || '').trim().toLowerCase();
        if (!allowedAdminEmails(env).includes(email)) {
            return NextResponse.json({ success: false, message: 'This email is not in the admin list.' }, { status: 403 });
        }
        const password = String(data.password || '');
        if (password.length < MIN_PASSWORD_LENGTH) {
            return NextResponse.json({ success: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, { status: 400 });
        }

        const passwordHash = await hashPassword(password);
        let admin: any = await db.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first();
        if (admin) {
            await db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').bind(passwordHash, admin.id).run();
            await db.prepare('DELETE FROM admin_sessions WHERE admin_id = ?').bind(admin.id).run();
        } else {
            await db.prepare('INSERT INTO admin_users (email, password_hash) VALUES (?, ?)').bind(email, passwordHash).run();
            admin = await db.prepare('SELECT * FROM admin_users WHERE email = ?').bind(email).first();
        }
        admin.password_hash = passwordHash;

        const token = await createSession(db, admin.id);
        await logAdminAction(db, 'ADMIN_PASSWORD_RESET', `Password set for ${email} using the setup key`);
        return setSessionCookie(NextResponse.json({ success: true, admin: publicAdmin(admin) }), token);
    }

    // 5. Change (or set) password while signed in
    if (data.action === 'change_password') {
        const admin = await getSessionAdmin(request, db);
        if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        if (admin.password_hash && !(await verifyPassword(String(data.currentPassword || ''), admin.password_hash))) {
            return NextResponse.json({ success: false, message: 'Current password is incorrect' }, { status: 401 });
        }
        const password = String(data.newPassword || '');
        if (password.length < MIN_PASSWORD_LENGTH) {
            return NextResponse.json({ success: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, { status: 400 });
        }
        await db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').bind(await hashPassword(password), admin.id).run();
        await logAdminAction(db, 'ADMIN_PASSWORD_CHANGE', `${admin.email} changed their password`);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json('Invalid Action', { status: 400 });
}
