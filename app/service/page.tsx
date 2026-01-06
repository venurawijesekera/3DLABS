import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '3D LABS - Services',
};

export default function Service() {
    return (
        <>
            <div className="cs_height_30 cs_height_lg_30"></div>
            <div className="cs_height_50 cs_height_lg_30"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 ">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">Our Services</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">Empowering Your Business with Comprehensive Services</h2>
                </div>
                <div className="cs_shape_4">
                    <img src="/assets/img/icons/team_shape.svg" alt="Shape" />
                </div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            {/* Start Team Section */}
            <section>
                <div className="container">
                    <div className="row cs_gap_y_35">
                        <div className="col-lg-4 col-sm-6">
                            <div className="cs_team cs_style_1">
                                <Link href="/fdm" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img className="w-100" src="/assets/img/services/fdm.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/fdm">FDM 3D Printing</Link></h2>
                                    <p className="mb-0">More Details</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="cs_team cs_style_1">
                                <Link href="/sla" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img className="w-100" src="/assets/img/services/SLA.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/sla">SLA 3D Printing</Link></h2>
                                    <p className="mb-0">More Details</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="cs_team cs_style_1">
                                <Link href="/sls" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img className="w-100" src="/assets/img/services/sls.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/sls">SLS 3D Printing</Link></h2>
                                    <p className="mb-0">More Details</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="cs_team cs_style_1">
                                <Link href="/dmls" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img className="w-100" src="/assets/img/services/dmls.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/dmls">DMLS 3D Printing</Link></h2>
                                    <p className="mb-0">More Details</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="cs_team cs_style_1">
                                <Link href="/laser" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img className="w-100" src="/assets/img/services/laser.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/laser">Fiber Laser Cutting</Link></h2>
                                    <p className="mb-0">More Details</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="cs_team cs_style_1">
                                <Link href="/carbon" className="cs_team_img cs_radius_5 overflow-hidden d-block"><img className="w-100" src="/assets/img/services/cf.png" alt="Team" /></Link>
                                <div className="cs_team_info">
                                    <h2 className="cs_fs_29"><Link href="/carbon">Carbon Fiber Composite Fabrication</Link></h2>
                                    <p className="mb-0">More Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Team Section */}

            {/* Start Additional Services Section */}
            <section>
                <div className="cs_height_130 cs_height_lg_60"></div>
                <div className="container">
                    <div className="cs_section_heading cs_style_1 text-center">
                        <h2 className="cs_section_title cs_fs_50 mb-0">Additional Services</h2>
                        <div className="cs_height_23 cs_height_lg_20"></div>
                        <p className="cs_section_subtitle cs_fs_18 mb-0">Beyond our core additive manufacturing processes, 3D LABS by TECHNOTRONIC FUTURISTICS offers a range of supporting services to help you take your product from concept to completion. From professional CAD design and precise 3D scanning to expert material selection, finishing, and scalable production, we provide end-to-end solutions that ensure your parts meet the highest standards of quality, performance, and reliability.</p>
                    </div>

                    {/* Start 3d modelling */}
                    <div className="cs_height_150 cs_height_lg_80"></div>
                    <div className="cs_about cs_style_2 cs_type_3">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_35">
                                <div className="col-lg-6">
                                    <div className="cs_section_heading cs_style_1">
                                        <h2 className="cs_section_title cs_fs_50 mb-0">CAD Design & Product Development</h2>
                                        <div className="cs_height_24 cs_height_lg_24"></div>
                                        <p>Our design team transforms your concepts into precise, manufacturable 3D models optimized for strength, efficiency, and cost. We assist through every stage from concept validation to ready-to-print product development.</p>
                                        <div className="cs_height_30 cs_height_lg_20"></div>
                                        <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                            <li><span className="cs_list_number cs_accent_bg cs_center">01</span>Concept to CAD modeling for prototypes and production parts.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">02</span>Design optimization for strength, weight, and manufacturability.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">03</span>Parametric modeling for easy design revisions.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">04</span>Simulation support for stress, fit, and motion analysis.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">05</span>Conversion from sketches or legacy files to 3D models.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">06</span>Seamless integration with additive manufacturing workflows.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="cs_about_thumb">
                                        <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: "url('/assets/img/services/cad-design.png')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Start 3d scanning */}
                    <div className="cs_height_150 cs_height_lg_80"></div>
                    <div className="cs_about cs_style_2 cs_type_3">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_35">
                                <div className="col-lg-6">
                                    <div className="cs_section_heading cs_style_1">
                                        <h2 className="cs_section_title cs_fs_50 mb-0">3D Scanning</h2>
                                        <div className="cs_height_24 cs_height_lg_24"></div>
                                        <p>We use high accuracy 3D scanning to digitally capture physical parts for reverse engineering or quality inspection. This enables seamless reproduction, modification, or integration into your design workflow.</p>
                                        <div className="cs_height_30 cs_height_lg_20"></div>
                                        <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                            <li><span className="cs_list_number cs_accent_bg cs_center">01</span>High precision laser and structured light scanning.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">02</span>Reverse engineering of existing parts or tools.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">03</span>Dimensional inspection and quality verification.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">04</span>Scanning for design modification or reproduction.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">05</span>Generation of watertight STL and CAD-compatible files.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">06</span>Ideal for legacy components, molds, and complex geometries.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cs_about_thumb">
                                        <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: "url('/assets/img/others/case_3.jpeg')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Start Material Consulting */}
                    <div className="cs_height_150 cs_height_lg_80"></div>
                    <div className="cs_about cs_style_2 cs_type_3">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_35">
                                <div className="col-lg-6">
                                    <div className="cs_section_heading cs_style_1">
                                        <h2 className="cs_section_title cs_fs_50 mb-0">Material Consulting</h2>
                                        <div className="cs_height_24 cs_height_lg_24"></div>
                                        <p>Choosing the right material is critical for performance, our experts guide you based on mechanical strength, temperature tolerance, and application demands. We help you achieve the perfect balance of durability, functionality, and finish.</p>
                                        <div className="cs_height_30 cs_height_lg_20"></div>
                                        <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                            <li><span className="cs_list_number cs_accent_bg cs_center">01</span>Expert guidance on choosing materials for function and performance.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">02</span>Comparison of mechanical, thermal, and chemical properties.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">03</span>Recommendations for cost effective alternatives.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">04</span>Access to a wide range of polymers, metals, and composites.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">05</span>Support for specialized applications (e.g., medical, aerospace).</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">06</span>Assistance with post processing compatibility and durability.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cs_about_thumb">
                                        <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: "url('/assets/img/services/material.png')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Start Decaling */}
                    <div className="cs_height_150 cs_height_lg_80"></div>
                    <div className="cs_about cs_style_2 cs_type_3">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_35">
                                <div className="col-lg-6">
                                    <div className="cs_section_heading cs_style_1">
                                        <h2 className="cs_section_title cs_fs_50 mb-0">Decaling & Custom Finishing Services</h2>
                                        <div className="cs_height_24 cs_height_lg_24"></div>
                                        <p>We offer advanced decaling and surface customisation options to give your 3D printed parts a professional, end-product finish. Our marking and printing solutions ensure both visual appeal and functional durability.</p>
                                        <div className="cs_height_30 cs_height_lg_20"></div>
                                        <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                            <li><span className="cs_list_number cs_accent_bg cs_center">01</span>Precision laser marking for logos, serial numbers, and detailed text engraving.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">02</span>High resolution UV printing for full colour graphics, branding, and decorative finishes.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">03</span>Durable and scratch resistant surface prints suitable for both prototypes and end use products.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">04</span>Access to a wide range of polymers, metals, and composites.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">05</span>Ideal for custom branding, labelling, or identification on industrial and consumer grade parts.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">06</span>Seamlessly integrates with other post processing options for a complete production ready result.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cs_about_thumb">
                                        <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: "url('/assets/img/services/decal.png')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Start Post-Processing & Finishing */}
                    <div className="cs_height_150 cs_height_lg_80"></div>
                    <div className="cs_about cs_style_2 cs_type_3">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_35">
                                <div className="col-lg-6">
                                    <div className="cs_section_heading cs_style_1">
                                        <h2 className="cs_section_title cs_fs_50 mb-0">Post-Processing & Finishing</h2>
                                        <div className="cs_height_24 cs_height_lg_24"></div>
                                        <p>Our finishing services include sanding, painting, coating, and surface treatment to enhance aesthetics and performance. Every part is refined to meet your exact visual and functional requirements.</p>
                                        <div className="cs_height_30 cs_height_lg_20"></div>
                                        <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                            <li><span className="cs_list_number cs_accent_bg cs_center">01</span>Surface smoothing, polishing, and vapor finishing.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">02</span>Industrial grade painting, coating, and dyeing options.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">03</span>Mechanical finishing such as sanding, grinding, or machining.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">04</span>Assembly and fitting of multi part prints.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">05</span>Dimensional correction and part reinforcement.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">06</span>Ready for use finishing for functional and aesthetic parts.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cs_about_thumb">
                                        <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: "url('/assets/img/services/post-processing.png')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Start Batch Production */}
                    <div className="cs_height_150 cs_height_lg_80"></div>
                    <div className="cs_about cs_style_2 cs_type_3">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_35">
                                <div className="col-lg-6">
                                    <div className="cs_section_heading cs_style_1">
                                        <h2 className="cs_section_title cs_fs_50 mb-0">Batch Production & On Demand Manufacturing</h2>
                                        <div className="cs_height_24 cs_height_lg_24"></div>
                                        <p>We offer scalable production solutions for prototypes, small batches, and custom parts. Get consistent quality and fast turnaround without the cost of traditional tooling.</p>
                                        <div className="cs_height_30 cs_height_lg_20"></div>
                                        <ul className="cs_list cs_style_2 cs_fs_21 cs_semibold cs_primary_color cs_mp0">
                                            <li><span className="cs_list_number cs_accent_bg cs_center">01</span>Low volume and bridge production without tooling costs.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">02</span>Fast turnaround for prototypes and small batch orders.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">03</span>Consistent part quality across multiple production runs.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">04</span>Scalable manufacturing for custom or serialized components.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">05</span>Flexible scheduling to match project timelines.</li>
                                            <li><span className="cs_list_number cs_accent_bg cs_center">06</span>Integrated QC inspection for every production batch.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="cs_about_thumb">
                                        <div className="cs_about_thumb_in cs_bg_filed w-100" style={{ backgroundImage: "url('/assets/img/services/batch-production.png')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="cs_height_150 cs_height_lg_80"></div>
            </section>
            {/* End Additional Services Section */}
        </>
    );
}
