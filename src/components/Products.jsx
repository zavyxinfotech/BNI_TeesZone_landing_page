import React from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import ScaleReveal from './animations/ScaleReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

export default function Products({ onSelectProduct }) {
  const [stageRef, inView] = useInView({ threshold: 0.08, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  return (
    <section id="manufacturing" ref={stageRef} className={`section-wrapper ${styles.productsSection}`}>
      {/* Bottom-Left Deep Burgundy Wave with Gold Contour */}
      <div className={styles.bottomLeftWave} aria-hidden="true">
        <svg viewBox="0 0 360 110" fill="none" preserveAspectRatio="none" className={styles.cornerWaveSvg}>
          <path
            d="M 0,110 L 0,42 C 60,42 130,65 200,82 C 270,98 320,104 360,110 Z"
            fill="#7A001F"
          />
          <path
            d="M 0,42 C 60,42 130,65 200,82 C 270,98 320,104 360,110"
            fill="none"
            stroke="#D9A441"
            strokeWidth="2.8"
          />
        </svg>
      </div>

      {/* Bottom-Right Deep Burgundy Wave with Gold Contour */}
      <div className={styles.bottomRightWave} aria-hidden="true">
        <svg viewBox="0 0 360 110" fill="none" preserveAspectRatio="none" className={styles.cornerWaveSvg}>
          <path
            d="M 360,110 L 360,42 C 300,42 230,65 160,82 C 90,98 40,104 0,110 Z"
            fill="#7A001F"
          />
          <path
            d="M 360,42 C 300,42 230,65 160,82 C 90,98 40,104 0,110"
            fill="none"
            stroke="#D9A441"
            strokeWidth="2.8"
          />
        </svg>
      </div>

      <div className={`container ${styles.productsContainer}`}>
        {/* Centered Heading with Thin Gold Accent Line and Subtitle */}
        <div className={styles.headingArea}>
          <h2 className={styles.sectionTitle}>
            {prefersReduced ? (
              "What We Manufacture"
            ) : (
              <WordReveal
                text="What We Manufacture"
                trigger={inView}
                delay={0.06}
                stagger={0.08}
              />
            )}
          </h2>

          {/* Thin gold accent line directly beneath the heading */}
          <div className={styles.goldAccentLine} aria-hidden="true" />

          <FadeUp trigger={inView} delay={0.28} blur={true}>
            <p className={styles.sectionSubtitle}>
              A wide range of customized apparel for every business need.
            </p>
          </FadeUp>
        </div>

        {/* 3D Cinematic Showroom Showcase */}
        <div className={styles.showcaseWrapper}>
          {/* Swirling Gold Ribbons behind Apparel */}
          <svg
            className={styles.swirlingGoldRibbons}
            viewBox="0 0 1440 380"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 40,210 C 240,60 520,260 760,130 C 1040,0 1280,220 1400,160"
              stroke="url(#showroomGoldGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 100,280 C 340,180 620,320 900,190 C 1160,80 1320,280 1420,220"
              stroke="url(#showroomGoldGrad)"
              strokeWidth="2"
              strokeDasharray="8 5"
              opacity="0.45"
            />
            <defs>
              <linearGradient id="showroomGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ECC274" stopOpacity="0.25" />
                <stop offset="30%" stopColor="#D9A441" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#F4DFC0" stopOpacity="1" />
                <stop offset="100%" stopColor="#B88523" stopOpacity="0.35" />
              </linearGradient>
            </defs>
          </svg>

          {/* 3D Curved Oval Pedestal Stage Surface */}
          <div className={styles.pedestalStageSurface} aria-hidden="true">
            <div className={styles.pedestalGlow} />
          </div>

          {/* 5 Floating 3D Apparel Products and Category Labels */}
          <div className={styles.productsTrack}>
            {manufacturedProducts.map((product, idx) => {
              const itemDelay = 0.12 + idx * 0.1;
              return (
                <div
                  key={product.id}
                  className={`${styles.productStageCard} ${styles[`garmentCard${idx + 1}`]}`}
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct && onSelectProduct(product);
                    }
                  }}
                  aria-label={`View details for ${product.name}`}
                >
                  {/* Floating 3D Apparel Image */}
                  <ScaleReveal trigger={inView} delay={itemDelay}>
                    <div className={styles.floatingGarmentWrap}>
                      <picture>
                        <source srcSet={product.image} type="image/webp" />
                        <img
                          src={product.image.replace('.webp', '.png')}
                          alt={`${product.name} customized with YOUR LOGO`}
                          className={styles.garmentImg}
                          loading="lazy"
                          width="210"
                          height="230"
                        />
                      </picture>

                      {/* Soft Realistic Contact Shadow on Platform */}
                      <div className={styles.contactShadow} aria-hidden="true" />
                    </div>
                  </ScaleReveal>

                  {/* Premium Pill-shaped Category Label */}
                  <FadeUp trigger={inView} delay={itemDelay + 0.12} blur={false}>
                    <div className={styles.labelPill}>
                      <span className={styles.labelText}>{product.name}</span>
                    </div>
                  </FadeUp>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
