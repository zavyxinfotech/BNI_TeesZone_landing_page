import React from 'react';
import { ArrowRight, MessageCircle, Percent, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './Hero.module.css';

export default function Hero({ onOpenIntroModal }) {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Decorative ambient curved background layers */}
      <div className={styles.bgCurvedGlow} aria-hidden="true" />
      <div className={styles.bgGoldSwoop} aria-hidden="true" />

      <div className={`container ${styles.heroContainer}`}>
        {/* Left Column: Branding, Headings & CTAs (~45%) */}
        <div className={styles.heroLeft}>
          {/* Eyebrow Relationship Slogan */}
          <div className={styles.eyebrowWrapper}>
            <span className={styles.eyebrowText}>{companyInfo.bniTagline}</span>
          </div>

          {/* Logo Lockup: TeesZone | Vertical Divider | BNI Proud Member Badge */}
          <div className={styles.brandLockup}>
            <div className={styles.tzBrandWrap}>
              <img
                src="/images/logos/teeszone_logo.png"
                alt="TeesZone"
                className={styles.tzLogoImg}
                width="160"
                height="36"
              />
            </div>

            <div className={styles.verticalDivider} aria-hidden="true" />

            <div className={styles.bniBadgeWrap}>
              <img
                src="/images/logos/bni_proud_member.png"
                alt="Proud BNI Member"
                className={styles.bniBadgeImg}
                width="95"
                height="56"
              />
              <span className={styles.bniChapterText}>{companyInfo.bniChapter}</span>
            </div>
          </div>

          {/* Main Hero Heading */}
          <h1 className={styles.heroHeading}>
            Custom Corporate Uniforms &amp; Apparel Manufacturing for Growing Businesses.
          </h1>

          {/* Call-to-action buttons */}
          <div className={styles.heroCtas}>
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
              className="btn-secondary"
              aria-label="Chat with TeesZone on WhatsApp"
            >
              <MessageCircle size={18} color="#25D366" fill="#25D366" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: 3D Burgundy Polo Presentation & BNI Pricing Badge (~55%) */}
        <div className={styles.heroRight}>
          <div className={styles.apparelWrapper}>
            {/* Main Burgundy 3D Polo Shirt Image with "YOUR BRAND" on chest */}
            <picture>
              <source srcSet="/images/hero_polo_shirt.webp" type="image/webp" />
              <img
                src="/images/hero_polo_shirt.png"
                alt="TeesZone Premium Burgundy Polo Shirt with YOUR BRAND customization"
                className={styles.poloImage}
                width="620"
                height="440"
                loading="eager"
                fetchPriority="high"
              />
            </picture>

            {/* Floating 3D BNI Pricing Overlay Badge */}
            <div className={styles.bniPricingCard}>
              <div className={styles.discountTagShape}>
                <Percent size={20} className={styles.percentIcon} />
              </div>
              <div className={styles.pricingCardText}>
                <div className={styles.pricingCardTitle}>
                  {companyInfo.bniOffer.title}
                </div>
                <div className={styles.pricingCardSubtitle}>
                  {companyInfo.bniOffer.discount}
                </div>
              </div>
            </div>

            {/* Subtle floating glow behind shirt */}
            <div className={styles.shirtBackdropGlow} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
