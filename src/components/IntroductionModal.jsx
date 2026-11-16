import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import styles from './IntroductionModal.module.css';

export default function IntroductionModal({ isOpen, onClose, defaultType = 'introduction' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    requirement: 'Polo T-Shirts',
    quantity: '50-100 pcs',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello TeesZone Team!\n\nI am reaching out via your BNI Landing Page.\n*Name:* ${formData.name || 'Member'}\n*Company:* ${formData.company || 'Business'}\n*Requirement:* ${formData.requirement}\n*Quantity:* ${formData.quantity}\n*Notes:* ${formData.notes || 'Interested in special BNI pricing.'}`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp.number}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        {!isSubmitted ? (
          <div>
            <div className={styles.modalHeader}>
              <span className={styles.eyebrow}>TeesZone × BNI Tycoon Erode</span>
              <h3 className={styles.modalTitle}>
                {defaultType === 'discount'
                  ? 'Claim Your Exclusive BNI Discount'
                  : 'Request a Business Introduction'}
              </h3>
              <p className={styles.modalSubtitle}>
                Connect directly with our dedicated apparel specialist at Texvalley, Erode.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Your Name / BNI Member Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Company / Chapter</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Tech / BNI Tycoon"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Apparel Category</label>
                  <select
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className={styles.select}
                  >
                    <option value="Polo T-Shirts">Polo T-Shirts</option>
                    <option value="Round Neck T-Shirts">Round Neck T-Shirts</option>
                    <option value="Corporate Uniforms">Corporate Uniforms</option>
                    <option value="Hoodies & Sweatshirts">Hoodies &amp; Sweatshirts</option>
                    <option value="Custom Caps">Custom Caps</option>
                    <option value="Corporate Swag Box">Corporate Swag Box</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Estimated Quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className={styles.select}
                  >
                    <option value="25-50 pcs">25 – 50 pcs (Sample / Small Batch)</option>
                    <option value="50-100 pcs">50 – 100 pcs</option>
                    <option value="100-500 pcs">100 – 500 pcs (Standard Bulk)</option>
                    <option value="500+ pcs">500+ pcs (Enterprise / Annual)</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Specific Requirements / Logo Placement</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about fabric preferences (Pique, Matty, Bio-washed), color pantone, or embroidery/DTF printing requirements."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  <Send size={16} />
                  <span>Submit Introduction Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <MessageSquare size={16} color="#25D366" />
                  <span>Instant Connect via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.successState}>
            <CheckCircle size={56} color="var(--color-primary-burgundy)" />
            <h3 className={styles.successTitle}>Thank You, {formData.name}!</h3>
            <p className={styles.successDesc}>
              Your business introduction request has been received. Our dedicated apparel specialist
              from Texvalley, Erode will contact you within 2 working hours.
            </p>
            <button
              onClick={handleWhatsAppDirect}
              className="btn-primary"
              style={{ marginTop: '20px' }}
            >
              <span>Continue on WhatsApp Now</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
