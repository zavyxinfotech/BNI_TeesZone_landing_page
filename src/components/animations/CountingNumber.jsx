import React, { useState, useEffect, useRef } from 'react';

/**
 * CountingNumber component
 * Smoothly counts from 0 up to `end` using requestAnimationFrame
 * Triggers when `trigger` becomes true (or re-triggers when trigger changes to true)
 */
export default function CountingNumber({
  end = 0,
  start = 0,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
  trigger = true,
}) {
  const [value, setValue] = useState(start);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) {
      setValue(start);
      return;
    }

    startTimeRef.current = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = start + (end - start) * easedProgress;

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [trigger, end, start, duration]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
