
"use client";

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { getSessionById } from '@/lib/data';
import type { Session, Speaker } from '@/lib/types';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { format } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays, Clock, MapPin, Ticket, UserCheck, Loader2, CheckCircle, XCircle, Download, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SessionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user, loading: authLoading, toggleSessionBooking } = useAuth();
  const [session, setSession] = useState<(Session & { speaker: Speaker }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();
  const isBooked = user?.bookedSessions.includes(id) ?? false;

  useEffect(() => {
    if (id) {
      getSessionById(id)
        .then(data => {
          if (!data) {
            notFound();
          } else {
            setSession(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || authLoading) {
    return <SessionDetailSkeleton />;
  }

  if (!session) {
    notFound();
  }


  const handleBooking = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to book a session.",
        });
        return;
    }
    setIsBooking(true);
    try {
        await toggleSessionBooking(session.id);
        toast({
            title: isBooked ? "Booking Cancelled" : "Booking Confirmed!",
            description: isBooked ? `Your booking for "${session.title}" has been cancelled.` : `You are now booked for "${session.title}".`,
            action: isBooked ? <XCircle className="text-red-500" /> : <CheckCircle className="text-green-500" />,
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        });
    } finally {
        setIsBooking(false);
    }
  }

  const coverImage = placeholderImages.find(p => p.id === session.coverImageId);
  const speakerImage = placeholderImages.find(p => p.id === session.speaker.avatarImageId);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
        {coverImage && (
            <Image
                src={coverImage.imageUrl}
                alt={session.title}
                fill
                className="object-cover"
                data-ai-hint={coverImage.imageHint}
                priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
            <Badge variant="secondary" className="mb-2 text-sm">{session.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white font-headline tracking-tight shadow-text">{session.title}</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">About this session</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{session.longDescription}</p>
            
            {session.resources && session.resources.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Download className="h-5 w-5" />
                           Resources
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {session.resources.map((resource, index) => (
                                <li key={index}>
                                    <Button variant="link" asChild className="p-0 h-auto">
                                        <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base">
                                            <LinkIcon className="h-4 w-4" />
                                            {resource.name}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Session Details</h3>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                        <CalendarDays className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">{format(new Date(session.date), 'EEEE, MMMM d, yyyy')}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">{session.time}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">{session.venue}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold">Speaker</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            {speakerImage && <AvatarImage src={speakerImage.imageUrl} alt={session.speaker.name} data-ai-hint={speakerImage.imageHint}/>}
                            <AvatarFallback>{session.speaker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{session.speaker.name}</p>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{session.speaker.bio}</p>
                </CardContent>
            </Card>
            <Button 
                size="lg" 
                className="w-full"
                onClick={handleBooking}
                disabled={isBooking}
                variant={isBooked ? 'destructive' : 'default'}
            >
                {isBooking ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : isBooked ? (
                    <XCircle className="mr-2 h-5 w-5" />
                ) : (
                    <Ticket className="mr-2 h-5 w-5" />
                )}
                {isBooking ? (isBooked ? 'Cancelling...' : 'Booking...') : (isBooked ? 'Cancel Booking' : 'Book Now')}
            </Button>
            {user && isBooked && (
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium">
                    <UserCheck className="h-5 w-5" />
                    <span>You have a spot!</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

function SessionDetailSkeleton() {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <Skeleton className="h-64 md:h-96 w-full rounded-lg mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-4/5" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
              <CardContent className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }
