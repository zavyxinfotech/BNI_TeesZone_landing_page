import React, { useState, useEffect, useRef, useCallback } from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

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

  // Wheel scroll listener: on every scroll, cards animate in a circular motion
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
      {/* SVG ClipPath for Exact Card Shape from Image 2 (no border, no shadow) */}
      <svg width="0" height="0" className={styles.svgDef} aria-hidden="true">
        <defs>
          <clipPath id="cardShapeImg2" clipPathUnits="objectBoundingBox">
            <path d="M 0.16,0 C 0.07,0 0,0.07 0,0.16 L 0,0.84 C 0,0.93 0.07,1 0.16,1 L 0.85,1 C 0.94,1 1,0.93 1,0.84 L 0.89,0.16 C 0.89,0.07 0.82,0 0.73,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.productsContainer}>
        {/* Right-Aligned Heading & Enlarged Description (User Point 6) */}
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

        {/* 3D Circular Motion Track (User Points 1, 2, 3, 4, 5, 7) */}
        <div className={styles.circularTrackWrapper}>
          <div className={styles.circularCardsStage}>
            {manufacturedProducts.map((product, originalIdx) => {
              // Calculate circular slot position relative to activeIndex (0 to 4)
              // Slot 0 is the 1st position (Featured, large, prominent)
              // Slots 1 to 4 follow the circular path towards the right & back
              const slot = (originalIdx - activeIndex + total) % total;
              const isFeatured = slot === 0;

              return (
                <div
                  key={product.id}
                  className={`${styles.cardSlot} ${styles[`slotPos${slot}`]}`}
                  onClick={() => {
                    if (isFeatured) {
                      onSelectProduct && onSelectProduct(product);
                    } else {
                      // Clicking any card animates it into 1st position
                      setActiveIndex(originalIdx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isFeatured) onSelectProduct && onSelectProduct(product);
                      else setActiveIndex(originalIdx);
                    }
                  }}
                  aria-label={`${product.name}${isFeatured ? ' (Featured)' : ''}`}
                >
                  {/* Card Shape from Image 2 (No border, No shadow) */}
                  <div className={styles.cardBackdropShape}>
                    <div className={styles.garmentWrap}>
                      <picture>
                        <source srcSet={product.image} type="image/webp" />
                        <img
                          src={product.image.replace('.webp', '.png')}
                          alt={`${product.name} customized with YOUR LOGO`}
                          className={styles.garmentImg}
                          loading={isFeatured ? 'eager' : 'lazy'}
                          width={isFeatured ? 360 : 220}
                          height={isFeatured ? 380 : 240}
                        />
                      </picture>
                      <div className={styles.contactShadow} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Clean Non-Bold Label with increased font size */}
                  <h3 className={styles.productLabel}>
                    {product.name}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* New Modern 3D Viewed Golden Pedestal Stage Model (User Point 7) */}
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
                  <stop offset="15%" stopColor="#D9A441" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#F9E7C4" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
                  <stop offset="65%" stopColor="#F9E7C4" stopOpacity="1" />
                  <stop offset="85%" stopColor="#D9A441" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#C49332" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="goldBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#D9A441" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8A5A12" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* 3D Beveled Elliptical Surface */}
              <ellipse cx="600" cy="20" rx="580" ry="16" fill="url(#goldSurfaceGrad)" />
              {/* Top Bevel Highlight Rim */}
              <path
                d="M 20,20 C 180,6 420,0 600,0 C 780,0 1020,6 1180,20 C 1020,10 780,5 600,5 C 420,5 180,10 20,20 Z"
                fill="url(#goldBevelGrad)"
                opacity="0.85"
              />
              {/* Front 3D Drop Edge */}
              <path
                d="M 30,20 C 190,34 420,40 600,40 C 780,40 1010,34 1170,20 C 1010,37 780,44 600,44 C 420,44 190,37 30,20 Z"
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
