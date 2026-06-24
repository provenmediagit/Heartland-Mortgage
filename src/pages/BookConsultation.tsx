import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { CheckCircle2, Calendar as CalendarIcon, Clock, PhoneCall, Video } from 'lucide-react';
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "../lib/utils";
import { Reveal, TiltCard, Magnetic } from '../lib/motion';

export function BookConsultation() {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const reduce = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!date) {
        toast.error("Please select a date.");
        return;
    }

    setIsSubmitting(true);

    try {
      const val = (id: string) =>
        (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value || '';
      const firstName = val('firstName');
      const lastName = val('lastName');
      const email = val('email');
      const phone = val('phone');
      const topic = val('topic');

      const payload = {
        source: "Heartland Mortgage Consultation Booking",
        type: "Inquiry",
        message: `Consultation requested for ${format(date, "PPP")}.${topic ? ` Topic: ${topic}` : ''}`,
        person: {
          firstName: firstName,
          lastName: lastName,
          emails: [{ value: email }],
          phones: [{ value: phone }]
        }
      };

      const res = await fetch('/api/fub/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Request failed');

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Consultation booked successfully!");
    } catch (err) {
      setIsSubmitting(false);
      toast.error("There was an issue booking your consultation. Please call (701) 670-8027.");
    }
  };

  if (isSuccess) {
    return (
      <div className="py-24 container mx-auto px-4 max-w-lg text-center">
         <motion.div
            initial={reduce ? false : { scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 mb-6"
         >
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
         </motion.div>
         <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">You're Booked!</h1>
         <p className="text-muted-foreground text-lg mb-8">
           We've sent a calendar invitation and confirmation details to your email. We look forward to speaking with you.
         </p>
         <Magnetic>
           <Button onClick={() => window.location.href = '/'}>Return Home</Button>
         </Magnetic>
      </div>
    );
  }

  return (
    <div className="py-20 bg-card min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-5 gap-8 items-start">

            <Reveal from="left" className="md:col-span-2 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Book a Consultation</h1>
                    <p className="text-muted-foreground">Schedule a 1-on-1 strategy session with Cami to discuss your financing options.</p>
                </div>

                <TiltCard max={7} glare={false} className="bg-background p-6 rounded-2xl border border-border space-y-6">
                    <div className="flex items-center gap-4 border-b border-border pb-6">
                        <div className="h-16 w-16 rounded-full bg-border overflow-hidden flex-shrink-0">
                            <img src="https://images.squarespace-cdn.com/content/v1/63d2e8a7d19ab30bbf1a369b/1755908749138-ODBC8YL72OODF5BMTGO0/Erik+%281%29.png?format=300w" alt="Cami Hinz" className="object-cover w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">Cami Hinz</h3>
                            <p className="text-sm text-muted-foreground">Mortgage Loan Originator</p>
                            <p className="text-xs text-muted-foreground mt-1">NMLS# 2808498</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Clock className="h-5 w-5 text-primary" />
                            <span>15 or 30 Minute Session</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Video className="h-5 w-5 text-primary" />
                            <span>Video call or Phone call</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <PhoneCall className="h-5 w-5 text-primary" />
                            <span>No pressure, no obligation</span>
                        </div>
                    </div>
                </TiltCard>
            </Reveal>

            <Reveal from="right" className="md:col-span-3 bg-background rounded-2xl shadow-sm border border-border p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 flex flex-col">
                        <Label>Select Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                            />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time">Preferred Time</Label>
                        <Select required>
                            <SelectTrigger id="time">
                            <SelectValue placeholder="Select a time block" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meetingType">Meeting Preference</Label>
                  <Select required>
                    <SelectTrigger id="meetingType">
                      <SelectValue placeholder="How should we meet?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="video">Video Call (Zoom/Google Meet)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">What would you like to discuss? (Optional)</Label>
                  <Textarea id="topic" placeholder="e.g. I'm looking to buy my first home in the next 6 months..." />
                </div>

                <Button type="submit" className="w-full h-12 text-base mt-4" disabled={isSubmitting}>
                    {isSubmitting ? 'Booking...' : 'Confirm Consultation'}
                </Button>
            </form>
            </Reveal>
        </div>
      </div>
    </div>
  );
}
