import Link from 'next/link';
import HeroViewer from '@/components/HeroViewer';

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
      <section className="cs_hero cs_style_3 cs_bg_filed cs_center" data-src="/assets/img/bg.png">
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
    </>
  );
}
