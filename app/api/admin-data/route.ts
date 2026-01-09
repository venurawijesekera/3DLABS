import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const { env } = getRequestContext();
    const db = (env as any).DB;
    const data = await request.json();

    // 1. Admin Login
    if (data.action === 'login') {
        if (data.password === 'admin123') {
            return NextResponse.json({ success: true, token: 'admin-access-token' });
        }
        return NextResponse.json({ success: false }, { status: 401 });
    }

    // 2. Verify Admin Token
    if (data.token !== 'admin-access-token') {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    // 3. Get All Clients
    if (data.action === 'get_clients') {
        const { results } = await db.prepare("SELECT * FROM clients ORDER BY id DESC").all();
        return NextResponse.json(results);
    }

    // 4. Get All Quotes
    if (data.action === 'get_quotes') {
        const { results } = await db.prepare(`
            SELECT quotes.*, clients.name as client_name, clients.email as client_email, clients.phone as client_phone 
            FROM quotes 
            LEFT JOIN clients ON quotes.client_id = clients.id 
            ORDER BY quotes.id DESC
        `).all();
        return NextResponse.json(results);
    }

    // 5. Update Quote Status
    if (data.action === 'update_status') {
        const current: any = await db.prepare("SELECT * FROM quotes WHERE id = ?").bind(data.id).first();

        let changes = [];
        if (current.status_order !== data.order) changes.push(`Order Status: ${data.order}`);
        if (current.status_payment !== data.payment) changes.push(`Payment: ${data.payment}`);
        if (current.status_delivery !== data.delivery) changes.push(`Delivery: ${data.delivery}`);

        if (parseFloat(current.amount_paid) !== parseFloat(data.paid)) {
            changes.push(`Paid Amount: ${data.paid}`);
        }

        if (current.cost !== data.cost) {
            changes.push(`Total Price: ${data.cost}`);
            try {
                const oldFiles = JSON.parse(current.file_details || '[]');
                const newFiles = JSON.parse(data.file_details || '[]');

                if (oldFiles.length === newFiles.length) {
                    for (let i = 0; i < oldFiles.length; i++) {
                        const oldPrice = parseFloat(oldFiles[i].price || 0);
                        const newPrice = parseFloat(newFiles[i].price || 0);
                        if (oldPrice !== newPrice) {
                            changes.push(`File "${oldFiles[i].file}" price changed: ${oldPrice} -> ${newPrice}`);
                        }
                    }
                }
            } catch (e) {
                console.error("Error comparing files", e);
            }
        }

        await db.prepare(
            "UPDATE quotes SET status_order = ?, status_payment = ?, status_delivery = ?, amount_paid = ?, cost = ?, file_details = ? WHERE id = ?"
        ).bind(data.order, data.payment, data.delivery, data.paid, data.cost, data.file_details, data.id).run();

        if (changes.length > 0) {
            try {
                const msg = `Order #${data.id} Update: ${changes.join(', ')}`;
                await db.prepare("INSERT INTO notifications (order_id, message) VALUES (?, ?)").bind(data.id, msg).run();
                await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)").bind("UPDATE_ORDER", msg).run();
            } catch (e) {
                console.error("Failed to create notification/log", e);
            }
        }

        return NextResponse.json({ success: true });
    }

    // 6. Get Notifications
    if (data.action === 'get_notifications') {
        const { results } = await db.prepare("SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50").all();
        return NextResponse.json(results);
    }

    // 7. Get Messages
    if (data.action === 'get_messages') {
        const { results } = await db.prepare(
            "SELECT * FROM messages WHERE client_id = ? ORDER BY created_at ASC"
        ).bind(data.client_id).all();
        return NextResponse.json(results);
    }

    // 8. Send Message
    if (data.action === 'send_message') {
        await db.prepare(
            "INSERT INTO messages (client_id, sender, message) VALUES (?, ?, ?)"
        ).bind(data.client_id, data.sender, data.message).run();

        if (data.sender === 'admin') {
            await db.prepare(
                "INSERT INTO admin_logs (action_type, description) VALUES (?, ?)"
            ).bind("SEND_MESSAGE", `Admin sent message to Client #${data.client_id}`).run();
        }

        return NextResponse.json({ success: true });
    }

    // 9. Get Admin Logs
    if (data.action === 'get_logs') {
        const { results } = await db.prepare("SELECT * FROM admin_logs ORDER BY id DESC LIMIT 100").all();
        return NextResponse.json(results);
    }

    // 10. Get Products (Shop)
    if (data.action === 'get_products') {
        const { results } = await db.prepare("SELECT * FROM products ORDER BY id DESC").all();
        return NextResponse.json(results);
    }

    // 11. Add Product
    if (data.action === 'add_product') {
        try {
            const { name, description, price, original_price, category, images, labels, brand_name, material, stock_status, warranty, shipping_delivery, has_variants, variants } = data.product;
            await db.prepare(`
                INSERT INTO products (name, description, price, original_price, category, images, labels, brand_name, material, stock_status, warranty, shipping_delivery, has_variants, variants) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(name, description, price, original_price, category, images, labels, brand_name, material, stock_status, warranty, shipping_delivery, has_variants, variants).run();

            await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)")
                .bind("ADD_PRODUCT", `Added new product: ${name}`).run();

            return NextResponse.json({ success: true });
        } catch (e: any) {
            console.error("Add Product Error:", e);
            return NextResponse.json({ success: false, error: e.message }, { status: 500 });
        }
    }

    // 12. Update Product
    if (data.action === 'update_product') {
        try {
            const { id, name, description, price, original_price, category, images, labels, brand_name, material, stock_status, warranty, shipping_delivery, has_variants, variants } = data.product;
            await db.prepare(`
                UPDATE products SET 
                    name = ?, description = ?, price = ?, original_price = ?, category = ?, 
                    images = ?, labels = ?, brand_name = ?, material = ?, stock_status = ?, 
                    warranty = ?, shipping_delivery = ?, has_variants = ?, variants = ? 
                WHERE id = ?
            `).bind(name, description, price, original_price, category, images, labels, brand_name, material, stock_status, warranty, shipping_delivery, has_variants, variants, id).run();

            await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)")
                .bind("UPDATE_PRODUCT", `Updated product: ${name}`).run();

            return NextResponse.json({ success: true });
        } catch (e: any) {
            console.error("Update Product Error:", e);
            return NextResponse.json({ success: false, error: e.message }, { status: 500 });
        }
    }

    // 13. Delete Product
    if (data.action === 'delete_product') {
        await db.prepare("DELETE FROM products WHERE id = ?").bind(data.id).run();
        await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)")
            .bind("DELETE_PRODUCT", `Deleted product ID: ${data.id}`).run();
        return NextResponse.json({ success: true });
    }

    // --- MATERIALS Management ---

    // 14. Get Materials
    if (data.action === 'get_materials') {
        const { results } = await db.prepare("SELECT * FROM materials ORDER BY id ASC").all();
        return NextResponse.json(results);
    }

    // 15. Add Material
    if (data.action === 'add_material') {
        try {
            const { slug, name, long_name, image, tag, short_description, description_2, properties, specifications, applications } = data.material;
            await db.prepare(`
                INSERT INTO materials (slug, name, long_name, image, tag, short_description, description_2, properties, specifications, applications) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(slug, name, long_name, image, tag, short_description, description_2, properties, specifications, applications).run();

            await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)")
                .bind("ADD_MATERIAL", `Added new material: ${name}`).run();

            return NextResponse.json({ success: true });
        } catch (e: any) {
            console.error("Add Material Error:", e);
            return NextResponse.json({ success: false, error: e.message }, { status: 500 });
        }
    }

    // 16. Update Material
    if (data.action === 'update_material') {
        try {
            const { id, slug, name, long_name, image, tag, short_description, description_2, properties, specifications, applications } = data.material;
            await db.prepare(`
                UPDATE materials SET 
                    slug = ?, name = ?, long_name = ?, image = ?, tag = ?, 
                    short_description = ?, description_2 = ?, properties = ?, specifications = ?, applications = ?
                WHERE id = ?
            `).bind(slug, name, long_name, image, tag, short_description, description_2, properties, specifications, applications, id).run();

            await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)")
                .bind("UPDATE_MATERIAL", `Updated material: ${name}`).run();

            return NextResponse.json({ success: true });
        } catch (e: any) {
            console.error("Update Material Error:", e);
            return NextResponse.json({ success: false, error: e.message }, { status: 500 });
        }
    }

    // 17. Delete Material
    if (data.action === 'delete_material') {
        await db.prepare("DELETE FROM materials WHERE id = ?").bind(data.id).run();
        await db.prepare("INSERT INTO admin_logs (action_type, description) VALUES (?, ?)")
            .bind("DELETE_MATERIAL", `Deleted material ID: ${data.id}`).run();
        return NextResponse.json({ success: true });
    }

    return NextResponse.json("Invalid Action", { status: 400 });
}
