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
    <section id="about" ref={ref} className={`section-wrapper ${styles.aboutSection}`}>
      {/* SVG ClipPath Definitions for Organic Curved Framing (scaled in 0..1 bounding box) */}
      <svg width="0" height="0" className={styles.svgClipDefs} aria-hidden="true">
        <defs>
          {/* Desktop S-Curve ClipPath */}
          <clipPath id="whoWeAreClipDesktop" clipPathUnits="objectBoundingBox">
            <path d="M 0.24,0 C 0.14,0.18 0.02,0.34 0.02,0.50 C 0.02,0.68 0.08,0.85 0.18,1 L 1,1 L 1,0 Z" />
          </clipPath>
          {/* Mobile Wave ClipPath */}
          <clipPath id="whoWeAreClipMobile" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.10 C 0.25,0.02 0.52,0.18 0.80,0.06 C 0.90,0.02 0.96,0.04 1,0.06 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={`container ${styles.aboutContainer}`}>
        {/* Main Editorial Card Frame replicating Image 1 design */}
        <div className={styles.editorialCard}>
          {/* Bottom-Left Deep Burgundy Wave with Gold Contour Ribbon */}
          <div className={styles.bottomLeftWaveWrap} aria-hidden="true">
            <svg viewBox="0 0 340 100" fill="none" preserveAspectRatio="none" className={styles.bottomLeftWaveSvg}>
              {/* Deep Burgundy Corner Wave Fill */}
              <path
                d="M 0,100 L 0,46 C 50,46 110,64 175,78 C 235,92 290,95 340,100 Z"
                fill="#7A001F"
              />
              {/* Gold Ribbon Contour */}
              <path
                d="M 0,46 C 50,46 110,64 175,78 C 235,92 290,95 340,100"
                fill="none"
                stroke="#D9A441"
                strokeWidth="2.8"
              />
            </svg>
          </div>

          {/* Sweeping Gold Ribbon Accent across Bottom */}
          <div className={styles.bottomSweepRibbonWrap} aria-hidden="true">
            <svg viewBox="0 0 650 90" fill="none" preserveAspectRatio="none" className={styles.bottomSweepSvg}>
              <path
                d="M 0,90 C 140,62 310,38 480,62 C 550,72 610,84 650,90"
                fill="none"
                stroke="#D9A441"
                strokeWidth="3.2"
                opacity="0.85"
              />
            </svg>
          </div>

          <div className={styles.cardInnerLayout}>
            {/* Left Column: Story, Description, Bullet Highlights & CTA */}
            <div className={styles.aboutLeft}>
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

            {/* Right Column: Immersive Office Photography with Organic Curved Wave & Gold Ribbon */}
            <div className={styles.aboutRight}>
              <ScaleReveal trigger={inView} delay={0.25}>
                <div className={styles.imageStage}>
                  {/* Organic Gold Ribbon SVG tracing the desktop curved contour */}
                  <div className={styles.desktopContourWrap} aria-hidden="true">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.contourSvg}>
                      <path
                        d="M 24,0 C 14,18 2,34 2,50 C 2,68 8,85 18,100"
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
                        d="M 0,10 C 25,2 52,18 80,6 C 90,2 96,4 100,6"
                        fill="none"
                        stroke="#D9A441"
                        strokeWidth="2"
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
                        width="760"
                        height="520"
                      />
                    </picture>
                  </div>
                </div>
              </ScaleReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
