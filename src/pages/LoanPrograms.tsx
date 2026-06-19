import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export function LoanPrograms() {
  const programs = [
    {
      title: 'Conventional Loans',
      description: 'The most popular choice for homebuyers with good credit. Offers flexible terms and competitive rates.',
      idealFor: 'Buyers with strong credit and at least 3% down.',
      features: ['Lower interest rates', 'Flexible terms (15, 20, 30 years)', 'PMI can be removed later']
    },
    {
      title: 'FHA Loans',
      description: 'Government-backed loans designed to help low-to-moderate income borrowers buy a home.',
      idealFor: 'First-time buyers with lower credit scores or smaller down payments.',
      features: ['As low as 3.5% down', 'More lenient credit requirements', 'Backed by the Federal Housing Administration']
    },
    {
      title: 'VA Loans',
      description: 'Exclusive benefits for veterans, active-duty service members, and eligible surviving spouses.',
      idealFor: 'Military members seeking exceptional financing terms.',
      features: ['0% down payment required', 'No private mortgage insurance (PMI)', 'Competitive interest rates']
    },
    {
      title: 'USDA Loans',
      description: 'Zero-down financing for homes located in designated rural and suburban areas.',
      idealFor: 'Buyers looking outside major metropolitan areas.',
      features: ['100% financing available', 'Lower mortgage insurance rates', 'Income limits apply']
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 max-w-3xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Our Loan Programs</h1>
          <p className="text-xl text-muted-foreground">
            Finding the right loan is just as important as finding the right home. Explore our flexible options designed for different needs and financial situations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{program.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">Ideal For:</h4>
                  <p className="text-muted-foreground">{program.idealFor}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Key Features:</h4>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {program.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button asChild className="w-full">
                   <Link to="/apply">See if you qualify</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Not sure which program is right for you?</p>
            <Button asChild variant="outline" size="lg">
                <Link to="/book">Schedule a Free Loan Review</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
