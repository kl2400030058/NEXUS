import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center md:items-start gap-4">
                <Logo />
                 <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} Nexus. All rights reserved.
                </p>
            </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
             <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                </Link>
            </Button>
             <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
