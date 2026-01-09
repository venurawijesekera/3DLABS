import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;

    try {
        await db.prepare(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                original_price REAL,
                category TEXT,
                images TEXT,
                labels TEXT,
                brand_name TEXT,
                material TEXT,
                stock_status TEXT DEFAULT 'In Stock',
                warranty TEXT,
                shipping_delivery TEXT,
                has_variants INTEGER DEFAULT 0,
                variants TEXT,
                rating REAL DEFAULT 5.0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // Also ensure columns exist if table was already there
        const columns = [
            { name: 'images', type: 'TEXT' },
            { name: 'labels', type: 'TEXT' },
            { name: 'brand_name', type: 'TEXT' },
            { name: 'material', type: 'TEXT' },
            { name: 'warranty', type: 'TEXT' },
            { name: 'shipping_delivery', type: 'TEXT' },
            { name: 'has_variants', type: 'INTEGER DEFAULT 0' },
            { name: 'variants', type: 'TEXT' }
        ];

        for (const col of columns) {
            try {
                await db.prepare(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`).run();
            } catch (e) {
                // Ignore "duplicate column name" errors
            }
        }

        return NextResponse.json({ success: true, message: "Database initialized successfully" });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
