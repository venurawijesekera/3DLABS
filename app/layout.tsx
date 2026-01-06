import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "3D Labs | Professional 3D Printing & Design Services in Sri Lanka",
  description: "3D Labs Sri Lanka — Expert 3D Printing, CAD Design, and Prototyping Services. We offer FDM, SLA, and Resin Printing for industrial, medical, and creative projects.",
  keywords: "3D printing, 3D printing Sri Lanka, 3D design, 3D modeling, prototyping, FDM, SLA, resin printing, Technotronic Futuristics, 3D Labs",
  authors: [{ name: "Technotronic Futuristics" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js">
      <head>
        <link rel="icon" href="/assets/img/favicon.png" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/odometer.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/modern-ui.css" />
        {/* 3D Viewer Custom CSS can be moved to a CSS module or globals, but for now specific to home page? It was in index.html, so I'll leave it out of global layout unless needed. */}
      </head>
      <body className="cs_dark">
        <div className="cursor" id="client_cursor">View</div>

        {/* Preloader - ideally converted to React, but for now keeping structure if JS handles it */}
        <div className="cs_perloader">
          <div className="cs_perloader_in">
            <div className="cs_perloader_dots_wrap">
              <div className="cs_perloader_dots"><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <span className="cs_perloader_text">Jumping To 3D LABS...</span>
        </div>

        <Header />

        {children}

        <Footer />

        <span className="cs_scrollup">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10L1.7625 11.7625L8.75 4.7875V20H11.25V4.7875L18.225 11.775L20 10L10 0L0 10Z" fill="currentColor" />
          </svg>
        </span>

        {/* Scripts - strategy="lazyOnload" or "afterInteractive" is best */}
        <Script src="/assets/js/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/swiper.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/odometer.js" strategy="lazyOnload" />
        <Script src="/assets/js/ripples.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/isotope.pkg.min.js" strategy="lazyOnload" />
        <Script src="/assets/js/gsap.min.js" strategy="lazyOnload" />
        {/* main.js needs to run after others. It expects DOM to be ready. */}
        <Script src="/assets/js/main.js" strategy="lazyOnload" />

        {/* Three.js dependencies - Only needed for Home page, but can be global if used elsewhere */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
