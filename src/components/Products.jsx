import React, { useState, useEffect, useRef, useCallback } from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

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

  // Cinematic Automatic Scrolling one by one when user scrolls into the section
  // Note: Page scrolling is NEVER hijacked or prevented so user can freely move to next section!
  useEffect(() => {
    if (!inView || isPaused) return;

    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        nextProduct();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, isPaused, nextProduct]);

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
                  {/* Card Container with Shaded 3D Gold & Burgundy Frame (Who We Serve Card Design) */}
                  <div className={styles.cardBox}>
                    <picture>
                      <source srcSet="/images/products/serve_card_bg_desktop.webp" type="image/webp" />
                      <img
                        src="/images/products/serve_card_bg_desktop.png"
                        alt=""
                        className={styles.cardBg}
                        aria-hidden="true"
                      />
                    </picture>

                    {/* Apparel Product Image cleanly aligned in upper card area */}
                    <div className={isMain ? styles.mainApparelWrap : styles.smallApparelWrap}>
                      <picture>
                        <source srcSet={product.image} type="image/webp" />
                        <img
                          src={product.image.replace('.webp', '.png')}
                          alt={`${product.name} customized with YOUR LOGO`}
                          className={isMain ? styles.mainApparelImg : styles.smallApparelImg}
                          loading={isMain ? 'eager' : 'lazy'}
                          width={isMain ? 320 : 180}
                          height={isMain ? 320 : 180}
                        />
                      </picture>
                    </div>

                    {/* Product Title in Italic Typography on Burgundy Lower Wave */}
                    <div className={isMain ? styles.mainTitleWrap : styles.smallTitleWrap}>
                      <h3 className={isMain ? styles.mainCardTitle : styles.smallCardTitle}>
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
