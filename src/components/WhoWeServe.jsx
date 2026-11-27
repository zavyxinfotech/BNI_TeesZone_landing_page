import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { industries } from '../data/industries';
import styles from './WhoWeServe.module.css';

gsap.registerPlugin(ScrollTrigger);

// High-resolution apparel product visual assets for all 6 industries
const industryAssets = [
  {
    image: '/bni/images/products/who_we_serve_corporate.webp',
    imagePng: '/bni/images/products/who_we_serve_corporate.png',
    alt: 'Corporate navy and burgundy polo shirts with custom embroidery'
  },
  {
    image: '/bni/images/products/who_we_serve_sports.webp',
    imagePng: '/bni/images/products/who_we_serve_sports.png',
    alt: 'School and college athletic jerseys with custom collar and sleeve trim'
  },
  {
    image: '/bni/images/products/who_we_serve_blank.webp',
    imagePng: '/bni/images/products/who_we_serve_blank.png',
    alt: 'Premium combed blank plain t-shirts in multiple corporate colors'
  },
  {
    image: '/bni/images/products/who_we_serve_manufacturing.webp',
    imagePng: '/bni/images/products/who_we_serve_manufacturing.png',
    alt: 'Industrial workwear with reflective safety bands and durable twill fabric'
  },
  {
    image: '/bni/images/products/who_we_serve_events.webp',
    imagePng: '/bni/images/products/who_we_serve_events.png',
    alt: 'Event merchandise kit with branded t-shirt, cap, tote bag, and water bottle'
  },
  {
    image: '/bni/images/products/sports-apparel.webp',
    imagePng: '/bni/images/products/sports-apparel.png',
    alt: 'Clubs and organizations customized sublimated sports jerseys and kits'
  }
];

export default function WhoWeServe() {
  const sectionRef = useRef(null);
  const cardWrappersRef = useRef([]);
  const cardInnersRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = cardInnersRef.current.filter(Boolean);
      const wrappers = cardWrappersRef.current.filter(Boolean);
      const images = imagesRef.current.filter(Boolean);
      const total = cards.length;

      if (!prefersReduced) {
        // 1. Scroll-driven scale & depth darkening as the next card stacks over
        cards.forEach((card, index) => {
          if (index === total - 1) return; // Last card stays at full scale
          const nextWrapper = wrappers[index + 1];
          if (!nextWrapper) return;

          gsap.to(card, {
            scale: 0.94 - (index * 0.01),
            filter: 'brightness(0.80)',
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: nextWrapper,
              start: 'top bottom', // As next card enters viewport from below
              end: 'top center+=50', // When next card stacks into place
              scrub: true,
            }
          });
        });

        // 2. Scroll-driven 3D parallax on apparel images
        images.forEach((img, index) => {
          const wrapper = wrappers[index];
          if (!wrapper || !img) return;

          gsap.fromTo(img,
            { y: 35, scale: 0.96 },
            {
              y: -15,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={styles.serveSection}
      aria-label="Who We Serve"
    >
      <div className={styles.serveContainer}>
        {/* Sticky Pinned Section Heading */}
        <div className={styles.stickyHeadingArea}>
          <h2 className={styles.sectionTitle}>
            Who We Serve
          </h2>

          <div className={styles.goldAccentLine} aria-hidden="true" />

          <p className={styles.sectionSubtitle}>
            We deliver customized apparel solutions for a wide range of organizations across industries.
          </p>
        </div>

        {/* Sticky Stacked Cards Stream */}
        <div className={styles.cardsStackContainer}>
          {industries.map((item, idx) => {
            const isBurgundy = idx % 2 === 0;
            const asset = industryAssets[idx] || item;
            const panelNumber = `0${idx + 1}`;

            return (
              <div
                key={item.id}
                ref={(el) => (cardWrappersRef.current[idx] = el)}
                className={styles.cardWrapper}
                style={{ '--card-index': idx }}
              >
                <div
                  ref={(el) => (cardInnersRef.current[idx] = el)}
                  className={`${styles.cinematicCard} ${isBurgundy ? styles.burgundyCard : styles.creamCard}`}
                >
                  {/* Exact 3D Wave Silhouette & Metallic Gold Top Rim (as in Image 2) */}
                  <svg
                    viewBox="0 0 1200 400"
                    preserveAspectRatio="none"
                    className={styles.cardBackdropSvg}
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id={`cardBgGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        {isBurgundy ? (
                          <>
                            <stop offset="0%" stopColor="#7A001F" />
                            <stop offset="55%" stopColor="#630018" />
                            <stop offset="100%" stopColor="#4C0012" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#FAF2E4" />
                            <stop offset="55%" stopColor="#F4E8D3" />
                            <stop offset="100%" stopColor="#EEDEC4" />
                          </>
                        )}
                      </linearGradient>

                      <linearGradient id={`goldRimGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C49332" stopOpacity="0.4" />
                        <stop offset="18%" stopColor="#D9A441" stopOpacity="0.95" />
                        <stop offset="42%" stopColor="#FFF4D9" stopOpacity="1" />
                        <stop offset="65%" stopColor="#FFFDF7" stopOpacity="1" />
                        <stop offset="85%" stopColor="#D9A441" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#B57E24" stopOpacity="0.5" />
                      </linearGradient>
                    </defs>

                    {/* Exact Curved Card Body Shape Matching Image 2 */}
                    <path
                      d={idx === 0
                        ? "M 0 24 Q 0 0 24 0 L 1176 0 Q 1200 0 1200 24 L 1200 376 Q 1200 400 1176 400 L 24 400 Q 0 400 0 376 Z"
                        : "M 0 38 Q 600 22 1200 10 L 1200 376 Q 1200 400 1176 400 L 24 400 Q 0 400 0 376 Z"
                      }
                      fill={`url(#cardBgGrad-${idx})`}
                    />

                    {/* 3D Metallic Gold Curved Top Edge Rim */}
                    <path
                      d={idx === 0
                        ? "M 12 12 Q 600 6 1188 10"
                        : "M 0 38 Q 600 22 1200 10"
                      }
                      stroke={`url(#goldRimGrad-${idx})`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className={styles.cardContentRow}>
                    {/* Left Column: Number Badge, Title, Gold Underline & Description */}
                    <div className={styles.cardTextCol}>
                      <div className={styles.numberBadge} aria-hidden="true">
                        {panelNumber}
                      </div>

                      <h3 className={styles.cardTitle}>
                        {item.title}
                      </h3>

                      <div className={styles.titleGoldUnderline} aria-hidden="true" />

                      <p className={styles.cardDesc}>
                        {item.description}
                      </p>
                    </div>

                    {/* Right Column: Large 3D Floating Apparel Product Visual */}
                    <div className={styles.cardApparelCol}>
                      <div className={styles.apparelStageWrap}>
                        <picture>
                          <source srcSet={asset.image} type="image/webp" />
                          <img
                            ref={(el) => (imagesRef.current[idx] = el)}
                            src={asset.imagePng || asset.image}
                            alt={asset.alt || item.title}
                            className={styles.apparelVisualImg}
                            loading={idx < 2 ? 'eager' : 'lazy'}
                            width="520"
                            height="330"
                          />
                        </picture>

                        {/* 3D Pedestal Stage Shadow */}
                        <div className={styles.apparelPedestal} aria-hidden="true" />
                      </div>
                    </div>
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
