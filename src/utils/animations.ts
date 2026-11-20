import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Global GSAP easing curves for luxury Apple / Stripe feel
 */
export const EASINGS = {
  luxury: 'power3.out',
  smooth: 'power2.out',
  cinematic: 'power4.out',
  snappy: 'back.out(1.4)',
  expo: 'expo.out',
};

/**
 * Helper to create a GSAP context with automatic cleanup on unmount
 */
export const createAnimationContext = (
  scope: React.RefObject<HTMLElement | null> | HTMLElement,
  callback: (ctx: gsap.Context) => void
) => {
  const target = 'current' in scope ? scope.current : scope;
  if (!target) return () => {};

  const ctx = gsap.context((self) => {
    if (prefersReducedMotion()) {
      // If reduced motion is requested, make everything visible immediately without animations
      gsap.set(target.querySelectorAll('[data-animate], .animate-target'), {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        clearProps: 'all',
      });
      return;
    }
    callback(self);
  }, target);

  return () => ctx.revert();
};

/**
 * Hero Section Initial Load Animation Timeline
 */
export const animateHeroLoad = (scopeElem: HTMLElement) => {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline({
    defaults: { ease: EASINGS.luxury, duration: 0.9 },
  });

  const badge = scopeElem.querySelector('.hero-badge');
  const titleLines = scopeElem.querySelectorAll('.hero-title-line');
  const paragraph = scopeElem.querySelector('.hero-paragraph');
  const ctaButtons = scopeElem.querySelectorAll('.hero-cta');
  const portrait = scopeElem.querySelector('.hero-portrait-container');
  const disciplines = scopeElem.querySelectorAll('.hero-discipline-item');
  const scrollIndicator = scopeElem.querySelector('.hero-scroll-indicator');

  if (badge) {
    tl.fromTo(
      badge,
      { opacity: 0, y: -20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }
    );
  }

  if (titleLines.length > 0) {
    tl.fromTo(
      titleLines,
      { opacity: 0, y: 45, rotateX: 12 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.14, duration: 1.0 },
      '-=0.4'
    );
  }

  if (paragraph) {
    tl.fromTo(
      paragraph,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    );
  }

  if (ctaButtons.length > 0) {
    tl.fromTo(
      ctaButtons,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.12, ease: EASINGS.snappy, duration: 0.7 },
      '-=0.5'
    );
  }

  if (portrait) {
    tl.fromTo(
      portrait,
      { opacity: 0, scale: 0.94, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: EASINGS.expo },
      '-=0.9'
    );
  }

  if (disciplines.length > 0) {
    tl.fromTo(
      disciplines,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
      '-=0.5'
    );
  }

  if (scrollIndicator) {
    tl.fromTo(
      scrollIndicator,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    );

    // Continuous subtle breathing bounce
    gsap.to(scrollIndicator, {
      y: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      duration: 1.4,
    });
  }

  return tl;
};

/**
 * Standard Section Header Scroll Trigger Animation
 */
export const animateSectionHeader = (
  container: HTMLElement,
  badgeSelector = '.section-badge',
  titleSelector = '.section-title',
  descSelector = '.section-desc'
) => {
  if (prefersReducedMotion()) return;

  const badge = container.querySelector(badgeSelector);
  const title = container.querySelector(titleSelector);
  const desc = container.querySelector(descSelector);

  const elements = [badge, title, desc].filter(Boolean);
  if (elements.length === 0) return;

  gsap.fromTo(
    elements,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.85,
      ease: EASINGS.luxury,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Staggered Cards Reveal on Scroll
 */
export const animateStaggerCards = (
  cardsSelector: string,
  triggerElem: HTMLElement,
  staggerTime = 0.12
) => {
  if (prefersReducedMotion()) return;

  const cards = triggerElem.querySelectorAll(cardsSelector);
  if (cards.length === 0) return;

  gsap.fromTo(
    cards,
    { opacity: 0, y: 40, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: staggerTime,
      duration: 0.8,
      ease: EASINGS.luxury,
      scrollTrigger: {
        trigger: triggerElem,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
};

/**
 * Image Reveal with Cinematic Mask Wipe (Clip-Path)
 */
export const animateImageMaskReveal = (
  imageSelector: string,
  triggerElem: HTMLElement
) => {
  if (prefersReducedMotion()) return;

  const images = triggerElem.querySelectorAll(imageSelector);
  images.forEach((img) => {
    gsap.fromTo(
      img,
      {
        clipPath: 'inset(12% 0% 12% 0% round 16px)',
        scale: 1.08,
        opacity: 0.4,
      },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: EASINGS.cinematic,
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

/**
 * Scroll Progress Driver for Process Section
 */
export const animateProcessTimeline = (
  sectionElem: HTMLElement,
  lineElem: HTMLElement,
  stepsSelector: string
) => {
  if (prefersReducedMotion()) return;

  const steps = sectionElem.querySelectorAll(stepsSelector);

  // Line fill scrub linked to scroll
  if (lineElem) {
    gsap.fromTo(
      lineElem,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionElem,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      }
    );
  }

  // Steps reveal progressively
  if (steps.length > 0) {
    steps.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: step,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }
};
