import React from 'react';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

export default function Products({ onSelectProduct }) {
  const [stageRef, inView] = useInView({ threshold: 0.08, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  const featuredProduct = manufacturedProducts[0];
  const sideProducts = manufacturedProducts.slice(1);

  return (
    <section id="manufacturing" ref={stageRef} className={`section-wrapper ${styles.productsSection}`}>
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

          <FadeUp trigger={inView} delay={0.24} blur={true}>
            <p className={styles.sectionSubtitle}>
              A wide range of customized apparel for every business need.
            </p>
          </FadeUp>
        </div>

        {/* Desktop Showcase: Featured Left Card + 4 Side Cards over Gold Pedestal */}
        <div className={styles.desktopShowcase}>
          <div className={styles.cardsRow}>
            {/* Featured Hero Card (Left) */}
            <div
              className={styles.featuredCard}
              onClick={() => onSelectProduct && onSelectProduct(featuredProduct)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProduct && onSelectProduct(featuredProduct);
                }
              }}
              aria-label={`View details for ${featuredProduct.name}`}
            >
              <div className={styles.featuredGarmentWrap}>
                <picture>
                  <source srcSet={featuredProduct.image} type="image/webp" />
                  <img
                    src={featuredProduct.image.replace('.webp', '.png')}
                    alt={featuredProduct.name}
                    className={styles.featuredGarmentImg}
                    loading="lazy"
                    width="260"
                    height="280"
                  />
                </picture>
                <div className={styles.contactShadowFeatured} aria-hidden="true" />
              </div>
              <div className={styles.featuredLabel}>
                <span className={styles.featuredLabelText}>{featuredProduct.name}</span>
              </div>
            </div>

            {/* Side 4 Cards */}
            <div className={styles.sideCardsTrack}>
              {sideProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.sideCard}
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
                  <div className={styles.sideGarmentWrap}>
                    <picture>
                      <source srcSet={product.image} type="image/webp" />
                      <img
                        src={product.image.replace('.webp', '.png')}
                        alt={product.name}
                        className={styles.sideGarmentImg}
                        loading="lazy"
                        width="160"
                        height="180"
                      />
                    </picture>
                    <div className={styles.contactShadowSide} aria-hidden="true" />
                  </div>
                  <div className={styles.sideLabel}>
                    <span className={styles.sideLabelText}>{product.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Pedestal Platform Shelf along bottom of cards */}
          <div className={styles.goldPedestalShelf} aria-hidden="true" />

          {/* Continuous Scroll Indicator */}
          <div className={styles.scrollIndicatorRow}>
            <span className={styles.arrowLeft}>←</span>
            <span className={styles.scrollText}>Continuous Scroll</span>
            <span className={styles.arrowRight}>→</span>
          </div>
        </div>

        {/* Mobile Showcase: Vertical Stack / Scroll with Right-side Indicator */}
        <div className={styles.mobileShowcase}>
          <div className={styles.mobileCardsContainer}>
            <div className={styles.mobileCardsList}>
              {manufacturedProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.mobileCard}
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
                  <div className={styles.mobileGarmentWrap}>
                    <picture>
                      <source srcSet={product.image} type="image/webp" />
                      <img
                        src={product.image.replace('.webp', '.png')}
                        alt={product.name}
                        className={styles.mobileGarmentImg}
                        loading="lazy"
                        width="180"
                        height="200"
                      />
                    </picture>
                    <div className={styles.contactShadowMobile} aria-hidden="true" />
                  </div>
                  <div className={styles.mobileLabel}>
                    <span className={styles.mobileLabelText}>{product.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Vertical Continuous Scroll Indicator on the Right */}
            <div className={styles.mobileScrollIndicator}>
              <span className={styles.mobileArrow}>↑</span>
              <span className={styles.mobileScrollText}>Continuous<br />Scroll</span>
              <span className={styles.mobileArrow}>↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
