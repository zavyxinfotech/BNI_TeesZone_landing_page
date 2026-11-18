import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Truck, Star } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import WordReveal from './animations/WordReveal';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import styles from './Hero.module.css';

export default function Hero({ onOpenIntroModal }) {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [isMounted, setIsMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Initial mount trigger
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Animate on load and whenever hero is scrolled into view
  const isHeroActive = prefersReduced ? true : (isMounted && heroInView);
  const loadedClass = isHeroActive ? styles.heroLoaded : '';

  return (
    <section ref={heroRef} id="home" className={`${styles.heroSection} ${loadedClass}`}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroGrid}>
          {/* 1. Top Tagline (Hero Eyebrow: Fade-up + tracking transition) */}
          <div className={styles.taglineArea}>
            <span className={`${styles.taglineText} ${styles.animateEyebrow}`}>
              {companyInfo.bniTagline}
            </span>
          </div>

          {/* 2. Brand Logo Row (TeesZone | Divider | BNI Proud Member) */}
          <div className={styles.brandArea}>
            <div className={styles.brandRow}>
              {/* TeesZone Logo: Smooth fade-in and scale-in */}
              <div className={`${styles.tzLogoWrap} ${styles.animateTzLogo}`}>
                <img
                  src="/images/logos/teeszone_logo.png"
                  alt="TeesZone"
                  className={styles.tzLogoImg}
                  width="210"
                  height="42"
                />
              </div>

              {/* Vertical Burgundy Divider */}
              <div className={`${styles.verticalDivider} ${styles.animateDivider}`} aria-hidden="true" />

              {/* BNI Proud Member Badge: Fade-in & slight scale */}
              <div className={styles.bniBadgeWrap}>
                <div className={styles.animateBniBadge}>
                  <img
                    src="/images/logos/BNI_logo-removebg-preview.png"
                    alt="Proud BNI Member"
                    className={styles.bniBadgeImg}
                    width="92"
                    height="58"
                  />
                </div>
                {/* BNI Tycoon Erode text animates subtly after badge */}
                <span className={`${styles.bniChapterName} ${styles.animateBniChapter}`}>
                  {companyInfo.bniChapter}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Main Hero Heading: Word-by-word staggered reveal */}
          <div className={styles.headingArea}>
            <h1 className={styles.mainHeading}>
              {prefersReduced ? (
                "Custom Corporate Uniforms & Apparel Manufacturing for Growing Businesses."
              ) : (
                <WordReveal
                  text="Custom Corporate Uniforms & Apparel Manufacturing for Growing Businesses."
                  trigger={isHeroActive}
                  delay={0.25}
                  stagger={0.075}
                />
              )}
            </h1>
          </div>

          {/* 4. Apparel Presentation Area (Polo Shirt + Pricing Overlay + Connected Background Curve) */}
          <div className={styles.apparelArea}>
            <div className={styles.poloComposition}>
              {/* Sweeping curve accent connecting right into the bottom wave */}
              <div className={`${styles.curveConnector} ${styles.animateCurve}`} aria-hidden="true">
                <svg viewBox="0 0 500 500" className={styles.curveConnectorSvg} preserveAspectRatio="none">
                  {/* Outer sweeping gold ribbon */}
                  <path
                    d="M 20,480 C 120,420 320,380 440,240 C 490,170 480,80 430,20"
                    fill="none"
                    stroke="#D8A63B"
                    strokeWidth="3.5"
                    opacity="0.8"
                  />
                  {/* Inner burgundy accent swoosh */}
                  <path
                    d="M 50,495 C 160,445 350,400 460,260"
                    fill="none"
                    stroke="#5B0013"
                    strokeWidth="6"
                    opacity="0.35"
                  />
                </svg>
              </div>

              {/* Main 3D Polo Shirt Image: Fade-in, slight upward movement, subtle scale reveal */}
              <div className={styles.animatePoloWrapper}>
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
              </div>

              {/* BNI Member Pricing Overlay Badge: Scale-in, opacity reveal, subtle spring */}
              <div className={`${styles.bniPricingOverlay} ${styles.animatePricingBadge}`}>
                <div className={styles.goldOfferTagWrapper}>
                  <picture>
                    <source srcSet="/images/gold_offer_tag.webp" type="image/webp" />
                    <img
                      src="/images/gold_offer_tag.png"
                      alt="Offer Tag"
                      className={styles.goldOfferTagImg}
                      width="38"
                      height="44"
                    />
                  </picture>
                  <span className={styles.tagOfferSymbol}>%</span>
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

          {/* 5. CTA Button Area: Fade-up and slight scale-in */}
          <div className={`${styles.buttonsArea} ${styles.animateButtons}`}>
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

      {/* 6. Decorative Bottom Curved Burgundy & Gold Wave with Sequentially Animated Trust Indicators */}
      <div className={styles.bottomWaveSection} aria-label="Trust Indicators">
        <div className={styles.waveSvgWrapper} aria-hidden="true">
          <svg
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            className={styles.waveSvg}
          >
            {/* Main Burgundy Wave Fill - Uniform #5B0013 matching below content */}
            <path
              d="M0,62 C320,18 660,82 1020,38 C1220,12 1360,32 1440,24 L1440,96 L0,96 Z"
              fill="#5B0013"
            />
            {/* Golden Contour Ribbon */}
            <path
              d="M0,62 C320,18 660,82 1020,38 C1220,12 1360,32 1440,24"
              fill="none"
              stroke="#D8A63B"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className={styles.wavyContentBand}>
          <div className={`container ${styles.wavyTrustContainer}`}>
            {/* Item 1: 5 Star Google Ratings */}
            <div className={`${styles.wavyTrustItem} ${styles.trustItem1}`}>
              <div className={`${styles.googleIconBadge} ${styles.trustIcon}`}>
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
              <div className={`${styles.wavyTextGroup} ${styles.trustText}`}>
                <span className={styles.wavyItemTitle}>5 Star Google Ratings</span>
                <div className={styles.wavyStarsRow} aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={styles.starWrap}
                      style={{ transitionDelay: `${0.95 + i * 0.08}s` }}
                    >
                      <Star size={14} fill="#D8A63B" color="#D8A63B" />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.wavyDivider} aria-hidden="true" />

            {/* Item 2: 500+ Happy Clients */}
            <div className={`${styles.wavyTrustItem} ${styles.trustItem2}`}>
              <div className={`${styles.wavyIconBadge} ${styles.trustIcon}`}>
                <Users size={20} color="#D8A63B" />
              </div>
              <div className={`${styles.wavyTextGroup} ${styles.trustText}`}>
                <span className={styles.wavyItemTitle}>500+ Happy Clients</span>
                <span className={styles.wavyItemSubtitle}>Satisfied Businesses</span>
              </div>
            </div>

            <div className={styles.wavyDivider} aria-hidden="true" />

            {/* Item 3: PAN India Delivery / Doorstep Logistics */}
            <div className={`${styles.wavyTrustItem} ${styles.trustItem3}`}>
              <div className={`${styles.wavyIconBadge} ${styles.trustIcon}`}>
                <Truck size={20} color="#D8A63B" />
              </div>
              <div className={`${styles.wavyTextGroup} ${styles.trustText}`}>
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
