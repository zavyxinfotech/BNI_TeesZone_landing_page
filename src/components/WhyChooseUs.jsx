import React from 'react';
import {
  Gem,
  Layers,
  IndianRupee,
  ShieldCheck,
  Headphones,
  Handshake,
  Check
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { benefits } from '../data/benefits';
import styles from './WhyChooseUs.module.css';

const iconMap = {
  Gem: Gem,
  Layers: Layers,
  BadgePercent: IndianRupee,
  ShieldCheck: ShieldCheck,
  Headphones: Headphones,
  Handshake: Handshake
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className={`section-wrapper ${styles.whySection}`}>
      <div className="container">
        <SectionHeading
          title="Why Businesses Choose TeesZone"
          subtitle="Precision craftsmanship, direct factory pricing, and committed BNI relationship values."
          centered={false}
        />

        <div className={styles.mainLayout}>
          {/* Left: Six 3D-Inspired Benefit Cards (2 rows of 3) */}
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => {
              const IconComponent = iconMap[benefit.icon] || Gem;
              return (
                <div key={benefit.id} className={styles.benefitCard}>
                  <div className={styles.benefitIconWrap}>
                    <IconComponent size={22} className={styles.benefitIcon} />
                  </div>
                  <div className={styles.benefitContent}>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <span className={styles.benefitTagline}>{benefit.tagline}</span>
                    <p className={styles.benefitDesc}>{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: High-Tech DTF Printing In Action Demonstration */}
          <div className={styles.equipmentDemonstration}>
            <div className={styles.machineCard}>
              <div className={styles.machineImageWrapper}>
                <picture>
                  <source srcSet="/images/dtf_printing_machine.webp" type="image/webp" />
                  <img
                    src="/images/dtf_printing_machine.png"
                    alt="Industrial DTF printer actively applying multi-color logo transfer onto burgundy polo t-shirt"
                    className={styles.machineImg}
                    loading="lazy"
                    width="440"
                    height="280"
                  />
                </picture>
                <div className={styles.machineBadge}>
                  <span className={styles.badgeDot} />
                  <span>In-House DTF Tech</span>
                </div>
              </div>

              <div className={styles.machineMeta}>
                <h4 className={styles.machineHeading}>Advanced Direct-to-Film (DTF) Printing</h4>
                <p className={styles.machineDesc}>
                  Our in-house automated DTF equipment enables vivid gradient printing with exceptional
                  wash fastness directly onto our burgundy and colored apparel.
                </p>
                <div className={styles.machineSpecs}>
                  <div className={styles.specItem}>
                    <Check size={14} className={styles.specCheck} />
                    <span>Multi-Color Gradients</span>
                  </div>
                  <div className={styles.specItem}>
                    <Check size={14} className={styles.specCheck} />
                    <span>50+ Wash Durability</span>
                  </div>
                  <div className={styles.specItem}>
                    <Check size={14} className={styles.specCheck} />
                    <span>Zero Setup Plate Fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
