'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'clients' | 'orders' | 'logs' | 'shop'>('orders');

    const [clients, setClients] = useState<any[]>([]);
    const [quotes, setQuotes] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [quoteSearch, setQuoteSearch] = useState('');

    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [selectedClientName, setSelectedClientName] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Product State
    const [products, setProducts] = useState<any[]>([]);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [productForm, setProductForm] = useState<any>({
        name: '', description: '', price: 0, original_price: 0,
        category: 'Accessories', images: ['', '', '', '', '', '', '', '', '', ''],
        labels: '', brand_name: '', material: '', stock_status: 'In Stock',
        warranty: '', shipping_delivery: '', has_variants: false, variants: []
    });

    useEffect(() => {
        const token = localStorage.getItem('3dlabs_admin_token');
        if (token === 'admin-access-token') {
            setIsLoggedIn(true);
            loadInitialData();
        }
    }, []);

    const loadInitialData = () => {
        fetchClients();
        fetchQuotes();
        fetchLogs();
        fetchProducts();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', password })
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('3dlabs_admin_token', data.token);
                setIsLoggedIn(true);
                loadInitialData();
            } else {
                alert('Invalid password');
            }
        } catch (err) {
            alert('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('3dlabs_admin_token');
        setIsLoggedIn(false);
    };

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_clients', token: 'admin-access-token' })
            });
            const data = await res.json();
            setClients(data);
        } catch (err) { console.error(err); }
    };

    const fetchQuotes = async () => {
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_quotes', token: 'admin-access-token' })
            });
            const data = await res.json();
            setQuotes(data);
        } catch (err) { console.error(err); }
    };

    const fetchLogs = async () => {
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_logs', token: 'admin-access-token' })
            });
            const data = await res.json();
            setLogs(data);
        } catch (err) { console.error(err); }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_products', token: 'admin-access-token' })
            });
            const data = await res.json();
            setProducts(data);
        } catch (err) { console.error(err); }
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const action = editingProduct ? 'update_product' : 'add_product';
            const productData = {
                ...productForm,
                images: JSON.stringify(productForm.images.filter((img: string) => img.trim() !== '')),
                variants: JSON.stringify(productForm.variants),
                has_variants: productForm.has_variants ? 1 : 0
            };
            const payload = JSON.stringify({
                action,
                token: 'admin-access-token',
                product: editingProduct ? { ...productData, id: editingProduct.id } : productData
            });

            if (payload.length > 5 * 1024 * 1024) { // 5MB limit check
                alert("The total size of images is too large. Please use fewer or smaller images.");
                setLoading(false);
                return;
            }

            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload
            });
            const data = await res.json();
            if (data.success) {
                setIsProductModalOpen(false);
                setEditingProduct(null);
                setProductForm({
                    name: '', description: '', price: 0, original_price: 0,
                    category: 'Accessories', images: ['', '', '', '', '', '', '', '', '', ''],
                    labels: '', brand_name: '', material: '', stock_status: 'In Stock',
                    warranty: '', shipping_delivery: '', has_variants: false, variants: []
                });
                fetchProducts();
                fetchLogs();
            }
        } catch (err) { alert('Failed to save product'); }
        finally { setLoading(false); }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete_product', token: 'admin-access-token', id })
            });
            const data = await res.json();
            if (data.success) {
                fetchProducts();
                fetchLogs();
            }
        } catch (err) { console.error(err); }
    };

    const openEditProduct = (p: any) => {
        setEditingProduct(p);
        let imgs = ['', '', '', '', '', '', '', '', '', ''];
        try {
            const parsed = JSON.parse(p.images || '[]');
            parsed.forEach((url: string, i: number) => { if (i < 10) imgs[i] = url; });
        } catch (e) { }

        let vars = [];
        try { vars = JSON.parse(p.variants || '[]'); } catch (e) { }

        setProductForm({
            name: p.name, description: p.description, price: p.price,
            original_price: p.original_price, category: p.category,
            images: imgs, labels: p.labels || '', brand_name: p.brand_name || '',
            material: p.material || '', stock_status: p.stock_status,
            warranty: p.warranty || '', shipping_delivery: p.shipping_delivery || '',
            has_variants: p.has_variants === 1, variants: vars
        });
        setIsProductModalOpen(true);
    };

    const updateProductImage = (idx: number, val: string) => {
        const newImgs = [...productForm.images];
        newImgs[idx] = val;
        setProductForm({ ...productForm, images: newImgs });
    };

    const addVariant = () => {
        setProductForm({
            ...productForm,
            variants: [...productForm.variants, { name: '', color: '#ffffff', price: productForm.price, stock: 'In Stock' }]
        });
    };

    const removeVariant = (idx: number) => {
        const newVars = [...productForm.variants];
        newVars.splice(idx, 1);
        setProductForm({ ...productForm, variants: newVars });
    };

    const updateVariant = (idx: number, field: string, val: any) => {
        const newVars = [...productForm.variants];
        newVars[idx] = { ...newVars[idx], [field]: val };
        setProductForm({ ...productForm, variants: newVars });
    };

    const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const max_size = 1200;

                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8)); // Compress to 80% JPEG
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const currentImages = [...productForm.images.filter((img: string) => img.trim() !== '')];
        const remainingSlots = 10 - currentImages.length;
        const filesToProcess = Array.from(files).slice(0, remainingSlots);

        for (const file of filesToProcess) {
            const compressedBase64 = await resizeImage(file);
            setProductForm((prev: any) => {
                const updatedImgs = [...prev.images.filter((img: string) => img.trim() !== ''), compressedBase64];
                while (updatedImgs.length < 10) updatedImgs.push('');
                return { ...prev, images: updatedImgs };
            });
        }
    };

    const removeImage = (idx: number) => {
        const newImgs = [...productForm.images];
        newImgs.splice(idx, 1);
        newImgs.push(''); // Maintain 10 slots
        setProductForm({ ...productForm, images: newImgs });
    };

    const updateQuoteStatus = async (quote: any) => {
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update_status',
                    token: 'admin-access-token',
                    id: quote.id,
                    order: quote.status_order,
                    payment: quote.status_payment,
                    delivery: quote.status_delivery,
                    paid: quote.amount_paid,
                    cost: quote.cost,
                    file_details: quote.file_details
                })
            });
            const data = await res.json();
            if (data.success) {
                alert('Status updated');
                fetchQuotes();
                fetchLogs();
            }
        } catch (err) { console.error(err); }
    };

    const openChat = async (clientId: number, clientName: string) => {
        setSelectedClientId(clientId);
        setSelectedClientName(clientName);
        setIsChatOpen(true);
        fetchMessages(clientId);
    };

    const fetchMessages = async (clientId: number) => {
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'get_messages', token: 'admin-access-token', client_id: clientId })
            });
            const data = await res.json();
            setMessages(data);
        } catch (err) { console.error(err); }
    };

    const sendMessage = async () => {
        if (!messageInput.trim() || !selectedClientId) return;
        try {
            const res = await fetch('/api/admin-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'send_message',
                    token: 'admin-access-token',
                    client_id: selectedClientId,
                    sender: 'admin',
                    message: messageInput
                })
            });
            const data = await res.json();
            if (data.success) {
                setMessageInput('');
                fetchMessages(selectedClientId);
            }
        } catch (err) { console.error(err); }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container" style={{
                height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#0a0a0a', backgroundImage: "url('/assets/img/bg.webp')", backgroundSize: 'cover'
            }}>
                <div style={{
                    backgroundColor: 'rgba(23, 23, 23, 0.8)', padding: '40px', borderRadius: '15px',
                    width: '100%', maxWidth: '400px', border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)', textAlign: 'center'
                }}>
                    <h2 style={{ color: '#ffa415', marginBottom: '30px' }}>
                        <i className="fa-solid fa-shield-halved" style={{ marginRight: '10px' }}></i>
                        Admin Access
                    </h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#111',
                                border: '1px solid #333', color: '#fff', borderRadius: '8px'
                            }}
                        />
                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '12px', backgroundColor: '#ffa415', color: '#000',
                            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                        }}>
                            {loading ? 'Verifying...' : 'Login to Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredQuotes = quotes.filter(q =>
        (q.client_name || '').toLowerCase().includes(quoteSearch.toLowerCase()) ||
        (q.guest_name || '').toLowerCase().includes(quoteSearch.toLowerCase()) ||
        String(q.id).includes(quoteSearch)
    );

    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#e0e0e0', padding: '20px' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '30px'
                }}>
                    <h3 style={{ margin: 0 }}>
                        3D Labs <span style={{ color: '#ffa415' }}>Admin Panel</span>
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <Link href="/" style={{ color: '#aaa', textDecoration: 'none' }}>Visit Site</Link>
                        <button onClick={logout} style={{
                            backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d',
                            padding: '8px 20px', borderRadius: '8px', cursor: 'pointer'
                        }}>Logout</button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                    <button
                        onClick={() => setActiveTab('clients')}
                        className={activeTab === 'clients' ? 'active-tab' : 'tab'}
                        style={activeTab === 'clients' ? activeTabStyle : tabStyle}
                    >
                        <i className="fa-solid fa-users" style={{ marginRight: '8px' }}></i> Clients
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={activeTab === 'orders' ? 'active-tab' : 'tab'}
                        style={activeTab === 'orders' ? activeTabStyle : tabStyle}
                    >
                        <i className="fa-solid fa-file-invoice-dollar" style={{ marginRight: '8px' }}></i> Orders & Quotes
                    </button>
                    <button
                        onClick={() => setActiveTab('logs')}
                        className={activeTab === 'logs' ? 'active-tab' : 'tab'}
                        style={activeTab === 'logs' ? activeTabStyle : tabStyle}
                    >
                        <i className="fa-solid fa-clock-rotate-left" style={{ marginRight: '8px' }}></i> System Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('shop')}
                        className={activeTab === 'shop' ? 'active-tab' : 'tab'}
                        style={activeTab === 'shop' ? activeTabStyle : tabStyle}
                    >
                        <i className="fa-solid fa-store" style={{ marginRight: '8px' }}></i> Shop Products
                    </button>
                </div>

                {/* Content Sections */}
                {activeTab === 'clients' && (
                    <div className="cs_card" style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h4 style={{ margin: 0 }}>Registered Clients</h4>
                            <button onClick={fetchClients} className="refresh-btn" style={refreshBtnStyle}>Refresh List</button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>ID</th>
                                        <th style={thStyle}>Client Details</th>
                                        <th style={thStyle}>Contact</th>
                                        <th style={thStyle}>Address</th>
                                        <th style={thStyle}>Joined</th>
                                        <th style={thStyle}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map(c => (
                                        <tr key={c.id} style={trStyle}>
                                            <td style={tdStyle}>#{c.id}</td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: 'bold' }}>{c.name}</div>
                                                <div style={{ fontSize: '0.85em', color: '#888' }}>{c.email}</div>
                                            </td>
                                            <td style={tdStyle}>{c.phone}</td>
                                            <td style={tdStyle}>
                                                <div style={{ maxWidth: '250px', fontSize: '0.9em', color: '#bbb' }}>{c.address || 'N/A'}</div>
                                            </td>
                                            <td style={tdStyle}>{new Date(c.created_at).toLocaleDateString()}</td>
                                            <td style={tdStyle}>
                                                <button
                                                    onClick={() => openChat(c.id, c.name)}
                                                    style={actionBtnStyle}
                                                >
                                                    <i className="fa-regular fa-comments"></i> Message
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="cs_card" style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h4 style={{ margin: 0 }}>Order Management</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="text"
                                    placeholder="Search order or client..."
                                    value={quoteSearch}
                                    onChange={(e) => setQuoteSearch(e.target.value)}
                                    style={{ ...inputStyle, width: '250px' }}
                                />
                                <button onClick={fetchQuotes} className="refresh-btn" style={refreshBtnStyle}>Refresh</button>
                            </div>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>ID</th>
                                        <th style={thStyle}>Client</th>
                                        <th style={thStyle}>Details</th>
                                        <th style={thStyle}>Total (LKR)</th>
                                        <th style={thStyle}>Status</th>
                                        <th style={thStyle}>Payment</th>
                                        <th style={thStyle}>Delivery</th>
                                        <th style={thStyle}>Save</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQuotes.map(q => (
                                        <QuoteRow key={q.id} quote={q} onUpdate={updateQuoteStatus} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'logs' && (
                    <div className="cs_card" style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h4 style={{ margin: 0 }}>System Activity Logs</h4>
                            <button onClick={fetchLogs} className="refresh-btn" style={refreshBtnStyle}>Refresh</button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Time</th>
                                        <th style={thStyle}>Action</th>
                                        <th style={thStyle}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map(l => (
                                        <tr key={l.id} style={trStyle}>
                                            <td style={{ ...tdStyle, color: '#888', whiteSpace: 'nowrap' }}>
                                                {new Date(l.created_at).toLocaleString()}
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    backgroundColor: '#222', color: '#ffa415', padding: '2px 8px',
                                                    borderRadius: '4px', fontSize: '11px', fontWeight: 'bold'
                                                }}>
                                                    {l.action_type}
                                                </span>
                                            </td>
                                            <td style={{ ...tdStyle, color: '#bbb' }}>{l.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'shop' && (
                    <div className="cs_card" style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h4 style={{ margin: 0 }}>Shop Product Management</h4>
                            <button onClick={() => {
                                setEditingProduct(null);
                                setProductForm({
                                    name: '', description: '', price: 0, original_price: 0,
                                    category: 'Accessories', images: ['', '', '', '', '', '', '', '', '', ''],
                                    labels: '', brand_name: '', material: '', stock_status: 'In Stock',
                                    warranty: '', shipping_delivery: '', has_variants: false, variants: []
                                });
                                setIsProductModalOpen(true);
                            }} style={actionBtnStyle}>
                                <i className="fa-solid fa-plus"></i> Add New Product
                            </button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Image</th>
                                        <th style={thStyle}>Product Details</th>
                                        <th style={thStyle}>Brand/Material</th>
                                        <th style={thStyle}>Price (LKR)</th>
                                        <th style={thStyle}>Stock</th>
                                        <th style={thStyle}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} style={trStyle}>
                                            <td style={tdStyle}>
                                                <img src={JSON.parse(p.images || '[]')[0] || '/assets/img/3logo.webp'} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: 'bold' }}>{p.name}</div>
                                                <div style={{ fontSize: '0.8em', color: '#ff9800' }}>{p.category}</div>
                                                <div style={{ fontSize: '0.8em', color: '#888', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div>{p.brand_name || 'N/A'}</div>
                                                <div style={{ fontSize: '0.8em', color: '#888' }}>{p.material || 'N/A'}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontWeight: 'bold' }}>LKR {p.price.toLocaleString()}</div>
                                                {p.original_price > 0 && <div style={{ fontSize: '0.8em', textDecoration: 'line-through', color: '#ff4c4c' }}>LKR {p.original_price.toLocaleString()}</div>}
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{ color: p.stock_status === 'In Stock' ? '#4caf50' : '#ff4c4c', fontWeight: 'bold' }}>
                                                    {p.stock_status}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button onClick={() => openEditProduct(p)} style={{ ...saveBtnStyle, padding: '5px 10px', fontSize: '12px' }}>
                                                        <i className="fa-solid fa-pen"></i>
                                                    </button>
                                                    <button onClick={() => deleteProduct(p.id)} style={{ ...saveBtnStyle, borderColor: '#ff4c4c', color: '#ff4c4c', padding: '5px 10px', fontSize: '12px' }}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={{ ...modalContentStyle, maxWidth: '800px', height: 'auto', maxHeight: '90vh' }}>
                        <div style={modalHeaderStyle}>
                            <h4 style={{ margin: 0 }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
                            <button onClick={() => setIsProductModalOpen(false)} style={closeBtnStyle}>×</button>
                        </div>
                        <form onSubmit={handleSaveProduct} style={{ padding: '30px', overflowY: 'auto' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                                {/* Basic Info */}
                                <div style={{ gridColumn: 'span 2' }}>
                                    <h5 style={{ color: '#ffa415', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px' }}>Basic Information</h5>
                                </div>
                                <div style={{ gridColumn: 'span 1' }}>
                                    <label style={labelStyle}>Product Name</label>
                                    <input
                                        type="text" required value={productForm.name}
                                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Category</label>
                                    <select
                                        value={productForm.category}
                                        onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                                        style={{ ...inputStyle, width: '100%', height: '42px' }}
                                    >
                                        <option>3D Printer</option>
                                        <option>Filament</option>
                                        <option>Resin</option>
                                        <option>Accessories</option>
                                        <option>Custom Prints</option>
                                    </select>
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={labelStyle}>Description</label>
                                    <textarea
                                        value={productForm.description}
                                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }} rows={3}
                                    />
                                </div>

                                {/* Pricing & Stock */}
                                <div>
                                    <label style={labelStyle}>Price (LKR)</label>
                                    <input
                                        type="number" required value={productForm.price}
                                        onChange={e => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Original Price (Optional)</label>
                                    <input
                                        type="number" value={productForm.original_price}
                                        onChange={e => setProductForm({ ...productForm, original_price: parseFloat(e.target.value) })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Stock Status</label>
                                    <select
                                        value={productForm.stock_status}
                                        onChange={e => setProductForm({ ...productForm, stock_status: e.target.value })}
                                        style={{ ...inputStyle, width: '100%', height: '42px' }}
                                    >
                                        <option>In Stock</option>
                                        <option>Out of Stock</option>
                                        <option>Pre-Order</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Labels (SEO - comma separated)</label>
                                    <input
                                        type="text" value={productForm.labels}
                                        onChange={e => setProductForm({ ...productForm, labels: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }}
                                        placeholder="3d labs, printing, creality, etc."
                                    />
                                </div>

                                {/* Product Specifications */}
                                <div style={{ gridColumn: 'span 2' }}>
                                    <h5 style={{ color: '#ffa415', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', marginTop: '10px' }}>Specifications</h5>
                                </div>
                                <div>
                                    <label style={labelStyle}>Brand Name</label>
                                    <input
                                        type="text" value={productForm.brand_name}
                                        onChange={e => setProductForm({ ...productForm, brand_name: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Material</label>
                                    <input
                                        type="text" value={productForm.material}
                                        onChange={e => setProductForm({ ...productForm, material: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Warranty Information</label>
                                    <input
                                        type="text" value={productForm.warranty}
                                        onChange={e => setProductForm({ ...productForm, warranty: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Shipping & Delivery</label>
                                    <input
                                        type="text" value={productForm.shipping_delivery}
                                        onChange={e => setProductForm({ ...productForm, shipping_delivery: e.target.value })}
                                        style={{ ...inputStyle, width: '100%' }}
                                    />
                                </div>

                                {/* Images */}
                                <div style={{ gridColumn: 'span 2' }}>
                                    <h5 style={{ color: '#ffa415', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', marginTop: '10px' }}>Product Images (Max 10)</h5>

                                    <div
                                        style={dropZoneStyle}
                                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#ffa415'; }}
                                        onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#333'; }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            e.currentTarget.style.borderColor = '#333';
                                            const files = e.dataTransfer.files;
                                            if (files) {
                                                const input = document.getElementById('imageInput') as HTMLInputElement;
                                                const dt = new DataTransfer();
                                                for (let i = 0; i < files.length; i++) dt.items.add(files[i]);
                                                input.files = dt.files;
                                                handleImageUpload({ target: input } as any);
                                            }
                                        }}
                                        onClick={() => document.getElementById('imageInput')?.click()}
                                    >
                                        <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '30px', marginBottom: '10px', color: '#888' }}></i>
                                        <div style={{ color: '#888', fontSize: '14px' }}>Drag & Drop images or <span style={{ color: '#ffa415' }}>Browse</span></div>
                                        <div style={{ color: '#555', fontSize: '11px', marginTop: '5px' }}>Up to 10 images. Recommendation: Square (1:1) ratio.</div>
                                        <input
                                            id="imageInput" type="file" multiple accept="image/*"
                                            onChange={handleImageUpload} style={{ display: 'none' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginTop: '20px' }}>
                                        {productForm.images.filter((img: string) => img !== '').map((img: string, i: number) => (
                                            <div key={i} style={{ border: '1px solid #333', borderRadius: '12px', padding: '5px', backgroundColor: '#050505', position: 'relative', overflow: 'hidden' }}>
                                                <img src={img} alt="Preview" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(i)}
                                                    style={removeImgBtnStyle}
                                                >
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Variants */}
                                <div style={{ gridColumn: 'span 2' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', marginTop: '10px' }}>
                                        <h5 style={{ color: '#ffa415', margin: 0 }}>Product Variants</h5>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <label style={{ fontSize: '12px', color: '#bbb', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={productForm.has_variants}
                                                    onChange={e => setProductForm({ ...productForm, has_variants: e.target.checked })}
                                                    style={{ marginRight: '8px' }}
                                                />
                                                Enable Variants
                                            </label>
                                        </div>
                                    </div>

                                    {productForm.has_variants && (
                                        <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '12px' }}>
                                            {productForm.variants.map((v: any, idx: number) => (
                                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr 40px', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                                    <input
                                                        placeholder="Name (e.g. Red, XL, 500g)"
                                                        value={v.name} onChange={e => updateVariant(idx, 'name', e.target.value)}
                                                        style={inlineInputStyle}
                                                    />
                                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                        <input
                                                            type="color" value={v.color}
                                                            onChange={e => updateVariant(idx, 'color', e.target.value)}
                                                            style={{ padding: 0, width: '25px', height: '25px', border: 'none', background: 'none', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                    <input
                                                        type="number" placeholder="Price"
                                                        value={v.price} onChange={e => updateVariant(idx, 'price', parseFloat(e.target.value))}
                                                        style={inlineInputStyle}
                                                    />
                                                    <select
                                                        value={v.stock} onChange={e => updateVariant(idx, 'stock', e.target.value)}
                                                        style={inlineInputStyle}
                                                    >
                                                        <option>In Stock</option>
                                                        <option>Out of Stock</option>
                                                    </select>
                                                    <button onClick={() => removeVariant(idx)} style={{ color: '#ff4c4c', background: 'none', border: 'none', cursor: 'pointer' }}>
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            ))}
                                            <button onClick={addVariant} type="button" style={{ ...actionBtnStyle, marginTop: '10px', padding: '8px 15px', backgroundColor: '#333', color: '#fff' }}>
                                                <i className="fa-solid fa-plus"></i> Add Variant
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button type="submit" disabled={loading} style={{ ...saveBtnStyle, width: '100%', marginTop: '30px', padding: '15px', fontSize: '16px' }}>
                                {loading ? 'Saving Product...' : 'Confirm & Save Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Chat Modal */}
            {isChatOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <div style={modalHeaderStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={avatarStyle}>
                                    {selectedClientName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '16px' }}>{selectedClientName}</h4>
                                    <div style={{ fontSize: '12px', color: '#4caf50' }}>• Online</div>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} style={closeBtnStyle}>×</button>
                        </div>
                        <div style={chatHistoryStyle}>
                            {messages.map((m: any, idx: number) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: m.sender === 'admin' ? 'flex-end' : 'flex-start',
                                    marginBottom: '15px'
                                }}>
                                    <div style={{
                                        maxWidth: '80%', padding: '10px 15px', borderRadius: '15px',
                                        backgroundColor: m.sender === 'admin' ? '#ffa415' : '#222',
                                        color: m.sender === 'admin' ? '#000' : '#fff',
                                        borderBottomRightRadius: m.sender === 'admin' ? '2px' : '15px',
                                        borderBottomLeftRadius: m.sender === 'admin' ? '15px' : '2px',
                                    }}>
                                        <div style={{ fontSize: '14px' }}>{m.message}</div>
                                        <div style={{
                                            fontSize: '10px', marginTop: '4px', textAlign: 'right',
                                            opacity: 0.7
                                        }}>
                                            {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={chatInputAreaStyle}>
                            <input
                                type="text"
                                placeholder="Type a message..."
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

            <style jsx>{`
                .tab {
                    background: transparent;
                    color: #888;
                    border: 1px solid #333;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                }
                .tab:hover {
                    color: #fff;
                    border-color: #555;
                }
                .active-tab {
                    background: #ffa415;
                    color: #000;
                    border: 1px solid #ffa415;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 0 15px rgba(255, 164, 21, 0.3);
                }
            `}</style>
        </div>
    );
}

function QuoteRow({ quote, onUpdate }: { quote: any, onUpdate: (q: any) => void }) {
    const [expanded, setExpanded] = useState(false);
    const [statusOrder, setStatusOrder] = useState(quote.status_order);
    const [statusPayment, setStatusPayment] = useState(quote.status_payment);
    const [statusDelivery, setStatusDelivery] = useState(quote.status_delivery);
    const [cost, setCost] = useState(parseFloat(quote.cost.replace(/[^0-9.]/g, '') || '0'));
    const [amountPaid, setAmountPaid] = useState(parseFloat(quote.amount_paid || '0'));
    const [fileDetails, setFileDetails] = useState<any[]>([]);

    useEffect(() => {
        try {
            setFileDetails(JSON.parse(quote.file_details || '[]'));
        } catch (e) {
            setFileDetails([]);
        }
    }, [quote.file_details]);

    const handleSave = () => {
        onUpdate({
            ...quote,
            status_order: statusOrder,
            status_payment: statusPayment,
            status_delivery: statusDelivery,
            cost: cost.toString(),
            amount_paid: amountPaid.toString(),
            file_details: JSON.stringify(fileDetails)
        });
    };

    const updateFilePrice = (idx: number, price: number) => {
        const newFiles = [...fileDetails];
        newFiles[idx].price = price;
        setFileDetails(newFiles);

        // Recalculate total cost
        const newTotal = newFiles.reduce((acc, f) => acc + (parseFloat(f.price) || 0), 0);
        setCost(newTotal);
    };

    return (
        <>
            <tr style={trStyle}>
                <td style={tdStyle}>#{quote.id}<div style={{ fontSize: '0.75em', color: '#666' }}>{new Date(quote.created_at).toLocaleDateString()}</div></td>
                <td style={tdStyle}>
                    <div style={{ fontWeight: 'bold', color: '#ffa415' }}>{quote.client_name || quote.guest_name || 'Guest'}</div>
                    <div style={{ fontSize: '0.85em', color: '#aaa' }}>{quote.client_email || 'N/A'}</div>
                </td>
                <td style={tdStyle}>
                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={() => setExpanded(!expanded)}>
                        {quote.material} <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'}`} style={{ fontSize: '10px', color: '#ffa415' }}></i>
                    </div>
                </td>
                <td style={tdStyle}>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(parseFloat(e.target.value))}
                        style={{ ...inlineInputStyle, width: '100px', color: '#4caf50', fontWeight: 'bold' }}
                    />
                </td>
                <td style={tdStyle}>
                    <select value={statusOrder} onChange={(e) => setStatusOrder(e.target.value)} style={selectStyle}>
                        <option>Pending</option>
                        <option>Accepted</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                </td>
                <td style={tdStyle}>
                    <select value={statusPayment} onChange={(e) => setStatusPayment(e.target.value)} style={selectStyle}>
                        <option>Unpaid</option>
                        <option>Partially Paid</option>
                        <option>Paid</option>
                        <option>Refunded</option>
                    </select>
                    {statusPayment === 'Partially Paid' && (
                        <div style={{ marginTop: '5px' }}>
                            <input
                                type="number"
                                value={amountPaid}
                                onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
                                style={{ ...inlineInputStyle, width: '100px' }}
                            />
                            <div style={{ fontSize: '0.7em', color: '#ff6b6b' }}>Bal: LKR {(cost - amountPaid).toLocaleString()}</div>
                        </div>
                    )}
                </td>
                <td style={tdStyle}>
                    <select value={statusDelivery} onChange={(e) => setStatusDelivery(e.target.value)} style={selectStyle}>
                        <option>Processing</option>
                        <option>Pick Up</option>
                        <option>On Route</option>
                        <option>Delivered</option>
                    </select>
                </td>
                <td style={tdStyle}>
                    <button onClick={handleSave} style={saveBtnStyle}><i className="fa-solid fa-floppy-disk"></i></button>
                </td>
            </tr>
            {expanded && (
                <tr>
                    <td colSpan={8} style={{ padding: '0 20px 20px 20px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ padding: '15px', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
                            <h5 style={{ fontSize: '14px', marginBottom: '10px', color: '#888' }}>Order Items Details</h5>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #333' }}>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>File</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Specs</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Qty</th>
                                        <th style={{ padding: '8px', textAlign: 'left' }}>Unit Price (LKR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileDetails.map((f, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                                            <td style={{ padding: '8px' }}>
                                                <span style={{ fontFamily: 'monospace', color: '#ffa415' }}>[{f.ref || 'N/A'}]</span> {f.file}
                                            </td>
                                            <td style={{ padding: '8px', color: '#bbb' }}>{f.material} | {f.color} | {f.infill}% Inf | {f.supports}</td>
                                            <td style={{ padding: '8px' }}>{f.qty}</td>
                                            <td style={{ padding: '8px' }}>
                                                <input
                                                    type="number"
                                                    value={f.price || 0}
                                                    onChange={(e) => updateFilePrice(i, parseFloat(e.target.value))}
                                                    style={{ ...inlineInputStyle, width: '100px' }}
                                                />
                                            </td>
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

// Styles
const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(23, 23, 23, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '30px'
};

const tabStyle: React.CSSProperties = {
    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #333',
    backgroundColor: 'transparent', color: '#888', display: 'flex', alignItems: 'center'
};

const activeTabStyle: React.CSSProperties = {
    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #ffa415',
    backgroundColor: '#ffa415', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center',
    boxShadow: '0 0 15px rgba(255, 164, 21, 0.3)'
};

const tableStyle: React.CSSProperties = {
    width: '100%', borderCollapse: 'collapse', marginTop: '20px'
};

const thStyle: React.CSSProperties = {
    textAlign: 'left', padding: '15px', borderBottom: '1px solid #333', color: '#ffa415', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'
};

const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', marginBottom: '5px'
};

const tdStyle: React.CSSProperties = {
    padding: '15px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', verticalAlign: 'middle'
};

const trStyle: React.CSSProperties = {
    transition: 'background 0.2s'
};

const refreshBtnStyle: React.CSSProperties = {
    backgroundColor: '#333', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
};

const actionBtnStyle: React.CSSProperties = {
    backgroundColor: '#ffa415', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'
};

const selectStyle: React.CSSProperties = {
    backgroundColor: '#111', color: '#fff', border: '1px solid #333', padding: '5px', borderRadius: '4px', cursor: 'pointer', width: '100%'
};

const inputStyle: React.CSSProperties = {
    backgroundColor: '#111', color: '#fff', border: '1px solid #333', padding: '8px 12px', borderRadius: '4px'
};

const inlineInputStyle: React.CSSProperties = {
    backgroundColor: '#000', color: '#ffa415', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px', fontSize: '13px'
};

const saveBtnStyle: React.CSSProperties = {
    backgroundColor: '#222', color: '#ffa415', border: '1px solid #ffa415', padding: '8px', borderRadius: '4px', cursor: 'pointer'
};

// Modal Styles
const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
};

const modalContentStyle: React.CSSProperties = {
    width: '100%', maxWidth: '500px', height: '80vh', backgroundColor: '#121212', borderRadius: '12px',
    display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

const modalHeaderStyle: React.CSSProperties = {
    padding: '20px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};

const avatarStyle: React.CSSProperties = {
    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffa415', color: '#000',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
};

const closeBtnStyle: React.CSSProperties = {
    backgroundColor: 'transparent', border: 'none', color: '#888', fontSize: '24px', cursor: 'pointer'
};

const chatHistoryStyle: React.CSSProperties = {
    flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column'
};

const chatInputAreaStyle: React.CSSProperties = {
    padding: '20px', backgroundColor: '#1a1a1a', borderTop: '1px solid #333', display: 'flex', gap: '10px'
};

const chatInputStyle: React.CSSProperties = {
    flex: 1, padding: '12px 15px', borderRadius: '25px', border: '1px solid #333', backgroundColor: '#0a0a0a', color: '#fff', outline: 'none'
};

const sendBtnStyle: React.CSSProperties = {
    width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#ffa415', color: '#000',
    border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const dropZoneStyle: React.CSSProperties = {
    border: '2px dashed #333',
    borderRadius: '16px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255,255,255,0.02)'
};

const removeImgBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 76, 76, 0.9)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px'
};
