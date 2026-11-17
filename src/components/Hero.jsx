import React from 'react';
import { ArrowRight, MessageCircle, Percent } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './Hero.module.css';

export default function Hero({ onOpenIntroModal }) {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroGrid}>
          {/* 1. Top Tagline */}
          <div className={styles.taglineArea}>
            <span className={styles.taglineText}>
              {companyInfo.bniTagline}
            </span>
          </div>

          {/* 2. Brand Logo Row (TeesZone | Divider | BNI Proud Member) */}
          <div className={styles.brandArea}>
            <div className={styles.brandRow}>
              {/* TeesZone Logo */}
              <div className={styles.tzLogoWrap}>
                <img
                  src="/images/logos/teeszone_logo.png"
                  alt="TeesZone"
                  className={styles.tzLogoImg}
                  width="210"
                  height="42"
                />
              </div>

              {/* Vertical Burgundy Divider */}
              <div className={styles.verticalDivider} aria-hidden="true" />

              {/* BNI Proud Member Badge & Chapter Title */}
              <div className={styles.bniBadgeWrap}>
                <img
                  src="/images/logos/BNI_logo-removebg-preview.png"
                  alt="Proud BNI Member"
                  className={styles.bniBadgeImg}
                  width="92"
                  height="58"
                />
                <span className={styles.bniChapterName}>
                  {companyInfo.bniChapter}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Main Hero Heading */}
          <div className={styles.headingArea}>
            <h1 className={styles.mainHeading}>
              Custom Corporate Uniforms &amp; Apparel Manufacturing for Growing Businesses.
            </h1>
          </div>

          {/* 4. Apparel Presentation Area (Polo Shirt + Pricing Overlay) */}
          <div className={styles.apparelArea}>
            <div className={styles.poloComposition}>
              {/* Main 3D Polo Shirt Image */}
              <picture>
                <source srcSet="/images/hero_polo_shirt.webp" type="image/webp" />
                <img
                  src="/images/hero_polo_shirt.png"
                  alt="TeesZone Premium Burgundy Polo Shirt with YOUR BRAND customization"
                  className={styles.heroPoloImg}
                  width="783"
                  height="512"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>

              {/* BNI Member Pricing Overlay Badge */}
              <div className={styles.bniPricingOverlay}>
                <div className={styles.discountTag}>
                  <Percent size={18} className={styles.percentGlyph} />
                </div>
                <div className={styles.pricingTextGroup}>
                  <span className={styles.pricingOverTitle}>
                    {companyInfo.bniOffer.title}
                  </span>
                  <span className={styles.pricingHighlight}>
                    {companyInfo.bniOffer.discount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. CTA Buttons Area */}
          <div className={styles.buttonsArea}>
            <div className={styles.ctasRow}>
              <button
                onClick={onOpenIntroModal}
                className="btn-primary"
                aria-label="Request a Business Introduction"
              >
                <span>Request a Business Introduction</span>
                <ArrowRight size={17} />
              </button>

              <a
                href={companyInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappCtaBtn}
                aria-label="Chat on WhatsApp"
              >
                <div className={styles.whatsappIconCircle}>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="#25D366"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.67 20.16 9.32 19.82 8.12 19.17L7.83 19.01L4.72 19.83L5.55 16.8L5.37 16.51C4.66 15.28 4.28 13.62 4.28 11.91C4.28 7.37 7.98 3.67 12.05 3.67ZM8.79 7.38C8.61 7.38 8.32 7.45 8.08 7.71C7.84 7.98 7.16 8.62 7.16 9.93C7.16 11.24 8.11 12.5 8.24 12.67C8.38 12.85 10.11 15.51 12.75 16.65C13.38 16.92 13.87 17.08 14.25 17.2C14.89 17.41 15.47 17.38 15.93 17.31C16.44 17.23 17.51 16.66 17.74 16.03C17.96 15.39 17.96 14.85 17.89 14.73C17.82 14.62 17.64 14.55 17.37 14.42C17.11 14.28 15.79 13.63 15.54 13.54C15.3 13.45 15.12 13.41 14.94 13.67C14.76 13.94 14.25 14.55 14.1 14.73C13.94 14.9 13.79 14.93 13.52 14.79C13.26 14.66 12.41 14.38 11.4 13.48C10.61 12.78 10.08 11.91 9.92 11.65C9.77 11.39 9.91 11.24 10.04 11.11C10.16 10.99 10.31 10.79 10.45 10.63C10.58 10.46 10.63 10.34 10.72 10.17C10.81 9.99 10.76 9.85 10.7 9.72C10.63 9.59 10.1 8.3 9.88 7.78C9.67 7.27 9.45 7.34 9.29 7.33C9.14 7.32 8.96 7.32 8.79 7.38Z" />
                  </svg>
                </div>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Decorative Bottom Curved Burgundy & Gold Wave */}
      <div className={styles.bottomWaveContainer} aria-hidden="true">
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className={styles.waveSvg}
        >
          {/* Main Burgundy Wave Fill */}
          <path
            d="M0,58 C220,32 440,70 680,52 C920,34 1160,12 1440,24 L1440,96 L0,96 Z"
            fill="url(#burgundyWaveGrad)"
          />
          {/* Golden Contour Ribbon */}
          <path
            d="M0,58 C220,32 440,70 680,52 C920,34 1160,12 1440,24"
            fill="none"
            stroke="#D8A63B"
            strokeWidth="2.5"
          />
          <defs>
            <linearGradient id="burgundyWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#800019" />
              <stop offset="55%" stopColor="#620013" />
              <stop offset="100%" stopColor="#4A000E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
