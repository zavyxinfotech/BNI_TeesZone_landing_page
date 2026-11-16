import React from 'react';
import { Percent, ArrowRight, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './BniPricingBanner.module.css';

export default function BniPricingBanner({ onClaimOffer }) {
  return (
    <section className={styles.bannerSection} aria-label="Exclusive BNI Pricing Offer">
      <div className="container">
        <div className={styles.bannerContainer}>
          {/* Ambient decorative glow */}
          <div className={styles.glowCircle} aria-hidden="true" />

          {/* Left Gold Discount Icon Tag */}
          <div className={styles.discountBadge}>
            <Percent size={28} className={styles.percentIcon} />
          </div>

          {/* Center Promotional Text */}
          <div className={styles.bannerText}>
            <div className={styles.exclusiveEyebrow}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>Exclusive for BNI Members —</span>
            </div>
            <h3 className={styles.bannerTitle}>
              Enjoy Special Pricing on All Corporate &amp; Bulk Orders!
            </h3>
            <p className={styles.bannerSubtitle}>
              Direct manufacturer rate slabs reserved for BNI Tycoon Erode &amp; Pan-India members.
            </p>
          </div>

          {/* Right Highlight Pill & CTA */}
          <div className={styles.bannerRight}>
            <div className={styles.discountPill}>
              <span className={styles.discountRate}>Up to 10–15% OFF</span>
            </div>
            <button
              onClick={onClaimOffer}
              className={styles.claimBtn}
              aria-label="Claim BNI Member Discount"
            >
              <span>Claim Discount</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
