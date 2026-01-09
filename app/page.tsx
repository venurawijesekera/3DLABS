import Link from 'next/link';
import Image from 'next/image';
import HeroViewer from '@/components/HeroViewer';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        #model-viewer-container {
            position: relative;
            width: 100%;
            height: 550px; 
            overflow: hidden; 
        }
        #three-canvas {
            width: 100%;
            height: 100%;
            outline: none;
            cursor: grab;
        }
        #three-canvas:active {
            cursor: grabbing;
        }
        
        #model-name-display {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.5); 
            font-size: 14px;
            text-transform: uppercase;
            pointer-events: none;
            font-family: inherit;
            letter-spacing: 2px;
        }

        #loader-overlay {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            color: #faa415;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        }
      `}} />

      {/* Hero */}
      <section className="cs_hero cs_style_3 cs_bg_filed cs_center" data-src="/assets/img/bg.webp">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT: TEXT */}
            <div className="col-lg-7">
              <div className="cs_hero_text position-relative text-start">
                <h1 className="cs_hero_title cs_fs_68 text-uppercase wow fadeInRight" data-wow-duration="0.8s" data-wow-delay="0.2s">
                  WELCOME TO <br /> 3D LABS <br /> Additive Solutions
                </h1>
                <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">Sri Lanka&apos;s No.1 3D Printing Service. <br /> with Industrial Additive Manufacturing Solutions.</p>
                <br /><br />
                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <Link href="/instant-quote" className="cs_btn cs_style_1">
                      Get Instant Quote<span><i className="fa-solid fa-arrow-right"></i></span>
                    </Link>
                    <Link href="/material" className="cs_btn cs_style_1">
                      Explore Materials<span><i className="fa-solid fa-arrow-right"></i></span>
                    </Link>
                  </div>
                </div>
                <div className="cs_height_75 cs_height_lg_60"></div>
                <div className="cs_moving_text_wrap">
                  <div className="cs_moving_text_in">
                    <div className="cs_moving_text" style={{ color: '#faa415' }}>
                      We are capable of  -   F D M   -   S L A   -   S L S   -   D M L S
                    </div>
                    <div className="cs_moving_text" style={{ color: '#faa415' }}>
                      We are capable of  -   F D M   -   S L A   -   S L S   -   D M L S
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: 3D SLIDER */}
            <div className="col-lg-5 d-none d-lg-block">
              <HeroViewer />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="cs_height_130 cs_height_lg_70"></div>
        <div className="container">
          <div className="cs_cta cs_style_2">
            <h2 className="cs_cta_title cs_fs_68">Cutting Edge Industrial 3D Printing Technologies</h2>
            <div className="cs_cta_in">
              <div className="cs_cta_left">
                <span className="cs_cta_icon">
                  <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.25" d="M0 54.3207C0.346705 54.3523 0.693411 54.3838 1.04012 54.3838C15.5702 54.3838 30.1003 54.3838 44.6619 54.3838C44.9771 54.3838 45.2923 54.3838 45.5444 54.3838C34.765 43.6016 23.9857 32.8194 13.2378 22.0688C16.2951 19.0422 19.1003 16.2994 21.9685 13.462C32.5903 24.0865 43.3696 34.8687 54.4327 45.9346C54.4327 30.3919 54.4327 15.1959 54.4327 0C58.5301 0 62.5014 0 66.5673 0C66.5673 15.2275 66.5673 30.3603 66.5673 45.4617C77.3467 34.6795 88.1261 23.8973 98.8109 13.2097C101.868 16.2678 104.642 19.0422 107.479 21.8796C96.8567 32.5042 86.0774 43.2863 75.298 54.0685C75.3295 54.1631 75.3925 54.2577 75.4241 54.3523C90.5845 54.3523 105.777 54.3523 121 54.3523C121 58.4508 121 62.4231 121 66.5216C105.777 66.5216 90.6161 66.5216 75.3295 66.5216C86.235 77.4299 96.9828 88.1806 107.731 98.9312C104.768 101.832 101.994 104.575 99.1576 107.38C88.5358 96.7559 77.7564 85.9737 66.788 74.9708C66.7249 75.5698 66.6619 75.822 66.6619 76.0743C66.6619 90.7658 66.6619 105.457 66.6619 120.18C66.6619 120.464 66.7249 120.716 66.7249 121C62.6275 121 58.5301 121 54.4327 121C54.4642 120.653 54.4957 120.306 54.4957 119.96C54.4957 105.426 54.4957 90.8919 54.4957 76.358C54.4957 76.0427 54.4327 75.6959 54.4011 75.0023C43.3381 86.0052 32.5587 96.7874 21.937 107.412C19.1003 104.606 16.2951 101.863 13.2063 98.8366C23.9542 88.086 34.702 77.3353 45.4814 66.5531C45.2607 66.5531 44.9456 66.5531 44.6304 66.5531C30.1003 66.5531 15.5702 66.5531 1.04012 66.5531C0.693411 66.5531 0.346705 66.6162 0 66.6162C0 62.5177 0 58.4192 0 54.3207Z" fill="#4F4747" />
                  </svg>
                </span>
              </div>
              <div className="cs_cta_right">
                <h3 className="cs_cta_subtitle cs_fs_21 cs_semibold cs_secondary_color">At 3D LABS, we are passionate about helping businesses and individuals bring their ideas to life through our online 3D printing service. We offer a range of high-quality products and materials, from prototypes to finished products, all available at the click of a button.</h3>
                <Link href="/service" className="cs_btn cs_style_1">Our Services<span><i className="fa-solid fa-arrow-right"></i></span></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_height_150 cs_height_lg_80"></div>
      </section>

      {/* Fields Section */}
      <section className="cs_primary_bg">
        <div className="cs_height_143 cs_height_lg_75"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">FIELDS</p>
            <div className="cs_height_10 cs_height_lg_5"></div>
            <h2 className="cs_section_title cs_fs_50 mb-0 cs_white_color">Fields that Benefit From Additive Manufacturing</h2>
          </div>
          <div className="cs_height_85 cs_height_lg_45"></div>
          <ul className="cs_image_box_1_list cs_color_1 cs_mp0">
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">01</div>
                <Link href="/consumer" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/consumer.webp" alt="Service" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/consumer">CONSUMER GOODS</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">This enables the easy production of accessories such as cases, coverings, mounts, and boosters that facilitate proper drone storage. The additive manufacturing process helps to create lightweight and faster drones of different sizes at less cost.</p>
                  <Link href="/consumer" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">02</div>
                <Link href="/medical-sector" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/modle-teeth-200.webp" alt="Service" loading="lazy" decoding="async" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/medical-sector">MEDICAL & HEALTHCARE</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">From bio-printing to prosthetics and medical devices. 3D printing applications in the medical sector are very versatile; for instance, CT scanning offers different patient-specific solutions like dental appliances and implants, other benefits enhanced medical devices and personalized healthcare.</p>
                  <Link href="/medical-sector" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">03</div>
                <Link href="/industrial-sector" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/fan200x200.webp" alt="Service" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/industrial-sector">INDUSTRIAL & ENGINEERING</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">These include cradles, fixtures, and prototypes that are sturdy, stiff, and long-lasting. The key advantages are greater design flexibility, customization, and faster product development. Additionally 3D printing helps create intricate geometrics such as internal channels, fine mesh, and thin walls.</p>
                  <Link href="/industrial-sector" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">04</div>
                <Link href="/automotive" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/brkt200x200.webp" alt="Service" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/automotive">AUTOMOTIVE & AEROSPACE</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">Additive manufacturing helps the automotive sector by enabling rapid prototyping, reducing production time, and lowering costs for custom or low-volume parts. It allows for lightweight component design, improved fuel efficiency, and faster development cycles, while also supporting on-demand manufacturing and parts consolidation for better performance and durability.</p>
                  <Link href="/automotive" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">05</div>
                <Link href="/electronics" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/electronics.webp" alt="Service" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/electronics">ELECTRICAL, ELECTRONICS & PLUMBING</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">This enables the easy production of accessories such as cases, coverings, mounts, and boosters that facilitate proper drone storage. The additive manufacturing process helps to create lightweight and faster drones of different sizes at less cost.</p>
                  <Link href="/electronics" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">06</div>
                <Link href="/education" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/lattice.webp" alt="Service" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/education">EDUCATION</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">Additive manufacturing enhances learning by providing hands on experience in design, engineering, and prototyping. University students can use 3D printing for their practical projects, bringing concepts to life and strengthening real world problem solving skills.</p>
                  <Link href="/education" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="cs_image_box cs_style_1">
                <div className="cs_image_box_number cs_primary_color cs_primary_font cs_fs_38 cs_semibold">07</div>
                <Link href="/architecture" className="cs_image_box_img cs_radius_5 overflow-hidden">
                  <img src="/assets/img/3d-labs/w15hantana.webp" alt="Service" />
                </Link>
                <div className="cs_image_box_info position-relative">
                  <h2 className="cs_image_box_title cs_fs_29 cs_semibold"><Link href="/architecture">ARCHITECTURE MODELS</Link></h2>
                  <p className="cs_image_box_subtitle mb-0">Transform your architectural vision into reality with our finely crafted 3D printed models. Each piece captures the essence of your design with accurate scale and remarkable detail. Perfect for presentations, exhibitions, or client demonstrations, our models make your ideas truly tangible.</p>
                  <Link href="/architecture" className="cs_image_box_btn cs_center position-absolute rounded-circle">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z" fill="currentColor"></path></svg>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="cs_height_145 cs_height_lg_80"></div>
      </section>

      {/* Portfolio (Materials) Section */}
      <section>
        <div className="cs_height_143 cs_height_lg_75"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInUp">MATERIAL</p>
            <div className="cs_height_10 cs_height_lg_5"></div>
            <h2 className="cs_section_title cs_fs_50 mb-0">CHOOSE WHAT BEST SUITS YOU</h2>
          </div>
          <div className="cs_height_85 cs_height_lg_45"></div>
          <div className="cs_isotop cs_style_1 cs_isotop_col_2 cs_has_gutter_24_67">
            <div className="cs_grid_sizer"></div>
            <div className="cs_isotop_item">
              <div className="cs_portfolio cs_style_1">
                <Link href="/material" className="cs_portfolio_thumb cs_radius_5">
                  <img src="/assets/img/3d-labs/fan-4.webp" alt="Portfolio" loading="lazy" />
                </Link>
                <div className="cs_portfolio_info">
                  <h2 className="cs_portfolio_title cs_fs_38"><Link href="/material">Plastics</Link></h2>
                  <Link href="/material" className="cs_portfolio_btn">Visit Gallery</Link>
                </div>
              </div>
            </div>
            <div className="cs_isotop_item">
              <div className="cs_portfolio cs_style_1">
                <Link href="/material" className="cs_portfolio_thumb cs_radius_5">
                  <img src="/assets/img/3d-labs/samarisinghe-side-by-side.webp" alt="Portfolio" loading="lazy" />
                </Link>
                <div className="cs_portfolio_info">
                  <h2 className="cs_portfolio_title cs_fs_38"><Link href="/material">Resins</Link></h2>
                  <Link href="/material" className="cs_portfolio_btn">Visit Gallery</Link>
                </div>
              </div>
            </div>
            <div className="cs_isotop_item">
              <div className="cs_portfolio cs_style_1">
                <Link href="/material" className="cs_portfolio_thumb cs_radius_5"><img src="/assets/img/3d-labs/metal.webp" alt="Portfolio" /></Link>
                <div className="cs_portfolio_info">
                  <h2 className="cs_portfolio_title cs_fs_38"><Link href="/material">Alloys</Link></h2>
                  <Link href="/material" className="cs_portfolio_btn">Visit Gallery</Link>
                </div>
              </div>
            </div>
            <div className="cs_isotop_item">
              <div className="cs_portfolio cs_style_1">
                <Link href="/material" className="cs_portfolio_thumb cs_radius_5"><img src="/assets/img/3d-labs/bellow.webp" alt="Portfolio" /></Link>
                <div className="cs_portfolio_info">
                  <h2 className="cs_portfolio_title cs_fs_38"><Link href="/material">Elastomers</Link></h2>
                  <Link href="/material" className="cs_portfolio_btn">Visit Gallery</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="cs_height_93 cs_height_lg_60"></div>
          <div className="text-center">
            <Link href="/material" className="cs_btn cs_style_1">Browse All Materials <span><i className="fa-solid fa-arrow-right"></i></span></Link>
          </div>
        </div>
      </section>

      {/* Moving Text */}
      <div className="cs_height_136 cs_height_lg_70"></div>
      <div className="cs_moving_text_wrap cs_style_1 cs_fs_68 text-uppercase cs_bold cs_primary_font">
        <div className="cs_moving_text_in">
          <div className="cs_moving_text">NYLON 6 CF - ABS CF - PPS CF - ULTEM - PEEK - </div>
          <div className="cs_moving_text">NYLON 6 CF - ABS CF - PPS CF - ULTEM - PEEK - </div>
        </div>
      </div>
      <div className="cs_height_84 cs_height_lg_70"></div>

      {/* Partners Section */}
      <div className="container">
        <div className="cs_brands_2_wrap">
          <div className="cs_brands cs_style_2">
            <div className="cs_brand">
              <div className="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="0.1s">
                <img src="/assets/img/companies/ceypetco.webp" alt="Partner" />
              </div>
            </div>
            <div className="cs_brand">
              <div className="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="0.1s"><img src="/assets/img/companies/veolia logo.webp" alt="Partner" /></div>
            </div>
            <div className="cs_brand">
              <div className="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="0.1s"><img src="/assets/img/companies/baurs logo.webp" alt="Partner" /></div>
            </div>
            <div className="cs_brand">
              <div className="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="0.1s"><img src="/assets/img/companies/hunter.webp" alt="Partner" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* Possibilities (Team structure in index.html) Section */}
      <section className="cs_p76_full_width">
        <div className="cs_height_143 cs_height_lg_75"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">Additive Manufacturing</p>
            <div className="cs_height_10 cs_height_lg_5"></div>
            <h2 className="cs_section_title cs_fs_50 mb-0">Endless Possibilities</h2>
          </div>
          <div className="cs_height_85 cs_height_lg_45"></div>
        </div>
        <div className="cs_slider cs_slider_1">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="cs_team cs_style_1">
                <div className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/mold424x450.webp" alt="Mold" /></div>
                <div className="cs_team_info">
                  <h2 className="cs_fs_29">Test Injection Mold</h2>
                  <p className="mb-0">Strong, Durable/ High Temp.</p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="cs_team cs_style_1">
                <div className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/gearwheel424x450.webp" alt="Gear Wheel" /></div>
                <div className="cs_team_info">
                  <h2 className="cs_fs_29">Gear Wheel</h2>
                  <p className="mb-0">Light Weight/ Strong & Durable/ Cost Effective</p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="cs_team cs_style_1">
                <div className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/specsframe424x450.webp" alt="Specs Frame" /></div>
                <div className="cs_team_info">
                  <h2 className="cs_fs_29">Specs Frame</h2>
                  <p className="mb-0">Customizable/ Strong & Durable</p>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="cs_team cs_style_1">
                <div className="cs_team_img cs_radius_5 overflow-hidden d-block"><img src="/assets/img/3d-labs/tire424x450.webp" alt="Airless Tire" /></div>
                <div className="cs_team_info">
                  <h2 className="cs_fs_29">Airless Tire</h2>
                  <p className="mb-0">Flexible/ Durable</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cs_pagination cs_style_1"></div>
          <div className="cs_height_60 cs_height_lg_80"></div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/gallery" className="cs_btn cs_style_1">
              Visit Gallery<span><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="cs_height_150 cs_height_lg_80"></div>
      <div className="cs_testimonial_1_wrap cs_parallax">
        <div className="cs_height_100 cs_height_lg_80"></div>
        <div className="cs_layered_shape_1 position-absolute">
          <svg width="48" height="55" viewBox="0 0 48 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2" d="M1.12432 0.00707413L47.9971 27.93L0.378738 54.5616L1.12432 0.00707413Z" fill="#B7B7B7" />
          </svg>
        </div>
        <div className="cs_layered_shape_2 position-absolute">
          <svg width="89" height="83" viewBox="0 0 89 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle opacity="0.2" cx="33" cy="33" r="28" stroke="#B7B7B7" strokeWidth="10" />
            <circle opacity="0.15" cx="56" cy="50" r="28" stroke="#B7B7B7" strokeWidth="10" />
          </svg>
        </div>
        <div className="cs_layered_shape_3 position-absolute">
          <svg width="140" height="103" viewBox="0 0 140 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect opacity="0.25" x="6.84847" y="38.2329" width="59.8743" height="59.8743" transform="rotate(-30.5854 6.84847 38.2329)" stroke="#DDDDDD" strokeWidth="10" />
            <rect opacity="0.25" x="50.8485" y="44.314" width="59.8743" height="59.8743" transform="rotate(-30.5854 50.8485 44.314)" stroke="#DDDDDD" strokeWidth="10" />
          </svg>
        </div>
        <div className="position-absolute cs_layered_img_1 cs_to_up"><img src="/assets/img/creative-agency/1.webp" alt="Thumb" className="wow zoomIn" data-wow-duration="1.5s" data-wow-delay="0.1s" /></div>
        <div className="position-absolute cs_layered_img_2 cs_to_up_2"><img src="/assets/img/creative-agency/2.webp" alt="Thumb" className="wow zoomIn" data-wow-duration="1.6s" data-wow-delay="0.2s" /></div>
        <div className="position-absolute cs_layered_img_3 cs_to_up_3"><img src="/assets/img/creative-agency/3.webp" alt="Thumb" className="wow zoomIn" data-wow-duration="1.4s" data-wow-delay="0.1s" /></div>
        <div className="position-absolute cs_layered_img_4 cs_to_up_3"><img src="/assets/img/creative-agency/4.webp" alt="Thumb" className="wow zoomIn" data-wow-duration="1.8s" data-wow-delay="0.1s" /></div>
        <div className="position-absolute cs_layered_img_5 cs_to_up"><img src="/assets/img/creative-agency/5.webp" alt="Thumb" className="wow zoomIn" data-wow-duration="1.6s" data-wow-delay="0.2s" /></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="cs_slider cs_slider_2">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="cs_testimonial cs_style_1 text-center">
                      <div className="cs_testimonial_icon">
                        <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 40H16L24 24V0H0V24H12L4 40ZM36 40H48L56 24V0H32V24H44L36 40Z" fill="currentColor" />
                        </svg>
                      </div>
                      <blockquote className="cs_testimonial_text cs_primary_color cs_fs_29 cs_medium">I recently purchased a 3D print from this shop, and I must say, I’m thoroughly impressed. From start to finish, the experience was seamless. The seller was incredibly knowledgeable and helpful, guiding me through the process and offering valuable insights into material choices and design options.</blockquote>
                      <div className="cs_testimonial_info">
                        <h3 className="cs_fs_29 cs_semibold">Dulin De Silva</h3>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="cs_testimonial cs_style_1 text-center">
                      <div className="cs_testimonial_icon">
                        <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 40H16L24 24V0H0V24H12L4 40ZM36 40H48L56 24V0H32V24H44L36 40Z" fill="currentColor" />
                        </svg>
                      </div>
                      <blockquote className="cs_testimonial_text cs_primary_color cs_fs_29 cs_medium">I ordered 3D printed parts from this shop and I’m really impressed with the quality. The printed parts are clean, good in condition, and durable. The finish is smooth with excellent accuracy, exactly as I needed. The service was also fast and professional, making the whole experience easy and reliable. Highly recommended for anyone looking for high-quality 3D printing! </blockquote>
                      <div className="cs_testimonial_info">
                        <h3 className="cs_fs_29 cs_semibold">Praveen Dhamruwan</h3>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="cs_testimonial cs_style_1 text-center">
                      <div className="cs_testimonial_icon">
                        <svg width="56" height="40" viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 40H16L24 24V0H0V24H12L4 40ZM36 40H48L56 24V0H32V24H44L36 40Z" fill="currentColor" />
                        </svg>
                      </div>
                      <blockquote className="cs_testimonial_text cs_primary_color cs_fs_29 cs_medium">Got the setup for our research 3D printed from this place. The product was super high quality and the price was reasonable too. Quick efficient and friendly service. Highly recommended.</blockquote>
                      <div className="cs_testimonial_info">
                        <h3 className="cs_fs_29 cs_semibold">H.A.T.S DISSANAYAKE</h3>
                        <p>-</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cs_pagination"></div>
                <div className="cs_swiper_navigation cs_style_1">
                  <div className="cs_swiper_prev">
                    <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM42 10.5L2 10.5V13.5L42 13.5V10.5Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="cs_swiper_next">
                    <svg width="42" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M41.0607 13.0607C41.6464 12.4749 41.6464 11.5251 41.0607 10.9393L31.5147 1.3934C30.9289 0.807611 29.9792 0.807611 29.3934 1.3934C28.8076 1.97919 28.8076 2.92893 29.3934 3.51472L37.8787 12L29.3934 20.4853C28.8076 21.0711 28.8076 22.0208 29.3934 22.6066C29.9792 23.1924 30.9289 23.1924 31.5147 22.6066L41.0607 13.0607ZM0 13.5H40V10.5H0V13.5Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="cs_shape_animation_3">
        <div className="cs_shape_1 position-absolute">
          <svg width="509" height="458" viewBox="0 0 509 458" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="254" cy="229" r="228.5" stroke="currentColor" />
            <circle cx="26" cy="237" r="25.5" className="anio_3_c_1" fill="white" stroke="currentColor" />
            <circle cx="26" cy="237" r="15" fill="currentColor" />
            <circle cx="483" cy="229" r="25.5" className="anio_3_c_1" fill="white" stroke="currentColor" />
            <circle cx="483" cy="229" r="15" fill="currentColor" />
          </svg>
        </div>
        <div className="cs_height_120 cs_height_lg_75"></div>
        <div className="container">
          <div className="cs_section_heading cs_style_1 text-center">
            <p className="cs_section_subtitle cs_accent_color cs_fs_18 mb-0 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">Our Blog</p>
            <div className="cs_height_10 cs_height_lg_5"></div>
            <h2 className="cs_section_title cs_fs_50 mb-0">Our Capabilities</h2>
          </div>
          <div className="cs_height_85 cs_height_lg_45"></div>
          <div className="row cs_gap_y_24">
            <div className="col-lg-6">
              <div className="cs_post cs_style_1 cs_type_1 position-relative overflow-hidden cs_radius_5">
                <Link href="/blog" className="cs_post_thumb cs_image_blur_effect">
                  <img src="/assets/img/3d-labs/multimaterial1.webp" alt="Thumb" />
                  <img src="/assets/img/3d-labs/multimaterial2.webp" alt="Thumb" />
                </Link>
                <div className="cs_post_overlay h-100 w-100 position-absolute start-0 bottom-0"></div>
                <div className="cs_post_info position-absolute w-100 start-0 bottom-0 d-flex flex-column justify-content-end">
                  <span className="cs_posted_by">FDM</span>
                  <div className="cs_height_10 cs_height_lg_5"></div>
                  <h2 className="cs_post_title cs_fs_29 cs_white_color mb-0"><Link href="/blog">Multi-Material Prints</Link></h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs_post cs_style_2">
                <Link href="/blog" className="cs_post_thumb cs_radius_5 overflow-hidden cs_image_blur_effect">
                  <img src="/assets/img/3d-labs/skinsafe1.webp" alt="Post" />
                  <img src="/assets/img/3d-labs/skinsafe2.webp" alt="Post" />
                </Link>
                <div className="cs_post_right">
                  <span className="cs_posted_by">SLA</span>
                  <h2 className="cs_post_title cs_fs_21 mb-0"><Link href="/blog">Skin Safe - Medical Grade Parts</Link></h2>
                </div>
              </div>
              <div className="cs_post cs_style_2">
                <Link href="/blog" className="cs_post_thumb cs_radius_5 overflow-hidden cs_image_blur_effect">
                  <img src="/assets/img/3d-labs/hightempmold1.webp" alt="Post" />
                  <img src="/assets/img/3d-labs/hightempmold2.webp" alt="Post" />
                </Link>
                <div className="cs_post_right">
                  <span className="cs_posted_by">SLA</span>
                  <h2 className="cs_post_title cs_fs_21 mb-0"><Link href="/blog">High Temperature Molds</Link></h2>
                </div>
              </div>
              <div className="cs_post cs_style_2">
                <Link href="/blog" className="cs_post_thumb cs_radius_5 overflow-hidden cs_image_blur_effect">
                  <img src="/assets/img/3d-labs/engineering1.webp" alt="Post" />
                  <img src="/assets/img/3d-labs/engineering2.webp" alt="Post" />
                </Link>
                <div className="cs_post_right">
                  <span className="cs_posted_by">FDM</span>
                  <h2 className="cs_post_title cs_fs_21 mb-0"><Link href="/blog">Industrial Grade Engineering Materials</Link></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="cs_height_150 cs_height_lg_80"></div>
    </>
  );
}
