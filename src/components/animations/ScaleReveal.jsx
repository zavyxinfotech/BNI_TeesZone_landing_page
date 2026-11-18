import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import styles from './animations.module.css';

export default function ScaleReveal({
  children,
  className = '',
  delay = 0,
  trigger = null,
  style = {},
  as: Tag = 'div'
}) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const prefersReduced = useReducedMotion();
  const isRevealed = trigger !== null ? trigger : inView;

  if (prefersReduced) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  return (
    <Tag
      ref={trigger === null ? ref : null}
      className={`${styles.scaleReveal} ${isRevealed ? styles.revealed : ''} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </Tag>
  );
}
