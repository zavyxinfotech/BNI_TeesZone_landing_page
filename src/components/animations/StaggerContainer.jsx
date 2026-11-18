import React, { createContext, useContext } from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import styles from './animations.module.css';

const StaggerContext = createContext({ isRevealed: false, baseDelay: 0, stagger: 0.08 });

export function StaggerContainer({
  children,
  className = '',
  baseDelay = 0.1,
  stagger = 0.09,
  threshold = 0.15,
  as: Tag = 'div'
}) {
  const [ref, inView] = useInView({ threshold });
  const prefersReduced = useReducedMotion();
  const isRevealed = prefersReduced ? true : inView;

  return (
    <StaggerContext.Provider value={{ isRevealed, baseDelay, stagger }}>
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    </StaggerContext.Provider>
  );
}

export function StaggerItem({
  children,
  index = 0,
  className = '',
  style = {},
  variant = 'fadeUp', // 'fadeUp' | 'scale' | 'blur'
  as: Tag = 'div'
}) {
  const { isRevealed, baseDelay, stagger } = useContext(StaggerContext);
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Tag className={className} style={style}>{children}</Tag>;
  }

  const delay = baseDelay + index * stagger;

  let animClass = styles.staggerItem;
  if (variant === 'scale') animClass = styles.scaleReveal;
  else if (variant === 'blur') animClass = styles.blurReveal;

  return (
    <Tag
      className={`${animClass} ${isRevealed ? styles.revealed : ''} ${className}`}
      style={{
        ...style,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </Tag>
  );
}
