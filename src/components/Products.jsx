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
  const cycleCountRef = useRef(0);

  const total = manufacturedProducts.length;

  const nextProduct = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProduct = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Wheel scroll handler: on scroll, cards slide so next card moves to 1st position and 1st moves to last
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimer = null;

    const handleWheel = (e) => {
      // Only capture when mouse is scrolling over this section
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;

      if (!inViewport) return;

      if (isWheelingRef.current) {
        // Debounce / throttle wheel ticks so it rotates one card at a time smoothly
        return;
      }

      if (Math.abs(e.deltaY) > 22) {
        if (e.deltaY > 0) {
          // Scroll down: slide next card to 1st position
          if (cycleCountRef.current < total * 2) {
            e.preventDefault();
            cycleCountRef.current += 1;
            nextProduct();
            isWheelingRef.current = true;
            wheelTimer = setTimeout(() => {
              isWheelingRef.current = false;
            }, 420);
          } else {
            // Once user has cycled through completely, allow natural page scroll to next section
            cycleCountRef.current = 0;
          }
        } else if (e.deltaY < 0) {
          // Scroll up: slide previous card to 1st position
          if (cycleCountRef.current > -total * 2) {
            e.preventDefault();
            cycleCountRef.current -= 1;
            prevProduct();
            isWheelingRef.current = true;
            wheelTimer = setTimeout(() => {
              isWheelingRef.current = false;
            }, 420);
          } else {
            cycleCountRef.current = 0;
          }
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [nextProduct, prevProduct, total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextProduct();
      else prevProduct();
    }
    touchStartX.current = null;
  };

  // Compute ordered array starting from activeIndex
  // Position 0 = 1st card (Featured Large Card)
  // Positions 1..4 = Side cards (Smaller row on the right)
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
        sectionRef(node);
        containerRef.current = node;
      }}
      className={styles.productsSection}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="What We Manufacture"
    >
      <div className={styles.productsContainer}>
        {/* Section Heading with Centered Thin Gold Line and Subtitle */}
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

        {/* Product Cards Showcase matching Image 1 & Image 3 */}
        <div className={styles.showcaseWrapper}>
          <div className={styles.cardsLayout}>
            {/* 1st Position: Large Featured Card on Left */}
            <div
              className={styles.featuredCardWrap}
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
              <div className={styles.featuredCardShape}>
                {/* 3D Floating Featured Garment */}
                <div className={styles.featuredGarmentWrap}>
                  <picture>
                    <source srcSet={featuredProduct.image} type="image/webp" />
                    <img
                      src={featuredProduct.image.replace('.webp', '.png')}
                      alt={`${featuredProduct.name} customized with YOUR LOGO`}
                      className={styles.featuredGarmentImg}
                      loading="eager"
                      width="320"
                      height="340"
                    />
                  </picture>
                  <div className={styles.featuredContactShadow} aria-hidden="true" />
                </div>
              </div>

              {/* Title below Featured Card */}
              <h3 className={styles.featuredLabel}>
                {featuredProduct.name}
              </h3>
            </div>

            {/* Positions 2 to 5: Row of Smaller Cards on Right */}
            <div className={styles.secondaryCardsTrack}>
              {secondaryProducts.map((prod) => (
                <div
                  key={prod.id}
                  className={styles.secondaryCardWrap}
                  onClick={() => {
                    // Clicking any side card immediately slides it to the 1st position
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
                  <div className={styles.secondaryCardShape}>
                    <div className={styles.secondaryGarmentWrap}>
                      <picture>
                        <source srcSet={prod.image} type="image/webp" />
                        <img
                          src={prod.image.replace('.webp', '.png')}
                          alt={`${prod.name} customized with YOUR LOGO`}
                          className={styles.secondaryGarmentImg}
                          loading="lazy"
                          width="160"
                          height="170"
                        />
                      </picture>
                      <div className={styles.secondaryContactShadow} aria-hidden="true" />
                    </div>
                  </div>

                  <p className={styles.secondaryLabel}>
                    {prod.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Gold Ribbon Shelf beneath the cards matching Image 1 */}
          <div className={styles.goldPedestalShelf} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
