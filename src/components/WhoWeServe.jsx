import React from 'react';
import { industries } from '../data/industries';
import { useInView } from './animations/useInView';
import FadeUp from './animations/FadeUp';
import WordReveal from './animations/WordReveal';
import { useReducedMotion } from './animations/useReducedMotion';
import styles from './WhoWeServe.module.css';

export default function WhoWeServe() {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className={styles.serveSection} aria-label="Who We Serve">
      <div className={styles.serveContainer}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.headingArea}>
          <h2 className={styles.sectionTitle}>
            {prefersReduced ? (
              "Who We Serve"
            ) : (
              <WordReveal
                text="Who We Serve"
                trigger={headerInView}
                delay={0.06}
                stagger={0.08}
              />
            )}
          </h2>

          <div className={styles.goldAccentLine} aria-hidden="true" />

          <FadeUp trigger={headerInView} delay={0.2} blur={true}>
            <p className={styles.sectionSubtitle}>
              We deliver customized apparel solutions for a wide range of organizations across industries.
            </p>
          </FadeUp>
        </div>

        {/* Desktop View: Six Industry Category Cards (Enlarged, Shaded Theme & Italicized Font) */}
        <div ref={gridRef} className={styles.desktopCardsGrid}>
          {industries.map((item, idx) => {
            const itemDelay = 0.08 + idx * 0.07;
            return (
              <FadeUp
                key={item.id}
                trigger={gridInView}
                delay={itemDelay}
                blur={false}
                className={styles.desktopCardItem}
              >
                <div className={styles.desktopCardInner}>
                  {/* Shaded 3D Gold & Burgundy Card Background Frame attached to theme */}
                  <picture>
                    <source srcSet="/images/products/serve_card_bg_desktop.webp" type="image/webp" />
                    <img
                      src="/images/products/serve_card_bg_desktop.png"
                      alt=""
                      className={styles.desktopCardBg}
                      aria-hidden="true"
                    />
                  </picture>

                  {/* Apparel Product Image (Cleanly Aligned INSIDE the Card) */}
                  <div className={styles.desktopApparelWrap}>
                    <picture>
                      <source srcSet={item.image} type="image/webp" />
                      <img
                        src={item.imagePng || item.image}
                        alt={item.title}
                        className={styles.desktopApparelImg}
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  {/* Industry Title in Italic Typography */}
                  <div className={styles.desktopTitleWrap}>
                    <h3 className={styles.desktopCardTitle}>{item.title}</h3>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Mobile View: Vertical Stack of Horizontal Pill Cards */}
        <div className={styles.mobileCardsList}>
          {industries.map((item, idx) => {
            const itemDelay = 0.08 + idx * 0.06;
            return (
              <FadeUp
                key={`mobile-${item.id}`}
                trigger={gridInView}
                delay={itemDelay}
                blur={false}
                className={styles.mobileCardItem}
              >
                <div className={styles.mobileCardInner}>
                  {/* Shaded Horizontal Pill Background Frame */}
                  <picture>
                    <source srcSet="/images/products/serve_card_bg_mobile.webp" type="image/webp" />
                    <img
                      src="/images/products/serve_card_bg_mobile.png"
                      alt=""
                      className={styles.mobileCardBg}
                      aria-hidden="true"
                    />
                  </picture>

                  {/* Left Side: Apparel Image Aligned Inside Card */}
                  <div className={styles.mobileApparelWrap}>
                    <picture>
                      <source srcSet={item.image} type="image/webp" />
                      <img
                        src={item.imagePng || item.image}
                        alt={item.title}
                        className={styles.mobileApparelImg}
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  {/* Right Side: Industry Title in Italic Typography */}
                  <div className={styles.mobileTitleWrap}>
                    <h3 className={styles.mobileCardTitle}>{item.title}</h3>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Luxury Bottom Burgundy Wave Accent */}
        <div className={styles.bottomWaveAccent} aria-hidden="true">
          <picture>
            <source srcSet="/images/products/who_we_serve_wave.webp" type="image/webp" />
            <img
              src="/images/products/who_we_serve_wave.png"
              alt=""
              className={styles.bottomWaveImg}
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
