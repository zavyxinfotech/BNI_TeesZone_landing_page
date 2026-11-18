import React from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building,
  Heart
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import ScaleReveal from './animations/ScaleReveal';
import styles from './Footer.module.css';

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  return (
    <footer id="contact" ref={ref} className={styles.footerSection}>
      {/* Decorative Wave Header Divider */}
      <div className={styles.waveDivider} aria-hidden="true">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className={styles.waveSvg}>
          <path
            d="M0,0 C150,40 350,60 500,40 C650,20 900,50 1200,10 L1200,60 L0,60 Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>

      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          {/* Left Column: Contact & Legal Entity */}
          <div className={styles.footerLeft}>
            <FadeUp trigger={inView} delay={0.06} blur={false}>
              <div className={styles.subHeading}>Corporate Office &amp; Contact</div>
            </FadeUp>

            <h3 className={styles.mainHeading}>
              {prefersReduced ? (
                "Speak With a Dedicated Apparel Specialist"
              ) : (
                <WordReveal
                  text="Speak With a Dedicated Apparel Specialist"
                  trigger={inView}
                  delay={0.14}
                  stagger={0.08}
                />
              )}
            </h3>

            <FadeUp trigger={inView} delay={0.4} blur={true}>
              <p className={styles.supportText}>
                Custom embroidery specs, bulk uniform orders, or corporate swag boxes?
                Our team is available to assist you.
              </p>
            </FadeUp>

            <div className={styles.companyMetaList}>
              {/* Legal Entity */}
              <FadeUp trigger={inView} delay={0.48} blur={false}>
                <div className={styles.metaRow}>
                  <ScaleReveal trigger={inView} delay={0.52}>
                    <Building size={18} className={styles.metaIcon} />
                  </ScaleReveal>
                  <div className={styles.metaTextGroup}>
                    <span className={styles.metaLabel}>Legal Entity</span>
                    <span className={styles.metaValueHighlight}>{companyInfo.name}</span>
                  </div>
                </div>
              </FadeUp>

              {/* GSTIN */}
              <FadeUp trigger={inView} delay={0.56} blur={false}>
                <div className={styles.metaRow}>
                  <ScaleReveal trigger={inView} delay={0.6}>
                    <ShieldCheck size={18} className={styles.metaIcon} />
                  </ScaleReveal>
                  <div className={styles.metaTextGroup}>
                    <span className={styles.metaLabel}>GSTIN</span>
                    <span className={styles.metaValueCode}>{companyInfo.gstin}</span>
                  </div>
                </div>
              </FadeUp>

              {/* Direct Phone Lines */}
              <FadeUp trigger={inView} delay={0.64} blur={false}>
                <div className={styles.metaRow}>
                  <ScaleReveal trigger={inView} delay={0.68}>
                    <Phone size={18} className={styles.metaIcon} />
                  </ScaleReveal>
                  <div className={styles.metaTextGroup}>
                    <span className={styles.metaLabel}>Direct Phone Lines</span>
                    <div className={styles.phoneNumbers}>
                      {companyInfo.phones.map((p, idx) => (
                        <React.Fragment key={p.raw}>
                          <a href={`tel:${p.raw}`} className={styles.phoneLink}>
                            {p.display}
                          </a>
                          {idx === 0 && <span className={styles.phoneSeparator}>|</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Official Sales & Inquiry Email */}
              <FadeUp trigger={inView} delay={0.72} blur={false}>
                <div className={styles.metaRow}>
                  <ScaleReveal trigger={inView} delay={0.76}>
                    <Mail size={18} className={styles.metaIcon} />
                  </ScaleReveal>
                  <div className={styles.metaTextGroup}>
                    <span className={styles.metaLabel}>Official Sales &amp; Inquiry Email</span>
                    <a href={`mailto:${companyInfo.email}`} className={styles.emailLink}>
                      {companyInfo.email}
                    </a>
                  </div>
                </div>
              </FadeUp>

              {/* Office Hours */}
              <FadeUp trigger={inView} delay={0.8} blur={false}>
                <div className={styles.metaRow}>
                  <ScaleReveal trigger={inView} delay={0.84}>
                    <Clock size={18} className={styles.metaIcon} />
                  </ScaleReveal>
                  <div className={styles.metaTextGroup}>
                    <span className={styles.metaLabel}>Office Hours</span>
                    <span className={styles.metaValue}>{companyInfo.hours}</span>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Right Column: Physical Office Location & Google Maps Embed */}
          <div className={styles.footerRight}>
            <FadeUp trigger={inView} delay={0.16} blur={false}>
              <div className={styles.subHeading}>Visit Our Corporate Office</div>
            </FadeUp>

            <FadeUp trigger={inView} delay={0.28} blur={true}>
              <p className={styles.hubHighlight}>
                Find us at Texvalley — South India's premium wholesale textile market hub.
              </p>
            </FadeUp>

            <FadeUp trigger={inView} delay={0.4} blur={false}>
              <div className={styles.addressBox}>
                <ScaleReveal trigger={inView} delay={0.44}>
                  <MapPin size={20} className={styles.addressPinIcon} />
                </ScaleReveal>
                <address className={styles.addressContent}>
                  {companyInfo.address.line1}<br />
                  {companyInfo.address.line2}<br />
                  {companyInfo.address.line3}
                </address>
              </div>
            </FadeUp>

            {/* Embedded Google Maps Box - Fade-in */}
            <FadeUp trigger={inView} delay={0.52} blur={true}>
              <div className={styles.mapContainer}>
                <iframe
                  title="TeesZone Texvalley Office Location Map"
                  src="https://maps.google.com/maps?q=Texvalley+Fortune+City+NH+544+Chithode+Erode&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.mapIframe}
                />
              </div>
            </FadeUp>

            <div className={styles.mapLinkRow}>
              <ScaleReveal trigger={inView} delay={0.64}>
                <a
                  href={companyInfo.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.openMapsBtn}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </ScaleReveal>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & BNI Chapter Tagline */}
        <FadeUp trigger={inView} delay={0.7} blur={false}>
          <div className={styles.bottomBar}>
            <div className={styles.copyrightText}>
              &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </div>
            <div className={styles.bniBottomTag}>
              <span>Proud Member of <strong>{companyInfo.bniChapter}</strong></span>
            </div>
          </div>
        </FadeUp>
      </div>
    </footer>
  );
}
