import type { Metadata } from 'next';

export const runtime = 'edge';

import InstantQuoteClient from './InstantQuoteClient';

export const metadata: Metadata = {
  title: '3D LABS - Instant Quote',
};

export default function InstantQuotePage() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <style>{`
         /* --- Sidebar --- */
    .iq_layout {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 30px;
      align-items: start;
    }

    @media (max-width: 992px) {
      .iq_layout {
        grid-template-columns: 1fr;
      }
    }

    .iq_sidebar {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 24px;
      position: sticky;
      top: 100px;
    }

    .iq_dropzone {
      border: 2px dashed rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      padding: 30px 15px;
      text-align: center;
      transition: all .2s;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.01);
    }

    .iq_dropzone:hover, .iq_dropzone.iq_active {
      border-color: #ffb703;
      background: rgba(255, 183, 3, 0.05);
    }

    /* --- Cards --- */
    .iq_file_list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .iq_card {
      background: #1a1a1a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      position: relative;
      transition: border-color 0.3s;
    }

    .iq_card:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }

    .iq_3d_viewer {
      width: 100%;
      height: 220px;
      background: #252525;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      border: 1px solid #333;
    }

    .iq_card_header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 5px;
    }

    .iq_filename {
      font-weight: 600;
      font-size: 16px;
      color: #fff;
      word-break: break-all;
      margin-right: 10px;
    }

    .iq_remove_btn {
      background: none;
      border: none;
      color: #ff6b6b;
      cursor: pointer;
      padding: 0;
      font-size: 18px;
    }

    .iq_ref_display {
      font-size: 11px;
      color: #888;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: monospace;
    }

    .iq_card_settings {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 15px;
      background: rgba(255, 255, 255, 0.02);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 1px solid transparent;
    }

    .iq_card_settings.custom-active {
      border-color: #ffb703;
      background: rgba(255, 183, 3, 0.05);
    }

    .form-control,
    .form-select {
      background: #2a2a2a;
      border: 1px solid #444;
      color: #fff;
      font-size: 13px;
    }

    .form-select option {
      background: #171717;
      color: #fff;
    }

    .form-control:focus,
    .form-select:focus {
      background: #2a2a2a;
      color: #fff;
      border-color: #ffb703;
      box-shadow: none;
    }

    .custom-switch {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #ffb703;
      cursor: pointer;
      margin-bottom: 10px;
    }
    
    .btn-calculate {
      background: #fff;
      color: #000;
      width: 100%;
      border: none;
      padding: 12px;
      font-weight: 700;
      border-radius: 8px;
      margin-top: 15px;
      transition: 0.2s;
    }

    .btn-calculate:hover {
      background: #e0e0e0;
    }

    .btn-whatsapp {
      background: #25D366;
      color: #fff;
      width: 100%;
      border: none;
      padding: 12px;
      font-weight: 700;
      border-radius: 50px;
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: 0.2s;
    }

    .btn-whatsapp:hover {
        background: #1ebc57;
        color: #fff;
    }

    .iq_grand_total {
      margin-top: 20px;
      background: #ffb703;
      color: #000;
      padding: 20px;
      border-radius: 12px;
    }

    .iq_status_badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 5px;
    }

    .iq_status_badge.pending { background: #333; color: #888; }
    .iq_status_badge.processing { background: #ffb703; color: #000; animation: pulse 1s infinite; }
    .iq_status_badge.done { background: #25D366; color: #000; }
    .iq_status_badge.error { background: #ff6b6b; color: #fff; }

    .iq_price_tag {
        font-size: 20px;
        font-weight: 700;
        color: #ffb703;
        line-height: 1;
    }

    .iq_card_footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 15px;
    }
    
    .iq_disclaimer {
      font-size: 12px;
      color: #777;
      margin-top: 20px;
      line-height: 1.4;
      border-top: 1px dashed #444;
      padding-top: 15px;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
      `}</style>

      <div className="cs_height_140 cs_height_lg_80"></div>

      <div className="container py-5">
        <div className="text-center mb-5">
          <p className="cs_accent_color cs_fs_21 wow fadeInLeft">Get Instant Quote...</p>
          <h2 className="cs_section_title cs_fs_68">Instant 3D Quote</h2>
        </div>

        <InstantQuoteClient />
      </div>
    </>
  );
}
