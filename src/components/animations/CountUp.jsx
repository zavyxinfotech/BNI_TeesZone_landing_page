import React, { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export default function CountUp({
  end = 0,
  duration = 1500,
  suffix = '',
  prefix = '',
  trigger = true,
}) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced ? end : 0);

  useEffect(() => {
    if (prefersReduced) {
      setCount(end);
      return;
    }

    if (!trigger) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    let animFrame;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easeOutCubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [end, duration, trigger, prefersReduced]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
