import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Reveal, Stagger, StaggerItem, TiltCard, Magnetic } from '../lib/motion';

export function Process() {
  const steps = [
    {
      title: "1. The Consultation",
      description: "We discuss your financial goals, timeline, and current situation during a quick, no-pressure conversation. This helps us determine the best loan options for your needs.",
    },
    {
      title: "2. Pre-Qualification",
      description: "You provide basic financial information, and we conduct an initial review to estimate your buying power and identify loan programs that may fit your situation. This step provides a general idea of what you may qualify for.",
    },
    {
      title: "3. Pre-Approval",
      description: "Ready to start shopping seriously? We collect and review your income, assets, credit, and employment documentation to issue a formal pre-approval letter. A pre-approval strengthens your offer and gives sellers confidence in your ability to obtain financing.",
    },
    {
      title: "4. Application & Document Collection",
      description: "Once you have an accepted offer, we'll complete the full loan application and gather any additional documentation needed to move your loan into processing.",
    },
    {
      title: "5. Loan Review & Rate Options",
      description: "We review available loan products, discuss interest rate options, estimated payments, and closing costs, then help you select the financing solution that best aligns with your goals.",
    },
    {
      title: "6. Appraisal & Property Review",
      description: "We order the appraisal and coordinate any additional property-related requirements to confirm the home's value and ensure it meets lender guidelines.",
    },
    {
      title: "7. Processing & Underwriting",
      description: "Our team works behind the scenes to verify information, coordinate with third parties, and submit your file for underwriting approval. We'll keep you informed throughout the process and quickly address any conditions that arise.",
    },
    {
      title: "8. Clear to Close",
      description: "Once all underwriting conditions have been satisfied, your loan receives final approval and is cleared for closing.",
    },
    {
      title: "9. Closing Day",
      description: "Sign your final documents, fund the loan, and receive the keys to your new home. Congratulations—you're officially a homeowner!",
    },
  ];

  return (
    <div className="py-20 text-center container mx-auto px-4 max-w-3xl">
      <Reveal>
        <h1 className="text-4xl font-bold mb-6">Our Mortgage Process</h1>
        <p className="text-xl text-muted-foreground mb-8">Guided, modern, and transparent.</p>
      </Reveal>
      <Stagger className="text-left space-y-4 mb-12">
        {steps.map((step, index) => (
          <StaggerItem key={index} y={28}>
            <TiltCard max={6} className="p-6 bg-card rounded-2xl border border-border transition-shadow hover:shadow-xl">
               <h3 className="font-bold text-lg mb-2">{step.title}</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal>
        <Magnetic>
          <Button asChild size="lg"><Link to="/apply">Get Started Today</Link></Button>
        </Magnetic>
      </Reveal>
    </div>
  );
}

export function Resources() {
  return (
    <div className="py-20 text-center container mx-auto px-4 max-w-2xl">
      <Reveal>
        <h1 className="text-4xl font-bold mb-6">Education Hub</h1>
        <p className="text-xl text-muted-foreground mb-8">Knowledge is power. We are compiling our best resources for you.</p>
        <div className="p-12 border-2 border-dashed border-border rounded-3xl text-muted-foreground">
           Blog and Mortgage Guides coming soon...
        </div>
      </Reveal>
    </div>
  );
}

export function Contact() {
  return (
    <div className="py-20 text-center container mx-auto px-4 max-w-2xl">
      <Reveal>
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-8">We're here to help.</p>
      </Reveal>
      <Reveal>
        <TiltCard max={7} className="bg-card p-8 rounded-3xl border border-border text-left space-y-4">
           <div>
               <h3 className="font-semibold text-foreground">Email</h3>
               <p className="text-muted-foreground">Cami@heartlandmortgage.net</p>
           </div>
           <div>
               <h3 className="font-semibold text-foreground">Phone</h3>
               <p className="text-muted-foreground">(701) 670-8027</p>
           </div>
           <div>
               <h3 className="font-semibold text-foreground">Location</h3>
               <p className="text-muted-foreground">USA</p>
           </div>
        </TiltCard>
      </Reveal>
      <Reveal className="mt-8">
         <Magnetic>
           <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/book">Schedule a Call Instead</Link></Button>
         </Magnetic>
      </Reveal>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="py-20 text-center container mx-auto px-4 max-w-lg">
      <Reveal>
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <TiltCard max={6} className="bg-card p-8 rounded-3xl border border-border text-left space-y-4">
           <p className="text-sm text-muted-foreground mb-4">Secured Area</p>
           <input type="email" placeholder="Email" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
           <input type="password" placeholder="Password" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
           <Button className="w-full mt-4">Login to Dashboard</Button>
        </TiltCard>
      </Reveal>
    </div>
  );
}
