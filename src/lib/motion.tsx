import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from 'motion/react';
import { cn } from './utils';

/**
 * Bold, interactive motion primitives for Heartland Mortgage.
 *
 * Signature interaction: 3D perspective tilt with a cursor-tracking glare
 * (TiltCard) applied to cards across the whole site. Plus magnetic buttons,
 * mouse-driven parallax, and punchy scroll reveals.
 *
 * Rules:
 *  - transform/opacity only (60fps); pointer effects are mouse-only.
 *  - Everything honors prefers-reduced-motion: reduced => static, readable content.
 *  - This project ships no React type defs, so props use loose local types.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { stiffness: 200, damping: 18, mass: 0.5 };

type MotionProps = {
  children?: any;
  className?: string;
  [key: string]: any;
};

/* ------------------------------------------------------------------ */
/* Reveal — punchy pop-in (fade + rise + scale) on scroll              */
/* ------------------------------------------------------------------ */
type RevealProps = MotionProps & {
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** entrance direction */
  from?: 'up' | 'down' | 'left' | 'right';
};

export function Reveal({
  children,
  className,
  y = 48,
  delay = 0,
  duration = 0.7,
  once = true,
  from = 'up',
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset =
    from === 'up'
      ? { y }
      : from === 'down'
      ? { y: -y }
      : from === 'left'
      ? { x: y }
      : { x: -y };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.92, ...offset }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger / StaggerItem — sequenced punchy entrance                   */
/* ------------------------------------------------------------------ */
type StaggerProps = MotionProps & {
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
};

export function Stagger({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.05,
  once = true,
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once, margin: '-60px' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = MotionProps & {
  y?: number;
  duration?: number;
};

export function StaggerItem({
  children,
  className,
  y = 44,
  duration = 0.6,
  ...rest
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }
  const variants: Variants = {
    hidden: { opacity: 0, y, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — page-scroll depth drift (works on any element)          */
/* ------------------------------------------------------------------ */
type ParallaxProps = MotionProps & {
  /** drift magnitude — higher = more travel per scroll */
  speed?: number;
};

export function Parallax({ children, className, speed = 60, ...rest }: ParallaxProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (v * -speed) / 1000);
  return (
    <motion.div className={className} style={reduce ? undefined : { y }} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard — 3D perspective tilt + cursor glare + hover lift          */
/* ------------------------------------------------------------------ */
type TiltCardProps = MotionProps & {
  /** max rotation in degrees */
  max?: number;
  /** hover scale */
  scale?: number;
  /** show the cursor-tracking glare highlight */
  glare?: boolean;
};

export function TiltCard({
  children,
  className,
  max = 12,
  scale = 1.03,
  glare = true,
  ...rest
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, SPRING);
  const sry = useSpring(ry, SPRING);
  const [hover, setHover] = useState(false);

  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`;

  const move = (e: any) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      onPointerEnter={() => setHover(true)}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300',
            hover ? 'opacity-100' : 'opacity-0'
          )}
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — element is pulled toward the cursor (great on buttons)   */
/* ------------------------------------------------------------------ */
type MagneticProps = MotionProps & {
  /** 0..1 — how strongly it follows the cursor */
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.4, ...rest }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.3 });

  const move = (e: any) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    return (
      <div className={cn('inline-flex', className)} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MouseParallax — children drift with the cursor (hero depth)         */
/* ------------------------------------------------------------------ */
type MouseParallaxProps = MotionProps & {
  /** px of travel at the screen edges */
  strength?: number;
};

export function MouseParallax({ children, className, strength = 24, ...rest }: MouseParallaxProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set(((e.clientX - cx) / cx) * strength);
      y.set(((e.clientY - cy) / cy) * strength);
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [reduce, strength]);

  return (
    <motion.div className={className} style={reduce ? undefined : { x: sx, y: sy }} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter — count up to a number when scrolled into view              */
/* ------------------------------------------------------------------ */
type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className,
}: CounterProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
