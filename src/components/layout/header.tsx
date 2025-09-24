import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-8">
          <Logo />
          <nav className="hidden gap-4 md:flex">
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground text-sm font-medium">
                <Link href="/dashboard">Dashboard</Link>
             </Button>
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground text-sm font-medium">
                <Link href="/speakers">Speakers</Link>
             </Button>
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground text-sm font-medium">
                <Link href="/hackathons">Hackathons</Link>
             </Button>
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground text-sm font-medium">
                <Link href="/contests">Contests</Link>
             </Button>
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground text-sm font-medium">
                <Link href="/workshops">Workshops</Link>
             </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="link" asChild className="text-muted-foreground hover:text-foreground text-sm font-medium">
                      <Link href="/about">Connect</Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>About & Contact</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <UserAvatar />
          </nav>
        </div>
      </div>
    </header>
  );
}
