import { motion, useReducedMotion } from 'motion/react';

/**
 * Inline, animatable Heartland Mortgage logo (official brand mark).
 *  - default (brand): deep teal #0F4C4A + gold #C99A3B — use on LIGHT/cream backgrounds.
 *  - light: white #FFFFFF + gold #E0B65A — use on DARK backgrounds so it stays visible.
 *
 * Props:
 *  - variant: "full" (badge + HEARTLAND MORTGAGE wordmark) or "monogram" (badge only)
 *  - light: render the light/white version for dark surfaces
 *  - animated: draw-in the rings/roof + fade the lettering (used by the preloader)
 *  - className: sizing (set a height; width scales with the viewBox)
 */
type Props = {
  variant?: 'full' | 'monogram';
  light?: boolean;
  animated?: boolean;
  className?: string;
};

export function HeartlandLogo({ variant = 'full', light = false, animated = false, className }: Props) {
  const reduce = useReducedMotion();
  const draw = animated && !reduce;

  const primary = light ? '#FFFFFF' : '#0F4C4A'; // rings / HM / HEARTLAND
  const accent = light ? '#5FBF8F' : '#C99A3B';  // light: green trim (pops on dark) | dark: gold

  const drawProps = (delay: number, dur = 1) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: dur, ease: 'easeInOut' as const, delay },
        }
      : {};

  const fadeProps = (delay: number) =>
    draw
      ? {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
        }
      : {};

  const badge = (
    <g transform="translate(180,110)">
      <motion.circle cx="0" cy="0" r="84" fill="none" stroke={primary} strokeWidth="6" {...drawProps(0, 1.1)} />
      <motion.circle cx="0" cy="0" r="72" fill="none" stroke={accent} strokeWidth="2" {...drawProps(0.25, 1)} />
      <motion.path
        d="M-44 -34 L0 -62 L44 -34"
        fill="none"
        stroke={accent}
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        {...drawProps(0.6, 0.7)}
      />
      <motion.text
        x="0"
        y="34"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="78"
        fontWeight="bold"
        fill={primary}
        {...fadeProps(0.9)}
      >
        HM
      </motion.text>
    </g>
  );

  if (variant === 'monogram') {
    return (
      <svg viewBox="88 18 184 184" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Heartland Mortgage">
        {badge}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Heartland Mortgage">
      {badge}
      <motion.text
        x="180"
        y="246"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="34"
        fontWeight="bold"
        letterSpacing="2"
        fill={primary}
        {...fadeProps(1.05)}
      >
        HEARTLAND
      </motion.text>
      <motion.text
        x="180"
        y="278"
        textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="11"
        fill={accent}
        {...fadeProps(1.2)}
      >
        MORTGAGE
      </motion.text>
    </svg>
  );
}
