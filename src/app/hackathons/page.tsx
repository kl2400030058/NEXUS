import SessionList from "@/components/session/session-list";
import { getSessions } from "@/lib/data";

export default async function HackathonsPage() {
    const allSessions = await getSessions();
    const hackathons = allSessions.filter(s => s.category === 'Hackathon');

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
                Hackathons
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Join our hackathons to build innovative solutions, collaborate with peers, and showcase your talent.
                </p>
            </div>
            
            {hackathons.length > 0 ? (
                <SessionList sessions={hackathons} />
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold mb-4">No Hackathons Scheduled</h2>
                    <p className="text-muted-foreground">Stay tuned for future hackathon announcements!</p>
                </div>
            )}
        </div>
    );
}
