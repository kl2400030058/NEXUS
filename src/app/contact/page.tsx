
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Send, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
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
