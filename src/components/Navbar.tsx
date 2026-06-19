import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Home, Phone, Info, HelpCircle } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
      <div className="container mx-auto flex h-32 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/heartland-mortgage_concept3_monogram.svg" alt="Heartland Mortgage" className="h-28 w-auto py-2" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex xl:gap-5 opacity-80">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[13px] font-medium text-foreground transition-colors hover:text-primary whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-4 ml-auto xl:ml-0 mr-4 xl:mr-0">
          <a href="tel:7016708027" className="hidden lg:flex items-center gap-2 text-[13px] font-semibold tracking-tight hover:text-primary transition-colors hover:underline mr-2 text-foreground whitespace-nowrap">
            <Phone className="h-4 w-4" />
            (701) 670-8027
          </a>
          <Button asChild variant="outline" className="hidden 2xl:flex rounded-full text-xs font-semibold uppercase tracking-tight">
             <Link to="/book">Book Consultation</Link>
          </Button>
          <Button asChild className="rounded-full text-xs font-bold uppercase tracking-tight">
            <Link to="/apply">Apply Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="xl:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="container mx-auto px-4 pb-6 xl:hidden">
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
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
      )}
    </nav>
  );
}
