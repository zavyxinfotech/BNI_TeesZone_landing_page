import React, { useEffect } from 'react';
import { X, Check, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './ProductDetailModal.module.css';

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello TeesZone! I saw "${product.name || product.title}" on your BNI landing page and would like pricing details for custom corporate apparel.`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp.number}?text=${text}`, '_blank');
  };

  return (
    <div
      className={styles.fullScreenGlassOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Centered Glassmorphism Details Section (No rounded borders) */}
      <div
        className={styles.glassModalCard}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close details"
        >
          <X size={24} />
        </button>

        <div className={styles.modalBodyLayout}>
          {/* Full Sized Image Frame */}
          <div className={styles.fullImageFrame}>
            <picture>
              <source srcSet={product.image} type="image/webp" />
              <img
                src={product.image.replace('.webp', '.png')}
                alt={product.name || product.title}
                className={styles.fullSizedImg}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          {/* Details Content */}
          <div className={styles.detailsContentCol}>
            <span className={styles.brandTag}>
              {product.category || product.badge || 'TeesZone Custom Manufacturing'}
            </span>

            <h2 className={styles.detailTitle}>{product.name || product.title}</h2>

            <p className={styles.detailDesc}>
              {product.description ||
                'Precision-crafted customized apparel with premium fabrics, custom embroidery, and high-definition printing engineered for corporate, institutional, and team branding.'}
            </p>

            <div className={styles.specsList}>
              <div className={styles.specItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Custom Brand Logo on Chest, Sleeve & Back</span>
              </div>
              <div className={styles.specItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Bio-washed, Color-fast & Shrink-Resistant Fabrics</span>
              </div>
              <div className={styles.specItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Sizes S to 5XL with Custom Fit Options</span>
              </div>
              <div className={styles.specItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>Direct Manufacturer Pricing from Texvalley Hub</span>
              </div>
            </div>

            <button onClick={handleWhatsApp} className={styles.whatsappBtn}>
              <MessageSquare size={18} />
              <span>Get Quotation on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
