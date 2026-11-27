import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tag, Timer, PencilRuler, Award, Handshake } from 'lucide-react';
import styles from './BniCollaboration.module.css';

gsap.registerPlugin(ScrollTrigger);

const bniBenefits = [
  {
    id: 'member-pricing',
    title: 'Member-Only Pricing',
    description: 'Exclusive rates for BNI members',
    Icon: Tag,
    slotClass: styles.tagSlot1
  },
  {
    id: 'priority-delivery',
    title: 'Priority Delivery',
    description: 'Faster production and on-time fulfillment',
    Icon: Timer,
    slotClass: styles.tagSlot2
  },
  {
    id: 'free-customization',
    title: 'Free Customization Support',
    description: 'Design guidance, branding, and mockups',
    Icon: PencilRuler,
    slotClass: styles.tagSlot3
  },
  {
    id: 'quality-reliability',
    title: 'Quality & Reliability',
    description: 'Premium fabrics with consistent quality',
    Icon: Award,
    slotClass: styles.tagSlot4
  },
  {
    id: 'long-term-partnership',
    title: 'Long-Term Partnership Benefits',
    description: 'Dedicated support and ongoing value',
    Icon: Handshake,
    slotClass: styles.tagSlot5
  }
];

export default function BniCollaboration({ onSelectOpportunity }) {
  const sectionRef = useRef(null);
  const goldBgRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const underlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  // Mobile-only horizontal rope carousel refs
  const mobileRopeStageRef = useRef(null);
  const mobileCardRefs = useRef([]);
  const mobileOffsetRef = useRef(0);
  const mobilePausedRef = useRef(false);

  // Automatic sequential pop-up animation across the 5 key cards until user hovers or clicks (Desktop)
  useEffect(() => {
    if (isAutoPaused) return;
    const timer = setInterval(() => {
      setActiveTagIndex((prev) => (prev + 1) % bniBenefits.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [isAutoPaused]);

  // Mobile-only continuous horizontal auto-scroll along the curved burgundy rope
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ring = [...bniBenefits, ...bniBenefits];
    const total = ring.length;
    const cardWidth = 235; // +40px (~1/2 inch) wider on mobile
    const cardSpacing = 254;
    let rafId;
    let lastTime = performance.now();

    const animateMobile = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (window.innerWidth <= 767 && !mobilePausedRef.current) {
        mobileOffsetRef.current = (mobileOffsetRef.current + 48 * dt) % (bniBenefits.length * cardSpacing);
      }

      const stageW = mobileRopeStageRef.current ? mobileRopeStageRef.current.clientWidth : window.innerWidth;
      const halfW = stageW / 2;
      const totalTrackW = total * cardSpacing;

      for (let i = 0; i < total; i++) {
        const el = mobileCardRefs.current[i];
        if (!el) continue;

        let x = ((i * cardSpacing - mobileOffsetRef.current) % totalTrackW + totalTrackW) % totalTrackW;
        if (x > totalTrackW / 2) x -= totalTrackW;

        // Exact quadratic Bezier curve of rope SVG (M 0,18 Q 200,56 400,18): y = 18 + 19 * (1 - normX^2)
        // Subtract clasp offset (~22px from card top) so the golden clasp hooks directly onto the rope!
        const normX = Math.max(-1.15, Math.min(1.15, x / Math.max(halfW, 160)));
        const ropeY = 18 + 19 * (1 - normX * normX);
        const cardTopY = ropeY - 22;
        const tiltDeg = normX * -6;

        el.style.transform = `translate3d(${(x - cardWidth / 2).toFixed(1)}px, ${cardTopY.toFixed(1)}px, 0) rotate(${tiltDeg.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(animateMobile);
    };

    rafId = requestAnimationFrame(animateMobile);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Scroll-driven heading entry + left-to-right golden fill every time user scrolls to #bni
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          end: 'top 25%',
          scrub: 0.6
        }
      });

      tl.fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { y: 38, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, ease: 'power2.out', duration: 0.6 },
        0
      )
        .fromTo(
          goldBgRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power2.inOut', duration: 0.8 },
          0.18
        )
        .fromTo(
          underlineRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'power2.out', duration: 0.5 },
          0.45
        )
        .fromTo(
          subtitleRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.5 },
          0.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bni"
      ref={sectionRef}
      className={styles.bniSection}
      aria-label="Exclusive Benefits for BNI Members from Teeszone"
    >
      {/* Unified Keyring + Hand anchored flush to the right edge of desktop */}
      <div className={styles.sectionInner}>
        <div className={`container ${styles.contentContainer}`}>
          <div className={styles.textColumn}>
            <div className={styles.brandRow}>
              <picture>
                <source srcSet="/images/logos/teeszone_logo.webp" type="image/webp" />
                <img
                  src="/images/logos/teeszone_logo.png"
                  alt="TeesZone - Elevate your style with custom tees"
                  className={styles.teeszoneLogo}
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              <span className={styles.brandDivider} aria-hidden="true" />

              <picture>
                <source srcSet="/images/logos/bni_proud_member.webp" type="image/webp" />
                <img
                  src="/images/logos/bni_proud_member.png"
                  alt="Proud BNI Member"
                  className={styles.bniBadge}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            <h2 className={styles.heading}>
              <span className={styles.headingLineWrap}>
                <span ref={line1Ref} className={styles.headingLine}>
                  Exclusive Benefits for
                </span>
              </span>
              <span className={styles.headingLineWrap}>
                <span ref={line2Ref} className={`${styles.headingLine} ${styles.headingLineInline}`}>
                  <span className={styles.goldHighlight}>
                    <span ref={goldBgRef} className={styles.goldHighlightBg} aria-hidden="true" />
                    <span className={styles.goldHighlightText}>BNI Members</span>
                  </span>
                  <span className={styles.fromWord}>from</span>
                </span>
              </span>
              <span className={styles.headingLineWrap}>
                <span ref={line3Ref} className={styles.headingLine}>
                  Teeszone
                </span>
              </span>
            </h2>

            <div ref={underlineRef} className={styles.goldUnderline} aria-hidden="true" />

            <p ref={subtitleRef} className={styles.subtitle}>
              Special advantages designed exclusively for our BNI community.
            </p>
          </div>
        </div>

        {/* Right-edge Anchored Hand + Red Ring + 5 Fanned Keychain Tags */}
        <div className={styles.visualStage}>
          <div className={styles.keyringAssembly}>
            {/* Hand in Burgundy Suit holding Red Ring (flush with right edge) */}
            <div className={styles.handRingWrap} aria-hidden="true">
              <img
                src="/images/bni_hand_ring.webp"
                alt=""
                className={styles.handRingImg}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>

            {/* 5 Keychain Tags hooked directly onto the Red Ring */}
            <div className={styles.tagsFan}>
              {bniBenefits.map((item, idx) => {
                const IconComp = item.Icon;
                const isPopped = !isAutoPaused && activeTagIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => {
                      setIsAutoPaused(true);
                      setActiveTagIndex(idx);
                    }}
                    onMouseLeave={() => setIsAutoPaused(false)}
                    onClick={() => {
                      setIsAutoPaused(true);
                      setActiveTagIndex(idx);
                      onSelectOpportunity && onSelectOpportunity(item);
                    }}
                    className={`${styles.keychainTag} ${item.slotClass} ${isPopped ? styles.keychainTagPopped : ''}`}
                    aria-label={`${item.title}: ${item.description}`}
                  >
                    <img
                      src="/images/bni_keychain_tag.webp"
                      alt=""
                      aria-hidden="true"
                      className={styles.tagBgImg}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <div className={styles.tagInner}>
                      <div className={styles.tagIconWrap}>
                        <IconComp size={24} strokeWidth={2} className={styles.tagIcon} />
                      </div>
                      <h3 className={styles.tagTitle}>{item.title}</h3>
                      <p className={styles.tagDesc}>{item.description}</p>
                      <span className={styles.tagDash} aria-hidden="true" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only View: Full-Width Curved Lighter Burgundy Rope + Enlarged Horizontal Auto-Scrolling Key Cards */}
      <div
        ref={mobileRopeStageRef}
        className={styles.mobileRopeStage}
        onTouchStart={() => {
          mobilePausedRef.current = true;
        }}
        onTouchEnd={() => {
          mobilePausedRef.current = false;
        }}
      >
        <svg
          viewBox="0 0 400 70"
          preserveAspectRatio="none"
          className={styles.mobileRopeSvg}
          aria-hidden="true"
        >
          <path
            d="M 0,18 Q 200,56 400,18"
            fill="none"
            stroke="#9B2D47"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity="0.72"
          />
        </svg>

        <div className={styles.mobileRopeTrack}>
          {[...bniBenefits, ...bniBenefits].map((item, idx) => {
            const IconComp = item.Icon;
            return (
              <button
                key={`mob-${item.id}-${idx}`}
                ref={(el) => {
                  mobileCardRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => onSelectOpportunity && onSelectOpportunity(item)}
                className={styles.mobileRopeCard}
                aria-label={`${item.title}: ${item.description}`}
              >
                <img
                  src="/images/bni_keychain_tag.webp"
                  alt=""
                  aria-hidden="true"
                  className={styles.tagBgImg}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <div className={styles.mobileTagInner}>
                  <div className={styles.tagIconWrap}>
                    <IconComp size={28} strokeWidth={1.9} className={styles.tagIcon} />
                  </div>
                  <h3 className={styles.mobileTagTitle}>{item.title}</h3>
                  <p className={styles.mobileTagDesc}>{item.description}</p>
                  <span className={styles.tagDash} aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
