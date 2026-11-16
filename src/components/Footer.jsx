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
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="contact" className={styles.footerSection}>
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
            <div className={styles.subHeading}>Corporate Office &amp; Contact</div>
            <h3 className={styles.mainHeading}>Speak With a Dedicated Apparel Specialist</h3>
            <p className={styles.supportText}>
              Custom embroidery specs, bulk uniform orders, or corporate swag boxes?
              Our team is available to assist you.
            </p>

            <div className={styles.companyMetaList}>
              {/* Legal Entity */}
              <div className={styles.metaRow}>
                <Building size={18} className={styles.metaIcon} />
                <div className={styles.metaTextGroup}>
                  <span className={styles.metaLabel}>Legal Entity</span>
                  <span className={styles.metaValueHighlight}>{companyInfo.name}</span>
                </div>
              </div>

              {/* GSTIN */}
              <div className={styles.metaRow}>
                <ShieldCheck size={18} className={styles.metaIcon} />
                <div className={styles.metaTextGroup}>
                  <span className={styles.metaLabel}>GSTIN</span>
                  <span className={styles.metaValueCode}>{companyInfo.gstin}</span>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className={styles.metaRow}>
                <Phone size={18} className={styles.metaIcon} />
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

              {/* Official Sales & Inquiry Email */}
              <div className={styles.metaRow}>
                <Mail size={18} className={styles.metaIcon} />
                <div className={styles.metaTextGroup}>
                  <span className={styles.metaLabel}>Official Sales &amp; Inquiry Email</span>
                  <a href={`mailto:${companyInfo.email}`} className={styles.emailLink}>
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className={styles.metaRow}>
                <Clock size={18} className={styles.metaIcon} />
                <div className={styles.metaTextGroup}>
                  <span className={styles.metaLabel}>Office Hours</span>
                  <span className={styles.metaValue}>{companyInfo.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Office Location & Google Maps Embed */}
          <div className={styles.footerRight}>
            <div className={styles.subHeading}>Visit Our Corporate Office</div>
            <p className={styles.hubHighlight}>
              Find us at Texvalley — South India's premium wholesale textile market hub.
            </p>

            <div className={styles.addressBox}>
              <MapPin size={20} className={styles.addressPinIcon} />
              <address className={styles.addressContent}>
                {companyInfo.address.line1}<br />
                {companyInfo.address.line2}<br />
                {companyInfo.address.line3}
              </address>
            </div>

            {/* Embedded Google Maps Box */}
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

            <div className={styles.mapLinkRow}>
              <a
                href={companyInfo.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openMapsBtn}
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & BNI Chapter Tagline */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </div>
          <div className={styles.bniBottomTag}>
            <span>Proud Member of <strong>{companyInfo.bniChapter}</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
