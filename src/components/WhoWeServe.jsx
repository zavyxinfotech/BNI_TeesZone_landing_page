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
  return (
    <section id="services" className={`section-wrapper ${styles.serveSection}`}>
      <div className="container">
        <SectionHeading
          title="Who We Serve"
          subtitle="We deliver customized apparel solutions for a wide range of organizations across industries."
          centered={true}
        />

        {/* Human-based Apparel Showcase (Group of 5 diverse models wearing YOUR LOGO) */}
        <div className={styles.showcaseHeroCard}>
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
        </div>

        {/* Six Industry Category Cards Beneath the Image */}
        <div className={styles.industryGrid}>
          {industries.map((item) => {
            const IconComponent = iconMap[item.icon] || Building2;
            return (
              <div key={item.id} className={styles.industryCard}>
                <div className={styles.iconCircle}>
                  <IconComponent size={22} className={styles.icon} />
                </div>
                <h3 className={styles.industryTitle}>{item.title}</h3>
                <p className={styles.industryDesc}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
