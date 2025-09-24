import type { Speaker, Session, UserProfile } from './types';

const speakers: Speaker[] = [
  {
    id: 'speaker-1',
    name: 'Dr. Evelyn Reed',
    bio: 'Dr. Evelyn Reed is a principal software engineer at Google, specializing in machine learning infrastructure and large-scale data processing. She is a core contributor to several open-source AI projects.',
    avatarImageId: 'speaker-1',
  },
  {
    id: 'speaker-2',
    name: 'Marcus Chen',
    bio: 'Marcus Chen is a UX design lead with over 15 years of experience building intuitive and beautiful user interfaces. He is passionate about design systems and currently focuses on mobile app development.',
    avatarImageId: 'speaker-2',
  },
  {
    id: 'speaker-3',
    name: 'Jasmine Patel',
    bio: 'Jasmine Patel is a cloud architect and a Google Developer Expert in Cloud. She helps companies migrate to and optimize their cloud infrastructure, with a focus on serverless and containerization technologies.',
    avatarImageId: 'speaker-3',
  },
];

const sessions: Session[] = [
  {
    id: 'session-1',
    title: 'Modern AI with Gemini',
    description: 'Explore the future of AI development with Google\'s Gemini model. An in-depth look at its capabilities.',
    longDescription: 'This session provides a deep dive into Google\'s Gemini model. We will cover its multi-modal capabilities, explore various use cases, and demonstrate how to integrate it into your applications. This is an intermediate-level talk for developers interested in cutting-edge AI.',
    speakerId: 'speaker-1',
    date: '2024-08-15',
    time: '10:00 AM - 11:00 AM',
    venue: 'Main Auditorium',
    coverImageId: 'session-1',
    category: 'Talk',
  },
  {
    id: 'session-2',
    title: 'Building a Design System',
    description: 'Learn the fundamentals of creating a scalable and maintainable design system from scratch.',
    longDescription: 'Join this hands-on workshop to learn how to build a robust design system. We will cover component design, tokenization, documentation, and strategies for adoption within your organization. Laptops are required for this interactive session.',
    speakerId: 'speaker-2',
    date: '2024-08-15',
    time: '1:00 PM - 3:00 PM',
    venue: 'Workshop Room A',
    coverImageId: 'session-2',
    category: 'Workshop',
  },
  {
    id: 'session-3',
    title: 'Firebase for Web Apps',
    description: 'A hands-on codelab to get you up and running with Firebase for your next web project.',
    longDescription: 'This codelab will guide you through building a real-time web application using Firebase. You will learn about Firestore, Firebase Authentication, and Hosting. Basic knowledge of HTML, CSS, and JavaScript is recommended.',
    speakerId: 'speaker-3',
    date: '2024-08-16',
    time: '11:00 AM - 1:00 PM',
    venue: 'Codelab Zone',
    coverImageId: 'session-3',
    category: 'Codelab',
  },
];

const userProfiles: UserProfile[] = [
    {
        uid: 'user-123',
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
        bio: 'Frontend developer passionate about React and building beautiful UIs.',
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Firebase'],
        chapter: 'GDG Mountain View',
        bookedSessions: ['session-1'],
        avatarImageId: 'user-avatar-1',
        role: 'admin'
    }
]

// Simulate async data fetching
export const getSessions = async (): Promise<(Session & { speaker: Speaker })[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const populatedSessions = sessions.map(session => ({
        ...session,
        speaker: speakers.find(s => s.id === session.speakerId)!,
      }));
      resolve(populatedSessions);
    }, 500);
  });
};

export const getSessionById = async (id: string): Promise<(Session & { speaker: Speaker }) | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const session = sessions.find(s => s.id === id);
        if (session) {
            const speaker = speakers.find(s => s.id === session.speakerId)!;
            resolve({ ...session, speaker });
        } else {
            resolve(undefined);
        }
      }, 300);
    });
};

export const getUserProfile = async (uid: string): Promise<UserProfile | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(userProfiles.find(p => p.uid === uid));
        }, 200);
    });
}
