import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import styles from './animations.module.css';

export default function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.08, // Slower, more perceptible word stagger
  trigger = null
}) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  const prefersReduced = useReducedMotion();
  const isRevealed = trigger !== null ? trigger : inView;

  if (!text) return null;

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(' ');

  return (
    <span ref={trigger === null ? ref : null} className={`${styles.wordRevealContainer} ${className}`}>
      {words.map((word, i) => {
        const wordDelay = delay + i * stagger;
        return (
          <React.Fragment key={i}>
            <span className={styles.wordWrapper}>
              <span
                className={`${styles.wordInner} ${isRevealed ? styles.revealed : ''}`}
                style={{
                  transitionDelay: `${wordDelay}s`
                }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </span>
  );
}
