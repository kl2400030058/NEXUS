"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { placeholderImages } from '@/lib/placeholder-images.json';
import { Loader2, User, KeyRound, Briefcase, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  chapter: z.string().optional(),
  skills: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, loading, logout, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      chapter: "",
      skills: "",
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
      });
    }
  }, [user, loading, router, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return;
    setIsSaving(true);
    const skillsArray = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    try {
        await updateUserProfile({ ...data, skills: skillsArray });
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
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>

        <div className="md:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
             <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <FormDescription>Separate skills with a comma.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="flex flex-wrap gap-2">
                            {form.getValues('skills')?.split(',').map(skill => skill.trim()).filter(Boolean).map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </Form>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
    return (
        <div className="container mx-auto max-w-4xl py-12">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center">
                            <Skeleton className="h-24 w-24 rounded-full mb-4" />
                            <Skeleton className="h-8 w-3/4 mb-2" />
                            <Skeleton className="h-5 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-5 w-3/4" />
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-20 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                            <Skeleton className="h-10 w-32" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
