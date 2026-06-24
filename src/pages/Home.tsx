import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, CheckCircle2, DollarSign, Clock, ShieldCheck, Calculator, MapPin, Heart } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Reveal, Stagger, StaggerItem, MouseParallax, TiltCard, Magnetic, Counter } from '../lib/motion';
import { HeartlandLogo } from '../components/HeartlandLogo';

export function Home() {
  const navigate = useNavigate();
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);

  const handleQuickConsult = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuick(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const price = formData.get('price') as string;
      const downpayment = formData.get('downpayment') as string;

      const payload = {
        source: "Heartland Mortgage Quick Consult (Hero)",
        type: "Inquiry",
        message: `Estimated Price: $${price}, Down Payment: ${downpayment}%`,
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

      setIsSubmittingQuick(false);
      toast.success("Consultation request sent to Cami!");
      form.reset();
    } catch(err) {
      setIsSubmittingQuick(false);
      toast.error("There was an issue sending your request.");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-32">
        {/* Animated, mouse-reactive depth layers (palette-consistent) */}
        <MouseParallax strength={34} className="pointer-events-none absolute inset-0 z-0">
          <div className="animate-hm-aurora absolute -top-24 -right-16 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
          <div className="animate-hm-aurora absolute bottom-[-15%] left-[-10%] h-96 w-96 rounded-full bg-secondary/20 blur-3xl" style={{ animationDelay: '-6s' }} />
          <div className="animate-hm-float absolute top-1/3 left-1/3 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        </MouseParallax>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-8">
              <Reveal className="space-y-4">
                <HeartlandLogo variant="monogram" className="h-48 md:h-64 w-auto mb-6" />
                <div className="inline-flex items-center rounded-full border border-background/20 bg-background/5 px-3 py-1 text-[10px] tracking-[0.2em] font-bold text-primary uppercase">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  LICENSED EXPERTISE
                </div>
                <h1 className="text-5xl font-light tracking-tight text-background sm:text-6xl md:text-7xl lg:leading-[1.1] font-serif italic">
                  Simplified <span className="hm-text-shimmer not-italic font-sans font-bold">Mortgages</span> <br className="hidden md:block" />for Heartland Families.
                </h1>
                <p className="max-w-[600px] text-lg text-background/80 sm:text-lg leading-relaxed">
                  Experience a guided, tech-enabled home financing journey. Whether you're a first-time buyer or looking to refinance, Cami Hinz provides the clarity you deserve.
                </p>
              </Reveal>
              <Reveal className="flex flex-col sm:flex-row gap-4" delay={0.12}>
                <Magnetic>
                  <Button asChild size="lg" className="h-12 px-8 text-sm uppercase tracking-tighter shadow-lg font-bold">
                    <Link to="/required-docs">
                      Check Qualification <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild variant="outline" size="lg" className="h-12 px-8 text-sm uppercase tracking-tighter font-semibold border-background/20 text-background bg-transparent hover:bg-background/10">
                    <Link to="/apply">Consult With Cami</Link>
                  </Button>
                </Magnetic>
              </Reveal>
              <Reveal className="flex items-center gap-8 md:gap-12 border-t border-background/10 pt-8 mt-8" delay={0.24}>
                <div>
                  <div className="text-2xl font-light text-background">24-<Counter value={48} suffix="h" /></div>
                  <div className="text-[10px] text-primary uppercase tracking-widest mt-1">Approval Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-background underline decoration-primary underline-offset-4">$0</div>
                  <div className="text-[10px] text-primary uppercase tracking-widest mt-1">Consultation Fee</div>
                </div>
                <div>
                  <div className="text-2xl font-light text-background"><Counter value={15} suffix="+" /></div>
                  <div className="text-[10px] text-primary uppercase tracking-widest mt-1">Local Partnerships</div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.18} from="right">
              <TiltCard max={10} className="mx-auto w-full max-w-[500px] lg:max-w-none bg-background/50 border border-border lg:border-l lg:border-t-0 p-8 lg:p-12 flex flex-col justify-center rounded-3xl">
                <div className="bg-accent text-accent-foreground rounded-2xl p-6 sm:p-8 border border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <h3 className="text-sm font-semibold mb-6 tracking-wide uppercase text-accent-foreground/90">QUICK PRE-QUALIFIER</h3>
                  <form onSubmit={handleQuickConsult} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-accent-foreground/70 tracking-wider mb-1 block">First Name</label>
                        <input type="text" name="firstName" required className="w-full bg-background border border-border rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-accent-foreground/70 tracking-wider mb-1 block">Last Name</label>
                        <input type="text" name="lastName" required className="w-full bg-background border border-border rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-accent-foreground/70 tracking-wider mb-1 block">Email</label>
                        <input type="email" name="email" required className="w-full bg-background border border-border rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-accent-foreground/70 tracking-wider mb-1 block">Phone</label>
                        <input type="tel" name="phone" required className="w-full bg-background border border-border rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase text-accent-foreground/70 tracking-wider mb-1 block">Est. Price ($)</label>
                        <input type="number" name="price" placeholder="450000" className="w-full bg-background border border-border rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-accent-foreground/70 tracking-wider mb-1 block">Down Pmt (%)</label>
                        <input type="number" name="downpayment" placeholder="20" className="w-full bg-background border border-border rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
                      </div>
                    </div>
                    <div className="pt-2 flex flex-col gap-2">
                      <Button type="submit" disabled={isSubmittingQuick} className="w-full py-5 font-bold rounded-md text-xs uppercase tracking-tighter shadow-md hover:shadow-lg transition-all">
                        {isSubmittingQuick ? "Sending..." : "Consult With Cami"}
                      </Button>
                      <Button type="button" asChild variant="outline" className="w-full py-5 font-bold rounded-md text-xs uppercase tracking-tighter transition-all bg-background/50 hover:bg-background">
                        <Link to="/rates">Check Qualifications / Document Checklist</Link>
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Testimonial Mini */}
                <div className="mt-8 flex gap-4 items-center px-4 opacity-70">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full border border-border bg-card text-card-foreground flex items-center justify-center text-[10px]">+</div>
                  </div>
                  <p className="text-xs font-light text-foreground">“Cami made our home purchase effortless.” — The Jensens</p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Value Proposition / How it Works */}
      <section className="relative overflow-hidden py-24 bg-muted/50">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" /> Three simple steps
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Finance Your Home Without the Stress</h2>
            <p className="text-lg text-muted-foreground">We've removed the confusing jargon and endless paperwork. Our process is designed for clarity and speed.</p>
          </Reveal>

          {/* connecting line (desktop) */}
          <div className="relative">
            <div className="pointer-events-none absolute left-[16%] right-[16%] top-[4.5rem] hidden h-0.5 bg-gradient-to-r from-primary/30 via-accent/50 to-secondary/30 md:block" />

            <Stagger className="relative grid gap-8 md:grid-cols-3">
              {[
                { Icon: Calculator, n: '01', wrap: 'bg-primary/10', color: 'text-primary', title: '1. Pre-Qualify in Minutes', desc: 'Find out how much you can afford before you start shopping. No impact on your credit score to check.' },
                { Icon: DollarSign, n: '02', wrap: 'bg-[#5FB3D9]/10', color: 'text-[#5FB3D9]', title: '2. Choose Your Program', desc: "Review tailored loan options. We'll explain the pros and cons of each so you can make an informed decision." },
                { Icon: Clock, n: '03', wrap: 'bg-secondary/10', color: 'text-secondary', title: '3. Close with Confidence', desc: 'Track your application 24/7. We ensure a smooth, on-time closing without last-minute surprises.' },
              ].map((s) => (
                <StaggerItem key={s.n}>
                  <TiltCard max={9} className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-2xl">
                    <span className="pointer-events-none absolute -right-2 -top-3 select-none text-7xl font-black text-foreground/[0.04]">{s.n}</span>
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ring-4 ring-background transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${s.wrap}`}>
                      <s.Icon className={`h-8 w-8 ${s.color}`} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{s.desc}</p>
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="mt-12 text-center">
            <Magnetic>
              <Button asChild size="lg" className="h-12 px-8 font-bold uppercase tracking-tight">
                <Link to="/apply">Start Step One <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Meet Cami — personalized family band */}
      <section className="relative overflow-hidden py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal from="left">
              <TiltCard max={8} className="relative rounded-3xl border border-border shadow-2xl">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="/images/family-firepit.jpg"
                    alt="The Hinz family gathered around the fire pit"
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-xl">
                  <img src="/images/family-dog.jpg" alt="The family's black Lab" className="h-full w-full object-cover" loading="lazy" />
                </div>
              </TiltCard>
            </Reveal>

            <Reveal from="right" className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <MapPin className="h-3 w-3" /> Rooted in North Dakota
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                More than a lender — <span className="hm-text-shimmer">a neighbor.</span>
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                When you work with Cami Hinz, you're working with someone rooted in the same community you call home. Married to her husband Mark for more than 38 years — with two sons, two daughters-in-law, five grandkids, and one ball-obsessed black Lab — she knows exactly what the word "home" means, and she brings that same care to every family she guides.
              </p>
              <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                <Heart className="h-5 w-5 text-primary" /> Guidance built on trust, communication, and results.
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Magnetic>
                  <Button asChild size="lg" className="h-12 px-8 font-semibold">
                    <Link to="/about">Meet Cami <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild variant="outline" size="lg" className="h-12 border-border px-8 font-semibold">
                    <Link to="/book">Book a Friendly Chat</Link>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-secondary py-24 text-secondary-foreground">
        <div className="animate-hm-aurora pointer-events-none absolute -top-1/2 left-1/4 h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <Reveal>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Take the Next Step?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-secondary-foreground/80">
              Have questions? Let's talk. Or if you're ready, start your pre-qualification application right now.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Button asChild size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold">
                  <Link to="/apply">Start Pre-Qualification</Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg" className="h-12 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 px-8">
                  <Link to="/book">Consult with Cami</Link>
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
