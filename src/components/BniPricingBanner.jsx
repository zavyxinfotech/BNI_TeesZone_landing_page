import React from 'react';
import { Percent, ArrowRight, Sparkles } from 'lucide-react';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import styles from './BniPricingBanner.module.css';

export default function BniPricingBanner({ onClaimOffer }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} className={styles.bannerSection} aria-label="Exclusive BNI Pricing Offer">
      <div className="container">
        <div className={styles.bannerContainer}>
          {/* Ambient decorative glow */}
          <div className={styles.glowCircle} aria-hidden="true" />

          {/* Left Gold Discount Icon Tag - Subtle Scale-In */}
          <ScaleReveal trigger={inView} delay={0.12}>
            <div className={styles.discountBadge}>
              <Percent size={28} className={styles.percentIcon} />
            </div>
          </ScaleReveal>

          {/* Center Promotional Text - Staggered Reveals */}
          <div className={styles.bannerText}>
            <FadeUp trigger={inView} delay={0.15} blur={false}>
              <div className={styles.exclusiveEyebrow}>
                <Sparkles size={14} className={styles.sparkleIcon} />
                <span>Exclusive for BNI Members —</span>
              </div>
            </FadeUp>

            <h3 className={styles.bannerTitle}>
              {prefersReduced ? (
                "Enjoy Special Pricing on All Corporate & Bulk Orders!"
              ) : (
                <WordReveal
                  text="Enjoy Special Pricing on All Corporate & Bulk Orders!"
                  trigger={inView}
                  delay={0.22}
                  stagger={0.075}
                />
              )}
            </h3>

            <FadeUp trigger={inView} delay={0.5} blur={true}>
              <p className={styles.bannerSubtitle}>
                Direct manufacturer rate slabs reserved for BNI Tycoon Erode &amp; Pan-India members.
              </p>
            </FadeUp>
          </div>

          {/* Right Highlight Pill & CTA */}
          <div className={styles.bannerRight}>
            <ScaleReveal trigger={inView} delay={0.55}>
              <div className={styles.discountPill}>
                <span className={styles.discountRate}>Up to 10–15% OFF</span>
              </div>
            </ScaleReveal>

            <ScaleReveal trigger={inView} delay={0.65}>
              <button
                onClick={onClaimOffer}
                className={styles.claimBtn}
                aria-label="Claim BNI Member Discount"
              >
                <span>Claim Discount</span>
                <ArrowRight size={16} />
              </button>
            </ScaleReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
