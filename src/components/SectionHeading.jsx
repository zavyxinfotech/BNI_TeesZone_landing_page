import React from 'react';
import styles from './SectionHeading.module.css';

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  eyebrow,
  className = ''
}) {
  return (
    <div className={`${styles.headingGroup} ${centered ? styles.centered : ''} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
