import React from 'react';
import SectionHeading from './SectionHeading';
import { manufacturedProducts } from '../data/products';
import styles from './Products.module.css';

export default function Products({ onSelectProduct }) {
  return (
    <section id="manufacturing" className={`section-wrapper ${styles.productsSection}`}>
      <div className="container">
        <SectionHeading
          title="What We Manufacture"
          subtitle="A wide range of customized apparel for every business need."
          centered={true}
        />

        {/* 3D Curved Showcase Platform with Floating Garments */}
        <div className={styles.showcaseWrapper}>
          <div className={styles.pedestalStage}>
            {/* The 6 Floating 3D Products */}
            <div className={styles.productsTrack}>
              {manufacturedProducts.map((product) => (
                <div
                  key={product.id}
                  className={styles.productStageCard}
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                >
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

                  {/* 3D Oval Base & Label */}
                  <div className={styles.ovalPedestal}>
                    <span className={styles.productLabel}>{product.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform bottom curved arc base */}
            <div className={styles.curvedArcBase} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
