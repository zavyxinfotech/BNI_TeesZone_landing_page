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
                  <MessageCircle size={15} fill="#25D366" color="#25D366" />
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
