import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import styles from './animations.module.css';

export default function FadeUp({
  children,
  className = '',
  delay = 0,
  blur = true,
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

  const animationClass = blur ? styles.fadeUpWithBlur : styles.fadeUp;

  return (
    <Tag
      ref={trigger === null ? ref : null}
      className={`${animationClass} ${isRevealed ? styles.revealed : ''} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </Tag>
  );
}
