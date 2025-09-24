import SessionList from "@/components/session/session-list";
import { getSessions } from "@/lib/data";

export default async function WorkshopsPage() {
    const allSessions = await getSessions();
    const workshops = allSessions.filter(s => s.category === 'Workshop');

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
                Workshops
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Get hands-on experience and dive deep into the latest technologies with our expert-led workshops.
                </p>
            </div>
            
            {workshops.length > 0 ? (
                <SessionList sessions={workshops} />
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold mb-4">No Workshops Scheduled</h2>
                    <p className="text-muted-foreground">Please check back later for our workshop schedule.</p>
                </div>
            )}
        </div>
    );
}
