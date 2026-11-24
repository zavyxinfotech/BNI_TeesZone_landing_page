import React from 'react';
import { industries } from '../data/industries';
import { useInView } from './animations/useInView';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import WordReveal from './animations/WordReveal';
import { useReducedMotion } from './animations/useReducedMotion';
import styles from './WhoWeServe.module.css';

export default function WhoWeServe() {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [photoRef, photoInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className={styles.serveSection} aria-label="Who We Serve">
      <div className={styles.serveContainer}>
        {/* Header matching Image 4 */}
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

        {/* Human-based Apparel Showcase (Transparent Group Models from Image 4) */}
        <div ref={photoRef} className={styles.showcaseHeroArea}>
          <FadeUp trigger={photoInView} delay={0.22} blur={true}>
            <picture>
              <source srcSet="/images/who_we_serve_group.webp" type="image/webp" />
              <img
                src="/images/who_we_serve_group.png"
                alt="Diverse professionals, athletes, and students wearing customized apparel with YOUR LOGO"
                className={styles.groupPhoto}
                loading="lazy"
                width="980"
                height="336"
              />
            </picture>
          </FadeUp>
        </div>

        {/* Desktop View: Six Industry Category Cards with Image 6 Backdrop */}
        <div ref={gridRef} className={styles.desktopCardsGrid}>
          {industries.map((item, idx) => {
            const itemDelay = 0.12 + idx * 0.08;
            return (
              <FadeUp
                key={item.id}
                trigger={gridInView}
                delay={itemDelay}
                blur={false}
                className={styles.desktopCardItem}
              >
                <div className={styles.desktopCardInner}>
                  {/* Exact 3D Gold & Burgundy Card Background Frame (Image 6) */}
                  <picture>
                    <source srcSet="/images/products/serve_card_bg_desktop.webp" type="image/webp" />
                    <img
                      src="/images/products/serve_card_bg_desktop.png"
                      alt=""
                      className={styles.desktopCardBg}
                      aria-hidden="true"
                    />
                  </picture>

                  {/* Apparel Product Image on Cream Upper Section */}
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

                  {/* Industry Title on Lower Burgundy Curved Section */}
                  <div className={styles.desktopTitleWrap}>
                    <h3 className={styles.desktopCardTitle}>{item.title}</h3>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Mobile View: Vertical Stack of Horizontal Pill Cards with Image 7 Backdrop */}
        <div className={styles.mobileCardsList}>
          {industries.map((item, idx) => {
            const itemDelay = 0.1 + idx * 0.06;
            return (
              <FadeUp
                key={`mobile-${item.id}`}
                trigger={gridInView}
                delay={itemDelay}
                blur={false}
                className={styles.mobileCardItem}
              >
                <div className={styles.mobileCardInner}>
                  {/* Exact Horizontal Pill Background Frame (Image 7) */}
                  <picture>
                    <source srcSet="/images/products/serve_card_bg_mobile.webp" type="image/webp" />
                    <img
                      src="/images/products/serve_card_bg_mobile.png"
                      alt=""
                      className={styles.mobileCardBg}
                      aria-hidden="true"
                    />
                  </picture>

                  {/* Left Side: Apparel Image */}
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

                  {/* Right Side: Industry Title in White Text */}
                  <div className={styles.mobileTitleWrap}>
                    <h3 className={styles.mobileCardTitle}>{item.title}</h3>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Luxury Bottom Burgundy Wave matching Image 4 */}
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
