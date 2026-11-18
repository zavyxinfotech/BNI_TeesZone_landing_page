import React from 'react';
import SectionHeading from './SectionHeading';
import { manufacturedProducts } from '../data/products';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import ScaleReveal from './animations/ScaleReveal';
import FadeUp from './animations/FadeUp';
import styles from './Products.module.css';

export default function Products({ onSelectProduct }) {
  const [stageRef, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  return (
    <section id="manufacturing" className={`section-wrapper ${styles.productsSection}`}>
      <div className="container">
        <SectionHeading
          title="What We Manufacture"
          subtitle="A wide range of customized apparel for every business need."
          centered={true}
        />

        {/* 3D Curved Showcase Platform with Floating Garments */}
        <div ref={stageRef} className={styles.showcaseWrapper}>
          <div className={styles.pedestalStage}>
            {/* The Floating 3D Products - Staggered Appearance on Every Scroll */}
            <div className={styles.productsTrack}>
              {manufacturedProducts.map((product, idx) => {
                const itemDelay = 0.12 + idx * 0.12;
                return (
                  <div
                    key={product.id}
                    className={styles.productStageCard}
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                  >
                    <ScaleReveal trigger={inView} delay={itemDelay}>
                      <div className={styles.floatingGarmentWrap}>
                        <picture>
                          <source srcSet={product.image} type="image/webp" />
                          <img
                            src={product.image.replace('.webp', '.png')}
                            alt={`${product.name} customized with YOUR LOGO`}
                            className={styles.garmentImg}
                            loading="lazy"
                            width="180"
                            height="200"
                          />
                        </picture>
                        <div className={styles.garmentShadow} aria-hidden="true" />
                      </div>
                    </ScaleReveal>

                    {/* 3D Oval Base & Label - Staggered Fade Up */}
                    <FadeUp trigger={inView} delay={itemDelay + 0.1} blur={false}>
                      <div className={styles.ovalPedestal}>
                        <span className={styles.productLabel}>{product.name}</span>
                      </div>
                    </FadeUp>
                  </div>
                );
              })}
            </div>

            {/* Platform bottom curved arc base */}
            <div className={styles.curvedArcBase} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
