import React, { useEffect, useRef } from 'react';
import {
  Gem,
  Layers,
  IndianRupee,
  ShieldCheck,
  Headphones,
  Handshake
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { benefits } from '../data/benefits';
import styles from './WhyChooseUs.module.css';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Gem,
  Layers,
  BadgePercent: IndianRupee,
  IndianRupee,
  ShieldCheck,
  Headphones,
  Handshake
};

// Precise tilt angles & vertical offsets from Image 1 Reference
const cardRotations = [-3.2, 0.8, 3.5, 2.4, -1.8, -3.2];
const cardTranslationsY = [0, -8, 0, 0, -4, 0];

// Realistic Red 3D Pushpin Component
function RedPushPin({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
        <defs>
          <radialGradient id="pinHeadGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FF7D8C" />
            <stop offset="25%" stopColor="#E61A34" />
            <stop offset="65%" stopColor="#A30018" />
            <stop offset="100%" stopColor="#55000A" />
          </radialGradient>
          <linearGradient id="pinNeckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A0012" />
            <stop offset="45%" stopColor="#E61A34" />
            <stop offset="75%" stopColor="#FF6B7A" />
            <stop offset="100%" stopColor="#5E000C" />
          </linearGradient>
          <linearGradient id="pinBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E61A34" />
            <stop offset="100%" stopColor="#60000C" />
          </linearGradient>
          <radialGradient id="pinShadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Cast shadow onto card paper */}
        <ellipse cx="14" cy="29.5" rx="8.5" ry="3.5" fill="url(#pinShadowGrad)" />

        {/* Base flange rim */}
        <ellipse cx="14" cy="23.5" rx="7.5" ry="2.8" fill="url(#pinBaseGrad)" />

        {/* Tapered cylindrical neck */}
        <path d="M 10 14 L 11 22.5 C 11 23 17 23 17 22.5 L 18 14 Z" fill="url(#pinNeckGrad)" />

        {/* Spherical head */}
        <circle cx="14" cy="10.5" r="8.5" fill="url(#pinHeadGrad)" />

        {/* 3D Specular high-gloss highlight */}
        <ellipse cx="11.5" cy="7.8" rx="3.4" ry="1.9" transform="rotate(-30 11.5 7.8)" fill="#FFFFFF" opacity="0.8" />
      </svg>
    </div>
  );
}

// Folded Paper Airplane with dotted flight loop trail from Image 1
function PaperAirplane({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
        {/* Looping dotted trajectory */}
        <path
          d="M 6 56 C 26 50, 42 64, 58 54 C 72 44, 64 24, 48 28 C 38 31, 42 46, 58 42 C 78 36, 94 22, 104 15"
          stroke="#7A001F"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Burgundy Paper Airplane */}
        <g transform="translate(94, 5) rotate(20)">
          <polygon points="0,0 22,10 5,14" fill="#7A001F" />
          <polygon points="0,0 22,10 10,6" fill="#A81D39" />
          <polygon points="5,14 10,6 22,10" fill="#580012" />
        </g>
      </svg>
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Responsive Bidirectional scrub animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 85%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      // Heading & Subtitle smooth entrance
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: -24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power2.out' }
      );

      // Staggered 3D Pinned Cards placement with depth, perspective, and rotations
      const cards = cardsRef.current.filter(Boolean);
      cards.forEach((card, i) => {
        const targetRot = cardRotations[i] || 0;
        const targetY = cardTranslationsY[i] || 0;

        tl.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.75,
            y: 65 + (i % 3) * 12,
            rotationZ: targetRot + (i % 2 === 0 ? -12 : 12),
            rotationX: 18,
            rotationY: (i % 2 === 0 ? -10 : 10),
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            scale: 1,
            y: targetY,
            rotationZ: targetRot,
            rotationX: 0,
            rotationY: 0,
            duration: 0.85,
            ease: 'power3.out',
          },
          `-=${0.62}`
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className={styles.whySection}
      aria-label="Why Businesses Choose TeesZone"
    >
      <div className={styles.sectionContainer}>
        {/* Section Heading with Sunburst Sparkle, Gold Underline & Paper Airplane */}
        <div ref={headingRef} className={styles.headingArea}>
          <div className={styles.titleWrap}>
            {/* Sparkle Sunburst Rays */}
            <svg className={styles.sparkleIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M 4 18 L 8 15 M 12 10 L 12 5 M 16 15 L 20 18" stroke="#D9A441" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            <h2 className={styles.sectionTitle}>
              Why Businesses Choose TeesZone
            </h2>

            {/* Small Gold Underline Accent */}
            <div className={styles.goldUnderline} aria-hidden="true" />
          </div>

          <p className={styles.sectionSubtitle}>
            Precision craftsmanship, direct factory pricing, and committed BNI relationship values.
          </p>

          {/* Paper Airplane at Top Right */}
          <PaperAirplane className={styles.airplaneWrapper} />
        </div>

        {/* Floating 3D Pinned Notes Board */}
        <div className={styles.pinnedBoard}>
          {benefits.map((benefit, idx) => {
            const IconComponent = iconMap[benefit.icon] || Gem;
            const isBurgundy = idx % 2 === 0; // Alternates: Card 1 Burgundy, Card 2 Cream, Card 3 Burgundy...

            return (
              <div
                key={benefit.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`${styles.pinnedCard} ${isBurgundy ? styles.burgundyCard : styles.creamCard} ${styles[`cardPos${idx}`]}`}
                style={{
                  '--card-rest-rot': `${cardRotations[idx]}deg`,
                  '--card-rest-y': `${cardTranslationsY[idx]}px`
                }}
              >
                {/* Exact 2-Layer Card Shape matching Image 2 (Offset Backing + Slanted Bottom Front Card) */}
                <svg
                  className={styles.cardShapeSvg}
                  viewBox="0 0 320 260"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {/* Offset Backing Card */}
                  <path
                    d="M 42,14 L 296,4 Q 316,2 316,22 L 316,236 Q 316,254 296,254 L 42,254 Q 24,254 24,236 L 24,32 Q 24,16 42,14 Z"
                    className={styles.cardBackingPath}
                  />
                  {/* Front Card with Slanted Bottom Edge */}
                  <path
                    d="M 22,18 L 282,18 Q 300,18 300,36 L 300,218 Q 300,236 282,238 L 22,254 Q 4,255 4,236 L 4,36 Q 4,18 22,18 Z"
                    className={styles.cardFrontPath}
                  />
                </svg>

                {/* Realistic 3D Red Pushpin */}
                <RedPushPin className={styles.pinWrapper} />

                <div className={styles.cardInnerContent}>
                  {/* Professional SVG Icon */}
                  <div className={styles.iconWrap}>
                    <IconComponent
                      size={34}
                      strokeWidth={1.85}
                      className={styles.cardIcon}
                    />
                  </div>

                  {/* Card Title */}
                  <h3 className={styles.cardTitle}>{benefit.title}</h3>

                  {/* Small Gold Divider Line */}
                  <div className={styles.goldDivider} aria-hidden="true" />

                  {/* Uppercase Tagline */}
                  <span className={styles.cardTagline}>{benefit.tagline}</span>

                  {/* Exact Business Description Text */}
                  <p className={styles.cardDesc}>{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
