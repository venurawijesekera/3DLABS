'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ShopPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Default Sorting');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', '3D Printer', 'Filament', 'Resin', 'Accessories', 'Custom Prints'];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            (p.labels && p.labels.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    // Simple sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Newest') return b.id - a.id;
        return 0;
    });

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '120px 20px 60px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Header & Controls */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>
                                3D Labs <span style={{ color: '#ffa415' }}>Shop</span>
                            </h1>
                            <p style={{ color: '#888', marginTop: '10px' }}>Showing 1–{sortedProducts.length} of {products.length} results</p>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <div style={filterGroupStyle}>
                                <label style={labelStyle}>Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={selectStyle}
                                >
                                    <option>Default Sorting</option>
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Search & Category Tabs */}
                    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', flex: 1 }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    style={{
                                        ...categoryBtnStyle,
                                        backgroundColor: category === cat ? '#ffa415' : 'rgba(255,255,255,0.05)',
                                        color: category === cat ? '#000' : '#fff',
                                        borderColor: category === cat ? '#ffa415' : 'rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={searchInputStyle}
                            />
                            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#555' }}></i>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
                        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '40px', color: '#ffa415' }}></i>
                        <p style={{ marginTop: '20px' }}>Loading Amazing Products...</p>
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: '#888', border: '1px dashed #333', borderRadius: '20px' }}>
                        <i className="fa-solid fa-box-open" style={{ fontSize: '40px', marginBottom: '15px' }}></i>
                        <p>No products found matching your criteria.</p>
                        <button onClick={() => { setSearch(''); setCategory('All'); }} style={{ color: '#ffa415', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear Filters</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                        {sortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                ::-webkit-scrollbar {
                    height: 5px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

function ProductCard({ product }: { product: any }) {
    const discount = product.original_price > product.price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0;

    let imageUrl = '/assets/img/3logo.webp';
    try {
        const imgs = JSON.parse(product.images || '[]');
        if (imgs.length > 0) imageUrl = imgs[0];
    } catch (e) {
        if (product.image_url) imageUrl = product.image_url;
    }

    const handleBuy = () => {
        const text = encodeURIComponent(`Hi 3D Labs! I want to buy: ${product.name} (LKR ${product.price.toLocaleString()})`);
        window.open(`https://wa.me/94770415307?text=${text}`, '_blank');
    };

    return (
        <div className="product-card" style={cardStyle}>
            <div style={imageContainerStyle}>
                <img src={imageUrl} alt={product.name} style={imageStyle} />
                {discount > 0 && <div style={badgeStyle}>{discount}% OFF</div>}
                <div className="card-overlay" style={overlayStyle}>
                    <button onClick={handleBuy} style={actionBtnStyle}>
                        <i className="fa-brands fa-whatsapp"></i> Buy on WhatsApp
                    </button>
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                    <span style={{ fontSize: '11px', color: '#ffa415', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px' }}>{product.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#ffa415' }}>
                        <i className="fa-solid fa-star"></i>
                        <span>{product.rating || '5.0'}</span>
                    </div>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#fff' }}>{product.name}</h3>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                    {product.brand_name && <span>{product.brand_name}</span>}
                    {product.brand_name && product.material && <span style={{ margin: '0 5px' }}>|</span>}
                    {product.material && <span>{product.material}</span>}
                </div>
                <p style={{ fontSize: '13px', color: '#888', margin: '0 0 15px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px' }}>
                    {product.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>LKR {product.price.toLocaleString()}</span>
                        {product.original_price > 0 && (
                            <span style={{ fontSize: '14px', color: '#666', textDecoration: 'line-through', marginLeft: '10px' }}>LKR {product.original_price.toLocaleString()}</span>
                        )}
                    </div>
                    <Link href={`/instant-quote`} style={{ color: '#ffa415', fontSize: '12px', textDecoration: 'none' }}>
                        Custom Quote <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }}></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .product-card:hover .card-overlay {
                    opacity: 1;
                }
                .product-card {
                    transition: transform 0.3s ease, border-color 0.3s ease;
                }
                .product-card:hover {
                    transform: translateY(-10px);
                    border-color: rgba(255, 164, 21, 0.3) !important;
                }
            `}</style>
        </div>
    );
}

// Styles
const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(23, 23, 23, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative'
};

const imageContainerStyle: React.CSSProperties = {
    height: '220px',
    backgroundColor: '#1a1a1a',
    position: 'relative',
    overflow: 'hidden'
};

const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
};

const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '15px',
    left: '15px',
    backgroundColor: '#ff4c4c',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 'bold',
    zIndex: 2
};

const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'all 0.3s ease',
    zIndex: 1
};

const actionBtnStyle: React.CSSProperties = {
    backgroundColor: '#25d366',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
};

const filterGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
};

const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px'
};

const selectStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '12px',
    outline: 'none',
    fontSize: '14px'
};

const categoryBtnStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s'
};

const searchInputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    padding: '12px 15px',
    height: '46px',
    borderRadius: '12px',
    outline: 'none',
    fontSize: '14px'
};
