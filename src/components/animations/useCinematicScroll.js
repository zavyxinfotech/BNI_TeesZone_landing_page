import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies scroll-driven 3D perspective and multi-layer parallax across
 * existing landing page sections without altering layout, content, or sticky mechanics.
 */
export function useCinematicScroll(rootRef) {
  useEffect(() => {
    const root = rootRef?.current;
    if (!root || typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    // Desktop: Cinematic 3D perspective plane + multi-layer parallax
    mm.add('(min-width: 1024px)', () => {
      const heroModels = root.querySelector('#home [class*="heroModelsWrap"]');
      const heroGrid = root.querySelector('#home [class*="heroGrid"]');
      const heroGlow = root.querySelector('#home [class*="ambientGlow"]');

      if (heroModels) {
        gsap.to(heroModels, {
          y: -75,
          scale: 1.06,
          transformPerspective: 1100,
          rotateX: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
          }
        });
      }
      if (heroGrid) {
        gsap.to(heroGrid, {
          y: -36,
          opacity: 0.72,
          transformPerspective: 1100,
          rotateX: -5,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
          }
        });
      }
      if (heroGlow) {
        gsap.to(heroGlow, {
          y: 60,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6
          }
        });
      }

      // Who We Are (#about)
      const aboutLayout = root.querySelector('#about [class*="fullWidthLayout"]');
      const aboutRight = root.querySelector('#about [class*="aboutRight"]');
      if (aboutLayout) {
        gsap.fromTo(
          aboutLayout,
          { transformPerspective: 1100, rotateX: 10, scale: 0.91, y: 40, opacity: 0.7 },
          {
            transformPerspective: 1100,
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 95%',
              end: 'top 22%',
              scrub: 0.55
            }
          }
        );
      }
      if (aboutRight) {
        gsap.fromTo(
          aboutRight,
          { y: 55, rotateY: -6, transformPerspective: 1000 },
          {
            y: -45,
            rotateY: 2,
            transformPerspective: 1000,
            ease: 'none',
            scrollTrigger: {
              trigger: '#about',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          }
        );
      }

      // What We Manufacture (#manufacturing)
      const mfgContainer = root.querySelector('#manufacturing [class*="productsContainer"]');
      const mfgHeroCol = root.querySelector('#manufacturing [class*="heroCardCol"]');
      const mfgSmallRow = root.querySelector('#manufacturing [class*="bottomCardsRow"]');
      if (mfgContainer) {
        gsap.fromTo(
          mfgContainer,
          { transformPerspective: 1100, rotateX: 10, scale: 0.91, y: 42, opacity: 0.72 },
          {
            transformPerspective: 1100,
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#manufacturing',
              start: 'top 95%',
              end: 'top 22%',
              scrub: 0.55
            }
          }
        );
      }
      if (mfgHeroCol) {
        gsap.fromTo(
          mfgHeroCol,
          { y: 48, rotateY: 5, transformPerspective: 1000 },
          {
            y: -36,
            rotateY: -2,
            transformPerspective: 1000,
            ease: 'none',
            scrollTrigger: {
              trigger: '#manufacturing',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          }
        );
      }
      if (mfgSmallRow) {
        gsap.fromTo(
          mfgSmallRow,
          { y: 36, rotateX: 8, scale: 0.94, transformPerspective: 1000 },
          {
            y: -12,
            rotateX: 0,
            scale: 1,
            transformPerspective: 1000,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: '#manufacturing',
              start: 'top 90%',
              end: 'top 25%',
              scrub: 0.55
            }
          }
        );
      }

      // Why Choose Us (#why-choose-us) decorative airplane parallax
      const whyAirplane = root.querySelector('#why-choose-us [class*="airplaneWrapper"]');
      if (whyAirplane) {
        gsap.fromTo(
          whyAirplane,
          { y: 42, x: -24 },
          {
            y: -42,
            x: 24,
            ease: 'none',
            scrollTrigger: {
              trigger: '#why-choose-us',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65
            }
          }
        );
      }

      // Client Review Gallery (#products)
      const galleryStage = root.querySelector('#products [class*="stageOuter"]');
      if (galleryStage) {
        gsap.fromTo(
          galleryStage,
          { transformPerspective: 1100, rotateX: 11, scale: 0.9, y: 40, opacity: 0.72 },
          {
            transformPerspective: 1100,
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#products',
              start: 'top 95%',
              end: 'top 25%',
              scrub: 0.55
            }
          }
        );
      }

      // BNI Benefits (#bni) visual parallax
      const bniVisual = root.querySelector('#bni [class*="visualStage"]');
      if (bniVisual) {
        gsap.fromTo(
          bniVisual,
          { y: 54, rotateX: 6, transformPerspective: 1100 },
          {
            y: -38,
            rotateX: -2,
            transformPerspective: 1100,
            ease: 'none',
            scrollTrigger: {
              trigger: '#bni',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          }
        );
      }

      // BNI Pricing Banner
      const pricingBanner = root.querySelector('[aria-label="Exclusive BNI Pricing Offer"] [class*="bannerContainer"]');
      if (pricingBanner) {
        gsap.fromTo(
          pricingBanner,
          { transformPerspective: 1100, rotateX: 12, scale: 0.9, y: 40, opacity: 0.72 },
          {
            transformPerspective: 1100,
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '[aria-label="Exclusive BNI Pricing Offer"]',
              start: 'top 95%',
              end: 'top 35%',
              scrub: 0.55
            }
          }
        );
      }

      // Trusted Corporate Partners (#trusted-corporate-partners)
      const partnersMarquee = root.querySelector('#trusted-corporate-partners [class*="desktopMarquees"]');
      if (partnersMarquee) {
        gsap.fromTo(
          partnersMarquee,
          { transformPerspective: 1100, rotateX: 9, scale: 0.92, y: 32, opacity: 0.75 },
          {
            transformPerspective: 1100,
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#trusted-corporate-partners',
              start: 'top 95%',
              end: 'top 30%',
              scrub: 0.55
            }
          }
        );
      }

      // Footer (#contact) map depth lift
      const footerMap = root.querySelector('#contact [class*="mapContainer"]');
      if (footerMap) {
        gsap.fromTo(
          footerMap,
          { transformPerspective: 1000, rotateX: 7, scale: 0.94, y: 32 },
          {
            transformPerspective: 1000,
            rotateX: 0,
            scale: 1,
            y: -10,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 96%',
              end: 'top 42%',
              scrub: 0.55
            }
          }
        );
      }
    });

    // Mobile & Tablet: Reduced 3D depth & smooth parallax
    mm.add('(max-width: 1023px)', () => {
      const mobileSections = [
        { trigger: '#about', target: '#about [class*="aboutRight"]' },
        { trigger: '#manufacturing', target: '#manufacturing [class*="heroCardCol"]' },
        { trigger: '#products', target: '#products [class*="stageOuter"]' },
        { trigger: '[aria-label="Exclusive BNI Pricing Offer"]', target: '[aria-label="Exclusive BNI Pricing Offer"] [class*="bannerContainer"]' },
        { trigger: '#trusted-corporate-partners', target: '#trusted-corporate-partners [class*="mobileMarquees"]' }
      ];

      mobileSections.forEach(({ trigger, target }) => {
        const el = root.querySelector(target);
        if (!el) return;
        gsap.fromTo(
          el,
          { transformPerspective: 900, rotateX: 4, scale: 0.95, y: 20, opacity: 0.85 },
          {
            transformPerspective: 900,
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger,
              start: 'top 94%',
              end: 'top 35%',
              scrub: 0.5
            }
          }
        );
      });
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, [rootRef]);
}
