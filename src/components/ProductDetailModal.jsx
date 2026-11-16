import React from 'react';
import { X, Check, MessageSquare } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './ProductDetailModal.module.css';

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello TeesZone! I saw "${product.name || product.title}" on your BNI landing page and would like pricing details for custom corporate uniforms.`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp.number}?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div className={styles.productModalGrid}>
          <div className={styles.imageCol}>
            <picture>
              <source srcSet={product.image} type="image/webp" />
              <img
                src={product.image.replace('.webp', '.png')}
                alt={product.name || product.title}
                className={styles.modalProductImg}
              />
            </picture>
            <div className={styles.badge}>{product.badge || product.category || 'Custom Apparel'}</div>
          </div>

          <div className={styles.contentCol}>
            <span className={styles.brandTag}>TeesZone Custom Manufacturing</span>
            <h3 className={styles.modalTitle}>{product.name || product.title}</h3>
            <p className={styles.modalDesc}>
              {product.description ||
                'Tailored custom apparel manufactured with premium cotton & bio-washed fabrics, customized with your brand logo via Tajima embroidery or high-definition DTF printing.'}
            </p>

            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <Check size={16} className={styles.checkIcon} />
                <span>Custom Brand Logo on Chest / Sleeve / Back</span>
              </div>
              <div className={styles.specRow}>
                <Check size={16} className={styles.checkIcon} />
                <span>Available in 20+ Corporate Colorways</span>
              </div>
              <div className={styles.specRow}>
                <Check size={16} className={styles.checkIcon} />
                <span>Sizes S to 5XL with Custom Fit Options</span>
              </div>
              <div className={styles.specRow}>
                <Check size={16} className={styles.checkIcon} />
                <span>Special 10–15% BNI Member Discount</span>
              </div>
            </div>

            <button onClick={handleWhatsApp} className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>
              <MessageSquare size={17} />
              <span>Get Quotation on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
