
"use client";

import { getSpeakers } from "@/lib/data";
import { placeholderImages } from '@/lib/placeholder-images.json';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Speaker } from "@/lib/types";
import { Input } from "@/components/ui/input";

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getSpeakers().then(data => {
      setSpeakers(data);
      setFilteredSpeakers(data);
      setLoading(false);
    });
  }, []);

   useEffect(() => {
    const result = speakers.filter(speaker =>
      speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpeakers(result);
  }, [searchTerm, speakers]);

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
          Our Speakers
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Meet the industry experts and thought leaders sharing their knowledge at Nexus.
        </p>
      </div>

       <div className="mb-10 max-w-lg mx-auto">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for speakers by name or topic..." 
                    className="w-full h-12 pl-12 pr-4 rounded-full text-lg bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {loading ? <p>Loading speakers...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpeakers.map((speaker) => {
                const speakerImage = placeholderImages.find(p => p.id === speaker.avatarImageId);
                return (
                <Card key={speaker.id} className="flex flex-col text-center items-center overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-48 w-full">
                    {speakerImage && (
                        <Image
                        src={speakerImage.imageUrl}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        data-ai-hint={speakerImage.imageHint}
                        />
                    )}
                    </div>
                    <CardHeader className="pt-6">
                    <CardTitle className="text-2xl">{speaker.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{speaker.bio}</p>
                    </CardContent>
                    <CardFooter className="w-full">
                    <Button asChild className="w-full" variant="outline">
                        <Link href={`mailto:${speaker.email}`}>
                            <Mail className="mr-2 h-4 w-4"/>
                            Contact
                        </Link>
                    </Button>
                    </CardFooter>
                </Card>
                );
            })}
            </div>
        )}
    </div>
  );
}
