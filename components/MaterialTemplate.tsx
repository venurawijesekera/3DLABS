'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function MaterialTemplate({ data }: { data: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            // This simple logic works best for 1-item-per-view, for multi-item we might want a different logic
            // But for simple dots indicating "pages" or roughly where we are:
            const totalScrollWidth = scrollContainerRef.current.scrollWidth - clientWidth;
            if (totalScrollWidth > 0) {
                const progress = scrollLeft / totalScrollWidth;
                const maxIndex = data.sliders.length - 1;
                // It's a bit tricky to map progress to exact item index with multi-column. 
                // Let's use intersection observer for better "active" tracking if we want per-item dots.
            }
        }
    };

    // Better approach for dots: Click to scroll to item
    const scrollToItem = (index: number) => {
        if (scrollContainerRef.current) {
            const itemWidth = scrollContainerRef.current.children[0].clientWidth; // Approximate
            scrollContainerRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    return (
        <>
            <style jsx>{`
                .slider-container {
                    display: flex;
                    gap: 20px;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE 10+ */
                    padding-bottom: 20px;
                }
                .slider-container::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }
                .slider-item {
                    flex: 0 0 100%;
                    scroll-snap-align: start;
                }
                @media (min-width: 768px) {
                    .slider-item { flex: 0 0 50%; }
                }
                @media (min-width: 992px) {
                    .slider-item { flex: 0 0 25%; }
                }
                .slider-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #333;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .slider-dot.active {
                    background-color: #ffa415;
                    transform: scale(1.2);
                }
            `}</style>

            <div className="cs_height_140 cs_height_lg_80"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 ">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">{data.subtitle}</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">{data.title}</h2>
                </div>
                <div className="cs_shape_3"></div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5">
                            <img src={data.image} alt="Material" className="w-100" />
                        </div>

                        <div className="col-xl-6 offset-xl-1">
                            <div className="cs_height_50 cs_height_lg_30"></div>

                            <h2 className="cs_fs_38">{data.tag}</h2>
                            <p>{data.description}</p>

                            <div className="cs_height_15 cs_height_lg_15"></div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                                {data.progress.map((p: any, i: number) => (
                                    <div key={i} className="cs_progressbar cs_style_1">
                                        <div className="cs_progressbar_heading d-flex justify-content-between align-items-center">
                                            <h3 className="cs_medium m-0 cs_fs_16">{p.label}</h3>
                                            <h3 className="cs_medium m-0 cs_fs_16">{p.value}%</h3>
                                        </div>
                                        <div className="cs_progress cs_gray_bg_2">
                                            <div className="cs_progress_in cs_accent_bg cs_rounded_8 h-100" style={{ width: `${p.value}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="cs_height_80 cs_height_lg_80"></div>

            <h2 style={{ textAlign: 'center', fontSize: '1.8rem' }}>- Technical Specifications -</h2>
            <div className="cs_height_50 cs_height_lg_80"></div>

            <div className="container">
                <div className="cs_portfolio_details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '80px', flexWrap: 'wrap' }}>
                    {data.specs.map((spec: any, i: number) => (
                        <div key={i} className="" style={{ width: '200px', textAlign: 'center', marginBottom: '30px' }}>
                            <img src={spec.icon} alt={spec.label} width="40" height="40" style={{ marginBottom: '10px' }} />
                            <h3 className="cs_fs_21 mb-0 cs_semibold">{spec.value}</h3>
                            <p className="mb-0">{spec.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cs_height_150 cs_height_lg_80"></div>
            <div className="cs_about cs_style_2 cs_type_3">
                <div className="container">
                    <div className="row align-items-center cs_gap_y_35">
                        <div className="col-lg-6">
                            <div className="cs_section_heading cs_style_1">
                                <h2 className="cs_section_title cs_fs_50 mb-0">Typical Applications</h2>
                                <div className="cs_height_24 cs_height_lg_24"></div>
                                <p>{data.applications.text}</p>
                                <div className="cs_height_30 cs_height_lg_20"></div>
                                <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                    {data.applications.list.filter((x: string) => x).map((item: string, i: number) => (
                                        <li key={i}><span className="cs_list_number cs_accent_bg cs_center">0{i + 1}</span>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="cs_about_thumb">
                                <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: `url('${data.applications.image}')` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="cs_p76_full_width">
                <div className="cs_height_143 cs_height_lg_75"></div>
                <div className="container">
                    <div className="cs_section_heading cs_style_1 text-center">
                        <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0">Additive Manufacturing</p>
                        <div className="cs_height_10 cs_height_lg_5"></div>
                        <h2 className="cs_section_title cs_fs_50 mb-0">Endless Possibilities</h2>
                    </div>
                    <div className="cs_height_85 cs_height_lg_45"></div>
                </div>

                <div className="container">
                    <div
                        className="slider-container"
                        ref={scrollContainerRef}
                    >
                        {data.sliders.map((s: any, i: number) => (
                            <div className="slider-item" key={i}>
                                <div className="cs_team cs_style_1" style={{ width: '95%', margin: '0 auto' }}>
                                    <a href="#" className="cs_team_img cs_radius_5 overflow-hidden d-block">
                                        <img src={s.img} alt="Slider" className="w-100" style={{ height: '300px', objectFit: 'cover' }} />
                                    </a>
                                    <div className="cs_team_info">
                                        <h2 className="cs_fs_29">{s.title}</h2>
                                        <p className="mb-0">{s.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                        {data.sliders.map((_: any, i: number) => (
                            <div
                                key={i}
                                className={`slider-dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => scrollToItem(i)}
                            ></div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <Link href="/gallery" className="cs_btn cs_style_1">
                            Visit Gallery<span><i className="fa-solid fa-arrow-right"></i></span>
                        </Link>
                    </div>
                </div>
                <div className="cs_height_150 cs_height_lg_80"></div>
            </section>
        </>
    );
}
