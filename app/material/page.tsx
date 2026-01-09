'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Material() {
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/materials')
            .then(res => res.json())
            .then(data => {
                setMaterials(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="cs_height_50 cs_height_lg_30"></div>
            <div className="cs_height_30 cs_height_lg_30"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 text-center">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">MATERIALS</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">More than 30+ Materials <br />to select from.</h2>
                </div>
                <div className="cs_shape_5">
                    <img src="/assets/img/icons/blog.svg" alt="Icon" />
                </div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            {/* Start Blog List */}
            <section>
                <div className="container">
                    <div className="row cs_gap_y_60">
                        <div className="col-lg-8">
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                                <Link href="/material" className="cs_btn cs_style_1">ALL<span><i className="fa-solid fa-arrow-right"></i></span></Link>
                                <Link href="/material" className="cs_btn cs_style_1">FDM<span><i className="fa-solid fa-arrow-right"></i></span></Link>
                                <Link href="/material" className="cs_btn cs_style_1">SLA<span><i className="fa-solid fa-arrow-right"></i></span></Link>
                                <Link href="/material" className="cs_btn cs_style_1">SLS<span><i className="fa-solid fa-arrow-right"></i></span></Link>
                                <Link href="/material" className="cs_btn cs_style_1">DMLS<span><i className="fa-solid fa-arrow-right"></i></span></Link>
                            </div>

                            {loading ? (
                                <div className="text-center">Loading materials...</div>
                            ) : (
                                materials.map((item, index) => (
                                    <div key={index} className="cs_post cs_style_4">
                                        <div className="cs_post_thumb_wrap position-relative">
                                            <Link href={`/${item.slug}`} className="cs_post_thumb cs_radius_5">
                                                <img src={item.image || '/assets/img/3logo.webp'} alt={item.name} />
                                            </Link>
                                            <div className="cs_categories">
                                                <Link href={`/${item.slug}`} className="cs_category">{item.tag}</Link>
                                            </div>
                                        </div>
                                        <h2 className="cs_post_title cs_fs_50"><Link href={`/${item.slug}`}>{item.name}</Link></h2>
                                        <p className="cs_post_subtitle">{item.short_description || item.description}</p>
                                        <Link href={`/${item.slug}`} className="cs_post_btn">
                                            <span>Read More</span>
                                            <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9H50V7H0V9Z" fill="currentColor" />
                                            </svg>
                                        </Link>
                                    </div>
                                ))
                            )}

                            <div className="cs_height_95 cs_height_lg_50"></div>
                            <div className="text-center">
                                <a href="#" className="cs_btn cs_style_1">Back To Top <span><i className="fa-solid fa-arrow-right"></i></span></a>
                            </div>
                        </div>

                        <div className="col-lg-3 offset-lg-1">
                            <div className="cs-sidebar cs-right_sidebar cs-accent_5_bg_2">
                                <div className="cs-sidebar_item widget_search">
                                    <h4 className="cs-sidebar_widget_title">Search</h4>
                                    <form className="cs-sidebar_search" action="#">
                                        <input type="text" placeholder="Search..." />
                                        <button className="cs-sidebar_search_btn">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z" fill="currentColor"></path>
                                            </svg>
                                        </button>
                                    </form>
                                </div>

                                <div className="cs-sidebar_item">
                                    <h4 className="cs-sidebar_widget_title">Method</h4>
                                    <ul className="cs-recent_posts">
                                        <li>
                                            <div className="cs-recent_post">
                                                <Link href="#" className="cs-recent_post_thumb">
                                                    <div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: "url('/assets/img/minilogo/FDM.webp')" }}></div>
                                                </Link>
                                                <div className="cs-recent_post_info">
                                                    <h3 className="cs-recent_post_title">
                                                        <Link href="#">FDM</Link>
                                                    </h3>
                                                    <div className="cs-recent_post_date cs-primary_40_color">Fused Deposition Modeling</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="cs-recent_post">
                                                <Link href="#" className="cs-recent_post_thumb">
                                                    <div className="cs-recent_post_thumb_in cs-bg" style={{ backgroundImage: "url('/assets/img/minilogo/SLA.webp')" }}></div>
                                                </Link>
                                                <div className="cs-recent_post_info">
                                                    <h3 className="cs-recent_post_title">
                                                        <Link href="#">SLA</Link>
                                                    </h3>
                                                    <div className="cs-recent_post_date cs-primary_40_color">Stereolithography</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="cs-sidebar_item widget_tag_cloud">
                                    <h4 className="cs-sidebar_widget_title">Tags</h4>
                                    <div className="tagcloud">
                                        <Link href="#" className="tag-cloud-link">Prototyping</Link>
                                        <Link href="#" className="tag-cloud-link">Engineering</Link>
                                        <Link href="#" className="tag-cloud-link">Medical</Link>
                                        <Link href="#" className="tag-cloud-link">Food Safe</Link>
                                        <Link href="#" className="tag-cloud-link">Electronics</Link>
                                        <Link href="#" className="tag-cloud-link">Bio-Compatible</Link>
                                        <Link href="#" className="tag-cloud-link">Chemical Resistive</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cs_height_150 cs_height_lg_80"></div>
            </section>
            {/* End Blog List */}
        </>
    );
}
