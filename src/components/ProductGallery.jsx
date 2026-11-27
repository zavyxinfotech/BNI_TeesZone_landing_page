import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { galleryItems } from '../data/products';
import styles from './ProductGallery.module.css';

// Exact category order specified (no Caps)
const CATEGORIES = [
  'All',
  'Polo T-Shirts',
  'Uniforms',
  'Hoodies',
  'T-Shirts',
  'Jackets',
  'Sportswear',
  'Blank Apparel'
];

export default function ProductGallery({ onImageClick }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  // Refs for 60fps continuous 3D cylindrical animation without React re-renders
  const offsetRef = useRef(0);
  const velocityBoostRef = useRef(0);
  const isCardHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragLastXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Filter items based on the 7 TeesZone categories
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return galleryItems;
    const target = selectedCategory.toLowerCase();

    const matched = galleryItems.filter((item) => {
      const cat = (item.category || '').toLowerCase();
      const desc = (item.description || '').toLowerCase();
      const title = (item.title || '').toLowerCase();
      const combined = `${cat} ${desc} ${title}`;

      if (target === 'polo t-shirts') {
        return combined.includes('polo') || cat.includes('corporate apparel');
      }
      if (target === 'uniforms') {
        return combined.includes('uniform') || combined.includes('hospitality') || combined.includes('workwear');
      }
      if (target === 'hoodies') {
        return combined.includes('hoodie') || combined.includes('winter') || combined.includes('event');
      }
      if (target === 't-shirts') {
        return combined.includes('t-shirt') || combined.includes('tee') || combined.includes('cotton');
      }
      if (target === 'jackets') {
        return combined.includes('jacket') || combined.includes('manufacturing') || combined.includes('construction');
      }
      if (target === 'sportswear') {
        return combined.includes('sport') || combined.includes('jersey') || combined.includes('dry-fit');
      }
      if (target === 'blank apparel') {
        return combined.includes('blank') || combined.includes('cotton') || combined.includes('apparel');
      }
      return combined.includes(target);
    });

    return matched.length > 0 ? matched : galleryItems;
  }, [selectedCategory]);

  // Ensure enough cards to form a full seamless 3D cylinder (at least 16 slots)
  const ringItems = useMemo(() => {
    if (filteredItems.length === 0) return [];
    let ring = [...filteredItems];
    while (ring.length < 16) {
      ring = [...ring, ...filteredItems];
    }
    return ring.map((item, idx) => ({ ...item, _slotKey: `${item.id}-${idx}` }));
  }, [filteredItems]);

  const ringLength = ringItems.length;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    offsetRef.current = 0;
    velocityBoostRef.current = 0;
  };

  // Manual step nudges (smooth impulse added to continuous scroll)
  const handlePrev = useCallback(() => {
    velocityBoostRef.current -= 1.0;
  }, []);

  const handleNext = useCallback(() => {
    velocityBoostRef.current += 1.0;
  }, []);

  // 60fps Continuous 3D Cylindrical Carousel Loop (Deep concave curve like Image 2)
  useEffect(() => {
    if (ringLength === 0) return;

    // Deep concave cylinder parameters so 7 cards (center + 3 left + 3 right) curve dramatically
    const radius = isMobile ? 380 : isTablet ? 560 : 680;
    const zBase = isMobile ? -100 : isTablet ? -135 : -160;
    const stepDeg = isMobile ? 28 : isTablet ? 22 : 20;
    const stepRad = (stepDeg * Math.PI) / 180;
    const maxVisibleRad = ((isMobile ? 62 : 74) * Math.PI) / 180;
    const baseSpeed = 0.52; // Always auto-scroll continuously on desktop & mobile

    lastTimeRef.current = performance.now();

    const animate = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      // Auto-scroll continuously unless user hovers directly over a card (desktop) or drags
      if (!isCardHoveredRef.current && !isDraggingRef.current) {
        offsetRef.current += baseSpeed * dt;
      }

      // Smoothly apply manual arrow impulse
      if (Math.abs(velocityBoostRef.current) > 0.001) {
        const step = velocityBoostRef.current * Math.min(1, dt * 8);
        offsetRef.current += step;
        velocityBoostRef.current -= step;
      }

      // Wrap offset cleanly within [0, ringLength)
      offsetRef.current = ((offsetRef.current % ringLength) + ringLength) % ringLength;

      // Update every card slot's 3D cylindrical transform
      for (let i = 0; i < ringLength; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let diff = ((i - offsetRef.current) % ringLength + ringLength) % ringLength;
        if (diff > ringLength / 2) diff -= ringLength;

        const theta = diff * stepRad;
        const absTheta = Math.abs(theta);

        if (absTheta > maxVisibleRad) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          el.style.transform = `translate3d(0px, 0px, -600px) scale(0.4)`;
          continue;
        }

        // Concave cylinder: center card recessed at zBase; side cards curve forward toward viewer
        const x = radius * Math.sin(theta);
        const z = zBase + radius * (1 - Math.cos(theta));
        const rotateYDeg = (-theta * 180) / Math.PI;

        const fadeStart = maxVisibleRad * 0.86;
        const opacity =
          absTheta > fadeStart
            ? Math.max(0, 1 - (absTheta - fadeStart) / (maxVisibleRad - fadeStart))
            : 1;

        el.style.opacity = opacity.toFixed(3);
        el.style.pointerEvents = opacity > 0.15 ? 'auto' : 'none';
        el.style.zIndex = String(Math.round(200 + z));
        el.style.transform = `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${rotateYDeg.toFixed(2)}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleGlobalPointerUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('mouseup', handleGlobalPointerUp);
    window.addEventListener('touchend', handleGlobalPointerUp);

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mouseup', handleGlobalPointerUp);
      window.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, [ringLength, isMobile, isTablet]);

  // Pointer / Touch drag handlers
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragLastXRef.current = clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragLastXRef.current;
    dragLastXRef.current = clientX;
    dragDistanceRef.current += Math.abs(deltaX);

    const sensitivity = isMobile ? 0.006 : 0.004;
    offsetRef.current -= deltaX * sensitivity;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (item) => {
    // Allow tap/click to open card details (tolerant for mobile taps)
    if (dragDistanceRef.current < 15 && onImageClick) {
      onImageClick(item);
    }
  };

  return (
    <section id="products" className={styles.gallerySection}>
      <div className="container">
        {/* Existing Section Heading & Description */}
        <div className={styles.headerArea}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine}></span>
            <span className={styles.eyebrowText}>CLIENT REVIEW IMAGES</span>
            <span className={styles.eyebrowLine}></span>
          </div>

          <h2 className={styles.mainTitle}>Real Client Projects, Real Impact</h2>
          <p className={styles.subtitle}>
            See how organizations across industries use our customized apparel and branding solutions to build a professional, unified identity.
          </p>

          {/* Single-Row Category Filter Pills */}
          <div className={styles.categoryFilterBar}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                >
                  {cat === 'All' ? (isMobile ? 'All Reviews' : 'All Reviews (30)') : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Cylindrical Infinite Carousel Stage */}
      <div
        className={styles.stageOuter}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={() => {
          isDraggingRef.current = false;
          isCardHoveredRef.current = false;
        }}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div className={styles.perspectiveScene}>
          <div className={styles.cardsTrack}>
            {ringItems.map((item, idx) => (
              <div
                key={item._slotKey}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={styles.cylinderCard}
                onMouseEnter={() => {
                  if (!isMobile) isCardHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                  isCardHoveredRef.current = false;
                }}
                onClick={() => handleCardClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick && onImageClick(item);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <div className={styles.cardFrame}>
                  <div className={styles.imageArea}>
                    <picture className={styles.pictureWrap}>
                      <source srcSet={item.image} type="image/webp" />
                      <img
                        src={item.image.replace('.webp', '.png')}
                        alt={item.alt || item.title}
                        className={styles.cardImage}
                        loading="lazy"
                        draggable={false}
                      />
                    </picture>

                    <div className={styles.cardHoverOverlay}>
                      <div className={styles.viewBadge}>
                        <Eye size={15} />
                        <span>View Review</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Name at Bottom of Card */}
                  <div className={styles.cardCompanyFooter}>
                    <span className={styles.companyName}>{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Borderless, Background-free Forward & Backward Buttons */}
      <div className={styles.navigationRow}>
        <button
          onClick={handlePrev}
          className={styles.navBtn}
          aria-label="Previous client project"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          onClick={handleNext}
          className={styles.navBtn}
          aria-label="Next client project"
        >
          <ChevronRight size={26} />
        </button>
      </div>
    </section>
  );
}
