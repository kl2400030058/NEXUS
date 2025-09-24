import { getSpeakers } from "@/lib/data";
import { placeholderImages } from '@/lib/placeholder-images.json';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker) => {
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
                <CardDescription className="text-primary font-medium">{speaker.email}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{speaker.bio}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
