import React, { useEffect } from 'react';
import { X, Phone, MessageCircle } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { companyInfo } from '../data/companyInfo';
import styles from './Header.module.css';

export default function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.mobileOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <img
            src="/images/logos/teeszone_logo.png"
            alt="TeesZone Logo"
            className={styles.drawerLogo}
          />
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close Navigation Menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <a
            href={companyInfo.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.drawerWhatsAppBtn}
          >
            <MessageCircle size={18} fill="#25D366" color="#25D366" />
            <span>Chat: {companyInfo.whatsapp.display}</span>
          </a>
          <div className={styles.drawerChapter}>
            <span>{companyInfo.bniChapter}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
