import type { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: '3D LABS - Contact Us',
};

export default function Contact() {
    return (
        <>
            {/* Start Page Heading */}
            <div className="cs_height_50 cs_height_lg_30"></div>
            <div className="cs_height_30 cs_height_lg_30"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 ">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">Contact</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">Get in touch for more <br />information and support</h2>
                </div>
                <div className="cs_shape_4">
                    <img src="/assets/img/icons/mail.svg" alt="Mail" />
                </div>
            </div>
            <div className="cs_height_85 cs_height_lg_45"></div>
            {/* End Page Heading */}

            {/* Start Contact Section */}
            <section>
                <div className="container">
                    <div className="row align-items-center cs_gap_y_45">
                        <div className="col-lg-6">
                            <h2 className="cs_fs_50">Let Us Know <br />How We Can Help!</h2>
                            <div className="cs_height_55 cs_height_lg_30"></div>
                            <ul className="cs_mp0 cs_contact_info">
                                <li>
                                    <h3 className="cs_fs_29 cs_semibold">Email:</h3>
                                    <p className="mb-0">3dlabs@technotronicfuturistics.com</p>
                                </li>
                                <li>
                                    <h3 className="cs_fs_29 cs_semibold">Phone:</h3>
                                    <p className="mb-0">+94 70 700 0007 <br /> +94 70 600 0006 <br /> +94 70 600 0007</p>
                                </li>
                                <li>
                                    <h3 className="cs_fs_29 cs_semibold">Locations:</h3>
                                    <p className="mb-0">Kandy & Colombo, Sri Lanka <br /> Island Wide Delivery Available. <br /> For Intenational Orders Please Contact Us. </p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="cs_contact_form_wrap">
                                <div className="cs_gray_bg_3 cs_contact_form_bg"></div>
                                <form className="cs_contact_form" id="cs_form">
                                    <label className="cs_fs_21 cs_semibold cs_primary_color">Your Full Name</label>
                                    <input placeholder="Type your name" type="text" className="cs_form_field" name="name" />
                                    <div className="cs_height_38 cs_height_lg_25"></div>
                                    <label className="cs_fs_21 cs_semibold cs_primary_color">Your Email</label>
                                    <input placeholder="Type your email address" type="text" className="cs_form_field" name="email" />
                                    <div className="cs_height_38 cs_height_lg_25"></div>
                                    <label className="cs_fs_21 cs_semibold cs_primary_color">Contact Number</label>
                                    <input placeholder="Type your phone number" type="text" className="cs_form_field" name="phone" />
                                    <div className="cs_height_38 cs_height_lg_25"></div>
                                    <label className="cs_fs_21 cs_semibold cs_primary_color">Project brief</label>
                                    <textarea cols={30} rows={5} className="cs_form_field" name="message"></textarea>
                                    <div className="cs_height_38 cs_height_lg_25"></div>
                                    <button className="cs_btn cs_style_1">Learn More <span><i className="fa-solid fa-arrow-right"></i></span></button>
                                    <div id="cs_result"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cs_height_0 cs_height_lg_80"></div>
            </section>
            {/* End Contact Section */}

            {/* Start Google Map */}
            <div className="cs_map">
                <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96652.27317354927!2d-74.33557928194516!3d40.79756494697628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy+Meadows+Wetlands!5e0!3m2!1sen!2sbd!4v1563075599994!5m2!1sen!2sbd" allowFullScreen></iframe>
            </div>
            {/* End Google Map */}
        </>
    );
}
