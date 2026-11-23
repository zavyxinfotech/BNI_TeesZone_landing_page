import React, { useState, useEffect, useRef, useCallback } from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

// Exact SVG card shape from Image 2 with clean white fill and NO border
function CardShapeBackdrop({ className }) {
  return (
    <svg
      viewBox="0 0 154 158"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 24 2 C 10 2 2 10 2 24 L 2 134 C 2 148 10 156 24 156 L 130 156 C 144 156 152 148 152 134 L 138 24 C 138 10 128 2 114 2 Z"
        fill="#FFFFFF"
        stroke="none"
      />
    </svg>
  );
}

export default function Products({ onSelectProduct }) {
  const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionElRef = useRef(null);
  const touchStartX = useRef(null);
  const isWheelingRef = useRef(false);
  const wheelAccRef = useRef(0);

  const total = manufacturedProducts.length;

  const nextProduct = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProduct = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Smooth wheel scroll listener: accumulates wheel delta to ensure butter-smooth card sliding
  useEffect(() => {
    const el = sectionElRef.current;
    if (!el) return;

    let wheelTimer = null;
    let resetAccTimer = null;

    const handleWheel = (e) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!isVisible) return;

      wheelAccRef.current += e.deltaY;
      clearTimeout(resetAccTimer);
      resetAccTimer = setTimeout(() => {
        wheelAccRef.current = 0;
      }, 150);

      if (isWheelingRef.current) return;

      if (Math.abs(wheelAccRef.current) > 25) {
        e.preventDefault();
        isWheelingRef.current = true;

        if (wheelAccRef.current > 0) {
          nextProduct();
        } else {
          prevProduct();
        }

        wheelAccRef.current = 0;

        wheelTimer = setTimeout(() => {
          isWheelingRef.current = false;
        }, 550);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
      if (resetAccTimer) clearTimeout(resetAccTimer);
    };
  }, [nextProduct, prevProduct]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextProduct();
      else prevProduct();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="manufacturing"
      ref={(node) => {
        sectionRef.current = node;
        sectionElRef.current = node;
      }}
      className={styles.productsSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="What We Manufacture"
    >
      <div className={styles.productsContainer}>
        {/* Right-Aligned Heading & Enlarged Description (Balanced Spacing) */}
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

        {/* Dynamic Card Stage: Persistent items animate smoothly between slots on scroll */}
        <div className={styles.stageWrapper}>
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
                    if (isMain) {
                      onSelectProduct && onSelectProduct(product);
                    } else {
                      // Clicking any small card animates it into main position
                      setActiveIndex(originalIdx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isMain) onSelectProduct && onSelectProduct(product);
                      else setActiveIndex(originalIdx);
                    }
                  }}
                  aria-label={`${product.name}${isMain ? ' (Main View)' : ''}`}
                >
                  {/* Card Container with Image 2 Shape Backdrop (NO border) */}
                  <div className={styles.cardBox}>
                    <CardShapeBackdrop className={styles.cardSvgBackdrop} />

                    {/* Garment Image:
                        - Main Card: Enlarged to 410px, half extending out of card to the top
                        - Small Cards: Enlarged to 160px, aligned neatly WITHIN the card
                    */}
                    <div className={isMain ? styles.mainGarmentWrap : styles.smallGarmentWrap}>
                      <picture>
                        <source srcSet={product.image} type="image/webp" />
                        <img
                          src={product.image.replace('.webp', '.png')}
                          alt={`${product.name} customized with YOUR LOGO`}
                          className={isMain ? styles.mainGarmentImg : styles.smallGarmentImg}
                          loading={isMain ? 'eager' : 'lazy'}
                          width={isMain ? 370 : 180}
                          height={isMain ? 410 : 170}
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

          {/* Modern 3D Viewed Golden Stage Bar beneath cards matching Image 1 */}
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
                  <stop offset="50%" stopColor="#D9A441" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8A5A12" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* 3D Elliptical Surface */}
              <ellipse cx="600" cy="18" rx="580" ry="14" fill="url(#goldSurfaceGrad)" />
              {/* Top Bevel Highlight Rim */}
              <path
                d="M 20,18 C 180,6 420,0 600,0 C 780,0 1020,6 1180,18 C 1020,8 780,4 600,4 C 420,4 180,8 20,18 Z"
                fill="url(#goldBevelGrad)"
                opacity="0.85"
              />
              {/* Front 3D Drop Edge */}
              <path
                d="M 30,18 C 190,32 420,38 600,38 C 780,38 1010,32 1170,18 C 1010,35 780,42 600,42 C 420,42 190,35 30,18 Z"
                fill="#946816"
                opacity="0.75"
              />
            </svg>
            <div className={styles.goldenAmbientGlow} />
          </div>
        </div>
      </div>
    </section>
  );
}
