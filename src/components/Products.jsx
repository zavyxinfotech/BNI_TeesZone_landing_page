import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Palette, Layers, PackageCheck, Clock, ArrowRight } from 'lucide-react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

const FEATURE_BLOCKS = [
  { id: 'branding', label: 'Custom Branding', Icon: Palette },
  { id: 'fabrics', label: 'Premium Fabrics', Icon: Layers },
  { id: 'bulk', label: 'Bulk Order Solutions', Icon: PackageCheck },
  { id: 'delivery', label: 'On-Time Delivery', Icon: Clock }
];

export default function Products({ onSelectProduct }) {
  const [sectionRef, inView] = useInView({ threshold: 0.12, triggerOnce: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isHoveredRef = useRef(false);
  const pauseTimerRef = useRef(null);
  const total = manufacturedProducts.length;
  const activeProduct = manufacturedProducts[activeIndex] || manufacturedProducts[0];

  const nextProduct = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const pauseAutoPlayTemporarily = useCallback((duration = 4500) => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsPaused(false);
      }
    }, duration);
  }, []);

  // Smooth one-by-one automatic scrolling across the apparel showcase
  useEffect(() => {
    if (!inView || isPaused) return;
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        nextProduct();
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [inView, isPaused, nextProduct]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section
      id="manufacturing"
      ref={sectionRef}
      className={styles.productsSection}
      aria-label="What We Manufacture"
    >
      <div className={styles.productsContainer}>
        {/* Top Balanced Two-Column Desktop Layout */}
        <div className={styles.topTwoColGrid}>
          {/* Left Column: Preserved Large Hero Apparel Card */}
          <div
            className={styles.heroCardCol}
            onMouseEnter={() => {
              isHoveredRef.current = true;
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              setIsPaused(false);
            }}
          >
            <div
              key={activeProduct.id}
              className={styles.heroCardBox}
              onClick={() => {
                pauseAutoPlayTemporarily(5000);
                onSelectProduct && onSelectProduct(activeProduct);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProduct && onSelectProduct(activeProduct);
                }
              }}
              aria-label={`${activeProduct.name} - Click for details`}
            >
              <picture>
                <source srcSet="/images/products/serve_card_bg_desktop.webp" type="image/webp" />
                <img
                  src="/images/products/serve_card_bg_desktop.png"
                  alt=""
                  className={styles.cardBg}
                  aria-hidden="true"
                />
              </picture>

              <div className={styles.heroApparelWrap}>
                <picture>
                  <source srcSet={activeProduct.image} type="image/webp" />
                  <img
                    src={activeProduct.image.replace('.webp', '.png')}
                    alt={`${activeProduct.name} customized with YOUR LOGO`}
                    className={styles.heroApparelImg}
                    loading="eager"
                    width="340"
                    height="340"
                  />
                </picture>
              </div>

              <div className={styles.heroTitleWrap}>
                <h3 className={styles.heroCardTitle}>{activeProduct.name}</h3>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Subheading, Description, 4 Feature Blocks & CTA */}
          <div className={styles.contentCol}>
            <h2 className={styles.sectionTitle}>
              <WordReveal
                text="What We Manufacture"
                trigger={inView}
                delay={0.05}
                stagger={0.07}
              />
            </h2>

            <div className={styles.goldAccentLine} aria-hidden="true" />

            <FadeUp trigger={inView} delay={0.14} blur={false}>
              <p className={styles.sectionSubheading}>
                Custom Apparel Manufacturing Solutions for Every Industry
              </p>
            </FadeUp>

            <FadeUp trigger={inView} delay={0.22} blur={true}>
              <p className={styles.sectionDescription}>
                Corporate uniforms, sportswear, school uniforms and premium custom-branded clothing — crafted with precision and quality.
              </p>
            </FadeUp>

            {/* 4 Professional Feature Blocks in a clean 1-row grid */}
            <FadeUp trigger={inView} delay={0.3} blur={false}>
              <div className={styles.featuresGrid}>
                {FEATURE_BLOCKS.map(({ id, label, Icon }) => (
                  <div key={id} className={styles.featureBlock}>
                    <div className={styles.featureIconWrap}>
                      <Icon size={24} strokeWidth={1.8} className={styles.featureIcon} />
                    </div>
                    <span className={styles.featureLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Premium CTA Block */}
            <FadeUp trigger={inView} delay={0.38} blur={false}>
              <div className={styles.ctaBox}>
                <div className={styles.ctaTextWrap}>
                  <h3 className={styles.ctaHeadline}>Your Brand. Our Craftsmanship.</h3>
                  <p className={styles.ctaDesc}>
                    From fabric selection to final finishing, bring your custom apparel vision to life.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct && onSelectProduct(activeProduct)}
                  className={styles.exploreBtn}
                >
                  <span>Explore Our Apparel</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Bottom Apparel Product Cards Strip */}
        <div
          className={styles.bottomCardsRow}
          onMouseEnter={() => {
            isHoveredRef.current = true;
            setIsPaused(true);
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            setIsPaused(false);
          }}
        >
          {manufacturedProducts.map((product, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={product.id}
                className={`${styles.smallCardItem} ${isActive ? styles.smallCardActive : ''}`}
                onClick={() => {
                  pauseAutoPlayTemporarily(5000);
                  if (isActive) {
                    onSelectProduct && onSelectProduct(product);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pauseAutoPlayTemporarily(5000);
                    if (isActive) onSelectProduct && onSelectProduct(product);
                    else setActiveIndex(idx);
                  }
                }}
                aria-label={product.name}
              >
                <div className={styles.smallCardBox}>
                  <picture>
                    <source srcSet="/images/products/serve_card_bg_desktop.webp" type="image/webp" />
                    <img
                      src="/images/products/serve_card_bg_desktop.png"
                      alt=""
                      className={styles.cardBg}
                      aria-hidden="true"
                    />
                  </picture>

                  <div className={styles.smallApparelWrap}>
                    <picture>
                      <source srcSet={product.image} type="image/webp" />
                      <img
                        src={product.image.replace('.webp', '.png')}
                        alt={`${product.name} customized with YOUR LOGO`}
                        className={styles.smallApparelImg}
                        loading="lazy"
                        width="180"
                        height="180"
                      />
                    </picture>
                  </div>

                  <div className={styles.smallTitleWrap}>
                    <h4 className={styles.smallCardTitle}>{product.name}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
