import Link from 'next/link';

export default function MaterialTemplate({ data }: { data: any }) {
    return (
        <>
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

                            <h2 className="cs_fs_38">Standard Material</h2>
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
                                    {data.applications.list.map((item: string, i: number) => (
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
                    <div className="row">
                        {data.sliders.map((s: any, i: number) => (
                            <div className="col-lg-3 col-md-6 mb-4" key={i}>
                                <div className="cs_team cs_style_1">
                                    <a href="#" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src={s.img} alt="Slider" className="w-100" /></a>
                                    <div className="cs_team_info">
                                        <h2 className="cs_fs_29">{s.title}</h2>
                                        <p className="mb-0">{s.subtitle}</p>
                                    </div>
                                </div>
                            </div>
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
