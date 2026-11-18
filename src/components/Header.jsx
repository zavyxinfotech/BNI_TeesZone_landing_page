import React, { useState, useEffect } from 'react';
import { Phone, Tag } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './Header.module.css';

const offerPhrases = [
  "Special BNI Member Pricing",
  "Exclusive 10–15% BNI Discount",
  "Direct Factory Pricing for BNI"
];

function NavOfferTypingTag() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = offerPhrases[phraseIdx];
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % offerPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  return (
    <a
      href="#bni-collaboration"
      className={styles.navOfferTag}
      aria-label="Special BNI Member Pricing Offer"
    >
      <div className={styles.navOfferIconWrap}>
        <Tag size={13} className={styles.navOfferIcon} strokeWidth={2.4} />
      </div>
      <div className={styles.navOfferTextWrap}>
        <span className={styles.navOfferText}>
          {displayText}
          <span className={styles.typingCursor}>|</span>
        </span>
      </div>
    </a>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isMounted ? styles.headerLoaded : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        {/* Brand Logo - 1. Fade in + Slight scale from 0.95 to 1 */}
        <a href="#home" className={`${styles.logoLink} ${styles.animateLogo}`} aria-label="TeesZone Home">
          <img
            src="/images/logos/teeszone_logo.png"
            alt="TeesZone - Elevate your Style with Custom Tees"
            className={styles.logoImg}
            width="170"
            height="38"
          />
        </a>

        {/* Right CTA Area: 2. Staggered fade-in & slight upward movement */}
        <div className={styles.headerCta}>
          {/* Attractive Offer Option with Typing Animation */}
          <div className={styles.animateNavOffer}>
            <NavOfferTypingTag />
          </div>

          {/* Call Option (Phone Call Icon) */}
          <div className={styles.animateNavPhone}>
            <a
              href={`tel:${companyInfo.whatsapp.number}`}
              className={styles.headerPhoneBtn}
              aria-label={`Call TeesZone at ${companyInfo.whatsapp.display}`}
            >
              <div className={styles.callIconCircle}>
                <Phone size={14} color="#FFFFFF" />
              </div>
              <span>{companyInfo.whatsapp.display}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
