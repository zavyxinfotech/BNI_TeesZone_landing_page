import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import styles from './About.module.css';

export default function About({ onOpenAboutModal }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  const highlights = [
    "Direct manufacturing from South India's textile heartland (Texvalley, Erode)",
    "Complete in-house knitting, dyeing, bio-washing, cutting, and stitching",
    "Proud member of BNI Tycoon Erode fostering transparent, long-term partnerships"
  ];

  return (
    <section id="about" ref={ref} className={styles.aboutSection}>
      {/* SVG ClipPath Definitions for Organic Curved Framing (scaled in 0..1 bounding box) */}
      <svg width="0" height="0" className={styles.svgClipDefs} aria-hidden="true">
        <defs>
          {/* Desktop S-Curve ClipPath */}
          <clipPath id="whoWeAreClipDesktop" clipPathUnits="objectBoundingBox">
            <path d="M 0.22,0 C 0.13,0.18 0.02,0.34 0.02,0.50 C 0.02,0.68 0.08,0.85 0.16,1 L 1,1 L 1,0 Z" />
          </clipPath>
          {/* Mobile Wave ClipPath */}
          <clipPath id="whoWeAreClipMobile" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.08 C 0.25,0.02 0.52,0.16 0.80,0.05 C 0.90,0.02 0.96,0.03 1,0.05 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Full-width Section Layout (No enclosed card, full desktop and mobile width) */}
      <div className={styles.fullWidthLayout}>
        {/* Left Column: Content */}
        <div className={styles.aboutLeft}>
          <div className={styles.contentInner}>
            <FadeUp trigger={inView} delay={0.06} blur={false}>
              <div className={styles.eyebrowWrapper}>
                <span className={styles.eyebrow}>OUR HERITAGE &amp; VISION</span>
                <div className={styles.eyebrowUnderline} aria-hidden="true" />
              </div>
            </FadeUp>

            <h2 className={styles.heading}>
              {prefersReduced ? (
                "Who We Are"
              ) : (
                <WordReveal
                  text="Who We Are"
                  trigger={inView}
                  delay={0.12}
                  stagger={0.09}
                />
              )}
            </h2>

            <FadeUp trigger={inView} delay={0.28} blur={true}>
              <p className={styles.leadText}>
                TeesZone is a custom apparel manufacturing brand focused on delivering high-quality,
                stylish and durable clothing solutions for businesses, institutions and organizations.
              </p>
            </FadeUp>

            <div className={styles.keyHighlights}>
              {highlights.map((highlight, idx) => (
                <FadeUp
                  key={idx}
                  trigger={inView}
                  delay={0.4 + idx * 0.12}
                  blur={false}
                >
                  <div className={styles.highlightItem}>
                    <div className={styles.checkCircle} aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                      </svg>
                    </div>
                    <span>{highlight}</span>
                  </div>
                </FadeUp>
              ))}
            </div>

            <div className={styles.ctaWrapper}>
              <ScaleReveal trigger={inView} delay={0.75}>
                <button
                  onClick={onOpenAboutModal}
                  className={styles.aboutCtaBtn}
                  aria-label="Know More About Us"
                >
                  <span>Know More About Us</span>
                  <ArrowRight size={16} className={styles.ctaArrow} />
                </button>
              </ScaleReveal>
            </div>
          </div>
        </div>

        {/* Right Column: Full-height edge-to-edge Photography */}
        <div className={styles.aboutRight}>
          <ScaleReveal trigger={inView} delay={0.25}>
            <div className={styles.imageStage}>
              {/* Organic Gold Ribbon SVG tracing the desktop curved contour */}
              <div className={styles.desktopContourWrap} aria-hidden="true">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.contourSvg}>
                  <path
                    d="M 22,0 C 13,18 2,34 2,50 C 2,68 8,85 16,100"
                    fill="none"
                    stroke="#D9A441"
                    strokeWidth="2.2"
                  />
                </svg>
              </div>

              {/* Organic Gold Ribbon SVG tracing the mobile top wave */}
              <div className={styles.mobileContourWrap} aria-hidden="true">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className={styles.contourSvg}>
                  <path
                    d="M 0,8 C 25,2 52,16 80,5 C 90,2 96,3 100,5"
                    fill="none"
                    stroke="#D9A441"
                    strokeWidth="2.2"
                  />
                </svg>
              </div>

              {/* Masked Office Photo */}
              <div className={styles.organicMaskedFrame}>
                <picture className={styles.pictureEl}>
                  <source srcSet="/images/who_we_are_office.webp" type="image/webp" />
                  <img
                    src="/images/who_we_are_office.jpg"
                    alt="TeesZone Corporate Office, Design & Innovation Studio and Uniform Gallery"
                    className={styles.officeImg}
                    loading="lazy"
                    width="1024"
                    height="680"
                  />
                </picture>
              </div>
            </div>
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
}
