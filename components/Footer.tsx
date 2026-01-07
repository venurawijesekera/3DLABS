'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/login') return null;

    return (
        <footer className="cs_fooer cs_bg_filed" style={{ backgroundImage: "url('/assets/img/footer.webp')" }}>
            <div className="cs_fooer_main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="cs_footer_item">
                                <div className="cs_text_widget">
                                    <img src="/assets/img/3logo.webp" alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '20px' }} />
                                </div>
                                <ul className="cs_menu_widget cs_mp0">
                                    <li>Kandy & Colombo, Sri Lanka<br />Island Wide Delivery Available.</li>
                                    <li>+94 70 700 0007</li>
                                    <li>+94 70 600 0006</li>
                                    <li>3dlabs@technotronicfuturistics.com</li>
                                    <li>info@technotronicfuturistics.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="cs_footer_item">
                                <h2 className="cs_widget_title">Services</h2>
                                <ul className="cs_menu_widget cs_mp0">
                                    <li><Link href="/fdm">FDM</Link></li>
                                    <li><Link href="/sla">SLA</Link></li>
                                    <li><Link href="/sls">SLS</Link></li>
                                    <li><Link href="/dmls">DMLS</Link></li>
                                    <li><Link href="/laser">Laser Cutting</Link></li>
                                    <li><Link href="/carbon">Carbon Fiber</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="cs_footer_item">
                                <h2 className="cs_widget_title">Links</h2>
                                <ul className="cs_menu_widget cs_mp0">
                                    <li><a href="https://technotronicfuturistics.com" target="_blank">Technotronic Futuristics</a></li>
                                    <li><Link href="/about">About</Link></li>
                                    <li><Link href="/service">Services</Link></li>
                                    <li><Link href="/gallery">Gallery</Link></li>
                                    <li><Link href="/blog">Blog</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="cs_footer_item">
                                <h2 className="cs_widget_title">Subscribe Newsletter </h2>
                                <div className="cs_newsletter cs_style_1">
                                    <div className="cs_newsletter_text"> We make sure to only send emails that are noteworthy and pertinent to the recipient.</div>
                                    <form action="#" className="cs_newsletter_form">
                                        <input type="email" className="cs_newsletter_input" placeholder="Email address" />
                                        <button className="cs_btn cs_style_1">
                                            Submit
                                            <span><i className="fa-solid fa-arrow-right"></i></span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="cs_bottom_footer">
                    <div className="cs_bottom_footer_left">
                        <div className="cs_social_btns cs_style_1">
                            <a href="https://www.instagram.com/3dlabs_tf" className="cs_center"><i className="fa-brands fa-instagram"></i></a>
                            <a href="https://www.facebook.com/TechnotronicFuturistics/" className="cs_center"><i className="fa-brands fa-facebook"></i></a>
                            <a href="https://www.linkedin.com/company/technotronic-futuristics/" className="cs_center"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="https://twitter.com/TECHNOTRONIC19?t=T4TO-WtHNM7aj0QcV3W2oA&s=09" className="cs_center"><i className="fa-brands fa-twitter"></i></a>
                        </div>
                    </div>
                    <div className="cs_copyright">
                        Copyright © 2025 3D LABS by
                        <a href="https://www.technotronicfuturistics.com" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>TECHNOTRONIC FUTURISTICS</a>. All rights reserved.
                    </div>
                    <div className="cs_bottom_footer_right">
                        <ul className="cs_footer_links cs_mp0">
                            <li><Link href="/terms-of-use">Terms of Use</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
