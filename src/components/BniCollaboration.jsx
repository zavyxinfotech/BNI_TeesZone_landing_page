import React from 'react';
import { Users, Gift, Shirt, Share2, Handshake, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { collaborationOpportunities } from '../data/collaborations';
import styles from './BniCollaboration.module.css';

const iconMap = {
  Users: Users,
  Gift: Gift,
  Shirt: Shirt,
  Share2: Share2,
  Handshake: Handshake
};

export default function BniCollaboration({ onSelectOpportunity }) {
  return (
    <section id="bni" className={`section-wrapper ${styles.bniSection}`}>
      <div className="container">
        <SectionHeading
          title="BNI Collaboration Opportunities"
          subtitle="Let's create value together within the BNI community."
          centered={true}
        />

        {/* 5 Circular 3D Platform Pedestals */}
        <div className={styles.platformGrid}>
          {collaborationOpportunities.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Users;
            return (
              <div
                key={item.id}
                className={styles.platformCard}
                onClick={() => onSelectOpportunity && onSelectOpportunity(item)}
              >
                {/* 3D Elevated Circular Icon Disc */}
                <div className={styles.pedestalBase}>
                  <div className={styles.pedestalDisc}>
                    <div className={styles.iconCircle}>
                      <IconComponent size={26} className={styles.icon} />
                    </div>
                  </div>
                  <div className={styles.pedestalShadow} aria-hidden="true" />
                </div>

                {/* Burgundy Title & Description */}
                <div className={styles.cardContent}>
                  <h3 className={styles.opportunityTitle}>{item.title}</h3>
                  <p className={styles.opportunityDesc}>{item.description}</p>
                  <div className={styles.opportunityCta}>
                    <span>{item.cta}</span>
                    <ArrowUpRight size={14} />
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
