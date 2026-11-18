import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useInView(options = {}) {
  const {
    threshold = 0.08,
    triggerOnce = false, // Animate for every scroll as requested
    rootMargin = '0px 0px -25px 0px'
  } = options;

  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // Reset when scrolled out of view so it re-animates on every scroll
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, triggerOnce, rootMargin, prefersReduced]);

  return [ref, isInView];
}
