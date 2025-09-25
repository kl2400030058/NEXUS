
"use client";

import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { subYears, addDays, format, getDay, isSameDay } from 'date-fns';
import type { Session } from '@/lib/types';
import { cn } from '@/lib/utils';

type ContributionGraphProps = {
  data: Pick<Session, 'date' | 'contributions'>[];
};

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ data }) => {
  const endDate = new Date();
  const startDate = subYears(endDate, 1);

  const contributionData = data.reduce((acc, item) => {
    const dateStr = format(new Date(item.date), 'yyyy-MM-dd');
    acc[dateStr] = (acc[dateStr] || 0) + item.contributions;
    return acc;
  }, {} as Record<string, number>);

  const weeks: { date: Date; count: number }[][] = [];
  let currentDate = startDate;
  
  // Align start date to the beginning of the week (Sunday)
  currentDate = addDays(currentDate, -getDay(currentDate));

  for (let i = 0; i < 53; i++) {
    const week: { date: Date; count: number }[] = [];
    for (let j = 0; j < 7; j++) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      week.push({
        date: new Date(currentDate),
        count: contributionData[dateStr] || 0,
      });
      currentDate = addDays(currentDate, 1);
    }
    weeks.push(week);
  }

  const getLevelColor = (count: number) => {
    if (count === 0) return 'bg-muted/50';
    if (count <= 2) return 'bg-primary/20 text-primary-foreground';
    if (count <= 4) return 'bg-primary/50 text-primary-foreground';
    if (count <= 6) return 'bg-primary/80 text-primary-foreground';
    return 'bg-primary text-primary-foreground';
  };
  
  const monthLabels = Array.from({length: 12}, (_, i) => {
      const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
      return format(monthDate, 'MMM');
  });

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <div className="grid grid-flow-col justify-start gap-[3px]">
          <div className="w-8 flex flex-col justify-around text-xs text-muted-foreground pr-2">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-flow-row gap-[3px]">
              {week.map((day, dayIndex) => {
                const isFuture = day.date > endDate;
                const isPastMonth = day.date < subYears(endDate, 1);
                
                if (isFuture || isPastMonth) {
                  return <div key={dayIndex} className="h-3.5 w-3.5 rounded-sm bg-transparent" />;
                }

                return (
                  <Tooltip key={dayIndex}>
                    <TooltipTrigger asChild>
                      <div className={cn("h-3.5 w-3.5 rounded-sm", getLevelColor(day.count))} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">
                        {day.count} contribution{day.count !== 1 ? 's' : ''} on {format(day.date, 'MMM d, yyyy')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground px-8">
            <div className="flex gap-1 items-center">
                 <span>Less</span>
                 <div className="h-3.5 w-3.5 rounded-sm bg-muted/50"></div>
                 <div className="h-3.5 w-3.5 rounded-sm bg-primary/20"></div>
                 <div className="h-3.5 w-3.5 rounded-sm bg-primary/50"></div>
                 <div className="h-3.5 w-3.5 rounded-sm bg-primary/80"></div>
                 <div className="h-3.5 w-3.5 rounded-sm bg-primary"></div>
                 <span>More</span>
            </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
