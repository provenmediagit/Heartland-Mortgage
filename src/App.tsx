import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    // @ts-ignore - next-themes ThemeProvider typing issue with React 18
    <ThemeProvider attribute="class" defaultTheme="light">
      <Router>
        <Layout>
          <Routes>
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
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}
