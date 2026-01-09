import Link from 'next/link';

export default function ServiceTemplate({ data }: { data: any }) {
    return (
        <>
            <div className="cs_height_140 cs_height_lg_80"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 ">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">{data.subtitle}</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0" dangerouslySetInnerHTML={{ __html: data.title }}></h2>
                </div>
                <div className="cs_shape_3"></div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            <div className="cs_service_info">
                <div className="container">
                    <div className="row align-items-center cs_gap_y_40">
                        <div className="col-lg-6">
                            <div className="cs_service_info_thumb cs_bg_filed" style={{ backgroundImage: `url('${data.infoImage}')` }}></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row cs_gap_y_40">
                                {data.infoGrid.map((info: any, i: number) => (
                                    <div className="col-sm-6" key={i}>
                                        <div className="cs_number_box cs_style_1">
                                            <h3 className="cs_number_box_number cs_semibold cs_accent_bg cs_fs_29 cs_center">{info.number}</h3>
                                            <h2 className="cs_number_box_title cs_fs_29 cs_semibold">{info.title}</h2>
                                            <p className="mb-0">{info.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cs_height_150 cs_height_lg_80"></div>
            <div className="cs_about cs_style_2 cs_type_3">
                <div className="container">
                    <div className="row align-items-center cs_gap_y_35">
                        <div className="col-lg-6">
                            <div className="cs_section_heading cs_style_1">
                                <h2 className="cs_section_title cs_fs_50 mb-0">Applications and Use Cases:</h2>
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
            <div className="cs_height_150 cs_height_lg_80"></div>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-5">
                            <img src={data.capabilities.image} alt="Capabilities" className="w-100" />
                        </div>
                        <div className="col-xl-6 offset-xl-1">
                            <div className="cs_height_50 cs_height_lg_30"></div>
                            <h2 className="cs_fs_38">Technical Capabilities</h2>
                            <p>{data.capabilities.text}</p>

                            <div className="cs_height_35 cs_height_lg_15"></div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {data.capabilities.list.map((cap: any, i: number) => (
                                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <span className="cs_medium cs_fs_16">{cap.label} -</span>
                                        <span className="cs_medium cs_fs_16" style={{ color: '#ffa415' }}>{cap.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div className="cs_height_150 cs_height_lg_80"></div>

            <div className="cs_about cs_style_2 cs_type_2">
                <div className="container">
                    <div className="row align-items-center cs_gap_y_40">
                        <div className="col-lg-6">
                            <div className="cs_section_heading cs_style_1">
                                <h2 className="cs_section_title cs_fs_50 mb-0 wow fadeInRight" data-wow-duration="0.8s" data-wow-delay="0.2s">What you will get from this service?</h2>
                                <div className="cs_height_30 cs_height_lg_30"></div>
                                <p className="m-0">{data.description}</p>
                            </div>
                            <div className="cs_height_40 cs_height_lg_30"></div>
                            <ul className="cs_list cs_style_1 cs_primary_font cs_primary_color cs_semibold cs_mp0 cs_fs_21">
                                {data.whatYouGet.list.map((item: string, i: number) => (
                                    <li key={i}>
                                        <i className="fa-regular fa-circle-check" style={{ marginRight: '10px' }}></i>{item}
                                    </li>
                                ))}
                            </ul>
                            <div className="cs_height_40 cs_height_lg_30"></div>
                            <Link href={data.whatYouGet.btnLink} className="cs_btn cs_style_1">{data.whatYouGet.btnText}<span><i className="fa-solid fa-arrow-right"></i></span></Link>
                        </div>
                        <div className="col-lg-6">
                            <div className="cs_about_thumb">
                                <div className="cs_about_thumb_in cs_bg_filed" style={{ backgroundImage: `url('${data.whatYouGet.image}')` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cs_height_120 cs_height_lg_80"></div>
        </>
    );
}
