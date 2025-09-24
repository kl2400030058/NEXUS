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
            className="h-7 w-7"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4" stroke="none"></path>
          <path d="M2 17l10 5 10-5" fill="#34A853" stroke="none"></path>
          <path d="M2 7l10 5v10L2 17V7z" fill="#FBBC05" stroke="none"></path>
           <path d="M22 7l-10 5v10l10-5V7z" fill="#EA4335" stroke="none"></path>
        </svg>
      <span className="text-xl font-bold tracking-tight text-foreground font-headline">Nexus</span>
    </Link>
  );
}
