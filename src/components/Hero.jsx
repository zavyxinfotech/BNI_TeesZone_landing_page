import React from 'react';
import { ArrowRight, Percent, Users, Truck, Star } from 'lucide-react';
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

          {/* 5. CTA Button Area */}
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
            </div>
          </div>
        </div>
      </div>

      {/* 6. Decorative Bottom Curved Burgundy & Gold Wave with Trust Indicators */}
      <div className={styles.bottomWaveSection} aria-label="Trust Indicators">
        <div className={styles.waveSvgWrapper} aria-hidden="true">
          <svg
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            className={styles.waveSvg}
          >
            {/* Main Burgundy Wave Fill */}
            <path
              d="M0,62 C320,18 660,82 1020,38 C1220,12 1360,32 1440,24 L1440,96 L0,96 Z"
              fill="url(#burgundyWaveGrad)"
            />
            {/* Golden Contour Ribbon */}
            <path
              d="M0,62 C320,18 660,82 1020,38 C1220,12 1360,32 1440,24"
              fill="none"
              stroke="#D8A63B"
              strokeWidth="2.5"
            />
            <defs>
              <linearGradient id="burgundyWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#800019" />
                <stop offset="50%" stopColor="#640014" />
                <stop offset="100%" stopColor="#4A000E" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={styles.wavyContentBand}>
          <div className={`container ${styles.wavyTrustContainer}`}>
            {/* Item 1: 5-Star Google Ratings */}
            <div className={styles.wavyTrustItem}>
              <div className={styles.googleIconBadge}>
                <svg className={styles.googleGLogo} viewBox="0 0 24 24" width="22" height="22">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div className={styles.wavyTextGroup}>
                <span className={styles.wavyItemTitle}>5-Star Google Ratings</span>
                <div className={styles.wavyStarsRow} aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#D8A63B" color="#D8A63B" />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.wavyDivider} aria-hidden="true" />

            {/* Item 2: 500+ Google Clients / Satisfied Businesses */}
            <div className={styles.wavyTrustItem}>
              <div className={styles.wavyIconBadge}>
                <Users size={20} color="#D8A63B" />
              </div>
              <div className={styles.wavyTextGroup}>
                <span className={styles.wavyItemTitle}>500+ Google Clients</span>
                <span className={styles.wavyItemSubtitle}>Satisfied Businesses</span>
              </div>
            </div>

            <div className={styles.wavyDivider} aria-hidden="true" />

            {/* Item 3: PAN India Delivery / Doorstep Logistics */}
            <div className={styles.wavyTrustItem}>
              <div className={styles.wavyIconBadge}>
                <Truck size={20} color="#D8A63B" />
              </div>
              <div className={styles.wavyTextGroup}>
                <span className={styles.wavyItemTitle}>PAN India Delivery</span>
                <span className={styles.wavyItemSubtitle}>Doorstep Logistics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
