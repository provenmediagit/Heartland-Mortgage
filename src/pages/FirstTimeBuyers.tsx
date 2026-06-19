import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export function FirstTimeBuyers() {
  const steps = [
    { 
      title: '1. The Consultation', 
      desc: 'We discuss your financial goals, timeline, and current situation during a quick, no-pressure conversation. This helps us determine the best loan options for your needs and answer any questions you have about buying your home.' 
    },
    { 
      title: '2. Check Your Credit', 
      desc: 'Understanding your credit score helps us determine what loan programs you qualify for. We can review this with you to make sure everything looks good before we proceed.' 
    },
    { 
      title: '3. Pre-Qualification', 
      desc: 'You provide basic financial information, and we conduct an initial review to estimate your buying power. This step provides a general idea of what you may qualify for, so you know your comfortable spending range.' 
    },
    { 
      title: '4. Pre-Approval', 
      desc: 'Ready to start shopping seriously? We collect and review your income, assets, credit, and employment documentation to issue a formal pre-approval letter. A pre-approval strengthens your offer and gives sellers confidence in your ability to obtain financing.' 
    },
    { 
      title: '5. Find Your Home', 
      desc: 'Work closely with your real estate agent to find a home within your pre-approved budget. Enjoy the house hunting process knowing your financing is in order!' 
    },
    { 
      title: '6. Application & Document Collection', 
      desc: 'Once you have an accepted offer on a house, we\'ll complete the full loan application and gather any additional documentation needed to move your loan into the active processing stage.' 
    },
    { 
      title: '7. Loan Review & Rate Options', 
      desc: 'We review available loan products, discuss interest rate options, estimated monthly payments, and closing costs, then help you select the financing solution that best aligns with your goals.' 
    },
    { 
      title: '8. Lock In Your Credit Profile', 
      desc: 'Crucial step: Do not make any large purchases, change jobs, or open new credit accounts right now! We need to ensure your financial profile remains completely stable before closing.' 
    },
    { 
      title: '9. Appraisal & Property Review', 
      desc: 'We order the property appraisal and coordinate any additional requirements to confirm the home\'s value and ensure it meets the lender\'s structural guidelines.' 
    },
    { 
      title: '10. Processing & Underwriting', 
      desc: 'Our team works behind the scenes to verify all your information, coordinate with third parties, and submit your file for official underwriting approval. We\'ll keep you informed and quickly address any conditions that arise.' 
    },
    { 
      title: '11. Clear to Close', 
      desc: 'The best three words in real estate! Once all underwriting conditions have been satisfied, your loan receives final approval and is cleared for closing.' 
    },
    { 
      title: '12. Closing Day', 
      desc: 'Sign your final documents, pay your closing costs, and receive the keys to your new home. Congratulations—you\'re officially a homeowner!' 
    },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
           <div className="sticky top-24 h-max">
               <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">Your Path Home</h1>
               <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                 We know the process can seem overwhelming. From understanding down payment assistance to figuring out your debt-to-income ratio, we are here to guide you every step of the way without the confusing jargon. Here is exactly what our guided process looks like.
               </p>
               <h3 className="text-2xl font-bold text-foreground mb-4">You might need less down than you think.</h3>
               <p className="text-muted-foreground mb-8">
                  A 20% down payment is a myth. Many loan programs allow for as little as 3% or even 0% down depending on the program.
               </p>
               <div className="flex gap-4">
                  <Button asChild size="lg">
                      <Link to="/apply">Start My Pre-Qualification</Link>
                  </Button>
               </div>
           </div>
           
           <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border">
               <h2 className="text-2xl font-bold text-foreground mb-8">Your Journey to Homeownership</h2>
               <div className="space-y-6 relative">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-border"></div>
                  {steps.map((step, index) => (
                      <div key={index} className="flex gap-4 relative z-10 bg-background sm:bg-transparent">
                          <div className="flex-shrink-0 bg-background border-2 border-primary rounded-full h-6 w-6 flex items-center justify-center mt-1 outline outline-4 outline-card sm:outline-background">
                              <span className="text-[10px] font-bold text-primary">{index + 1}</span>
                          </div>
                          <div>
                              <h4 className="font-semibold text-foreground text-lg">{step.title.replace(/^\d+\.\s*/, '')}</h4>
                              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>
                          </div>
                      </div>
                  ))}
               </div>
           </div>
        </div>
        
        <div className="mt-20 border-t border-border pt-16 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Want to talk it out first?</h3>
            <p className="text-muted-foreground mb-8">No pressure, no hard credit checks. Just a conversation to figure out your game plan.</p>
            <Button asChild variant="outline" size="lg">
                <Link to="/book">Book a Free Consultation</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
