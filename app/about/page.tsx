import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '3D LABS - About Us',
};

export default function About() {
    return (
        <>
            <div className="cs_height_50 cs_height_lg_30"></div>
            <div className="cs_height_30 cs_height_lg_30"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 text-center">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">About Us</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">Adding value to your business, <br />making it worthy</h2>
                </div>
                <div className="cs_shape_1"></div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            {/* Start Company Info */}
            <div className="cs_about cs_style_1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="cs_about_thumb cs_bg_filed" style={{ backgroundImage: "url('/assets/img/3d-labs/bend948x600.png')" }}></div>
                        </div>
                        <div className="col-lg-5 offset-lg-1">
                            <div className="cs_section_heading cs_style_1">
                                <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0">What we do?</p>
                                <div className="cs_height_10 cs_height_lg_5"></div>
                                <h2 className="cs_section_title cs_fs_50 mb-0">Additive Manufacturing Service</h2>
                                <div className="cs_height_24 cs_height_lg_24"></div>
                                <p>At 3D LABS, we are passionate about 3D printing and its potential to revolutionize manufacturing. Our online store offers a wide range of high-quality 3D printing services, allowing you to bring your ideas to life in a matter of days. Whether you are a small business owner or a hobbyist, we have the expertise and cutting-edge technology to help you create stunning, functional products.</p>
                                <div className="cs_height_20 cs_height_lg_20"></div>
                                <Link href="/service" className="cs_btn cs_style_1">
                                    See Our Services
                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Company Info */}

            {/* Start Counter */}
            <div className="cs_height_125 cs_height_lg_70"></div>
            <div className="container">
                <div className="cs_counter_1_wrap">
                    <div className="cs_counter cs_style_1 position-relative d-flex align-items-center">
                        <div className="cs_counter_nmber mb-0 cs_fs_68 d-flex align-items-center cs_bold cs_primary_color"><span data-count-to="30" className="odometer"></span>+</div>
                        <p className="cs_counter_title mb-0">Materials To Select</p>
                    </div>
                    <div className="cs_counter cs_style_1 position-relative d-flex align-items-center">
                        <div className="cs_counter_nmber mb-0 cs_fs_68 d-flex align-items-center cs_bold cs_primary_color"><span data-count-to="15" className="odometer"></span>k</div>
                        <p className="cs_counter_title mb-0">Work’s Completed</p>
                    </div>
                    <div className="cs_counter cs_style_1 position-relative d-flex align-items-center">
                        <div className="cs_counter_nmber mb-0 cs_fs_68 d-flex align-items-center cs_bold cs_primary_color"><span data-count-to="92" className="odometer"></span>%</div>
                        <p className="cs_counter_title mb-0">Positive Feedback</p>
                    </div>
                    <div className="cs_counter cs_style_1 position-relative d-flex align-items-center">
                        <div className="cs_counter_nmber mb-0 cs_fs_68 d-flex align-items-center cs_bold cs_primary_color"><span data-count-to="40" className="odometer"></span>+</div>
                        <p className="cs_counter_title mb-0">Active 3D Printers</p>
                    </div>
                </div>
            </div>
            <div className="cs_height_125 cs_height_lg_70"></div>
            {/* End Counter */}

            {/* Start What We Do */}
            <div className="cs_about cs_style_2 cs_type_1">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="cs_section_heading cs_style_1">
                                <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">What We Do</p>
                                <div className="cs_height_10 cs_height_lg_5"></div>
                                <h2 className="cs_section_title cs_fs_50 mb-0">Best Value Service</h2>
                                <div className="cs_height_24 cs_height_lg_24"></div>
                                <p>At 3D LABS, we specialise in providing industrial-grade additive manufacturing services, from rapid prototyping to full-scale production.</p>
                                <div className="cs_height_30 cs_height_lg_30"></div>
                                <div className="cs_progressbar cs_style_1">
                                    <div className="cs_progressbar_heading d-flex justify-content-between align-items-center">
                                        <h3 className="cs_medium m-0 cs_fs_16">Print Accuracy</h3>
                                        <h3 className="cs_medium m-0 cs_fs_16">98%</h3>
                                    </div>
                                    <div className="cs_progress cs_gray_bg_2" data-progress="98">
                                        <div className="cs_progress_in cs_accent_bg cs_rounded_8 h-100"></div>
                                    </div>
                                </div>

                                <div className="cs_progressbar cs_style_1">
                                    <div className="cs_progressbar_heading d-flex justify-content-between align-items-center">
                                        <h3 className="cs_medium m-0 cs_fs_16">Batch Production</h3>
                                        <h3 className="cs_medium m-0 cs_fs_16">75%</h3>
                                    </div>
                                    <div className="cs_progress cs_gray_bg_2" data-progress="75">
                                        <div className="cs_progress_in cs_accent_bg cs_rounded_8 h-100"></div>
                                    </div>
                                </div>

                                <div className="cs_progressbar cs_style_1">
                                    <div className="cs_progressbar_heading d-flex justify-content-between align-items-center">
                                        <h3 className="cs_medium m-0 cs_fs_16">Repeat Clients</h3>
                                        <h3 className="cs_medium m-0 cs_fs_16">95%</h3>
                                    </div>
                                    <div className="cs_progress cs_gray_bg_2" data-progress="95">
                                        <div className="cs_progress_in cs_accent_bg cs_rounded_8 h-100"></div>
                                    </div>
                                </div>

                                <div className="cs_progressbar cs_style_1">
                                    <div className="cs_progressbar_heading d-flex justify-content-between align-items-center">
                                        <h3 className="cs_medium m-0 cs_fs_16">Customer Satisfaction</h3>
                                        <h3 className="cs_medium m-0 cs_fs_16">90%</h3>
                                    </div>
                                    <div className="cs_progress cs_gray_bg_2" data-progress="90">
                                        <div className="cs_progress_in cs_accent_bg cs_rounded_8 h-100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="cs_about_thumb">
                                <div className="cs_sales_card text-center">
                                    <h3 className="cs_fs_21 cs_semibold">Prototype to Production</h3>
                                    <h2 className="cs_fs_50 cs_accent_color"><span data-count-to="3" className="odometer"></span>X Faster</h2>
                                    <svg width="151" height="45" viewBox="0 0 151 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 44C5.42105 35.1111 19.2 18.321 38.9474 22.2716C63.6316 27.2099 59.9474 41.0371 72.8421 36.0988C85.7368 31.1605 86.1053 9.92598 96.4211 6.96302C104.674 4.59266 115.825 8.60911 120.368 10.9136L131.789 16.3457C137.193 18.8148 148 19.8025 148 4" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="148" cy="3" r="2.5" fill="#121212" stroke="#121212" />
                                    </svg>
                                </div>
                                <div className="cs_about_thumb_in cs_bg_filed" style={{ backgroundImage: "url('/assets/img/3d-labs/powersocket.png')" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cs_height_150 cs_height_lg_80"></div>

            {/* Start How we work */}
            <section className="cs_primary_bg">
                <div className="cs_height_150 cs_height_lg_70"></div>
                <div className="container">
                    <div className="cs_section_heading cs_style_4 text-center">
                        <div className="cs_height_10 cs_height_lg_5"></div>
                        <h2 className="cs_section_title cs_fs_50 mb-0 cs_white_color">
                            <span className="d-inline-flex position-relative wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">
                                Let Us Know How We Can Help
                                <svg width="84" height="77" viewBox="0 0 84 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M65.3624 15.1377C61.5058 17.236 58.2272 20.3009 54.5066 22.6275C50.8588 24.9056 47.4588 27.6547 44.151 30.3651C37.4432 35.8488 31.3183 42.2895 27.1848 49.9347C26.6359 50.9499 27.9765 52.0525 28.812 51.1879C34.7183 45.0338 40.785 39.0449 46.9536 33.1677C49.9554 30.2987 52.9992 27.4669 56.0852 24.6724C59.3492 21.7241 63.0941 19.3295 66.3144 16.3714C66.9847 15.7497 66.125 14.72 65.3624 15.1377Z" fill="#4F4747" />
                                    <path d="M82.9079 43.9094C78.5174 43.8868 74.167 44.9898 69.7856 45.2327C65.4914 45.4683 61.1869 46.2361 56.9819 47.0144C48.4608 48.5818 39.9886 51.2685 32.6796 55.9711C31.7091 56.5955 32.3514 58.208 33.5003 57.8537C41.6428 55.3126 49.8461 52.9935 58.0848 50.8214C62.0982 49.7565 66.1305 48.7445 70.1818 47.7855C74.4632 46.7776 78.8987 46.4868 83.1466 45.4494C84.0337 45.2281 83.7774 43.9114 82.9079 43.9094Z" fill="#4F4747" />
                                    <path d="M32.8229 0.855889C30.7094 4.70418 29.6042 9.05405 27.7283 13.0211C25.8876 16.9079 24.5097 21.0576 23.1886 25.1247C20.5027 33.362 18.824 42.09 19.4719 50.7569C19.558 51.9078 21.2816 52.1121 21.5181 50.9334C23.1675 42.5645 25.041 34.2482 27.0607 25.9708C28.0386 21.9353 29.0721 17.9084 30.1611 13.8902C31.3169 9.64629 33.1765 5.6089 34.2903 1.38044C34.5189 0.495243 33.2393 0.0925867 32.8229 0.855889Z" fill="#4F4747" />
                                </svg>
                            </span>
                        </h2>
                    </div>
                    <div className="cs_height_85 cs_height_lg_45"></div>
                    <div className="cs_working_process_wrap cs_center">
                        <div className="cs_working_process">
                            <div className="cs_working_process_col">
                                <div className="cs_iconbox cs_style_6 text-center cs_center">
                                    <div className="cs_iconbox_bg cs_bg_filed" style={{ backgroundImage: "url('/assets/img/others/process_1.png')" }}></div>
                                    <div className="cs_iconbox_in">
                                        <div className="cs_iconbox_icon"><img src="/assets/img/icons/search.svg" alt="Icon" /></div>
                                        <h2 className="cs_iconbox_title cs_white_color cs_fs_29">Research</h2>
                                        <p className="cs_iconbox_subtitle cs_gray_color_2 mb-0">We evaluate part functionality, load conditions, and material suitability, while benchmarking manufacturing methods to determine the most efficient additive approach.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cs_working_process_col">
                                <div className="cs_iconbox cs_style_6 text-center cs_center">
                                    <div className="cs_iconbox_bg cs_bg_filed" style={{ backgroundImage: "url('/assets/img/others/process_2.png')" }}></div>
                                    <div className="cs_iconbox_in">
                                        <div className="cs_iconbox_icon"><img src="/assets/img/icons/idea.svg" alt="Icon" /></div>
                                        <h2 className="cs_iconbox_title cs_white_color cs_fs_29">Discuss</h2>
                                        <p className="cs_iconbox_subtitle cs_gray_color_2 mb-0">We collaborate on design-for-additive principles, validate prototypes, and optimize geometries for strength, weight reduction, and production scalability.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cs_working_process_col">
                                <div className="cs_iconbox cs_style_6 text-center cs_center">
                                    <div className="cs_iconbox_bg cs_bg_filed" style={{ backgroundImage: "url('/assets/img/others/process_3.png')" }}></div>
                                    <div className="cs_iconbox_in">
                                        <div className="cs_iconbox_icon"><img src="/assets/img/icons/gear.svg" alt="Icon" /></div>
                                        <h2 className="cs_iconbox_title cs_white_color cs_fs_29">Implement</h2>
                                        <p className="cs_iconbox_subtitle cs_gray_color_2 mb-0">We execute end-to-end additive manufacturing, from rapid prototyping to low- and mid-volume production, ensuring dimensional accuracy, repeatability, and industrial-grade quality.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cs_height_150 cs_height_lg_80"></div>
            </section>
            {/* End How we work */}

            {/* Start Team Section */}
            <section className="cs_p76_full_width">
                <div className="cs_height_143 cs_height_lg_75"></div>
                <div className="container">
                    <div className="cs_section_heading cs_style_1 text-center">
                        <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">What We Are Capable Of?</p>
                        <div className="cs_height_10 cs_height_lg_5"></div>
                        <h2 className="cs_section_title cs_fs_50 mb-0">We Might Be The Solution For<br />Your Engineering Problem !</h2>
                    </div>
                    <div className="cs_height_85 cs_height_lg_45"></div>
                </div>
                <div className="cs_slider cs_slider_1">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="cs_team cs_style_1">
                                <Link href="/team-details" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/fan 4.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/team-details">Industrial Cooling Fan For CEYPETCO</Link></h2>
                                    <p className="mb-0">Strong Durable/ High Temp. Resistant</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cs_team cs_style_1">
                                <Link href="/team-details" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/DOC.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/team-details">Espresso Coffee Maker Presure Guage for DOC</Link></h2>
                                    <p className="mb-0">High Accuracy/ High Temp. </p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cs_team cs_style_1">
                                <Link href="/team-details" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/samarisinghe large part side by side.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/team-details">Replacement Part For ZEISS Humphry Field Analyzer</Link></h2>
                                    <p className="mb-0">High Accuracy/ Strong & Durable</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="cs_team cs_style_1">
                                <Link href="/team-details" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/centrifuge.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/team-details">Centrifuge Rotor Replacement For Baurs Pharmaceuticals</Link></h2>
                                    <p className="mb-0">Strong & Durable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cs_pagination cs_style_1"></div>
                </div>
            </section>
            {/* End Team Section */}

            {/* Start Moving Text */}
            <div className="cs_height_135 cs_height_lg_70"></div>
            <div className="cs_moving_text_wrap cs_style_1 cs_fs_68 text-uppercase cs_bold cs_primary_font">
                <div className="cs_moving_text_in">
                    <div className="cs_moving_text">We Provide Industrial - Medical Grade - High Accuracy - High Temp. ‎ </div>
                    <div className="cs_moving_text">We Provide Industrial - Medical Grade - High Accuracy - High Temp. ‎ </div>
                </div>
            </div>
            {/* End Moving Text */}

            {/* Start Brands  */}
            <div className="cs_height_84 cs_height_lg_70"></div>
            <div className="container">
                <div className="cs_brands cs_style_1 wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="0.2s">
                    <div className="cs_brand"><img src="/assets/img/prototyping.png" alt="Brand" style={{ width: '200px', height: 'auto' }} /></div>
                    <div className="cs_brand"><img src="/assets/img/engineering.png" alt="Brand" style={{ width: '200px', height: 'auto' }} /></div>
                    <div className="cs_brand"><img src="/assets/img/medical.png" alt="Brand" style={{ width: '200px', height: 'auto' }} /></div>
                    <div className="cs_brand"><img src="/assets/img/industrial.png" alt="Brand" style={{ width: '200px', height: 'auto' }} /></div>
                </div>
            </div>
            <div className="cs_height_135 cs_height_lg_80"></div>
            {/* End Brands  */}
        </>
    );
}
