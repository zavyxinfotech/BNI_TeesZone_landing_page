import React from 'react';
import {
  Building2,
  GraduationCap,
  Activity,
  Factory,
  Calendar,
  Users
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { industries } from '../data/industries';
import { useInView } from './animations/useInView';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import styles from './WhoWeServe.module.css';

const iconMap = {
  Building2: Building2,
  GraduationCap: GraduationCap,
  Cross: Activity,
  Factory: Factory,
  Calendar: Calendar,
  Users: Users
};

export default function WhoWeServe() {
  const [photoRef, photoInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <section id="services" className={`section-wrapper ${styles.serveSection}`}>
      <div className="container">
        <SectionHeading
          title="Who We Serve"
          subtitle="We deliver customized apparel solutions for a wide range of organizations across industries."
          centered={true}
        />

        {/* Human-based Apparel Showcase (Transparent Group Image - Fade-in + slight upward movement) */}
        <div ref={photoRef} className={styles.showcaseHeroCard}>
          <FadeUp trigger={photoInView} delay={0.2} blur={true}>
            <div className={styles.imageWrapper}>
              <picture>
                <source srcSet="/images/who_we_serve_group.webp" type="image/webp" />
                <img
                  src="/images/who_we_serve_group.png"
                  alt="Diverse professionals, athletes, and students wearing customized apparel with YOUR LOGO"
                  className={styles.groupPhoto}
                  loading="lazy"
                  width="980"
                  height="336"
                />
              </picture>
              <div className={styles.photoOverlayGlow} aria-hidden="true" />
            </div>
          </FadeUp>
        </div>

        {/* Six Industry Category Cards Beneath the Image - Staggered Appearance on Every Scroll */}
        <div ref={gridRef} className={styles.industryGrid}>
          {industries.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Building2;
            const itemDelay = 0.12 + idx * 0.11;
            return (
              <FadeUp
                key={item.id}
                trigger={gridInView}
                delay={itemDelay}
                blur={false}
                className={styles.industryCard}
              >
                <ScaleReveal trigger={gridInView} delay={itemDelay + 0.06}>
                  <div className={styles.iconCircle}>
                    <IconComponent size={22} className={styles.icon} />
                  </div>
                </ScaleReveal>
                <h3 className={styles.industryTitle}>{item.title}</h3>
                <p className={styles.industryDesc}>{item.description}</p>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
