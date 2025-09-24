import SessionList from "@/components/session/session-list";
import { getSessions } from "@/lib/data";

export default async function ContestsPage() {
    const allSessions = await getSessions();
    const contests = allSessions.filter(s => s.category === 'Contest');
    
    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
                Coding Contests
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Test your skills, compete with peers, and win exciting prizes in our coding challenges. Sharpen your problem-solving abilities and see how you stack up against the community.
                </p>
            </div>
            
            {contests.length > 0 ? (
                <SessionList sessions={contests} />
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold mb-4">No Contests Scheduled</h2>
                    <p className="text-muted-foreground">Check back soon for upcoming coding contests!</p>
                </div>
            )}
        </div>
    );
}
