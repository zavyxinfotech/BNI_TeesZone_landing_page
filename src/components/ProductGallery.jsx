import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { galleryItems } from '../data/products';
import styles from './ProductGallery.module.css';

export default function ProductGallery({ onImageClick }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section id="products" className={`section-wrapper ${styles.gallerySection}`}>
      <div className="container">
        <div className={styles.headerFlex}>
          <SectionHeading
            title="Product Gallery"
            subtitle="A glimpse of our customized apparel and branding solutions."
            centered={false}
            className={styles.customHeading}
          />

          {/* Carousel Arrows */}
          <div className={styles.carouselNavControls}>
            <button
              onClick={() => handleScroll('left')}
              className={`${styles.navArrowBtn} ${!canScrollLeft ? styles.disabled : ''}`}
              disabled={!canScrollLeft}
              aria-label="Previous gallery slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className={`${styles.navArrowBtn} ${!canScrollRight ? styles.disabled : ''}`}
              disabled={!canScrollRight}
              aria-label="Next gallery slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Gallery Carousel Track */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className={styles.galleryTrack}
        >
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={styles.galleryCard}
              onClick={() => onImageClick && onImageClick(item)}
            >
              <div className={styles.imageBox}>
                <picture>
                  <source srcSet={item.image} type="image/webp" />
                  <img
                    src={item.image.replace('.webp', '.png')}
                    alt={item.alt}
                    className={styles.galleryImg}
                    loading="lazy"
                    width="320"
                    height="240"
                  />
                </picture>
                <div className={styles.hoverOverlay}>
                  <div className={styles.viewBadge}>
                    <Eye size={16} />
                    <span>View Detail</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardInfo}>
                <span className={styles.categoryBadge}>{item.category}</span>
                <h4 className={styles.cardTitle}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
