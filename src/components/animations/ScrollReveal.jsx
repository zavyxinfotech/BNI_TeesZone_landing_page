import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import styles from './animations.module.css';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = 'fadeUp', // 'fadeUp' | 'fadeUpBlur' | 'scale' | 'blur'
  threshold = 0.15,
  as: Tag = 'div',
  style = {}
}) {
  const [ref, inView] = useInView({ threshold });
  const prefersReduced = useReducedMotion();
  const isRevealed = prefersReduced ? true : inView;

  if (prefersReduced) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  let animClass = styles.fadeUp;
  if (variant === 'fadeUpBlur') animClass = styles.fadeUpWithBlur;
  else if (variant === 'scale') animClass = styles.scaleReveal;
  else if (variant === 'blur') animClass = styles.blurReveal;

  return (
    <Tag
      ref={ref}
      className={`${animClass} ${isRevealed ? styles.revealed : ''} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}s`
      }}
    >
      {typeof children === 'function' ? children(isRevealed) : children}
    </Tag>
  );
}
