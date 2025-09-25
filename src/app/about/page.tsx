
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Atom, Milestone, Users, Lightbulb, Code, Network, Award, TrendingUp, Handshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Send, MapPin } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Atom,
      title: "Our Mission",
      description: "To provide a seamless platform for discovering, booking, and participating in high-quality tech sessions and workshops."
    },
    {
      icon: Users,
      title: "Our Community",
      description: "Built for and by the Google Developer Groups community, fostering a space for learning, sharing, and growth."
    },
    {
      icon: Milestone,
      title: "Our Vision",
      description: "To be the central hub for developer events, connecting talent with opportunity and knowledge with curiosity, all over the world."
    },
    {
      icon: Lightbulb,
      title: "Fostering Innovation",
      description: "We encourage creative thinking and problem-solving through hackathons, contests, and collaborative projects."
    },
    {
      icon: Code,
      title: "Hands-On Learning",
      description: "Dive deep into the latest technologies with expert-led workshops and interactive codelabs designed to build practical skills."
    },
     {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Nexus is your partner in professional development, offering opportunities to learn new skills, network, and advance your career."
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Connect with a diverse, global community of developers, designers, and tech enthusiasts from various GDG chapters."
    },
    {
      icon: Award,
      title: "Expert Speakers",
      description: "Learn from the best. Our sessions are led by industry experts, Google Developer Experts, and passionate community leaders."
    },
    {
      icon: Handshake,
      title: "Community Driven",
      description: "Our platform is shaped by community feedback and driven by volunteers passionate about sharing knowledge."
    }
  ];

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
    {
      question: "What happens if a session is full?",
      answer: "If a session is fully booked, you may see an option to join a waitlist. If a spot opens up, you'll be notified via email. We encourage you to still check the session page closer to the date, as spots often become available."
    },
    {
      question: "How can I provide feedback on a session?",
      answer: "After a session concludes, you will receive an email with a link to a feedback form. You can also find a feedback section in your user profile for past events. Your feedback is crucial for our improvement!"
    },
    {
      question: "Are the sessions recorded?",
      answer: "It depends on the session and the speaker's preference. If a session is recorded, the video link will typically be added to the session's 'Resources' section on its detail page after the event."
    },
    {
      question: "Who can I contact for support?",
      answer: "For any issues or questions, please use the form on our 'Contact' page. Our support team will get back to you as soon as possible. For specific event-related questions, you can also reach out to your local GDG organizers."
    }
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
      
      <div className="grid md:grid-cols-3 gap-10 mb-20">
          {features.map((feature, index) => (
             <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <feature.icon className="h-10 w-10 text-primary"/>
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2">{feature.description}</p>
            </div>
          ))}
      </div>

      <div className="max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">
            Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
      
       <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Email Us</h3>
                    <p className="text-muted-foreground">For general inquiries and support.</p>
                    <a href="mailto:contact@nexus-events.com" className="text-primary font-medium hover:underline">
                        contact@nexus-events.com
                    </a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Our Location</h3>
                    <p className="text-muted-foreground">123 Tech Avenue, Silicon Valley, CA 94043</p>
                </div>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your Name" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your.email@example.com" />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="What is your message about?" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Write your message here..." rows={5} />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
