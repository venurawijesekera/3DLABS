import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '3D LABS - Material',
};

// This could be moved to a shared component or data file
const materials = [
    {
        slug: 'pla',
        name: 'Polylactic Acid',
        image: '/assets/img/3d-labs/Planter842x450.webp',
        tag: 'PLA',
        description: 'PLA is a great material for early concept models because it is easy to use, office-friendly, and works great with breakaway supports which print faster and can be removed faster than dissolvable supports. PLA is a corn-based plastic and is considered biodegradable under industrial processes.'
    },
    {
        slug: 'petg',
        name: 'Polyethylene Terephthalate Glycol',
        image: '/assets/img/material/petg.webp',
        tag: 'PETG',
        description: 'PETG can be used for several different applications. The first that comes to mind is the food industry. Due to its relation to PET, PETG is water resistant and can be in contact with food according to the FDA. This makes it especially suitable for food packaging. And that’s not all PETG is suitable for dental aligners, medical equipment and prostheses, thanks to its sterilizability.'
    },
    {
        slug: 'petg-cf',
        name: 'Polyethylene Terephthalate Glycol - Carbon Fiber Composite',
        image: '/assets/img/material/petgcf.webp',
        tag: 'PETG CF',
        description: 'PETG-CF combines the toughness and chemical resistance of PETG with the added strength and rigidity of carbon fibre. This makes it ideal for functional and engineering parts that need high durability and precision. With improved dimensional stability, reduced warping, and a sleek matte finish, PETG-CF is commonly used for jigs, fixtures, drone parts, and automotive components.'
    },
    {
        slug: 'abs',
        name: 'Acrylonitrile Butadiene Styrene',
        image: '/assets/img/material/abs.webp',
        tag: 'ABS',
        description: 'ABS is a strong, durable, and impact-resistant material widely used for functional prototypes and end-use parts. It offers excellent mechanical strength, heat resistance, and machinability, making it ideal for automotive components, enclosures, and tools. ABS is also easy to post process allowing for sanding, painting, or chemical smoothing to achieve a professional finish.'
    },
    {
        slug: 'abs-cf',
        name: 'Carbon Fibre Reinforced ABS',
        image: '/assets/img/material/abscf.webp',
        tag: 'ABS CF',
        description: 'ABS-CF combines the strength and heat resistance of ABS with the added stiffness and reduced weight of carbon fibre. The result is a high-performance material ideal for demanding applications like automotive parts, drones, and mechanical components. ABS-CF offers excellent dimensional stability, minimal warping, and a sleek matte surface finish.'
    },
    {
        slug: 'abs-fr',
        name: 'ABS Fire Retardant',
        image: '/assets/img/material/ABS-FR.webp',
        tag: 'ABS Fire Retardant',
        description: 'ABS Fire Retardant is a specialized engineering-grade thermoplastic formulated to resist ignition and reduce flame propagation. It retains the trusted mechanical performance of standard ABS strength, toughness, and dimensional stability while adding enhanced fire safety for electrical, industrial, and consumer applications. This makes it ideal for enclosures, housings, and components requiring compliance with flame retardant standards without compromising printability or durability.'
    },
    {
        slug: 'tpu',
        name: 'Thermoplastic Polyurethane',
        image: '/assets/img/material/tpu.webp',
        tag: 'TPU 95a',
        description: 'TPU 95A is a flexible yet durable material known for its excellent elasticity and abrasion resistance. It offers rubber-like flexibility while maintaining strong layer adhesion and impact resistance. TPU 95A is ideal for applications such as gaskets, seals, protective covers, and wearable components where flexibility and durability are essential.'
    },
    {
        slug: 'tpe',
        name: 'Thermoplastic Elastomer',
        image: '/assets/img/material/tpe.webp',
        tag: 'TPE 85a',
        description: 'TPE 85A is a soft, highly flexible material with excellent elasticity and impact resistance. It offers a rubber-like feel and can withstand repeated bending and stretching without deformation. TPE 85A is ideal for grips, seals, vibration dampers, and other parts that require comfort, flexibility, and resilience.'
    },
    {
        slug: 'pa6',
        name: 'Polyamide (NYLON6)',
        image: '/assets/img/material/pa6-brkt.webp',
        tag: 'PA6 (NYLON)',
        description: 'PA6 (Nylon 6) and PA12 (Nylon 12) are both strong and durable engineering plastics, but they differ in flexibility, moisture absorption, and chemical resistance. PA6 offers higher strength, stiffness, and heat resistance, making it suitable for load-bearing and structural parts. However, it absorbs more moisture, which can affect dimensional stability. In contrast, PA12 is more flexible, has lower water absorption, and provides excellent impact and chemical resistance, making it ideal for parts exposed to varying environmental conditions such as hoses, fittings, and flexible connectors.'
    },
    {
        slug: 'pa12',
        name: 'Polyamide (NYLON12)',
        image: '/assets/img/material/pa6.webp',
        tag: 'PA12 (NYLON)',
        description: 'PA6 (Nylon 6) and PA12 (Nylon 12) are both strong and durable engineering plastics, but they differ in flexibility, moisture absorption, and chemical resistance. PA6 offers higher strength, stiffness, and heat resistance, making it suitable for load-bearing and structural parts. However, it absorbs more moisture, which can affect dimensional stability. In contrast, PA12 is more flexible, has lower water absorption, and provides excellent impact and chemical resistance, making it ideal for parts exposed to varying environmental conditions such as hoses, fittings, and flexible connectors.'
    },
    {
        slug: 'pa6-cf',
        name: 'Carbon Fibre Reinforced Nylon 6',
        image: '/assets/img/material/pa6cf.webp',
        tag: 'PA6 CF (NYLON)',
        description: 'PA6-CF combines the high strength and heat resistance of PA6 with the added stiffness and dimensional stability of carbon fibre. The reinforcement reduces warping and shrinkage while improving wear resistance, making it ideal for demanding mechanical applications. PA6-CF is commonly used for gears, brackets, housings, and other structural components that require high strength, rigidity, and long-term durability.'
    },
    {
        slug: 'pc',
        name: 'Polycarbonate',
        image: '/assets/img/material/pc.webp',
        tag: 'PC',
        description: 'PC is a strong, tough, and heat-resistant material known for its excellent impact resistance and optical clarity. It maintains dimensional stability under stress and can withstand high temperatures, making it suitable for functional prototypes, protective covers, lenses, and enclosures. PC is ideal for applications where strength, durability, and transparency are required.'
    },
    {
        slug: 'pc-cf',
        name: 'Carbon Fibre Reinforced Polycarbonate',
        image: '/assets/img/material/pc-cf.webp',
        tag: 'PC CF',
        description: 'PC-CF combines the toughness and heat resistance of polycarbonate with the added stiffness, strength, and dimensional stability of carbon fibre. This makes it ideal for high-performance applications such as structural components, housings, brackets, and mechanical parts that require durability, rigidity, and minimal warping under stress.'
    },
    {
        slug: 'asa',
        name: 'Acrylonitrile Styrene Acrylate',
        image: '/assets/img/material/asa.webp',
        tag: 'ASA',
        description: 'ASA is a durable, weather-resistant material known for its excellent UV and chemical resistance. It maintains strength and colour stability even under prolonged outdoor exposure, making it ideal for automotive parts, outdoor enclosures, and signage. ASA offers good impact resistance, heat tolerance, and ease of post-processing, making it a versatile choice for both functional and aesthetic applications.'
    },
];

export default function Material() {
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

                            {materials.map((item, index) => (
                                <div key={index} className="cs_post cs_style_4">
                                    <div className="cs_post_thumb_wrap position-relative">
                                        <Link href={`/${item.slug}`} className="cs_post_thumb cs_radius_5">
                                            <img src={item.image} alt="Thumb" />
                                        </Link>
                                        <div className="cs_categories">
                                            <Link href={`/${item.slug}`} className="cs_category">{item.tag}</Link>
                                        </div>
                                    </div>
                                    <h2 className="cs_post_title cs_fs_50"><Link href={`/${item.slug}`}>{item.name}</Link></h2>
                                    <p className="cs_post_subtitle">{item.description}</p>
                                    <Link href={`/${item.slug}`} className="cs_post_btn">
                                        <span>Read More</span>
                                        <svg width="51" height="16" viewBox="0 0 51 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 9H50V7H0V9Z" fill="currentColor" />
                                        </svg>
                                    </Link>
                                </div>
                            ))}

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
                                        {/* Add more as needed */}
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
