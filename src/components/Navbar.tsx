import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from './ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import { Magnetic } from '../lib/motion';
import { HeartlandLogo } from './HeartlandLogo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Rates', href: '/rates' },
    { name: 'Document Checklist', href: '/required-docs' },
    { name: 'Loan Programs', href: '/loan-programs' },
    { name: 'Refinance', href: '/refinance' },
    { name: 'Your Path Home', href: '/first-time-buyers' },
    { name: 'About Cami', href: '/about' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn(
        'container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300',
        scrolled ? 'h-20' : 'h-32'
      )}>
        <Link to="/" className="flex items-center gap-2">
          <HeartlandLogo
            variant="full"
            light
            className={cn('w-auto py-2 transition-all duration-300', scrolled ? 'h-16' : 'h-28')}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex xl:gap-5">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'relative text-[13px] font-medium transition-colors whitespace-nowrap py-1',
                  active ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                )}
              >
                {link.name}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex md:items-center md:gap-4 ml-auto xl:ml-0 mr-4 xl:mr-0">
          <a href="tel:7016708027" className="hidden lg:flex items-center gap-2 text-[13px] font-semibold tracking-tight hover:text-primary transition-colors hover:underline mr-2 text-foreground whitespace-nowrap">
            <Phone className="h-4 w-4" />
            (701) 670-8027
          </a>
          <Button asChild variant="outline" className="hidden 2xl:flex rounded-full text-xs font-semibold uppercase tracking-tight">
             <Link to="/book">Book Consultation</Link>
          </Button>
          <Magnetic strength={0.5}>
            <Button asChild className="rounded-full text-xs font-bold uppercase tracking-tight">
              <Link to="/apply">Apply Now</Link>
            </Button>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="xl:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden xl:hidden"
          >
            <div className="container mx-auto px-4 pb-6">
              <div className="flex flex-col space-y-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      'text-lg font-medium transition-colors',
                      location.pathname === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="my-4 h-px bg-border" />
                <Button asChild className="w-full" variant="outline" onClick={() => setIsOpen(false)}>
                  <Link to="/book">Book Consultation</Link>
                </Button>
                <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                  <Link to="/apply">Get Pre-Qualified</Link>
                </Button>

                <a href="tel:7016708027" className="w-full flex items-center justify-center gap-2 mt-4 text-primary font-bold hover:underline py-2">
                  <Phone className="h-5 w-5" />
                  (701) 670-8027
                </a>

                <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">NMLS# 2808498</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
