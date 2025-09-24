import { getSessions } from '@/lib/data';
import SessionList from '@/components/session/session-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';

export default async function Home() {
  const sessions = await getSessions();
  const heroImage = placeholderImages.find(p => p.id === 'session-4');

  return (
    <>
      <section className="relative w-full h-[400px] md:h-[500px] text-white">
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
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md font-headline">
            Connect, Learn, and Grow with Nexus
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-200 drop-shadow-sm">
            Your central hub for Google Developer Group sessions. Explore upcoming events, book your spot, and connect with the community.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#sessions">Explore Sessions</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="sessions" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Upcoming Sessions</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover workshops, talks, and codelabs from experts in the field.
            </p>
        </div>
        <SessionList sessions={sessions} />
      </section>
    </>
  );
}
