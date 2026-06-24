import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Chatbot } from './Chatbot';
import { ScrollProgress } from './ScrollProgress';
import { Preloader } from './Preloader';
import { AnimatedBackground } from './AnimatedBackground';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-sans relative">
      <Preloader />
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />

      {/* License Number on all corners */}
      <div className="fixed top-2 left-2 z-[100] pointer-events-none opacity-40 text-[10px] font-semibold tracking-widest text-foreground mix-blend-difference hidden sm:block">NMLS# 2808498</div>
      <div className="fixed top-2 right-2 z-[100] pointer-events-none opacity-40 text-[10px] font-semibold tracking-widest text-foreground mix-blend-difference hidden sm:block">NMLS# 2808498</div>
      <div className="fixed bottom-2 left-2 z-[100] pointer-events-none opacity-40 text-[10px] font-semibold tracking-widest text-foreground mix-blend-difference hidden sm:block">NMLS# 2808498</div>
      <div className="fixed bottom-2 right-2 z-[100] pointer-events-none opacity-40 text-[10px] font-semibold tracking-widest text-foreground mix-blend-difference hidden sm:block">NMLS# 2808498</div>
      
      {/* Mobile versions - adjust slightly not to overlap too much */}
      <div className="fixed top-1 left-1 z-[100] pointer-events-none opacity-40 text-[8px] font-semibold tracking-widest text-foreground mix-blend-difference sm:hidden">NMLS# 2808498</div>
      <div className="fixed top-1 right-1 z-[100] pointer-events-none opacity-40 text-[8px] font-semibold tracking-widest text-foreground mix-blend-difference sm:hidden">NMLS# 2808498</div>
      <div className="fixed bottom-1 left-1 z-[100] pointer-events-none opacity-40 text-[8px] font-semibold tracking-widest text-foreground mix-blend-difference sm:hidden">NMLS# 2808498</div>
      <div className="fixed bottom-1 right-1 z-[100] pointer-events-none opacity-40 text-[8px] font-semibold tracking-widest text-foreground mix-blend-difference sm:hidden">NMLS# 2808498</div>
    </div>
  );
}
