

"use client";

import { getSessions } from '@/lib/data';
import SessionList from '@/components/session/session-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Users, Code, Award, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Session, Speaker } from '@/lib/types';

const filterCategories = [
  "All", "Web Dev", "Gen AI", "Cloud", "Mobile", "UI/UX"
];

const featureHighlights = [
  {
    icon: Award,
    title: "Learn from Experts",
    description: "Our sessions are led by industry veterans, Google Developer Experts, and passionate community leaders who are masters of their craft."
  },
  {
    icon: Code,
    title: "Hands-On Learning",
    description: "Go beyond theory. Dive deep into the latest technologies with expert-led workshops and interactive codelabs designed to build practical skills."
  },
  {
    icon: Users,
    title: "Build Your Network",
    description: "Connect with a diverse, global community of developers, designers, and tech enthusiasts. Share ideas, collaborate, and grow together."
  }
];

export default function Home() {
  const [sessions, setSessions] = useState<(Session & { speaker: Speaker })[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<(Session & { speaker: Speaker })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    getSessions().then(data => {
      setSessions(data);
      setFilteredSessions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = sessions;

    if (activeFilter !== 'All') {
      result = result.filter(session => session.tags.includes(activeFilter));
    }

    setFilteredSessions(result);
  }, [sessions, activeFilter]);

  const heroImage = placeholderImages.find(p => p.id === 'session-4');

  return (
    <>
      <section className="relative w-full h-[500px] md:h-[600px] text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md font-headline">
            Connect, Learn, and Grow with Nexus
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-neutral-200 drop-shadow-sm">
            The ultimate platform for Google Developer Group events. Discover workshops, hackathons, and talks from the best in tech.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
             <Button asChild size="lg">
                <Link href="#sessions">
                    Start Exploring
                    <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
             </Button>
             <Button asChild size="lg" variant="secondary">
                <Link href="/signup">Join Now</Link>
             </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">The Ultimate Hub for Developers</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Project Nexus is more than just an event platform. It's a community-driven ecosystem designed for growth and collaboration.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {featureHighlights.map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-6 border border-transparent rounded-lg hover:bg-muted/50 transition-colors">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sessions" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Upcoming Events</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover workshops, talks, and codelabs from experts in the field.
          </p>
        </div>
         <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterCategories.map(filter => (
                <Button 
                    key={filter} 
                    variant={activeFilter === filter ? 'default' : 'secondary'}
                    onClick={() => setActiveFilter(filter)}
                    className="rounded-full"
                >
                    {filter}
                </Button>
            ))}
        </div>
        {loading ? (
            <p>Loading sessions...</p>
        ) : (
            <SessionList sessions={filteredSessions} />
        )}
      </section>
    </>
  );
}
