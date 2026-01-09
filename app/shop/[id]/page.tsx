'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch current product
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if (data.id) {
                    setProduct(data);
                    const images = JSON.parse(data.images || '[]');
                    setMainImage(images[0] || '/assets/img/3logo.webp');

                    // Set initial variant if exists
                    const variants = JSON.parse(data.variants || '[]');
                    if (variants.length > 0) {
                        setSelectedVariant(variants[0]);
                    }

                    // Fetch related products (same category)
                    const allRes = await fetch('/api/products');
                    const allData = await allRes.json();
                    setRelatedProducts(allData.filter((p: any) => p.category === data.category && p.id !== data.id).slice(0, 4));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="loader">Loading...</div>
        </div>
    );

    if (!product) return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2>Product Not Found</h2>
            <Link href="/shop" style={{ color: '#ffa415', marginTop: '20px' }}>Back to Shop</Link>
        </div>
    );

    const images = JSON.parse(product.images || '[]');
    const variants = JSON.parse(product.variants || '[]');
    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock_status;

    const handleBuy = () => {
        let variantText = '';
        if (selectedVariant) {
            variantText = ` (Variant: ${selectedVariant.name})`;
        }
        const text = encodeURIComponent(`Hi 3D Labs! I want to buy: ${product.name}${variantText} - LKR ${currentPrice.toLocaleString()}`);
        window.open(`https://wa.me/94770415307?text=${text}`, '_blank');
    };

    return (
        <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
            <Header />

            <main style={containerStyle}>
                {/* Breadcrumbs */}
                <div style={breadcrumbsStyle}>
                    <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>{product.name}</span>
                </div>

                <div style={gridStyle}>
                    {/* Left: Image Gallery */}
                    <div style={gallerySectionStyle}>
                        <div style={mainImageContainerStyle}>
                            <img src={mainImage} alt={product.name} style={mainImageStyle} />
                        </div>
                        <div style={thumbnailsGridStyle}>
                            {images.map((img: string, i: number) => (
                                <div
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    style={{
                                        ...thumbnailStyle,
                                        borderColor: mainImage === img ? '#ffa415' : 'transparent'
                                    }}
                                >
                                    <img src={img} alt={`${product.name} thumbnail ${i}`} style={thumbImgStyle} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div style={infoSectionStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={categoryBadgeStyle}>{product.category}</span>
                            <div style={ratingStyle}>
                                <i className="fa-solid fa-star"></i>
                                <span>{product.rating || '5.0'}</span>
                                <span style={{ color: '#555', marginLeft: '5px' }}>(42 Reviews)</span>
                            </div>
                        </div>

                        <h1 style={titleStyle}>{product.name}</h1>

                        <div style={specsRowStyle}>
                            {product.brand_name && (
                                <div style={specItemStyle}>
                                    <span style={specLabelStyle}>Brand</span>
                                    <span style={specValueStyle}>{product.brand_name}</span>
                                </div>
                            )}
                            {product.material && (
                                <div style={specItemStyle}>
                                    <span style={specLabelStyle}>Material</span>
                                    <span style={specValueStyle}>{product.material}</span>
                                </div>
                            )}
                        </div>

                        <div style={priceContainerStyle}>
                            <div style={priceSectionStyle}>
                                <span style={priceLabelStyle}>Price</span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                                    <span style={priceStyle}>LKR {currentPrice.toLocaleString()}</span>
                                    {product.original_price > currentPrice && (
                                        <span style={originalPriceStyle}>LKR {product.original_price.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                            <div style={stockStatusStyle(currentStock)}>
                                {currentStock === 'Out of Stock' ? 'Unavailable' : 'In Stock'}
                            </div>
                        </div>

                        {/* Variants Selector */}
                        {product.has_variants === 1 && variants.length > 0 && (
                            <div style={variantsContainerStyle}>
                                <h4 style={sectionTitleStyle}>Choose Variant</h4>
                                <div style={variantsGridStyle}>
                                    {variants.map((v: any, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedVariant(v)}
                                            style={variantButtonStyle(selectedVariant?.name === v.name)}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {v.color && (
                                                    <span style={{
                                                        width: '12px', height: '12px', borderRadius: '50%',
                                                        backgroundColor: v.color, border: '1px solid rgba(255,255,255,0.2)'
                                                    }} />
                                                )}
                                                {v.name}
                                            </div>
                                            <span style={{ fontSize: '12px', opacity: 0.7 }}>LKR {v.price.toLocaleString()}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={descriptionContainerStyle}>
                            <h4 style={sectionTitleStyle}>Description</h4>
                            <p style={descriptionStyle}>{product.description}</p>
                        </div>

                        <div style={buySectionStyle}>
                            <button onClick={handleBuy} style={buyBtnStyle}>
                                <i className="fa-brands fa-whatsapp" style={{ fontSize: '20px' }}></i>
                                Buy on WhatsApp
                            </button>
                        </div>

                        {/* Delivery & Warranty Tabs */}
                        <div style={policySectionStyle}>
                            <div style={policyItemStyle}>
                                <i className="fa-solid fa-truck-fast" style={policyIconStyle}></i>
                                <div>
                                    <div style={policyTitleStyle}>Shipping & Delivery</div>
                                    <div style={policyTextStyle}>{product.shipping_delivery || 'Standard Delivery within 2-3 business days.'}</div>
                                </div>
                            </div>
                            <div style={policyItemStyle}>
                                <i className="fa-solid fa-shield-check" style={policyIconStyle}></i>
                                <div>
                                    <div style={policyTitleStyle}>Warranty Information</div>
                                    <div style={policyTextStyle}>{product.warranty || 'No explicit warranty provided.'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div style={relatedSectionStyle}>
                        <h2 style={{ fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>More You May Need</h2>
                        <div style={relatedGridStyle}>
                            {relatedProducts.map(p => (
                                <Link href={`/shop/${p.id}`} key={p.id} style={{ textDecoration: 'none' }}>
                                    <div style={relatedCardStyle}>
                                        <img
                                            src={JSON.parse(p.images || '[]')[0] || '/assets/img/3logo.webp'}
                                            alt={p.name}
                                            style={relatedImgStyle}
                                        />
                                        <div style={{ padding: '15px' }}>
                                            <h4 style={relatedTitleStyle}>{p.name}</h4>
                                            <div style={relatedPriceStyle}>LKR {p.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />

            <style jsx>{`
                .loader {
                    border: 3px solid #111;
                    border-top: 3px solid #ffa415;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
};

const breadcrumbsStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#888',
    marginBottom: '30px',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 450px)',
    gap: '60px',
};

const gallerySectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
};

const mainImageContainerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1/1',
    borderRadius: '24px',
    overflow: 'hidden',
    backgroundColor: '#050505',
    border: '1px solid rgba(255,255,255,0.05)',
};

const mainImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

const thumbnailsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
};

const thumbnailStyle: React.CSSProperties = {
    aspectRatio: '1/1',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
    backgroundColor: '#050505',
};

const thumbImgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

const infoSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
};

const categoryBadgeStyle: React.CSSProperties = {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#ffa415',
    fontWeight: 'bold',
};

const ratingStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#ffa415',
};

const titleStyle: React.CSSProperties = {
    fontSize: '42px',
    fontWeight: '800',
    margin: '10px 0 20px 0',
    lineHeight: '1.2',
    color: '#fff',
};

const specsRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
};

const specItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
};

const specLabelStyle: React.CSSProperties = {
    fontSize: '11px',
    textTransform: 'uppercase',
    color: '#555',
    fontWeight: 'bold',
};

const specValueStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#fff',
};

const priceContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '25px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    marginBottom: '30px',
};

const priceSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
};

const priceLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#888',
};

const priceStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ffa415',
};

const originalPriceStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#555',
    textDecoration: 'line-through',
};

const stockStatusStyle = (status: string): React.CSSProperties => ({
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: status === 'Out of Stock' ? 'rgba(255,76,76,0.1)' : 'rgba(76,255,166,0.1)',
    color: status === 'Out of Stock' ? '#ff4c4c' : '#4cffa6',
    border: `1px solid ${status === 'Out of Stock' ? 'rgba(255,76,76,0.2)' : 'rgba(76,255,166,0.2)'}`,
});

const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#fff',
};

const variantsContainerStyle: React.CSSProperties = {
    marginBottom: '30px',
};

const variantsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
};

const variantButtonStyle = (selected: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px',
    padding: '12px 15px',
    borderRadius: '12px',
    backgroundColor: selected ? 'rgba(255,164,21,0.1)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${selected ? '#ffa415' : 'rgba(255,255,255,0.05)'}`,
    color: selected ? '#ffa415' : '#888',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
});

const descriptionContainerStyle: React.CSSProperties = {
    marginBottom: '30px',
};

const descriptionStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#aaa',
    lineHeight: '1.6',
};

const buySectionStyle: React.CSSProperties = {
    marginBottom: '40px',
};

const buyBtnStyle: React.CSSProperties = {
    width: '100%',
    padding: '18px',
    borderRadius: '16px',
    backgroundColor: '#ffa415',
    color: '#000',
    fontSize: '18px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
};

const policySectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
};

const policyItemStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px',
};

const policyIconStyle: React.CSSProperties = {
    fontSize: '20px',
    color: '#ffa415',
    marginTop: '3px',
};

const policyTitleStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#fff',
};

const policyTextStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#777',
};

const relatedSectionStyle: React.CSSProperties = {
    marginTop: '80px',
    paddingTop: '60px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
};

const relatedGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '25px',
};

const relatedCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)',
    transition: 'transform 0.3s ease',
};

const relatedImgStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover',
};

const relatedTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 0 5px 0',
};

const relatedPriceStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#ffa415',
    fontWeight: 'bold',
};
