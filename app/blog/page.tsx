import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '3D LABS - Blog',
};

export default function Blog() {
    return (
        <>
            <div className="cs_height_140 cs_height_lg_80"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 text-center">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">Recent Blog</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">Stay up to date with our <br />latest blog post</h2>
                </div>
                <div className="cs_shape_5">
                    <img src="/assets/img/icons/blog.svg" alt="Icon" />
                </div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            <section>
                <div className="container">

                    <div className="cs_post cs_style_3 cs_primary_bg">
                        <div className="cs_post_left">
                            <div className="cs_categories">
                                <Link href="#" className="cs_category">FDM</Link>
                            </div>
                            <h2 className="cs_post_title cs_fs_50 cs_white_color"><Link href="/blog/multi-material-prints">Multi Material 3D Printing: Why It Matters and Why You Should Use It</Link></h2>
                            <p className="cs_post_subtitle">Multi material 3D printing is reshaping how functional products are designed and manufactured. By combining different materials within a single print, we can tailor strength, flexibility, and durability exactly where they’re needed.</p>
                            <Link href="/blog/multi-material-prints" className="cs_post_btn">
                                <span>Read More</span>
                                <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9H50V7H0V9Z" fill="currentColor" />
                                </svg>
                            </Link>
                        </div>
                        <div className="cs_post_right">
                            <Link href="/blog/multi-material-prints" className="cs_post_thumb cs_bg_filed" style={{ backgroundImage: "url('/assets/img/blog/castor1.webp')" }}></Link>
                        </div>
                    </div>

                    <div className="cs_post cs_style_3 cs_primary_bg">
                        <div className="cs_post_left">
                            <div className="cs_categories">
                                <Link href="#" className="cs_category">SLA</Link>
                            </div>
                            <h2 className="cs_post_title cs_fs_50 cs_white_color"><Link href="/blog/high-temperature-molds">High Temperature SLA 3D Printed Molds: Fast, Accurate & Cost Effective Tooling</Link></h2>
                            <p className="cs_post_subtitle">Traditional mold fabrication is slow and expensive. High temperature SLA 3D printing allows for precise, durable molds in a fraction of the time, perfect for low volume production and rapid prototyping.</p>
                            <Link href="/blog/high-temperature-molds" className="cs_post_btn">
                                <span>Read More</span>
                                <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9H50V7H0V9Z" fill="currentColor" />
                                </svg>
                            </Link>
                        </div>
                        <div className="cs_post_right">
                            <Link href="/blog/high-temperature-molds" className="cs_post_thumb cs_bg_filed" style={{ backgroundImage: "url('/assets/img/blog/mold1.webp')" }}></Link>
                        </div>
                    </div>

                    <div className="cs_post cs_style_3 cs_primary_bg">
                        <div className="cs_post_left">
                            <div className="cs_categories">
                                <Link href="#" className="cs_category">SLA</Link>
                            </div>
                            <h2 className="cs_post_title cs_fs_50 cs_white_color"><Link href="/blog/skin-safe-medical-grade-parts">Skin Safe & Medical Grade 3D Printed Parts: Precision for Sensitive Diagnostic Devices</Link></h2>
                            <p className="cs_post_subtitle">Medical and ophthalmic diagnostic equipment rely on components that must be accurate, stable, and safe. We specialize in producing skin safe, medical grade components using advanced resin 3D printing to ensure patient safety and device precision.</p>
                            <Link href="/blog/skin-safe-medical-grade-parts" className="cs_post_btn">
                                <span>Read More</span>
                                <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9H50V7H0V9Z" fill="currentColor" />
                                </svg>
                            </Link>
                        </div>
                        <div className="cs_post_right">
                            <Link href="/blog/skin-safe-medical-grade-parts" className="cs_post_thumb cs_bg_filed" style={{ backgroundImage: "url('/assets/img/blog/medical1.webp')" }}></Link>
                        </div>
                    </div>

                    <div className="cs_height_150 cs_height_lg_80"></div>
                </div>
            </section>
        </>
    );
}
