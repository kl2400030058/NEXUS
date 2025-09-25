
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Nexus Home">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-8 w-8"
        >
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: 'hsl(var(--ring))', stopOpacity:1}} />
                </linearGradient>
                 <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:0.7}} />
                    <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:0.8}} />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />

            <path d="M50 2 L93.3 26 L93.3 74 L50 98 L6.7 74 L6.7 26 Z" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            
            <path d="M50 2 L50 98 M6.7 26 L93.3 74 M6.7 74 L93.3 26" stroke="url(#grad1)" strokeWidth="1.5" />
            
            <path d="M28.35 14 L71.65 14 L93.3 26 L71.65 38 L28.35 38 L6.7 26 Z" fill="url(#grad2)" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1" />

        </svg>
      <span className="text-xl font-bold tracking-tight text-foreground font-headline">Nexus</span>
    </Link>
  );
}
