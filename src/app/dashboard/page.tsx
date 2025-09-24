
"use client"

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getSessions } from "@/lib/data"
import type { Session, Speaker } from "@/lib/types"
import { useAuth } from "@/lib/auth"
import { Skeleton } from '@/components/ui/skeleton';
import { Presentation, Users, CalendarCheck, BarChart2, PieChart as PieChartIcon } from 'lucide-react';
import Link from 'next/link';

type ChartData = {
  name: string;
  total: number;
}

const PIE_CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];


export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [sessions, setSessions] = useState<(Session & { speaker: Speaker })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions().then(data => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  if (loading || authLoading) {
    return <DashboardSkeleton />
  }

  const totalSessions = sessions.length;
  const totalSpeakers = new Set(sessions.map(s => s.speakerId)).size;
  const userBookedSessions = user?.bookedSessions.length ?? 0;

  const sessionCategories = sessions.reduce((acc, session) => {
    acc[session.category] = (acc[session.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData: ChartData[] = Object.entries(sessionCategories).map(([name, total]) => ({
    name,
    total,
  }));
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 font-headline">Status Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Link href="/#sessions">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Presentation className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSessions}</div>
              <p className="text-xs text-muted-foreground">sessions scheduled</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/speakers">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Speakers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSpeakers}</div>
              <p className="text-xs text-muted-foreground">experts sharing knowledge</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile">
            <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Booked Sessions</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{userBookedSessions}</div>
                <p className="text-xs text-muted-foreground">your upcoming events</p>
            </CardContent>
            </Card>
        </Link>
      </div>

       <div className="grid gap-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Session Distribution (Bar)
              </CardTitle>
              <CardDescription>A breakdown of sessions by category.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                          contentStyle={{ 
                              backgroundColor: "hsl(var(--background))",
                              borderColor: "hsl(var(--border))"
                          }}
                      />
                      <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Session Distribution (Pie)
              </CardTitle>
              <CardDescription>A proportional view of session categories.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Tooltip
                            contentStyle={{ 
                                backgroundColor: "hsl(var(--background))",
                                borderColor: "hsl(var(--border))"
                            }}
                        />
                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label={(props) => `${props.name} (${props.value})`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
       </div>

    </div>
  )
}


function DashboardSkeleton() {
  return (
    <div className="container mx-auto py-12">
      <Skeleton className="h-10 w-1/3 mb-8" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/4 mb-1" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/4 mb-1" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-1/4 mb-1" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-1/4" />
            <Skeleton className="h-4 w-2/5 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <Skeleton className="h-7 w-1/4" />
            <Skeleton className="h-4 w-2/5 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


    