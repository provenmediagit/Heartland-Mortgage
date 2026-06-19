import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What credit score do I need to buy a home?",
      answer: "While conventional loans typically require a score of 620 or higher, FHA loans can accept scores as low as 580 (or 500 with a larger down payment). Don't disqualify yourself before checking; let's review your credit together to see what options you have."
    },
    {
      question: "Do I really need a 20% down payment?",
      answer: "No! This is one of the most common myths. Many first-time homebuyer programs require as little as 3% down. FHA loans require 3.5%, and VA or USDA loans can offer 0% down options if you qualify."
    },
    {
      question: "What is the difference between pre-qualification and pre-approval?",
      answer: "A pre-qualification is an initial estimate of how much you can afford based on unverified information you provide. A pre-approval is a formal, documented commitment from a lender after running your credit and verifying your income/assets."
    },
    {
      question: "How long does it take to close on a house?",
      answer: "On average, the closing process takes between 30 and 45 days after your offer is accepted. However, because we utilize a streamlined digital platform, we often hit the shorter end of that timeline."
    },
    {
      question: "What are closing costs and how much will they be?",
      answer: (
        <div className="space-y-4">
          <p>
            Closing costs are fees associated with finalizing your loan. Set forth below is the estimated charge or range of charges for the services listed. <strong>You are not required to use Heartland Mortgage LLC as a condition of the purchase, sale, or refinance of the subject property.</strong> There are frequently other settlement service providers available with similar services. You are free to shop around to determine that you are receiving the best services and the best available rate for these services.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Loan Origination Fees:</strong> 0.5% – 2.5%</li>
            <li><strong>Underwriting / Processing Fees:</strong> $1,000 – $2,000</li>
            <li><strong>Title / Closing Services:</strong> $600 – $1,500</li>
            <li><strong>Appraisal Fees:</strong> $550 – $900</li>
            <li><strong>Credit Report Fees:</strong> $100 – $200</li>
            <li><strong>Flood Certification / Tax Service Fees:</strong> $25 – $125</li>
          </ul>
          <p className="text-sm italic">
            Interest rates and annual percentage rates (APR) are not included in the above estimates and will vary based on market conditions, loan type, borrower qualifications, lender requirements, and other factors. This company provides various mortgage loan origination activities. Actual charges may vary according to the particular lender and transaction.
          </p>
        </div>
      )
    },
    {
      question: "Can I lock in my interest rate?",
      answer: "Yes, you can lock your interest rate to protect against market fluctuations during the loan process. We track the market closely and will advise you on the best time to lock based on your closing date."
    }
  ];

  return (
    <div className="py-20 bg-card min-h-[calc(100vh-theme('spacing.20'))]">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Clear answers to common questions about the mortgage process.
          </p>
        </div>

        <div className="bg-background p-6 md:p-8 rounded-3xl shadow-sm border border-border">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-primary">
                    {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Still have questions?</p>
            <Button asChild variant="outline" size="lg" className="h-12 border-border">
                <Link to="/contact">Contact Us</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
