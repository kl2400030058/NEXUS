import type { Session, Speaker } from '@/lib/types';
import SessionCard from './session-card';

type SessionListProps = {
  sessions: (Session & { speaker: Speaker })[];
};

export default function SessionList({ sessions }: SessionListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
