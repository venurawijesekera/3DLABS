'use client';

export const runtime = 'edge';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const [editData, setEditData] = useState({ name: '', phone: '', address: '' });
    const [loading, setLoading] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    useEffect(() => {
        const clientStr = localStorage.getItem('3dlabs_client');
        if (!clientStr) {
            window.location.href = '/login';
            return;
        }
        const localData = JSON.parse(clientStr);
        setUser(localData);
        loadInitialData(localData.token);
    }, []);

    const loadInitialData = async (token: string) => {
        await loadProfile(token);
        await loadOrders(token);
        await loadNotifications(token);
        await checkUnread(token);
    };

    const loadProfile = async (token: string) => {
        try {
            const res = await fetch('/api/client-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_profile', token })
            });
            const data = await res.json();
            if (data.success) {
                setEditData({
                    name: data.client.name,
                    phone: data.client.phone,
                    address: data.client.address || ''
                });
                // Update local storage too
                const clientStr = localStorage.getItem('3dlabs_client');
                if (clientStr) {
                    const localData = JSON.parse(clientStr);
                    localStorage.setItem('3dlabs_client', JSON.stringify({ ...localData, ...data.client }));
                }
            }
        } catch (err) { console.error(err); }
    };

    const loadOrders = async (token: string) => {
        try {
            const res = await fetch('/api/client-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_my_quotes', token })
            });
            const data = await res.json();
            setOrders(data);
        } catch (err) { console.error(err); }
    };

    const loadNotifications = async (token: string) => {
        try {
            const res = await fetch('/api/client-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_notifications', token })
            });
            const data = await res.json();
            setNotifications(data);
        } catch (err) { console.error(err); }
    };

    const checkUnread = async (token: string) => {
        try {
            const res = await fetch('/api/client-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_unread_count', token })
            });
            const data = await res.json();
            setUnreadCount(data.count);
        } catch (err) { console.error(err); }
    };

    const updateProfile = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/client-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update_profile',
                    token: user.token,
                    ...editData
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('Profile Updated Successfully!');
                loadProfile(user.token);
            }
        } catch (err) { alert('Connection Error'); }
        setLoading(false);
    };

    const openChat = async () => {
        setIsChatOpen(true);
        setUnreadCount(0);
        try {
            await fetch('/api/client-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'mark_read', token: user.token })
            });
            await loadMessages();
        } catch (err) { console.error(err); }
    };

    const loadMessages = async () => {
        try {
            const res = await fetch('/api/client-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_messages', token: user.token })
            });
            const data = await res.json();
            setMessages(data);
        } catch (err) { console.error(err); }
    };

    const sendMessage = async () => {
        if (!messageInput.trim()) return;
        try {
            const res = await fetch('/api/client-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'send_message', token: user.token, message: messageInput })
            });
            const data = await res.json();
            if (data.success) {
                setMessageInput('');
                loadMessages();
            }
        } catch (err) { console.error(err); }
    };

    const handleLogout = () => {
        localStorage.removeItem('3dlabs_client');
        window.location.href = '/';
    };

    const reorder = (id: number) => {
        const msg = `Hi 3D Labs, I would like to proceed with or reorder my previous Quote #${id} (Name: ${editData.name}).`;
        window.open(`https://wa.me/94707000007?text=${encodeURIComponent(msg)}`, '_blank');
    };

    if (!user) return null;

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', padding: '100px 20px 40px' }}>
            {/* Header / Sub-nav */}
            <div style={{
                maxWidth: '1300px', margin: '0 auto 30px', display: 'flex', justifyContent: 'flex-end', gap: '15px'
            }}>
                <button onClick={openChat} style={{
                    background: 'none', border: '1px solid #ffa415', color: '#ffa415', borderRadius: '30px',
                    padding: '8px 20px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    <i className="fa-solid fa-comments"></i> Message Support
                    {unreadCount > 0 && <span style={unreadBadgeStyle}>{unreadCount}</span>}
                </button>
                <Link href="/" className="cs_btn cs_style_1" style={{ fontSize: '14px', padding: '10px 25px' }}>Back Home</Link>
            </div>

            <div style={containerStyle}>
                <div style={gridStyle}>
                    {/* Sidebar / Profile Card */}
                    <div className="cs_card" style={cardStyle}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <div style={avatarStyle}>{editData.name?.charAt(0).toUpperCase() || '?'}</div>
                            <h3 style={{ margin: '10px 0 5px' }}>{editData.name}</h3>
                            <p style={{ color: '#888', fontSize: '14px' }}>{user.email}</p>
                        </div>
                        <hr style={{ borderColor: '#333', margin: '20px 0' }} />

                        <div style={{ textAlign: 'left' }}>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Phone Number</label>
                                <input
                                    type="text"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Email (Cannot Change)</label>
                                <input type="text" value={user.email} disabled style={{ ...inputStyle, opacity: 0.6 }} />
                            </div>
                            <div style={formGroupStyle}>
                                <label style={labelStyle}>Shipping Address</label>
                                <textarea
                                    value={editData.address}
                                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                                    rows={4}
                                    style={inputStyle}
                                    placeholder="Enter your delivery address..."
                                />
                            </div>
                        </div>

                        <button onClick={updateProfile} disabled={loading} style={saveBtnStyle}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button onClick={handleLogout} style={logoutBtnStyle}>Log Out</button>
                    </div>

                    {/* Main Content */}
                    <div>
                        {/* Notifications */}
                        <div className="cs_card" style={{ ...cardStyle, marginBottom: '30px' }}>
                            <h4 style={{ margin: '0 0 20px' }}>🔔 Recent Updates</h4>
                            {notifications.length === 0 ? (
                                <p style={{ color: '#666', textAlign: 'center' }}>No recent updates</p>
                            ) : (
                                notifications.map((n, i) => (
                                    <div key={i} style={notiItemStyle}>
                                        <span>{n.message}</span>
                                        <span style={{ fontSize: '12px', color: '#888' }}>{new Date(n.created_at).toLocaleDateString()}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Order History */}
                        <div className="cs_card" style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ margin: 0 }}>📜 Order History</h4>
                                <Link href="/instant-quote" style={newQuoteBtnStyle}>+ New Quote</Link>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thStyle}>Order #</th>
                                            <th style={thStyle}>Summary / Files</th>
                                            <th style={thStyle}>Est. Cost</th>
                                            <th style={thStyle}>Status</th>
                                            <th style={thStyle}>Payment</th>
                                            <th style={thStyle}>Delivery</th>
                                            <th style={thStyle}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length === 0 ? (
                                            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No saved quotes found.</td></tr>
                                        ) : (
                                            orders.map(q => (
                                                <OrderRow key={q.id} order={q} expanded={expandedOrder === q.id} onToggle={() => setExpandedOrder(expandedOrder === q.id ? null : q.id)} onReorder={() => reorder(q.id)} />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Modal */}
            {isChatOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={modalHeaderStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ ...avatarStyle, width: '35px', height: '35px', fontSize: '14px', margin: 0 }}>A</div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Admin Support</h4>
                                    <div style={{ fontSize: '11px', color: '#aaa' }}>Online</div>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>×</button>
                        </div>
                        <div style={chatHistoryStyle}>
                            {messages.map((m, i) => (
                                <div key={i} style={{
                                    display: 'flex', justifyContent: m.sender === 'client' ? 'flex-end' : 'flex-start', marginBottom: '15px'
                                }}>
                                    <div style={{
                                        maxWidth: '70%', padding: '10px 15px', borderRadius: '15px',
                                        backgroundColor: m.sender === 'client' ? '#ffa415' : '#222',
                                        color: m.sender === 'client' ? '#000' : '#fff',
                                        borderBottomRightRadius: m.sender === 'client' ? '2px' : '15px',
                                        borderBottomLeftRadius: m.sender === 'client' ? '15px' : '2px',
                                    }}>
                                        <div style={{ fontSize: '14px' }}>{m.message}</div>
                                        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.6, textAlign: 'right' }}>
                                            {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={chatInputAreaStyle}>
                            <input
                                type="text"
                                placeholder="Message Admin..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                style={chatInputStyle}
                            />
                            <button onClick={sendMessage} style={sendBtnStyle}>
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function OrderRow({ order, expanded, onToggle, onReorder }: any) {
    const statusOrder = order.status_order || 'Pending';
    const statusPayment = order.status_payment || 'Unpaid';
    const statusDelivery = order.status_delivery || 'Processing';

    // Parse files
    let files = [];
    try { files = JSON.parse(order.file_details || '[]'); } catch (e) { }

    return (
        <>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={tdStyle}><span style={{ color: '#ffa415', fontWeight: 'bold' }}>#{order.id}</span><br /><small style={{ color: '#666' }}>{new Date(order.created_at).toLocaleDateString()}</small></td>
                <td style={tdStyle}>
                    <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.material}</div>
                    {files.length > 0 && <button onClick={onToggle} style={detailsBtnStyle}><i className="fa-solid fa-eye"></i> Details</button>}
                </td>
                <td style={{ ...tdStyle, fontWeight: 'bold' }}>{order.cost}</td>
                <td style={tdStyle}><span style={getStatusStyle(statusOrder)}>{statusOrder}</span></td>
                <td style={tdStyle}>
                    <span style={getPaymentStatusStyle(statusPayment)}>{statusPayment}</span>
                    {statusPayment === 'Partially Paid' && (
                        <div style={{ fontSize: '11px', marginTop: '4px' }}>
                            <span style={{ color: '#888' }}>Paid: {order.amount_paid}</span><br />
                            <span style={{ color: '#ff4c4c' }}>Due: {parseFloat(order.cost.replace(/[^0-9.]/g, '')) - parseFloat(order.amount_paid)}</span>
                        </div>
                    )}
                </td>
                <td style={tdStyle}><span style={getDeliveryStatusStyle(statusDelivery)}>{statusDelivery}</span></td>
                <td style={tdStyle}>
                    <button onClick={onReorder} style={reorderBtnStyle}><i className="fa-brands fa-whatsapp"></i> Reorder</button>
                </td>
            </tr>
            {expanded && (
                <tr>
                    <td colSpan={7} style={{ padding: '0 15px 15px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                        <div style={{ padding: '15px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
                            <h5 style={{ fontSize: '13px', color: '#888', marginBottom: '10px' }}>File Details</h5>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #333' }}>
                                        <th style={{ textAlign: 'left', padding: '8px' }}>Ref</th>
                                        <th style={{ textAlign: 'left', padding: '8px' }}>File Name</th>
                                        <th style={{ textAlign: 'left', padding: '8px' }}>Specs</th>
                                        <th style={{ textAlign: 'left', padding: '8px' }}>Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((f: any, i: number) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                                            <td style={{ padding: '8px', color: '#ffa415' }}>{f.ref || '-'}</td>
                                            <td style={{ padding: '8px' }}>{f.file}</td>
                                            <td style={{ padding: '8px', color: '#bbb' }}>{f.material} / {f.color} / {f.infill}% Inf</td>
                                            <td style={{ padding: '8px' }}>{f.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

// Helper for status styles
const getStatusStyle = (s: string) => {
    const base = { padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' as const };
    if (s === 'Pending') return { ...base, backgroundColor: '#333', color: '#ccc' };
    if (s === 'Accepted') return { ...base, backgroundColor: '#2563eb', color: '#fff' };
    if (s === 'In Progress') return { ...base, backgroundColor: '#f59e0b', color: '#000' };
    if (s === 'Completed') return { ...base, backgroundColor: '#10b981', color: '#000' };
    return { ...base, backgroundColor: '#444', color: '#fff' };
};

const getPaymentStatusStyle = (s: string) => {
    if (s === 'Paid') return { color: '#10b981', fontSize: '11px', fontWeight: 'bold' as const };
    if (s === 'Partially Paid') return { color: '#f59e0b', fontSize: '11px', fontWeight: 'bold' as const };
    return { color: '#ef4444', fontSize: '11px', fontWeight: 'bold' as const };
};

const getDeliveryStatusStyle = (s: string) => {
    if (s === 'Delivered') return { color: '#10b981', fontSize: '11px', fontWeight: 'bold' as const };
    if (s === 'On Route') return { color: '#3b82f6', fontSize: '11px', fontWeight: 'bold' as const };
    return { color: '#888', fontSize: '11px' };
}

// Local Styles
const containerStyle: React.CSSProperties = { maxWidth: '1300px', margin: '0 auto' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '30px' };
const cardStyle: React.CSSProperties = { backgroundColor: '#171717', border: '1px solid #333', borderRadius: '12px', padding: '25px' };
const avatarStyle: React.CSSProperties = { width: '80px', height: '80px', background: '#ffa415', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#000', fontWeight: 'bold', margin: '0 auto' };
const formGroupStyle: React.CSSProperties = { marginBottom: '15px' };
const labelStyle: React.CSSProperties = { fontSize: '11px', color: '#888', textTransform: 'uppercase', marginBottom: '5px', display: 'block' };
const inputStyle: React.CSSProperties = { width: '100%', backgroundColor: '#0c0c0c', border: '1px solid #333', color: '#fff', padding: '10px', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' };
const saveBtnStyle: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#ffa415', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
const logoutBtnStyle: React.CSSProperties = { width: '100%', padding: '10px', backgroundColor: 'transparent', color: '#ff4c4c', border: '1px solid #333', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' };
const notiItemStyle: React.CSSProperties = { padding: '12px 0', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '12px', borderBottom: '1px solid #444', color: '#888', fontSize: '12px', textTransform: 'uppercase' };
const tdStyle: React.CSSProperties = { padding: '15px 12px', verticalAlign: 'middle', fontSize: '14px' };
const detailsBtnStyle: React.CSSProperties = { background: 'none', border: '1px solid #444', color: '#ffa415', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', marginTop: '5px' };
const reorderBtnStyle: React.CSSProperties = { backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' };
const newQuoteBtnStyle: React.CSSProperties = { backgroundColor: 'transparent', color: '#ffa415', border: '1px solid #444', padding: '6px 15px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' };
const unreadBadgeStyle: React.CSSProperties = { backgroundColor: '#ff4c4c', color: '#fff', fontSize: '10px', minWidth: '18px', height: '18px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' };

// Modal Styles
const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 };
const modalContentStyle: React.CSSProperties = { width: '100%', maxWidth: '500px', height: '80vh', backgroundColor: '#121212', borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #333' };
const modalHeaderStyle: React.CSSProperties = { padding: '15px 20px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const chatHistoryStyle: React.CSSProperties = { flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#0a0a0a' };
const chatInputAreaStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#1a1a1a', borderTop: '1px solid #333', display: 'flex', gap: '10px' };
const chatInputStyle: React.CSSProperties = { flex: 1, padding: '12px 18px', borderRadius: '25px', border: '1px solid #333', backgroundColor: '#0c0c0c', color: '#fff', outline: 'none' };
const sendBtnStyle: React.CSSProperties = { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#ffa415', color: '#000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
