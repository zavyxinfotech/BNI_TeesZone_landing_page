import React, { useState, useEffect, useRef, useCallback } from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

// Exact SVG card shape from Image 2 with clean white fill and elegant outline
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
        stroke="#D6C6B0"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Products({ onSelectProduct }) {
  const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const isWheelingRef = useRef(false);

  const total = manufacturedProducts.length;

  const nextProduct = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProduct = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Wheel scroll listener: on every scroll, rotate cards so next card slides to 1st position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimer = null;

    const handleWheel = (e) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top <= 140 && rect.bottom >= window.innerHeight - 140;
      if (!inViewport) return;

      if (isWheelingRef.current) return;

      if (Math.abs(e.deltaY) > 20) {
        e.preventDefault();
        isWheelingRef.current = true;

        if (e.deltaY > 0) {
          nextProduct();
        } else {
          prevProduct();
        }

        wheelTimer = setTimeout(() => {
          isWheelingRef.current = false;
        }, 400);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [nextProduct, prevProduct]);

  // Touch swipe handling for mobile
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

  // Build the ordered array of cards based on activeIndex
  // 1st item = Featured card on the left
  // Next 4 items = Horizontal row of 4 cards on the right
  const orderedList = [];
  for (let i = 0; i < total; i++) {
    const prodIndex = (activeIndex + i) % total;
    orderedList.push({
      ...manufacturedProducts[prodIndex],
      originalIndex: prodIndex,
      slotPosition: i
    });
  }

  const featuredProduct = orderedList[0];
  const secondaryProducts = orderedList.slice(1);

  return (
    <section
      id="manufacturing"
      ref={(node) => {
        sectionRef.current = node;
        containerRef.current = node;
      }}
      className={styles.productsSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="What We Manufacture"
    >
      <div className={styles.productsContainer}>
        {/* Main Showcase Layout strictly matching Image 1: Featured on left, Heading + Row of 4 cards on right */}
        <div className={styles.mainShowcaseRow}>
          {/* LEFT: 1st Position - Big Featured Card */}
          <div
            className={styles.featuredColumn}
            onClick={() => onSelectProduct && onSelectProduct(featuredProduct)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectProduct && onSelectProduct(featuredProduct);
              }
            }}
            aria-label={`Featured product: ${featuredProduct.name}`}
          >
            <div className={styles.featuredCardContainer}>
              {/* Image 2 Card Shape Backdrop */}
              <CardShapeBackdrop className={styles.featuredCardSvg} />

              {/* Floating Featured Garment - 100% UNCROPPED */}
              <div className={styles.featuredGarmentWrap}>
                <picture>
                  <source srcSet={featuredProduct.image} type="image/webp" />
                  <img
                    src={featuredProduct.image.replace('.webp', '.png')}
                    alt={`${featuredProduct.name} customized with YOUR LOGO`}
                    className={styles.featuredGarmentImg}
                    loading="eager"
                    width="340"
                    height="350"
                  />
                </picture>
                <div className={styles.featuredContactShadow} aria-hidden="true" />
              </div>
            </div>

            {/* Non-Bold Clean Label below Featured Card */}
            <h3 className={styles.featuredLabel}>
              {featuredProduct.name}
            </h3>
          </div>

          {/* RIGHT: Heading area above + Straight Horizontal Row of 4 cards below */}
          <div className={styles.rightContentArea}>
            {/* Heading & Enlarged Description (User Point 6) */}
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

            {/* Clean Straight Horizontal Row of 4 Secondary Cards (Positions 2 to 5) */}
            <div className={styles.secondaryCardsRow}>
              {secondaryProducts.map((prod) => (
                <div
                  key={prod.id}
                  className={styles.secondaryCardItem}
                  onClick={() => {
                    // Clicking any card animates it into 1st position
                    setActiveIndex(prod.originalIndex);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(prod.originalIndex);
                    }
                  }}
                  aria-label={`Slide ${prod.name} to featured position`}
                >
                  <div className={styles.secondaryCardContainer}>
                    {/* Image 2 Card Shape Backdrop */}
                    <CardShapeBackdrop className={styles.secondaryCardSvg} />

                    {/* Floating Secondary Garment - 100% UNCROPPED */}
                    <div className={styles.secondaryGarmentWrap}>
                      <picture>
                        <source srcSet={prod.image} type="image/webp" />
                        <img
                          src={prod.image.replace('.webp', '.png')}
                          alt={`${prod.name} customized with YOUR LOGO`}
                          className={styles.secondaryGarmentImg}
                          loading="lazy"
                          width="180"
                          height="190"
                        />
                      </picture>
                      <div className={styles.secondaryContactShadow} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Clean Non-Bold Label */}
                  <p className={styles.secondaryLabel}>
                    {prod.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
            {/* 3D Top Bevel Highlight Rim */}
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
    </section>
  );
}
