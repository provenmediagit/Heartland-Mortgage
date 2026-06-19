import { CheckSquare, Upload, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RequiredDocs() {
  const documents = [
    {
      title: "2 Years W-2s",
      description: "Provide W-2 forms for the most recent two years."
    },
    {
      title: "Pay Stubs",
      description: "For each borrower, include all paystubs covering the most recent 30-day period."
    },
    {
      title: "Asset/Bank Statements",
      description: "Last 2 consecutive months or most recent quarterly statement, all pages even if blank. For purchase transactions, include statements for each account used for each portion of the down payment."
    },
    {
      title: "Driver's License or Passport",
      description: "Valid, unexpired government-issued identification."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-background pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/5 blur-[120px] rounded-full rotate-12" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6 pr-4 tracking-tight uppercase">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Required Documents
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Document <span className="text-primary italic">Checklist</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto md:px-0 px-4 leading-relaxed font-light">
            In order to get a specific and accurate rate for your property needs, we will need the following documents right away.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-bold mb-8">What You Need to Provide</h2>
            <div className="space-y-6">
              {documents.map((doc, index) => (
                <div key={index} className="flex gap-4 items-start p-4 rounded-2xl md:bg-transparent bg-background md:border-none border border-border">
                  <div className="mt-1 bg-background md:bg-transparent rounded-lg p-2 md:p-0 border border-border md:border-none shadow-sm md:shadow-none">
                    <CheckSquare className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{doc.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-1 text-sm md:text-base">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-bold text-xl mb-6 text-center">How to Submit Your Documents</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild size="lg" className="h-auto py-6 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all rounded-2xl">
                  <a href="https://victoryfinancialsolutions.my1003app.com/380471/register?time=1774635875585" target="_blank" rel="noopener noreferrer">
                    <Upload className="w-6 h-6 mb-1" />
                    <div className="text-center">
                      <span className="block font-bold uppercase tracking-tight text-sm">Upload to Portal</span>
                      <span className="text-xs font-normal opacity-80 mt-1 block">Secure and fast submission</span>
                    </div>
                  </a>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-border hover:bg-muted/50 rounded-2xl">
                  <a href="mailto:Cami@heartlandmortgage.net">
                    <Mail className="w-6 h-6 mb-1" />
                    <div className="text-center">
                      <span className="block font-bold uppercase tracking-tight text-sm">Email to Cami</span>
                      <span className="text-xs font-normal opacity-80 mt-1 block lowercase">Cami@heartlandmortgage.net</span>
                    </div>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
