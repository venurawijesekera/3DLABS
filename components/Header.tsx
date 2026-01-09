"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Auth logic
    const clientStr = localStorage.getItem('3dlabs_client');
    if (clientStr) {
      try {
        const client = JSON.parse(clientStr);
        setUser(client);
      } catch (e) { console.error(e); }
    }
  }, []);

  if (pathname === '/login' || pathname === '/admin') return null;

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname === path;
  };

  const activeStyle = { color: '#ffa415' };

  return (
    <header className="cs_site_header cs_style_1 cs_sticky_header cs_primary_color">
      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link className="cs_site_branding" href="/">
                <img src="/assets/img/3logo.webp" alt="Logo" />
              </Link>
            </div>
            <div className="cs_main_header_center">
              <div className="cs_nav cs_medium cs_primary_font">
                <ul className="cs_nav_list" id="mainNav">
                  <li className={isActive('/') ? 'active' : ''}>
                    <Link href="/" style={isActive('/') ? activeStyle : {}}>HOME</Link>
                  </li>
                  <li className={isActive('/material') ? 'active' : ''}>
                    <Link href="/material" style={isActive('/material') ? activeStyle : {}}>MATERIAL</Link>
                  </li>
                  <li className={isActive('/service') ? 'active' : ''}>
                    <Link href="/service" style={isActive('/service') ? activeStyle : {}}>SERVICES</Link>
                  </li>
                  <li className={isActive('/gallery') ? 'active' : ''}>
                    <Link href="/gallery" style={isActive('/gallery') ? activeStyle : {}}>GALLERY</Link>
                  </li>
                  <li className={isActive('/blog') ? 'active' : ''}>
                    <Link href="/blog" style={isActive('/blog') ? activeStyle : {}}>BLOG</Link>
                  </li>
                  <li className={isActive('/shop') ? 'active' : ''}>
                    <Link href="/shop" style={isActive('/shop') ? activeStyle : {}}>SHOP</Link>
                  </li>
                  <li className={isActive('/about') ? 'active' : ''}>
                    <Link href="/about" style={isActive('/about') ? activeStyle : {}}>ABOUT</Link>
                  </li>
                  <li className={isActive('/contact') ? 'active' : ''}>
                    <Link href="/contact" style={isActive('/contact') ? activeStyle : {}}>CONTACT</Link>
                  </li>
                  <li className={isActive('/instant-quote') ? 'active' : ''}>
                    <Link href="/instant-quote" style={isActive('/instant-quote') ? activeStyle : {}}>INSTANT QUOTE</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="cs_main_header_right">
              {/* Auth Button */}
              {user ? (
                <Link href="/profile" id="authBtn" className="cs_btn cs_style_1" style={{ borderColor: "#ffa415", color: "#000" }}>
                  Hi, {user.name.split(' ')[0].toUpperCase()} <span><i className="fa-solid fa-user"></i></span>
                </Link>
              ) : (
                <Link href="/login" id="authBtn" className="cs_btn cs_style_1">Sign In / Join</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
