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
import { useInView } from './animations/useInView';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
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
  const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [machineRef, machineInView] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <section id="why-choose-us" className={`section-wrapper ${styles.whySection}`}>
      <div className="container">
        <SectionHeading
          title="Why Businesses Choose TeesZone"
          subtitle="Precision craftsmanship, direct factory pricing, and committed BNI relationship values."
          centered={false}
        />

        <div className={styles.mainLayout}>
          {/* Left: Six Benefit Cards - Staggered Appearance on Every Scroll */}
          <div ref={gridRef} className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => {
              const IconComponent = iconMap[benefit.icon] || Gem;
              const cardDelay = 0.1 + idx * 0.1;
              return (
                <FadeUp
                  key={benefit.id}
                  trigger={gridInView}
                  delay={cardDelay}
                  blur={false}
                  className={styles.benefitCard}
                >
                  <ScaleReveal trigger={gridInView} delay={cardDelay + 0.06}>
                    <div className={styles.benefitIconWrap}>
                      <IconComponent size={22} className={styles.benefitIcon} />
                    </div>
                  </ScaleReveal>
                  <div className={styles.benefitContent}>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <span className={styles.benefitTagline}>{benefit.tagline}</span>
                    <p className={styles.benefitDesc}>{benefit.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Right: High-Tech DTF Printing In Action Demonstration */}
          <div ref={machineRef} className={styles.equipmentDemonstration}>
            <ScaleReveal trigger={machineInView} delay={0.2}>
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
            </ScaleReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
