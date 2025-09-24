import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Nexus Home">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-primary"
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"></path>
            <circle cx="12" cy="12" r="4"></circle>
        </svg>
      <span className="text-xl font-bold tracking-tight text-foreground font-headline">Nexus</span>
    </Link>
  );
}
