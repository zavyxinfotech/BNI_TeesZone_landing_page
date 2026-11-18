import React from 'react';
import { useInView } from './animations/useInView';
import { useReducedMotion } from './animations/useReducedMotion';
import WordReveal from './animations/WordReveal';
import FadeUp from './animations/FadeUp';
import styles from './SectionHeading.module.css';

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  eyebrow,
  className = ''
}) {
  // Trigger on every scroll with 0.08 threshold
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: false });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={`${styles.headingGroup} ${centered ? styles.centered : ''} ${className}`}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    );
  }

  // Dynamic timing based on title word count with relaxed pace
  const wordCount = typeof title === 'string' ? title.split(' ').length : 4;
  const subtitleDelay = 0.2 + wordCount * 0.075;

  return (
    <div
      ref={ref}
      className={`${styles.headingGroup} ${centered ? styles.centered : ''} ${className}`}
    >
      {eyebrow && (
        <FadeUp trigger={inView} delay={0.06} blur={false}>
          <span className={styles.eyebrow}>{eyebrow}</span>
        </FadeUp>
      )}

      <h2 className={styles.title}>
        {typeof title === 'string' ? (
          <WordReveal
            text={title}
            trigger={inView}
            delay={eyebrow ? 0.12 : 0.06}
            stagger={0.08}
          />
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <FadeUp trigger={inView} delay={subtitleDelay} blur={true}>
          <p className={styles.subtitle}>{subtitle}</p>
        </FadeUp>
      )}
    </div>
  );
}
