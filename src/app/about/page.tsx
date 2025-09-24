import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Atom, Milestone, Users } from "lucide-react";

export default function AboutPage() {
  const faqs = [
    {
      question: "What is Project Nexus?",
      answer: "Project Nexus is the official platform for Google Developer Group (GDG) events. It's a central hub where you can discover upcoming sessions, book your spot, and connect with speakers and fellow developers.",
    },
    {
      question: "How do I book a session?",
      answer: "Once you've created an account and logged in, simply navigate to the session you're interested in and click the 'Book Now' button. If spots are available, your booking will be confirmed instantly.",
    },
    {
        question: "Are the sessions free?",
        answer: "Yes, all sessions and events listed on Project Nexus are free to attend for all registered members of the community.",
    },
    {
        question: "Can I cancel my booking?",
        answer: "Absolutely. You can cancel your booking from the session detail page or from your user profile. Please cancel in advance if you cannot make it to free up the spot for someone else.",
    },
     {
        question: "How can I become a speaker?",
        answer: "We are always looking for passionate speakers! Please reach out to your local GDG chapter organizers with your talk proposal. We'd love to hear from you.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
          About Project Nexus
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Connecting developers, fostering innovation, and building a stronger tech community together.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-12 mb-20 text-center">
          <div className="flex flex-col items-center">
              <Atom className="h-12 w-12 text-primary mb-4"/>
              <h3 className="text-xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground mt-2">To provide a seamless platform for discovering, booking, and participating in high-quality tech sessions and workshops.</p>
          </div>
          <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary mb-4"/>
              <h3 className="text-xl font-bold">Our Community</h3>
              <p className="text-muted-foreground mt-2">Built for and by the Google Developer Groups community, fostering a space for learning, sharing, and growth.</p>
          </div>
          <div className="flex flex-col items-center">
              <Milestone className="h-12 w-12 text-primary mb-4"/>
              <h3 className="text-xl font-bold">Our Vision</h3>
              <p className="text-muted-foreground mt-2">To be the central hub for developer events, connecting talent with opportunity and knowledge with curiosity, all over the world.</p>
          </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">
            Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
