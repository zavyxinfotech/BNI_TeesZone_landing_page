import React from 'react';
import { useInView } from './useInView';
import { useReducedMotion } from './useReducedMotion';
import WordReveal from './WordReveal';

export default function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  trigger = null
}) {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();
  const isRevealed = trigger !== null ? trigger : inView;

  if (prefersReduced || typeof children !== 'string') {
    return (
      <Tag ref={trigger === null ? ref : null} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={trigger === null ? ref : null} className={className}>
      <WordReveal
        text={children}
        delay={delay}
        stagger={stagger}
        trigger={isRevealed}
      />
    </Tag>
  );
}
