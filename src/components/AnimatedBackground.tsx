/**
 * Site-wide ambient background. Fixed behind all content (-z-10), non-interactive,
 * very low opacity so it never hurts contrast/readability. Slow drifting orbs in
 * the brand palette show through translucent sections and behind the dark body.
 * Animations are paused under prefers-reduced-motion (see index.css).
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-hm-aurora absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl" />
      <div
        className="animate-hm-aurora absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-secondary/10 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-hm-float absolute bottom-[-10%] left-1/4 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
        style={{ animationDelay: '-3s' }}
      />
    </div>
  );
}
