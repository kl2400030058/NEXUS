
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getSessions } from '@/lib/data';
import type { Session, Speaker } from '@/lib/types';
import { format } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Loader2, Calendar, ArrowRight, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  chapter: z.string().optional(),
  skills: z.string().optional(),
  notificationPreferences: z.object({
    sessionReminders: z.boolean().default(false),
    communityNewsletters: z.boolean().default(false),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, loading, logout, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [bookedSessions, setBookedSessions] = useState<(Session & { speaker: Speaker })[]>([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      chapter: "",
      skills: "",
      notificationPreferences: {
        sessionReminders: false,
        communityNewsletters: false,
      }
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
    if (user) {
      form.reset({
        name: user.name,
        bio: user.bio,
        chapter: user.chapter,
        skills: user.skills.join(", "),
        notificationPreferences: user.notificationPreferences
      });
      
      setSessionsLoading(true);
      getSessions().then(allSessions => {
        const userBooked = allSessions.filter(s => user.bookedSessions.includes(s.id));
        setBookedSessions(userBooked);
        setSessionsLoading(false);
      })

    }
  }, [user, loading, router, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return;
    setIsSaving(true);
    const skillsArray = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    try {
        await updateUserProfile({ 
            ...data, 
            skills: skillsArray,
            notificationPreferences: data.notificationPreferences
        });
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved successfully.",
        });
        router.push('/dashboard');
    } catch(err) {
        toast({
            variant: "destructive",
            title: "Update failed",
            description: "Could not save your profile. Please try again.",
        });
    } finally {
        setIsSaving(false);
    }
  }

  if (loading || !user) {
    return <ProfileSkeleton />;
  }
  
  const userImage = placeholderImages.find(p => p.id === user.avatarImageId);

  return (
    <div className="container mx-auto max-w-6xl py-12">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 space-y-6">
            <Card>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                          {userImage && <AvatarImage src={userImage.imageUrl} alt={user.name} data-ai-hint={userImage.imageHint} />}
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground mt-2">{user.chapter}</p>
                  </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>My Booked Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                    {sessionsLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ) : bookedSessions.length > 0 ? (
                        <div className="space-y-4">
                            {bookedSessions.map(session => (
                                <div key={session.id} className="flex items-center justify-between">
                                    <div>
                                        <Link href={`/sessions/${session.id}`} className="font-medium hover:underline">{session.title}</Link>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {format(new Date(session.date), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/sessions/${session.id}`}><ArrowRight className="h-4 w-4" /></Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center">You haven&apos;t booked any sessions yet.</p>
                    )}
                </CardContent>
            </Card>

          </div>

          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="bio" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl><Textarea placeholder="Tell us a little about yourself" className="resize-none" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="chapter" render={({ field }) => (
                      <FormItem>
                          <FormLabel>GDG Chapter</FormLabel>
                          <FormControl><Input placeholder="e.g., GDG London" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="skills" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl><Input placeholder="React, Firebase, AI" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <div className="flex flex-wrap gap-2">
                      {form.getValues('skills')?.split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                  </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Manage how we communicate with you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="notificationPreferences.sessionReminders"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Session Reminders</FormLabel>
                                <FormDescription>
                                    Receive reminders for sessions you have booked.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="notificationPreferences.communityNewsletters"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <FormLabel className="text-base">Community Newsletters</FormLabel>
                                <FormDescription>
                                   Get updates on community news and upcoming events.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSaving} size="lg">
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save All Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ProfileSkeleton() {
    return (
        <div className="container mx-auto max-w-6xl py-12">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <Skeleton className="h-24 w-24 rounded-full mb-4" />
                            <Skeleton className="h-8 w-3/4 mb-2" />
                            <Skeleton className="h-5 w-full" />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-7 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <Skeleton className="h-10 w-full" />
                           <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-5 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-20 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-5 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <Skeleton className="h-20 w-full" />
                           <Skeleton className="h-20 w-full" />
                        </CardContent>
                    </Card>
                     <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
    )
}
