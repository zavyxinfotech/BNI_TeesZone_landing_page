import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import styles from './TrustedCorporatePartners.module.css';

const CLIENT_FILES = [
  'cognizant.png',
  'zoho.png',
  'tech-mahindra.png',
  'iit-madras.png',
  'srm-university.png',
  'the-lawrence-school.png',
  'accenture.png',
  'acendra-technologies.png',
  'address-developers.png',
  'agam-homes.png',
  'ais-advanced.png',
  'asian-hitech-industries.png',
  'aci-workwear.png',
  'ampo.png',
  'arc.png',
  'aruns-cafe.png',
  'ascendra-technology.png',
  'avaneetha.png',
  'axle-addition.png',
  'besten-pumps.png',
  'beyomo.png',
  'bharat-g-mart.png',
  'big-idea-advertising-agency.png',
  'chem-tex-aqua.png',
  'chinna-mobiles.png',
  'client-22.png',
  'dippd-idly.png',
  'eethal-plumbing-work.png',
  'epr-venture-india-private-limited.png',
  'erode-light-house.png',
  'fortune-city.png',
  'galaxy-health-insurance.png',
  'garudans.png',
  'gi-interiors.png',
  'global-school.png',
  'gr-hi-tech.png',
  'hajee-ap-bava-company-construction-private-limited.png',
  'hani-engineering.png',
  'helping-hearts.png',
  'hi-waffles.png',
  'hindu-global-school.png',
  'india-metals.png',
  'industrial-solutions.png',
  'jharkhand-state-cricket-association.png',
  'jmj-builders.png',
  'kovara.png',
  'kurinji-engineering.png',
  'lawrence-school.png',
  'linkra-wires.png',
  'mahe-megalo-strikers.png',
  'mani-electrenies.png',
  'modernmotors.png',
  'mohanam-restaurant.png',
  'namma-doctor.png',
  'nk-homes.png',
  'pc-tech.png',
  'pranavam-agencies.png',
  'psp-homes.png',
  'raj-electronics.png',
  'relax-fun-zone.png',
  'rjn-facility-service.png',
  'rr-associates.png',
  'rr-electicals-electronics.png',
  'sbs-insurance.png',
  'singles-network.png',
  'sk-projects.png',
  'sn-iyangar-bakery.png',
  'splash-events.png',
  'style-mantra.png',
  'sunglow.png',
  'surya-batteries.png',
  'tata-aia-life-insurance.png',
  'tata-electronics.png',
  'thapasya.png',
  'tn-sports-university.png',
  'udayam-nursery-primary-school.png',
  'uniform-unicorn.png',
  'unique-lasers-fabricators.png',
  'v2-saloon.png',
  'v2-vogue.png',
  'vinayaka-vidhya-bhavan.png',
  'vmk-construction.png'
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
