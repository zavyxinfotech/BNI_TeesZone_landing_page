import React, { useState, useEffect, useRef, useCallback } from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

// Exact SVG card shape with minimal burgundy glassmorphism tint, 3D specular sheen, and NO border
function CardShapeBackdrop({ className, id = "glassCard" }) {
  const gradId = `${id}-burgundy-glass`;
  const sheenId = `${id}-specular-sheen`;

  return (
    <svg
      viewBox="0 0 154 158"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Minimal shade burgundy glassmorphism base: luminous frosted top fading into a soft delicate burgundy blush */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FFFDFE" stopOpacity="0.92" />
          <stop offset="70%" stopColor="#FAF1F3" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#F4E3E7" stopOpacity="0.84" />
        </linearGradient>

        {/* 3D Diagonal Specular Glass Reflection Sheen */}
        <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.10" />
          <stop offset="70%" stopColor="#7A001F" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#7A001F" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Main Card Shape Body with Minimal Burgundy Frosted Glass Fill - NO BORDER */}
      <path
        d="M 24 2 C 10 2 2 10 2 24 L 2 134 C 2 148 10 156 24 156 L 130 156 C 144 156 152 148 152 134 L 138 24 C 138 10 128 2 114 2 Z"
        fill={`url(#${gradId})`}
        stroke="none"
      />

      {/* 3D Glass Surface Sheen Overlay - NO BORDER */}
      <path
        d="M 24 2 C 10 2 2 10 2 24 L 2 134 C 2 148 10 156 24 156 L 130 156 C 144 156 152 148 152 134 L 138 24 C 138 10 128 2 114 2 Z"
        fill={`url(#${sheenId})`}
        stroke="none"
      />
    </svg>
  );
}

export default function Products({ onSelectProduct }) {
  const [sectionRef, inView] = useInView({ threshold: 0.15, triggerOnce: false });
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isHoveredRef = useRef(false);
  const pauseTimerRef = useRef(null);

  const total = manufacturedProducts.length;

  const nextProduct = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProduct = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Temporarily pause auto-play on user interaction (tap, click, swipe)
  const pauseAutoPlayTemporarily = useCallback((duration = 4500) => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsPaused(false);
      }
    }, duration);
  }, []);

  // Cinematic Automatic Scrolling when user scrolls into the section
  // Note: Page scrolling is NEVER hijacked or prevented so user can freely move to next section!
  useEffect(() => {
    if (!inView || prefersReduced || isPaused) return;

    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        nextProduct();
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [inView, prefersReduced, isPaused, nextProduct]);

  // Touch swipe support for mobile without interfering with vertical page scrolling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only trigger card change if the horizontal swipe is dominant (not vertical scrolling)
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextProduct();
      } else {
        prevProduct();
      }
      pauseAutoPlayTemporarily(5000);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="manufacturing"
      ref={sectionRef}
      className={styles.productsSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="What We Manufacture"
    >
      <div className={styles.productsContainer}>
        {/* Right-Aligned Heading & Enlarged Description (Properly Cleared from Top Header) */}
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

          <div className={styles.goldAccentLine} aria-hidden="true" />

          <FadeUp trigger={inView} delay={0.22} blur={true}>
            <p className={styles.sectionSubtitle}>
              A wide range of customized apparel for every business need.
            </p>
          </FadeUp>
        </div>

        {/* Dynamic Card Stage: Persistent items animate cinematically between slots */}
        <div
          className={styles.stageWrapper}
          onMouseEnter={() => {
            isHoveredRef.current = true;
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            setIsPaused(false);
          }}
        >
          <div className={styles.cardsStage}>
            {manufacturedProducts.map((product, originalIdx) => {
              // Circular slot index: 0 = Main Card, 1..4 = Small Cards
              const slot = (originalIdx - activeIndex + total) % total;
              const isMain = slot === 0;

              return (
                <div
                  key={product.id}
                  className={`${styles.cardSlotItem} ${styles[`slotPos${slot}`]}`}
                  onClick={() => {
                    pauseAutoPlayTemporarily(5000);
                    if (isMain) {
                      onSelectProduct && onSelectProduct(product);
                    } else {
                      // Clicking any small card smoothly activates it into main position
                      setActiveIndex(originalIdx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      pauseAutoPlayTemporarily(5000);
                      if (isMain) onSelectProduct && onSelectProduct(product);
                      else setActiveIndex(originalIdx);
                    }
                  }}
                  aria-label={`${product.name}${isMain ? ' (Main View)' : ''}`}
                >
                  {/* Card Container with Minimal Burgundy Glassmorphism Backdrop (NO border) */}
                  <div className={styles.cardBox}>
                    <CardShapeBackdrop
                      id={`card-${product.id}`}
                      className={styles.cardSvgBackdrop}
                    />

                    {/* Garment Image:
                        - Main Card: Enlarged, half extending out of card to the top
                        - Small Cards: Aligned completely WITHIN the card
                        - Pristine colors preserved: isolation isolate ensures NO mixing with card burgundy tint
                    */}
                    <div className={isMain ? styles.mainGarmentWrap : styles.smallGarmentWrap}>
                      <picture>
                        <source srcSet={product.image} type="image/webp" />
                        <img
                          src={product.image.replace('.webp', '.png')}
                          alt={`${product.name} customized with YOUR LOGO`}
                          className={isMain ? styles.mainGarmentImg : styles.smallGarmentImg}
                          loading={isMain ? 'eager' : 'lazy'}
                          width={isMain ? 400 : 180}
                          height={isMain ? 430 : 190}
                        />
                      </picture>
                      <div className={isMain ? styles.mainContactShadow : styles.smallContactShadow} aria-hidden="true" />
                    </div>

                    {/* Text INSIDE the card ONLY in the Main Card */}
                    {isMain && (
                      <div className={styles.mainCardTextInside}>
                        <h3 className={styles.mainCardTitle}>
                          {product.name}
                        </h3>
                      </div>
                    )}
                  </div>

                  {/* Text below card ONLY for Small Cards */}
                  {!isMain && (
                    <p className={styles.smallCardLabel}>
                      {product.name}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Modern 3D Viewed Golden Stage Bar beneath cards */}
          <div className={styles.modern3dGoldenStage} aria-hidden="true">
            <svg
              viewBox="0 0 1200 48"
              fill="none"
              preserveAspectRatio="none"
              className={styles.goldenStageSvg}
            >
              <defs>
                <linearGradient id="goldSurfaceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C49332" stopOpacity="0" />
                  <stop offset="12%" stopColor="#D9A441" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#F9E7C4" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
                  <stop offset="65%" stopColor="#F9E7C4" stopOpacity="1" />
                  <stop offset="88%" stopColor="#D9A441" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#C49332" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="goldBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#DFAD4A" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#A87722" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M 40 18 Q 600 2 1160 18 L 1180 26 Q 600 12 20 26 Z"
                fill="url(#goldSurfaceGrad)"
              />
              <path
                d="M 20 26 Q 600 12 1180 26 L 1170 34 Q 600 22 30 34 Z"
                fill="url(#goldBevelGrad)"
                opacity="0.85"
              />
            </svg>
            <div className={styles.goldenAmbientGlow} />
          </div>
        </div>
      </div>
    </section>
  );
}
