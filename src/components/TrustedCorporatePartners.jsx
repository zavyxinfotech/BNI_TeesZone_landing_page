import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import styles from './TrustedCorporatePartners.module.css';

const CLIENT_FILES = [
  'cognizant.webp',
  'zoho.webp',
  'tech-mahindra.webp',
  'iit-madras.webp',
  'srm-university.webp',
  'the-lawrence-school.webp',
  'accenture.webp',
  'acendra-technologies.webp',
  'address-developers.webp',
  'agam-homes.webp',
  'ais-advanced.webp',
  'asian-hitech-industries.webp',
  'aci-workwear.webp',
  'ampo.webp',
  'arc.webp',
  'aruns-cafe.webp',
  'ascendra-technology.webp',
  'avaneetha.webp',
  'axle-addition.webp',
  'besten-pumps.webp',
  'beyomo.webp',
  'bharat-g-mart.webp',
  'big-idea-advertising-agency.webp',
  'chem-tex-aqua.webp',
  'chinna-mobiles.webp',
  'client-22.webp',
  'dippd-idly.webp',
  'eethal-plumbing-work.webp',
  'epr-venture-india-private-limited.webp',
  'erode-light-house.webp',
  'fortune-city.webp',
  'galaxy-health-insurance.webp',
  'garudans.webp',
  'gi-interiors.webp',
  'global-school.webp',
  'gr-hi-tech.webp',
  'hajee-ap-bava-company-construction-private-limited.webp',
  'hani-engineering.webp',
  'helping-hearts.webp',
  'hi-waffles.webp',
  'hindu-global-school.webp',
  'india-metals.webp',
  'industrial-solutions.webp',
  'jharkhand-state-cricket-association.webp',
  'jmj-builders.webp',
  'kovara.webp',
  'kurinji-engineering.webp',
  'lawrence-school.webp',
  'linkra-wires.webp',
  'mahe-megalo-strikers.webp',
  'mani-electrenies.webp',
  'modernmotors.webp',
  'mohanam-restaurant.webp',
  'namma-doctor.webp',
  'nk-homes.webp',
  'pc-tech.webp',
  'pranavam-agencies.webp',
  'psp-homes.webp',
  'raj-electronics.webp',
  'relax-fun-zone.webp',
  'rjn-facility-service.webp',
  'rr-associates.webp',
  'rr-electicals-electronics.webp',
  'sbs-insurance.webp',
  'singles-network.webp',
  'sk-projects.webp',
  'sn-iyangar-bakery.webp',
  'splash-events.webp',
  'style-mantra.webp',
  'sunglow.webp',
  'surya-batteries.webp',
  'tata-aia-life-insurance.webp',
  'tata-electronics.webp',
  'thapasya.webp',
  'tn-sports-university.webp',
  'udayam-nursery-primary-school.webp',
  'uniform-unicorn.webp',
  'unique-lasers-fabricators.webp',
  'v2-saloon.webp',
  'v2-vogue.webp',
  'vinayaka-vidhya-bhavan.webp',
  'vmk-construction.webp'
];

export const clientLogos = CLIENT_FILES.map((file, idx) => ({
  id: String(idx + 1),
  name: file
    .replace(/\.(png|webp|jpg|jpeg|svg)$/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()),
  src: `/images/clients/${file}`
}));

export default function TrustedCorporatePartners({
  className = '',
  badge = '— TRUSTED CORPORATE PARTNERS —',
  title = 'Custom Apparel Partner for',
  titleAccent = 'Leading Brands',
  countNumber = '500+',
  countLabel = 'Happy Clients'
}) {
  const sectionRef = useRef(null);

  // Velocity-reactive scroll tracking (nudges the marquee smoothly when user scrolls)
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Subtle directional offsets based on scroll speed
  const row1Nudge = useTransform(smoothVelocity, [-2000, 2000], [-35, 35]);
  const row2Nudge = useTransform(smoothVelocity, [-2000, 2000], [35, -35]);
  const row3Nudge = useTransform(smoothVelocity, [-2000, 2000], [-30, 30]);

  // Distribute all 82 logos evenly across 3 desktop rows and 2 mobile rows
  const third = Math.ceil(clientLogos.length / 3);
  const dRow1 = clientLogos.slice(0, third);
  const dRow2 = clientLogos.slice(third, third * 2);
  const dRow3 = clientLogos.slice(third * 2);

  const half = Math.ceil(clientLogos.length / 2);
  const mobRow1 = clientLogos.slice(0, half);
  const mobRow2 = clientLogos.slice(half);

  return (
    <section
      ref={sectionRef}
      id="trusted-corporate-partners"
      className={`${styles.section} ${className}`}
    >
      {/* 1. Ambient Background Gradient Glows */}
      <div className={styles.ambientWrap} aria-hidden="true">
        <div className={styles.glowTopRight} />
        <div className={styles.glowBottomLeft} />
      </div>

      {/* 2. Top-Right Subtle Dot Matrix Grid */}
      <div className={styles.dotMatrixWrap} aria-hidden="true">
        <svg className={styles.dotMatrixSvg} viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="burgundy-dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="9" cy="9" r="1.5" fill="#80011F" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#burgundy-dots)" />
        </svg>
      </div>

      <div className={styles.innerContainer}>
        {/* Section Heading */}
        <div className={styles.headingWrap}>
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={styles.badge}
          >
            {badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className={styles.title}
          >
            {title} <span className={styles.titleAccent}>{titleAccent}</span>
          </motion.h2>
        </div>

        {/* Centerpiece Counter Badge */}
        <div className={styles.counterRow}>
          <span className={styles.counterNumber}>{countNumber}</span>
          <span className={styles.counterLabel}>{countLabel}</span>
        </div>

        {/* DESKTOP VIEW: 3 Opposing Infinite Scrolling Marquee Rows */}
        <div className={styles.desktopMarquees}>
          {/* Row 1: Left-to-Right */}
          <div className={styles.marqueeMask}>
            <motion.div style={{ x: row1Nudge }} className={styles.nudgeLayer}>
              <motion.div
                className={styles.marqueeTrackDesktop}
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 95 }}
              >
                {[...dRow1, ...dRow1].map((client, index) => (
                  <div key={`drow1-${client.id}-${index}`} className={styles.logoCardDesktop}>
                    <img
                      src={client.src}
                      alt={client.name}
                      className={styles.logoImgDesktop}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Row 2: Right-to-Left */}
          <div className={styles.marqueeMask}>
            <motion.div style={{ x: row2Nudge }} className={styles.nudgeLayer}>
              <motion.div
                className={styles.marqueeTrackDesktop}
                animate={{ x: ['-50%', '0%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 95 }}
              >
                {[...dRow2, ...dRow2].map((client, index) => (
                  <div key={`drow2-${client.id}-${index}`} className={styles.logoCardDesktop}>
                    <img
                      src={client.src}
                      alt={client.name}
                      className={styles.logoImgDesktop}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Row 3: Left-to-Right */}
          <div className={styles.marqueeMask}>
            <motion.div style={{ x: row3Nudge }} className={styles.nudgeLayer}>
              <motion.div
                className={styles.marqueeTrackDesktop}
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 95 }}
              >
                {[...dRow3, ...dRow3].map((client, index) => (
                  <div key={`drow3-${client.id}-${index}`} className={styles.logoCardDesktop}>
                    <img
                      src={client.src}
                      alt={client.name}
                      className={styles.logoImgDesktop}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* MOBILE VIEW: 2 Opposing Auto-Scrolling Rows */}
        <div className={styles.mobileMarquees}>
          {/* Mobile Row 1 */}
          <div className={styles.marqueeMaskMobile}>
            <motion.div style={{ x: row1Nudge }} className={styles.nudgeLayer}>
              <motion.div
                className={styles.marqueeTrackMobile}
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 85 }}
              >
                {[...mobRow1, ...mobRow1].map((client, index) => (
                  <div key={`mob1-${client.id}-${index}`} className={styles.logoCardMobile}>
                    <img
                      src={client.src}
                      alt={client.name}
                      className={styles.logoImgMobile}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Row 2 */}
          <div className={styles.marqueeMaskMobile}>
            <motion.div style={{ x: row2Nudge }} className={styles.nudgeLayer}>
              <motion.div
                className={styles.marqueeTrackMobile}
                animate={{ x: ['-50%', '0%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 85 }}
              >
                {[...mobRow2, ...mobRow2].map((client, index) => (
                  <div key={`mob2-${client.id}-${index}`} className={styles.logoCardMobile}>
                    <img
                      src={client.src}
                      alt={client.name}
                      className={styles.logoImgMobile}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
