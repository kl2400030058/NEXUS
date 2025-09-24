"use client";

import { getSessions } from '@/lib/data';
import SessionList from '@/components/session/session-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Session, Speaker } from '@/lib/types';

const filterCategories = [
  "All", "Web Dev", "Gen AI", "Cloud", "Mobile", "UI/UX"
];

export default function Home() {
  const [sessions, setSessions] = useState<(Session & { speaker: Speaker })[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<(Session & { speaker: Speaker })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getSessions().then(data => {
      setSessions(data);
      setFilteredSessions(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = sessions;

    // Filter by category
    if (activeFilter !== 'All') {
      result = result.filter(session => session.tags.includes(activeFilter));
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(session =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSessions(result);
  }, [sessions, activeFilter, searchTerm]);

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md font-headline">
            Connect, Learn, and Grow with Nexus
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-neutral-200 drop-shadow-sm">
            The ultimate platform for Google Developer Group events. Discover, learn, and innovate with the best in tech.
          </p>
          <div className="mt-10 w-full max-w-4xl">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for sessions, speakers, or topics..." 
                    className="w-full h-14 pl-12 pr-4 rounded-full text-lg bg-white/90 text-black placeholder:text-muted-foreground"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
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
        {loading ? (
            <p>Loading sessions...</p>
        ) : (
            <SessionList sessions={filteredSessions} />
        )}
      </section>
    </>
  );
}
