import { Atom } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Nexus Home">
      <Atom className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground font-headline">Nexus</span>
    </Link>
  );
}
