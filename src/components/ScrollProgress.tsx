import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/**
 * Thin reading-progress bar pinned to the very top of the page.
 * Uses the page scroll progress (0 → 1) to scale a primary-colored bar.
 * Honors reduced-motion by removing the easing spring (still functional).
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-primary"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
