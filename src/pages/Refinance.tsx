import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowDownRight, RefreshCw, HandCoins } from 'lucide-react';
import { Reveal, Stagger, StaggerItem, TiltCard, Magnetic } from '../lib/motion';

export function Refinance() {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="animate-hm-aurora pointer-events-none absolute -top-20 left-[-10%] h-[36rem] w-[36rem] rounded-full bg-secondary/10 blur-3xl" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <Reveal className="mb-16 max-w-3xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Refinance Your Mortgage</h1>
          <p className="text-xl text-muted-foreground">
            Lower your payment, shorten your term, or tap into your home's equity. We'll help you determine if refinancing makes financial sense right now.
          </p>
        </Reveal>

        <Stagger className="mb-16 grid gap-8 md:grid-cols-3">
            <StaggerItem>
              <TiltCard max={10} className="h-full rounded-xl">
                <Card className="border-border shadow-sm h-full transition-shadow hover:shadow-2xl">
                    <CardHeader>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                            <ArrowDownRight className="h-6 w-6 text-blue-500" />
                        </div>
                        <CardTitle>Lower Your Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">If current interest rates are lower than when you bought your home, you could save hundreds each month.</p>
                    </CardContent>
                </Card>
              </TiltCard>
            </StaggerItem>
            <StaggerItem>
              <TiltCard max={10} className="h-full rounded-xl">
                <Card className="border-border shadow-sm h-full transition-shadow hover:shadow-2xl">
                    <CardHeader>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <RefreshCw className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>Change Your Term</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Switch from a 30-year to a 15-year term to build equity faster and save on total interest, or extend your term to lower payments.</p>
                    </CardContent>
                </Card>
              </TiltCard>
            </StaggerItem>
            <StaggerItem>
              <TiltCard max={10} className="h-full rounded-xl">
                <Card className="border-border shadow-sm h-full transition-shadow hover:shadow-2xl">
                    <CardHeader>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                            <HandCoins className="h-6 w-6 text-yellow-500" />
                        </div>
                        <CardTitle>Cash-Out Refinance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Tap into your home's built-up equity to fund home improvements, consolidate debt, or pay for major expenses.</p>
                    </CardContent>
                </Card>
              </TiltCard>
            </StaggerItem>
        </Stagger>

        <Reveal>
          <TiltCard max={5} glare={false} className="rounded-3xl bg-card p-8 md:p-12 text-center max-w-4xl mx-auto border border-border">
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Does Refinancing Make Sense For You?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Generally, refinancing is a good idea if you can drop your interest rate by at least 0.5% and plan to stay in the home long enough to recoup the closing costs. Let's look at the numbers together.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Magnetic>
                    <Button asChild size="lg" className="h-12 px-8 text-base">
                        <Link to="/apply">Get Loan Estimate</Link>
                    </Button>
                  </Magnetic>
                  <Magnetic>
                    <Button asChild variant="outline" size="lg" className="h-12 border-border text-foreground hover:bg-muted px-8">
                        <Link to="/book">Schedule a Free Review</Link>
                    </Button>
                  </Magnetic>
              </div>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}
