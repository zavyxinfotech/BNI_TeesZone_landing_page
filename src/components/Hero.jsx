import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Truck, Star } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import WordReveal from './animations/WordReveal';
import CountingNumber from './animations/CountingNumber';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import styles from './Hero.module.css';

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=teeszone+google+reviews+&sca_esv=a1f7945095f7d3aa&biw=1536&bih=730&sxsrf=AKL5yDgd6XR05pb5VUdybTy75HEH3fSQig%3A1795067535887&ei=j47-asfTNbifseMPyZKQ-QQ&uact=5&oq=teeszone+google+reviews+&gs_lp=Egxnd3Mtd2l6LXNlcnAiGHRlZXN6b25lIGdvb2dsZSByZXZpZXdzIDIIECEYoAEYwwQyCBAhGKABGMMESP0vULkCWMYucAF4AJABAJgByQGgAagNqgEGMC4xMC4xuAEDyAEA-AEBmAIKoAK0C8ICCBAAGO8FGLADwgILEAAYgAQYogQYsAPCAgQQIxgnwgILEAAYgAQYigUYkQLCAgUQABiABMICChAAGIAEGIoFGEPCAgoQABiABBgUGIcCwgIHECMYsAIYJ8ICBhAAGAcYHsICBxAAGIAEGA3CAgoQABiABBgNGLQHwgIIEAAYBRgHGB7CAgoQABgFGAcYHhgKwgIFEAAY7wXCAggQABiABBiiBMICCBAAGAUYHhgNwgIKEAAYBRgeGA0YCsICCBAAGAgYHhgNwgIKECEYChigARjDBJgDAIgGAZAGBJIHAzEuOaAH3j2yBwMwLjm4B6ILwgcFMi01LjXIB0iACAE&sclient=gws-wiz-serp#sv=CAwSigIKBmxjbF9wdhKsAQoEbXN0axKjAUFVdEV4ZkJya3ZIc0FseUFmOHQyR0JSd3VHd1RtckNXbUdmQmpXWUFFXzN4aVRQeDhROWNnUjJFLXJRNXZ1S2lHNGNWMlg1RzFlUWNUWDk4Mjh3MjVQV1NHenU2T25zQXMyUTFTQjNuNHpBdlM4ZUVuTDdUZmxfbXNpYVloWVVkTFVZM2MyTzQ4S3U5bFF4NDA0dGg4ZmNaWXJWUkRvWUxFWVkSHAoBcRIXdGVlc3pvbmUgZ29vZ2xlIHJldmlld3MSHwoDcHZxEhhDZzB2Wnk4eE1XMXNkSEk1WnpaMGdBRUIaEmxvY2FsLXBsYWNlLXZpZXdlchgKIJyZhd8E";

export default function Hero({ onOpenIntroModal }) {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [trustRef, trustInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [isMounted, setIsMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Animate on initial mount and whenever section enters viewport
  const isHeroActive = prefersReduced ? true : (isMounted && heroInView);
  const isTrustActive = prefersReduced ? true : (isMounted && (heroInView || trustInView));
  const loadedClass = isHeroActive ? styles.heroLoaded : '';

  // Render individual trust item nodes for reuse in desktop and mobile ticker
  const renderTrustItems = (keyPrefix = 'main') => (
    <>
      {/* 1. 5 Star Google Ratings - Navigates to Google Reviews URL */}
      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.wavyTrustItem} ${styles.trustItem1} ${styles.googleReviewLink}`}
        title="Read TeesZone Google Reviews (opens in new tab)"
        aria-label="5 Star Google Ratings - Read Reviews on Google"
      >
        <div className={`${styles.googleIconBadge} ${styles.trustIcon}`}>
          <svg className={styles.googleGLogo} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
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
          <span className={styles.wavyItemTitle}>
            <CountingNumber
              end={5}
              duration={1400}
              trigger={isTrustActive}
            /> Star Google Ratings
          </span>
          <div className={styles.wavyStarsRow} aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={`${keyPrefix}-star-${i}`}
                className={styles.starWrap}
                style={{ transitionDelay: `${0.85 + i * 0.08}s` }}
              >
                <Star size={14} fill="#D8A63B" color="#D8A63B" />
              </span>
            ))}
          </div>
        </div>
      </a>

      <div className={styles.wavyDivider} aria-hidden="true" />

      {/* 2. 500+ Happy Clients */}
      <div className={`${styles.wavyTrustItem} ${styles.trustItem2}`}>
        <div className={`${styles.wavyIconBadge} ${styles.trustIcon}`}>
          <Users size={20} color="#D8A63B" />
        </div>
        <div className={`${styles.wavyTextGroup} ${styles.trustText}`}>
          <span className={styles.wavyItemTitle}>
            <CountingNumber
              end={500}
              suffix="+"
              duration={1800}
              trigger={isTrustActive}
            /> Happy Clients
          </span>
          <span className={styles.wavyItemSubtitle}>Satisfied Businesses</span>
        </div>
      </div>

      <div className={styles.wavyDivider} aria-hidden="true" />

      {/* 3. PAN India Delivery */}
      <div className={`${styles.wavyTrustItem} ${styles.trustItem3}`}>
        <div className={`${styles.wavyIconBadge} ${styles.trustIcon}`}>
          <Truck size={20} color="#D8A63B" />
        </div>
        <div className={`${styles.wavyTextGroup} ${styles.trustText}`}>
          <span className={styles.wavyItemTitle}>
            <CountingNumber
              end={100}
              suffix="%"
              duration={1600}
              trigger={isTrustActive}
            /> PAN India Delivery
          </span>
          <span className={styles.wavyItemSubtitle}>Doorstep Logistics</span>
        </div>
      </div>
    </>
  );

  return (
    <section ref={heroRef} id="home" className={`${styles.heroSection} ${loadedClass}`}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Hero Content Area */}
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroGrid}>
          {/* 1. Top Tagline (Hero Eyebrow: Fade-up + tracking transition) */}
          <div className={styles.taglineArea}>
            <span className={`${styles.taglineText} ${styles.animateEyebrow}`}>
              {companyInfo.bniTagline}
            </span>
          </div>

          {/* 2. Brand Logo Row (TeesZone | Thin Divider | BNI Proud Member) */}
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

              {/* Thin Vertical Line Divider */}
              <div className={`${styles.verticalDivider} ${styles.animateDivider}`} aria-hidden="true" />

              {/* BNI Proud Member Badge */}
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
                <span className={`${styles.bniChapterName} ${styles.animateBniChapter}`}>
                  {companyInfo.bniChapter}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Main Hero Heading: Non-bold, elegant modern typography with Word-by-word reveal */}
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

          {/* 4. CTA Button Area: Request a Business Introduction (WhatsApp CTA removed) */}
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

          {/* Right Area placeholder for desktop grid: leaves the artwork on the right unobstructed */}
          <div className={styles.desktopArtSpacer} aria-hidden="true" />
        </div>
      </div>

      {/* Hero Bottom Contents: Trust Indicators Band with Counting Animation & Mobile Auto-scroll Ticker */}
      <div ref={trustRef} className={styles.bottomWaveSection} aria-label="Trust Indicators">
        <div className={styles.waveSvgWrapper} aria-hidden="true">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className={styles.waveSvg}
          >
            {/* Main Burgundy Wave Fill - Uniform #5B0013 matching below content */}
            <path
              d="M0,52 C320,14 660,72 1020,32 C1220,10 1360,26 1440,18 L1440,80 L0,80 Z"
              fill="#5B0013"
            />
            {/* Golden Contour Ribbon */}
            <path
              d="M0,52 C320,14 660,72 1020,32 C1220,10 1360,26 1440,18"
              fill="none"
              stroke="#D8A63B"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className={styles.wavyContentBand}>
          {/* Desktop Layout: Centered spaced row */}
          <div className={`container ${styles.desktopTrustContainer}`}>
            {renderTrustItems('desktop')}
          </div>

          {/* Mobile Layout: Single continuous row with infinite auto-scroll animation */}
          <div className={styles.mobileTickerWrapper}>
            <div className={styles.mobileTickerTrack}>
              <div className={styles.tickerGroup}>
                {renderTrustItems('m-group-1')}
              </div>
              <div className={styles.tickerGroup} aria-hidden="true">
                {renderTrustItems('m-group-2')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
