import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';
import type { Session, Speaker } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { format } from 'date-fns';

type SessionCardProps = {
  session: Session & { speaker: Speaker };
};

export default function SessionCard({ session }: SessionCardProps) {
  const coverImage = placeholderImages.find(p => p.id === session.coverImageId);
  const speakerImage = placeholderImages.find(p => p.id === session.speaker.avatarImageId);
  
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/sessions/${session.id}`} className="block">
          <div className="relative h-48 w-full">
            {coverImage && (
              <Image
                src={coverImage.imageUrl}
                alt={session.title}
                fill
                className="object-cover"
                data-ai-hint={coverImage.imageHint}
              />
            )}
            <Badge className="absolute top-3 right-3" variant="secondary">{session.category}</Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 text-xl leading-snug">
          <Link href={`/sessions/${session.id}`} className="hover:text-primary transition-colors">
            {session.title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">{session.description}</p>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{format(new Date(session.date), 'MMMM d, yyyy')} at {session.time}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {speakerImage && <AvatarImage src={speakerImage.imageUrl} alt={session.speaker.name} data-ai-hint={speakerImage.imageHint} />}
              <AvatarFallback>{session.speaker.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{session.speaker.name}</span>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/sessions/${session.id}`}>
            Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
