import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '3D LABS - Privacy Policy',
};

export default function PrivacyPolicy() {
    return (
        <>
            <div className="cs_height_30 cs_height_lg_30"></div>
            <div className="cs_height_50 cs_height_lg_30"></div>
            <div className="cs_section_heading cs_style_1 cs_type_3 ">
                <div className="container">
                    <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0 wow fadeInLeft" data-wow-duration="0.8s" data-wow-delay="0.2s">Documentation</p>
                    <div className="cs_height_20 cs_height_lg_10"></div>
                    <h2 className="cs_section_title cs_fs_68 mb-0">Privacy Policy</h2>
                </div>
                <div className="cs_shape_3"></div>
            </div>
            <div className="cs_height_75 cs_height_lg_60"></div>

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-2">
                            <img src="/assets/img/3logo.png" alt="Logo" className="w-100" />
                        </div>
                        <div className="col-xl-9 offset-xl-1">
                            <div className="cs_height_00 cs_height_lg_30"></div>

                            <p>Last updated: [Date]</p>
                            <p>Your privacy is important to us. This Privacy Policy explains how 3D LABS by TECHNOTRONIC FUTURISTICS collects, uses, and protects your information.</p>

                            <h2 className="cs_fs_38">Information We Collect</h2>
                            <p>We collect information you provide directly to us, such as when you create an account, request a quote, place an order, or contact us. This may include your name, email address, phone number, shipping address, and 3D files.</p>

                            <h2 className="cs_fs_38">How We Use Your Information</h2>
                            <p>We use your information to:</p>
                            <ul>
                                <li>Provide, maintain, and improve our services.</li>
                                <li>Process transactions and send related information.</li>
                                <li>Respond to your comments, questions, and requests.</li>
                                <li>Communicate with you about products, services, offers, and events.</li>
                            </ul>

                            <h2 className="cs_fs_38">File Security & Confidentiality</h2>
                            <p>We understand the importance of your intellectual property. Any 3D files or designs you upload are used solely for the purpose of generating quotes and manufacturing your parts. We do not share your files with third parties without your explicit consent, except as required by law.</p>

                            <h2 className="cs_fs_38">Security</h2>
                            <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>

                            <h2 className="cs_fs_38">Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at info@technotronicfuturistics.com.</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="cs_height_150 cs_height_lg_80"></div>
        </>
    );
}
