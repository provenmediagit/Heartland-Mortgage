import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

export function ApplyNow() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Gather data from form elements
      const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
      const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const phone = (document.getElementById('phone') as HTMLInputElement).value;
      const price = (document.getElementById('price') as HTMLInputElement).value;
      const downpayment = (document.getElementById('downpayment') as HTMLInputElement).value;

      const payload = {
        source: "Heartland Mortgage Pre-Qualification",
        type: "Inquiry",
        message: `New Pre-Qual Inquiry: Estimated Price: $${price}, Down Payment: ${downpayment}%`,
        person: {
          firstName: firstName,
          lastName: lastName,
          emails: [{ value: email }],
          phones: [{ value: phone }]
        }
      };

      await fetch('/api/fub/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Pre-qualification request submitted successfully!");
    } catch(err) {
      setIsSubmitting(false);
      toast.error("There was an issue submitting your request. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="py-24 container mx-auto px-4 max-w-lg text-center">
         <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 mb-6">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
         </div>
         <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">Request Received!</h1>
         <p className="text-muted-foreground text-lg mb-8">
           Thank you for starting the process. Cami will review your information and be in touch within 1 business day to discuss your pre-qualification options.
         </p>
         <Button onClick={() => window.location.href = '/'}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="py-20 bg-card min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Get Pre-Qualified</h1>
          <p className="text-muted-foreground">Takes about 3 minutes. No impact on your credit score.</p>
        </div>

        <div className="bg-background rounded-2xl shadow-sm border border-border p-6 md:p-8">
          <div className="mb-8 flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
               />
            </div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold outline outline-4 outline-white transition-colors duration-300 ${
                  s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">What are your goals?</h2>
                <div className="space-y-2">
                  <Label htmlFor="goal">I want to...</Label>
                  <Select required>
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy">Buy a home</SelectItem>
                      <SelectItem value="refinance">Refinance my home</SelectItem>
                      <SelectItem value="cash-out">Get a cash-out refinance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select required>
                    <SelectTrigger id="timeline">
                      <SelectValue placeholder="When do you want to close?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1-3">Within 1-3 months</SelectItem>
                      <SelectItem value="3-6">Within 3-6 months</SelectItem>
                      <SelectItem value="6+">Not sure / Custom timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="veteran">Are you or your spouse a veteran?</Label>
                  <Select required>
                    <SelectTrigger id="veteran">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">Financial Overview</h2>
                <div className="space-y-2">
                  <Label htmlFor="price">Estimated Purchase Price (or Home Value)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="price" type="number" placeholder="300000" className="pl-8" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="downpayment">Estimated Down Payment</Label>
                  <div className="relative">
                    <Input id="downpayment" type="number" placeholder="20" className="pr-8" required />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credit">Estimated Credit Score</Label>
                  <Select required>
                    <SelectTrigger id="credit">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="740+">Excellent (740+)</SelectItem>
                      <SelectItem value="700-739">Good (700-739)</SelectItem>
                      <SelectItem value="660-699">Fair (660-699)</SelectItem>
                      <SelectItem value="620-659">Average (620-659)</SelectItem>
                      <SelectItem value="<620">Below 620</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right-4 fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  By submitting this form, you agree that Heartland Mortgage may contact you regarding your inquiry. This does not constitute a formal loan application or credit check.
                </p>
              </div>
            )}

            <div className="pt-6 flex justify-between mt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1 || isSubmitting}
              >
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {step < 3 ? 'Continue' : isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
