import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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

        {/* Call Option on the right (Using Phone Call Icon) */}
        <div className={styles.headerCta}>
          <a
            href={`tel:${companyInfo.whatsapp.number}`}
            className={styles.headerPhoneBtn}
            aria-label={`Call TeesZone at ${companyInfo.whatsapp.display}`}
          >
            <div className={styles.callIconCircle}>
              <Phone size={14} color="#FFFFFF" />
            </div>
            <span>{companyInfo.whatsapp.display}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
