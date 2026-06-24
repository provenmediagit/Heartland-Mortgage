import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HeartlandLogo } from './HeartlandLogo';

/**
 * Full-screen entrance splash shown once per browser session.
 * Cream background (high contrast for the deep-teal logo), the logo flips in
 * on a 3D axis and "draws" itself, then the whole splash lifts away to reveal
 * the site. Scroll is locked while it's visible. Reduced-motion: quick fade.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return !sessionStorage.getItem('hm_preloaded');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';
    const timeout = window.setTimeout(
      () => {
        setShow(false);
        try {
          sessionStorage.setItem('hm_preloaded', '1');
        } catch {
          /* ignore */
        }
      },
      reduce ? 900 : 2700
    );
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = '';
    };
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 50% 38%, #FBF9F3 0%, #F4F1EA 55%, #E7DFD0 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* soft ambient accents */}
          <div className="animate-hm-aurora pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div
            className="animate-hm-aurora pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
            style={{ animationDelay: '-7s' }}
          />

          {/* 3D stage */}
          <div style={{ perspective: '1000px' }} className="relative">
            <motion.div
              initial={reduce ? { opacity: 0 } : { rotateY: -82, opacity: 0, scale: 0.92 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: 'drop-shadow(0 20px 34px rgba(15,76,74,0.22))' }}
            >
              <HeartlandLogo variant="full" animated className="h-56 w-auto md:h-72" />
            </motion.div>
          </div>

          {/* loading shimmer bar */}
          <div className="relative mt-10 h-1 w-44 overflow-hidden rounded-full bg-[#0F4C4A]/15">
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[#C99A3B]"
              initial={{ x: '-110%' }}
              animate={reduce ? { x: '-110%' } : { x: ['-110%', '210%'] }}
              transition={{ duration: 1.15, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0F4C4A]/70"
          >
            Simplifying home financing
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
