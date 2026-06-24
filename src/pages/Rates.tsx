import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Reveal, Stagger, StaggerItem, TiltCard, Magnetic } from "@/lib/motion";

export function Rates() {
  const determinants = [
    {
      title: "FICO / Credit Score",
      description: "Your credit score is a primary factor. Higher scores generally qualify for lower interest rates as they indicate lower risk to the lender."
    },
    {
      title: "Loan to Value (LTV)",
      description: "This is the ratio of your loan amount to the home's value. A higher down payment results in a lower LTV, which can improve your rate."
    },
    {
      title: "Single vs. Multi-Unit Property",
      description: "Rates can vary depending on whether you are purchasing a single-family home (typically lower rates) or a multi-unit property."
    },
    {
      title: "Primary vs. Investment Property",
      description: "Primary residences usually secure the most favorable rates. Investment properties and second homes often carry slightly higher rates due to increased risk."
    },
    {
      title: "County / Location",
      description: "Loan limits and pricing adjustments can vary by county. Your specific property location plays a role in the final rate calculation."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-background pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="animate-hm-aurora absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/5 blur-[120px] rounded-full rotate-12" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6 pr-4 tracking-tight uppercase">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Understanding Mortgage Rates
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              How Your <span className="hm-text-shimmer italic">Rate</span> is Determined
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto md:px-0 px-4 leading-relaxed font-light">
              Mortgage rates aren't one-size-fits-all. They are tailored to your specific financial profile based on five key pricing factors, often referred to as Loan-Level Price Adjustments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Factors Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Stagger className="grid gap-6">
            {determinants.map((factor, index) => (
              <StaggerItem key={index}>
                <TiltCard
                  max={6}
                  className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-6 items-start transition-shadow hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20 flex-col">
                    <span className="text-primary font-bold text-xl">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{factor.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{factor.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to see your specific rate?</h2>
            <p className="text-xl text-muted-foreground mb-10 font-light max-w-2xl mx-auto">
              Let's review these five factors together and find the best mortgage program for your unique situation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <Button asChild size="lg" className="h-14 px-8 text-base shadow-lg w-full sm:w-auto font-bold uppercase tracking-tight">
                  <Link to="/apply">
                    Get Pre-Qualified Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base w-full sm:w-auto font-bold uppercase tracking-tight border-border">
                  <Link to="/book">Schedule a Review</Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
