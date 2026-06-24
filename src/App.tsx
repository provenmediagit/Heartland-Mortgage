import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ThemeProvider } from 'next-themes';
import { Rates } from './pages/Rates';
import { RequiredDocs } from './pages/RequiredDocs';
import { Home } from './pages/Home';
import { LoanPrograms } from './pages/LoanPrograms';
import { Refinance } from './pages/Refinance';
import { FirstTimeBuyers } from './pages/FirstTimeBuyers';
import { ApplyNow } from './pages/ApplyNow';
import { BookConsultation } from './pages/BookConsultation';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Process, Resources, Contact, AdminDashboard } from './pages/OtherPages';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/sonner';

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();

  // Start each new page at the top so transitions don't begin mid-scroll.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/rates" element={<Rates />} />
      <Route path="/required-docs" element={<RequiredDocs />} />
      <Route path="/loan-programs" element={<LoanPrograms />} />
      <Route path="/refinance" element={<Refinance />} />
      <Route path="/first-time-buyers" element={<FirstTimeBuyers />} />
      <Route path="/about" element={<About />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/apply" element={<ApplyNow />} />
      <Route path="/book" element={<BookConsultation />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );

  // With reduced motion, skip the transition entirely.
  if (reduce) return routes;

  // Enter-only transition: the new route mounts immediately on key change and
  // animates in. We intentionally avoid AnimatePresence "mode=wait" + exit, which
  // can strand the user on the old page if the exit animation can't complete
  // (e.g. a throttled/backgrounded tab where rAF is paused).
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {routes}
    </motion.div>
  );
}

export default function App() {
  return (
    // @ts-ignore - next-themes ThemeProvider typing issue with React 18
    <ThemeProvider attribute="class" defaultTheme="light">
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}
