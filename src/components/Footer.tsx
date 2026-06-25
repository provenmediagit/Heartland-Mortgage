import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Stagger, StaggerItem, Reveal } from '../lib/motion';
import { HeartlandLogo } from './HeartlandLogo';

export function Footer() {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container mx-auto px-4 md:px-6">
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StaggerItem className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <HeartlandLogo variant="full" light className="h-40 w-auto opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Guided, modern mortgage experience with real human support. Simplifying home financing.
            </p>
            <div className="text-sm font-medium text-muted-foreground">
              <p>Cami Hinz</p>
              <p>NMLS# 2808498</p>
            </div>
          </StaggerItem>

          <StaggerItem className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/loan-programs" className="hover:text-primary transition-colors">Loan Programs</Link></li>
              <li><Link to="/refinance" className="hover:text-primary transition-colors">Refinance</Link></li>
              <li><Link to="/first-time-buyers" className="hover:text-primary transition-colors">Your Path Home</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/resources" className="hover:text-primary transition-colors">Education Hub</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-primary text-muted-foreground transition-colors">Admin Login</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal & Compliance</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Heartland Mortgage is an Equal Housing Lender. As prohibited by federal law, we do not engage in business practices that discriminate on the basis of race, color, religion, national origin, sex, marital status, age (provided you have the capacity to enter into a binding contract), because all or part of your income may be derived from any public assistance program, or because you have, in good faith, exercised any right under the Consumer Credit Protection Act.
            </p>
          </StaggerItem>
        </Stagger>
        <Reveal className="mt-12 border-t border-border pt-8 text-center text-sm md:text-left">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] text-muted-foreground tracking-widest uppercase">
                <span>CAMI HINZ | LICENSED LOAN ORIGINATOR</span>
                <span>NMLS# 2808498</span>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 14h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  EQUAL HOUSING LENDER
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">Call Cami Directly</span>
                  <a href="tel:7016708027" className="text-xs text-primary font-bold tracking-tight hover:underline transition-all">
                    (701) 670-8027
                  </a>
                </div>
                <a href="tel:7016708027" className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center cursor-pointer shadow-[0_0_15px_var(--color-primary)] hover:bg-primary/20 transition-colors">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--color-primary)] animate-pulse"></div>
                </a>
              </div>
           </div>
           <div className="mt-8 text-xs text-muted-foreground opacity-50 flex justify-between items-center">
             <p>© {new Date().getFullYear()} Heartland Mortgage. All rights reserved.</p>
           </div>
        </Reveal>
      </div>
    </footer>
  );
}
