import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './About.module.css';

export default function About({ onOpenAboutModal }) {
  return (
    <section id="about" className={`section-wrapper ${styles.aboutSection}`}>
      <div className={`container ${styles.aboutContainer}`}>
        {/* Left Column: Story, Description & CTA */}
        <div className={styles.aboutLeft}>
          <div className={styles.eyebrow}>Our Heritage &amp; Vision</div>
          <h2 className={styles.heading}>Who We Are</h2>
          <p className={styles.leadText}>
            TeesZone is a custom apparel manufacturing brand focused on delivering high-quality,
            stylish and durable clothing solutions for businesses, institutions and organizations.
          </p>

          <div className={styles.keyHighlights}>
            <div className={styles.highlightItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>Direct manufacturing from South India's textile heartland (Texvalley, Erode)</span>
            </div>
            <div className={styles.highlightItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>Complete in-house knitting, dyeing, bio-washing, cutting, and stitching</span>
            </div>
            <div className={styles.highlightItem}>
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>Proud member of BNI Tycoon Erode fostering transparent, long-term partnerships</span>
            </div>
          </div>

          <div className={styles.ctaWrapper}>
            <button
              onClick={onOpenAboutModal}
              className="btn-primary"
              aria-label="Know More About Us"
            >
              <span>Know More About Us</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Right Column: Premium Apparel Photography on Hangers with Curved Mask */}
        <div className={styles.aboutRight}>
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
        </div>
      </div>
    </section>
  );
}
