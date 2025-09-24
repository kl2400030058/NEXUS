import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { Button } from "../ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Logo />
          <nav className="hidden gap-6 md:flex">
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/dashboard">Dashboard</Link>
             </Button>
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/#sessions">Sessions</Link>
             </Button>
             <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/">Speakers</Link>
             </Button>
              <Button variant="link" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="#">About</Link>
             </Button>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
