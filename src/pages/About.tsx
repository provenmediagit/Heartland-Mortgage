import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Reveal, Stagger, StaggerItem, TiltCard, Magnetic } from '../lib/motion';

export function About() {
  return (
    <div className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">

            <Reveal from="left" className="order-1 md:order-1 relative">
                <TiltCard max={12} className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-border">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/63d2e8a7d19ab30bbf1a369b/1755908749138-ODBC8YL72OODF5BMTGO0/Erik+%281%29.png?format=300w"
                        alt="Cami Hinz"
                        className="object-cover w-full h-full"
                    />
                </TiltCard>
                {/* Decorative blob behind image */}
                <div className="animate-hm-aurora absolute -top-6 -left-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                <div className="animate-hm-aurora absolute -bottom-10 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none" style={{ animationDelay: '-8s' }}></div>
            </Reveal>

            <div className="order-2 md:order-2 space-y-6">
                <Reveal className="space-y-4 mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Meet Cami Hinz.</h1>
                    <p className="text-xl text-primary font-medium tracking-tight">Licensed Mortgage Loan Originator | Co-Founder & Chief Operating Officer, Proven Realty</p>
                </Reveal>

                <Stagger className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <StaggerItem y={24}>
                        Cami Hinz brings more than a decade of experience in real estate, finance, operations, and business development to her role as a Licensed Mortgage Loan Originator. As the Co-Founder and Chief Operating Officer of Proven Realty, she has helped build one of North Dakota's most recognized real estate companies by developing systems, leading operations, managing financial performance, and creating an exceptional client experience.
                    </StaggerItem>
                    <StaggerItem y={24}>
                        Before co-founding Proven Realty, Cami built an extensive background in property management and asset oversight, managing portfolios that grew to more than 577 apartment units and 157,000 square feet of commercial property. Her expertise in budgeting, financial analysis, occupancy management, and operational efficiency has provided her with a unique understanding of real estate from both the ownership and investment perspectives.
                    </StaggerItem>
                    <StaggerItem y={24}>
                        Prior to her real estate career, Cami served as an Operations Officer with US Bank, where she developed a strong foundation in banking, lending, financial management, and customer service. Today, she combines that financial expertise with years of real estate experience to help buyers navigate the mortgage process with confidence and clarity.
                    </StaggerItem>
                    <StaggerItem y={24}>
                        Known for her attention to detail, problem-solving abilities, and commitment to client success, Cami is passionate about helping individuals and families achieve their homeownership goals. Whether assisting first-time homebuyers, experienced investors, or clients refinancing their existing homes, she believes every borrower deserves personalized guidance and a lending experience built on trust, communication, and results.
                    </StaggerItem>
                    <StaggerItem y={24}>
                        Cami has been married to her husband, Mark, for more than 38 years. Together they have two sons, two wonderful daughters-in-law, and five grandchildren who keep life busy and rewarding outside of work.
                    </StaggerItem>
                </Stagger>

                <Reveal className="pt-8 border-t border-border mt-8">
                    <div>
                        <h4 className="text-foreground font-bold text-xl">2808498</h4>
                        <p className="text-sm text-muted-foreground font-medium">NMLS ID Number</p>
                    </div>
                </Reveal>

                <Reveal className="pt-8 flex flex-col sm:flex-row gap-4">
                    <Magnetic>
                      <Button asChild size="lg" className="h-12 px-8 text-base shadow-md">
                          <Link to="/book">Schedule a Call</Link>
                      </Button>
                    </Magnetic>
                    <Magnetic>
                      <Button asChild variant="outline" size="lg" className="h-12 border-border text-foreground hover:bg-muted px-8">
                          <Link to="/contact">Get in Touch</Link>
                      </Button>
                    </Magnetic>
                </Reveal>
            </div>

        </div>

        {/* Life outside the office — family gallery */}
        <div className="mt-24">
          <Reveal className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <Heart className="h-3 w-3" /> Life outside the office
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Family is why she does this.</h2>
            <p className="text-lg text-muted-foreground">
              Married to Mark for more than 38 years — with two sons, two daughters-in-law, five grandkids, and one very good dog — meet the people who keep Cami grounded.
            </p>
          </Reveal>

          <Reveal className="columns-2 gap-4 md:gap-6 lg:columns-4 [&>*]:mb-4 md:[&>*]:mb-6">
            {[
              { src: '/images/family-barn.jpg', alt: 'The full Hinz family in front of the barn', caption: 'The whole crew' },
              { src: '/images/grandkids.jpg', alt: "Cami's five grandchildren", caption: 'Five reasons to smile' },
              { src: '/images/kids-trikes.jpg', alt: 'Two of the grandkids on vintage tricycles', caption: 'Sunday rides' },
              { src: '/images/family-dog.jpg', alt: 'The family black Lab with a tennis ball', caption: 'Chief morale officer' },
            ].map((p) => (
              <TiltCard key={p.src} max={10} className="group relative block break-inside-avoid overflow-hidden rounded-2xl border border-border shadow-lg">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3">
                  <span className="text-xs font-semibold tracking-wide text-white">{p.caption}</span>
                </div>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
