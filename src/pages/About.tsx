import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function About() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            
            <div className="order-1 md:order-1 relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-border">
                    <img 
                        src="https://images.squarespace-cdn.com/content/v1/63d2e8a7d19ab30bbf1a369b/1755908749138-ODBC8YL72OODF5BMTGO0/Erik+%281%29.png?format=300w" 
                        alt="Cami Hinz" 
                        className="object-cover w-full h-full"
                    />
                </div>
                {/* Decorative blob behind image */}
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
            </div>

            <div className="order-2 md:order-2 space-y-6">
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Meet Cami Hinz.</h1>
                    <p className="text-xl text-primary font-medium tracking-tight">Licensed Mortgage Loan Originator | Co-Founder & Chief Operating Officer, Proven Realty</p>
                </div>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                        Cami Hinz brings more than a decade of experience in real estate, finance, operations, and business development to her role as a Licensed Mortgage Loan Originator. As the Co-Founder and Chief Operating Officer of Proven Realty, she has helped build one of North Dakota's most recognized real estate companies by developing systems, leading operations, managing financial performance, and creating an exceptional client experience.
                    </p>
                    <p>
                        Before co-founding Proven Realty, Cami built an extensive background in property management and asset oversight, managing portfolios that grew to more than 577 apartment units and 157,000 square feet of commercial property. Her expertise in budgeting, financial analysis, occupancy management, and operational efficiency has provided her with a unique understanding of real estate from both the ownership and investment perspectives.
                    </p>
                    <p>
                        Prior to her real estate career, Cami served as an Operations Officer with US Bank, where she developed a strong foundation in banking, lending, financial management, and customer service. Today, she combines that financial expertise with years of real estate experience to help buyers navigate the mortgage process with confidence and clarity.
                    </p>
                    <p>
                        Known for her attention to detail, problem-solving abilities, and commitment to client success, Cami is passionate about helping individuals and families achieve their homeownership goals. Whether assisting first-time homebuyers, experienced investors, or clients refinancing their existing homes, she believes every borrower deserves personalized guidance and a lending experience built on trust, communication, and results.
                    </p>
                    <p>
                        Cami has been married to her husband, Mark, for more than 38 years. Together they have two sons, two wonderful daughters-in-law, and five grandchildren who keep life busy and rewarding outside of work.
                    </p>
                </div>
                
                <div className="pt-8 border-t border-border mt-8">
                    <div>
                        <h4 className="text-foreground font-bold text-xl">2808498</h4>
                        <p className="text-sm text-muted-foreground font-medium">NMLS ID Number</p>
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="h-12 px-8 text-base shadow-md">
                        <Link to="/book">Schedule a Call</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-12 border-border text-foreground hover:bg-muted px-8">
                        <Link to="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
