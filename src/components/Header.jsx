import React, { useState, useEffect } from 'react';
import { Menu, Phone, MessageCircle } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { companyInfo } from '../data/companyInfo';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection
      const sections = ['home', 'about', 'services', 'manufacturing', 'products', 'bni', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        {/* Brand Logo */}
        <a href="#home" className={styles.logoLink} aria-label="TeesZone Home">
          <img
            src="/images/logos/teeszone_logo.png"
            alt="TeesZone - Elevate your Style with Custom Tees"
            className={styles.logoImg}
            width="170"
            height="38"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav} aria-label="Primary Navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const secId = link.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li key={link.label} className={styles.navItem}>
                  <a
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* WhatsApp Header Button */}
        <div className={styles.headerCta}>
          <a
            href={companyInfo.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.headerPhoneBtn}
            aria-label={`Chat with TeesZone on WhatsApp at ${companyInfo.whatsapp.display}`}
          >
            <div className={styles.whatsappIconCircle}>
              <MessageCircle size={15} fill="#25D366" color="#25D366" />
            </div>
            <span>{companyInfo.whatsapp.display}</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={26} color="var(--color-deep-maroon)" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
