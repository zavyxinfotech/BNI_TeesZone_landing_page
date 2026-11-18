import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import styles from './About.module.css';

export default function About({ onOpenAboutModal }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  const highlights = [
    "Direct manufacturing from South India's textile heartland (Texvalley, Erode)",
    "Complete in-house knitting, dyeing, bio-washing, cutting, and stitching",
    "Proud member of BNI Tycoon Erode fostering transparent, long-term partnerships"
  ];

  return (
    <section id="about" ref={ref} className={`section-wrapper ${styles.aboutSection}`}>
      <div className={`container ${styles.aboutContainer}`}>
        {/* Left Column: Story, Description & CTA */}
        <div className={styles.aboutLeft}>
          <FadeUp trigger={inView} delay={0.06} blur={false}>
            <div className={styles.eyebrow}>Our Heritage &amp; Vision</div>
          </FadeUp>

          <h2 className={styles.heading}>
            {prefersReduced ? (
              "Who We Are"
            ) : (
              <WordReveal
                text="Who We Are"
                trigger={inView}
                delay={0.12}
                stagger={0.09}
              />
            )}
          </h2>

          <FadeUp trigger={inView} delay={0.3} blur={true}>
            <p className={styles.leadText}>
              TeesZone is a custom apparel manufacturing brand focused on delivering high-quality,
              stylish and durable clothing solutions for businesses, institutions and organizations.
            </p>
          </FadeUp>

          <div className={styles.keyHighlights}>
            {highlights.map((highlight, idx) => (
              <FadeUp
                key={idx}
                trigger={inView}
                delay={0.42 + idx * 0.12}
                blur={false}
              >
                <div className={styles.highlightItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>{highlight}</span>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className={styles.ctaWrapper}>
            <ScaleReveal trigger={inView} delay={0.78}>
              <button
                onClick={onOpenAboutModal}
                className="btn-primary"
                aria-label="Know More About Us"
              >
                <span>Know More About Us</span>
                <ArrowRight size={17} />
              </button>
            </ScaleReveal>
          </div>
        </div>

        {/* Right Column: Premium Apparel Photography on Hangers with Curved Mask */}
        <div className={styles.aboutRight}>
          <ScaleReveal trigger={inView} delay={0.28}>
            <div className={styles.imageCard}>
              <div className={styles.curvedMaskWrapper}>
                <picture>
                  <source srcSet="/images/who_we_are_hangers.webp" type="image/webp" />
                  <img
                    src="/images/who_we_are_hangers.png"
                    alt="TeesZone custom branded apparel on wooden hangers showing YOUR LOGO"
                    className={styles.hangerImg}
                    loading="lazy"
                    width="540"
                    height="340"
                  />
                </picture>
              </div>
              {/* Subtle floating gold corner accent */}
              <div className={styles.goldCornerDeco} aria-hidden="true" />
            </div>
          </ScaleReveal>
        </div>
      </div>
    </section>
  );
}
