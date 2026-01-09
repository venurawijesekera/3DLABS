'use client';

export const runtime = 'edge';

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
                <div style={breadcrumbsStyle}>
                    <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>{product.name}</span>
                </div>

                <div style={gridStyle}>
                    {/* Left Column: Images */}
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
                                        borderColor: mainImage === img ? '#ffa415' : 'transparent',
                                        opacity: mainImage === img ? 1 : 0.6
                                    }}
                                >
                                    <img src={img} alt={`${product.name} thumbnail ${i}`} style={thumbImgStyle} />
                                </div>
                            ))}
                        </div>

                        {/* Description Card (Matches Nike style) */}
                        <div style={cardStyle}>
                            <h4 style={cardHeaderStyle}>Description <i className="fa-solid fa-chevron-up" style={{ fontSize: '12px' }}></i></h4>
                            <p style={cardBodyStyle}>{product.description}</p>
                        </div>

                        <div style={cardStyle}>
                            <h4 style={cardHeaderStyle}>Shipping <i className="fa-solid fa-chevron-down" style={{ fontSize: '12px' }}></i></h4>
                        </div>
                    </div>

                    {/* Right Column: Buying Options */}
                    <div style={infoSectionStyle}>
                        <div style={{ ...cardStyle, padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h1 style={{ ...titleStyle, margin: 0 }}>{product.name}</h1>
                                <i className="fa-regular fa-heart" style={{ fontSize: '24px', color: '#888', cursor: 'pointer' }}></i>
                            </div>

                            <div style={ratingRowStyle}>
                                <div style={ratingStarsStyle}>
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <i key={s} className="fa-solid fa-star" style={{ color: '#ffa415' }}></i>
                                    ))}
                                </div>
                                <span style={{ color: '#888', fontSize: '14px' }}>4.9 (42) New Reviews</span>
                            </div>

                            {/* Color Selection Placeholder */}
                            <div style={selectionGroupStyle}>
                                <div style={selectionLabelStyle}>Material / Brand</div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={pillStyle}>{product.material || 'PLA'}</div>
                                    <div style={pillStyle}>{product.brand_name || '3D Labs'}</div>
                                </div>
                            </div>

                            {/* Variants Selection */}
                            {product.has_variants === 1 && variants.length > 0 && (
                                <div style={selectionGroupStyle}>
                                    <div style={selectionLabelStyle}>Choose Variant</div>
                                    <div style={variantsGridStyle}>
                                        {variants.map((v: any, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedVariant(v)}
                                                style={variantButtonStyle(selectedVariant?.name === v.name)}
                                            >
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price & Buy Section (Matches Nike style) */}
                            <div style={priceBuyCardStyle}>
                                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                                    LKR {currentPrice.toLocaleString()}
                                </div>
                                <button onClick={handleBuy} style={buyNowBtnStyle}>
                                    Buy Now <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div style={{ ...cardStyle, marginTop: '20px' }}>
                            <h4 style={cardHeaderStyle}>Reviews (42) <span style={{ marginLeft: 'auto', fontWeight: 'normal', fontSize: '13px', color: '#ffa415', cursor: 'pointer' }}>See more</span></h4>
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontWeight: 'bold' }}>Alexander S.</span>
                                            <span style={{ fontSize: '12px', color: '#555' }}>10/01/2026</span>
                                        </div>
                                        <div style={{ color: '#ffa415', fontSize: '10px', marginBottom: '5px' }}>
                                            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>This is exactly what I was looking for. The quality is amazing!</p>
                                    </div>
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

const relatedSectionStyle: React.CSSProperties = {
    marginTop: '80px',
    paddingTop: '60px',
    borderTop: '1px solid #eee',
};

const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '20px',
    color: '#000',
    border: '1px solid #eee',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    marginBottom: '20px',
};

const cardHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: 0,
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '15px',
};

const cardBodyStyle: React.CSSProperties = {
    paddingTop: '15px',
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
};

const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#000',
    lineHeight: '1.2',
};

const ratingRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
};

const ratingStarsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2px',
    fontSize: '12px',
};

const selectionGroupStyle: React.CSSProperties = {
    marginTop: '25px',
};

const selectionLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
};

const pillStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '30px',
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
};

const priceBuyCardStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px',
    padding: '10px',
    backgroundColor: '#000',
    borderRadius: '40px',
    color: '#fff',
};

const buyNowBtnStyle: React.CSSProperties = {
    padding: '12px 25px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

const variantButtonStyle = (selected: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    borderRadius: '30px',
    backgroundColor: selected ? '#000' : '#f5f5f5',
    color: selected ? '#fff' : '#000',
    border: 'none',
    fontWeight: '500',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
});

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 480px)',
    gap: '30px',
};

const gallerySectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
};

const mainImageContainerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '4/5',
    borderRadius: '24px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
};

const mainImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
};

const thumbnailsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '15px',
};

const thumbnailStyle: React.CSSProperties = {
    aspectRatio: '1/1',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
    backgroundColor: '#f5f5f5',
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

const variantsGridStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
};

const relatedContainerStyle: React.CSSProperties = {
    marginTop: '80px',
    paddingTop: '60px',
    borderTop: '1px solid #eee',
};

const relatedGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '25px',
};

const relatedCardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid #eee',
    transition: 'transform 0.3s ease',
    boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
};

const relatedImgStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover',
};

const relatedTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000',
    margin: '0 0 5px 0',
};

const relatedPriceStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#ffa415',
    fontWeight: 'bold',
};
