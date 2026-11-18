import React from 'react';
import { Users, Gift, Shirt, Share2, Handshake, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { collaborationOpportunities } from '../data/collaborations';
import { useInView } from './animations/useInView';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import styles from './BniCollaboration.module.css';

const iconMap = {
  Users: Users,
  Gift: Gift,
  Shirt: Shirt,
  Share2: Share2,
  Handshake: Handshake
};

export default function BniCollaboration({ onSelectOpportunity }) {
  const [gridRef, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  return (
    <section id="bni" className={`section-wrapper ${styles.bniSection}`}>
      <div className="container">
        <SectionHeading
          title="BNI Collaboration Opportunities"
          subtitle="Let's create value together within the BNI community."
          centered={true}
        />

        {/* 5 Circular 3D Platform Pedestals - Sequentially Animated on Every Scroll */}
        <div ref={gridRef} className={styles.platformGrid}>
          {collaborationOpportunities.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Users;
            const itemDelay = 0.1 + index * 0.12;
            return (
              <FadeUp
                key={item.id}
                trigger={inView}
                delay={itemDelay}
                blur={false}
                className={styles.platformCard}
              >
                <div
                  style={{ width: '100%' }}
                  onClick={() => onSelectOpportunity && onSelectOpportunity(item)}
                >
                  {/* 3D Elevated Circular Icon Disc - Staggered Scale-In */}
                  <div className={styles.pedestalBase}>
                    <ScaleReveal trigger={inView} delay={itemDelay + 0.04}>
                      <div className={styles.pedestalDisc}>
                        <div className={styles.iconCircle}>
                          <IconComponent size={26} className={styles.icon} />
                        </div>
                      </div>
                    </ScaleReveal>
                    <div className={styles.pedestalShadow} aria-hidden="true" />
                  </div>

                  {/* Burgundy Title & Description - Staggered Fade-Up */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.opportunityTitle}>{item.title}</h3>
                    <p className={styles.opportunityDesc}>{item.description}</p>
                    <div className={styles.opportunityCta}>
                      <span>{item.cta}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
