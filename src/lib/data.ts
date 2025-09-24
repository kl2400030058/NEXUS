
import type { Speaker, Session, UserProfile } from './types';

const speakers: Speaker[] = [
  {
    id: 'speaker-1',
    name: 'Dr. Evelyn Reed',
    email: 'evelyn.reed@example.com',
    bio: 'Dr. Evelyn Reed is a principal software engineer at Google, specializing in machine learning infrastructure and large-scale data processing. She is a core contributor to several open-source AI projects.',
    avatarImageId: 'speaker-1',
  },
  {
    id: 'speaker-2',
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    bio: 'Marcus Chen is a UX design lead with over 15 years of experience building intuitive and beautiful user interfaces. He is passionate about design systems and currently focuses on mobile app development.',
    avatarImageId: 'speaker-2',
  },
  {
    id: 'speaker-3',
    name: 'Jasmine Patel',
    email: 'jasmine.patel@example.com',
    bio: 'Jasmine Patel is a cloud architect and a Google Developer Expert in Cloud. She helps companies migrate to and optimize their cloud infrastructure, with a focus on serverless and containerization technologies.',
    avatarImageId: 'speaker-3',
  },
  {
    id: 'speaker-4',
    name: 'Ben Carter',
    email: 'ben.carter@example.com',
    bio: 'Ben Carter is a Flutter and Dart GDE who loves creating beautiful and performant cross-platform applications. He is a frequent speaker at tech conferences and a passionate open-source advocate.',
    avatarImageId: 'speaker-4',
  },
  {
    id: 'speaker-5',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    bio: 'Olivia Martinez is a cybersecurity expert and ethical hacker. She specializes in application security and helps developers build more secure software through training and workshops.',
    avatarImageId: 'speaker-5',
  }
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
    resources: [
        { name: 'Presentation Slides', url: '#' },
        { name: 'Gemini API Docs', url: '#' }
    ]
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
    resources: [
        { name: 'Workshop Materials (GitHub)', url: '#' },
    ]
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
    resources: [
       { name: 'Codelab Instructions', url: '#' },
       { name: 'Starter Project (GitHub)', url: '#' }
    ]
  },
   {
    id: 'session-4',
    title: 'Cross-Platform with Flutter',
    description: 'Discover how to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
    longDescription: 'This talk will introduce you to the Flutter framework, covering its core concepts, widget-based architecture, and hot-reload capabilities. See how quickly you can build a polished UI that runs on both iOS and Android.',
    speakerId: 'speaker-4',
    date: '2024-08-16',
    time: '2:00 PM - 3:00 PM',
    venue: 'Main Auditorium',
    coverImageId: 'session-5',
    category: 'Talk',
    resources: []
  },
  {
    id: 'session-5',
    title: 'Introduction to Web Security',
    description: 'A beginner-friendly workshop on common web vulnerabilities and how to prevent them.',
    longDescription: 'In this interactive workshop, you\'ll learn about common security threats like XSS, CSRF, and SQL injection. We\'ll demonstrate how these attacks work and, more importantly, how to write code that defends against them.',
    speakerId: 'speaker-5',
    date: '2024-08-17',
    time: '10:00 AM - 12:00 PM',
    venue: 'Workshop Room B',
    coverImageId: 'session-6',
    category: 'Workshop',
     resources: [
       { name: 'OWASP Top 10', url: '#' },
    ]
  },
   {
    id: 'session-6',
    title: 'Advanced Git Techniques',
    description: 'Master your version control workflow with advanced Git commands and strategies.',
    longDescription: 'Move beyond `git add`, `commit`, and `push`. This session explores powerful features like interactive rebase, submodules, reflog, and bisect. Learn how to maintain a clean and efficient repository history.',
    speakerId: 'speaker-1',
    date: '2024-08-17',
    time: '1:00 PM - 2:00 PM',
    venue: 'Room 101',
    coverImageId: 'session-7',
    category: 'Talk',
    resources: [
       { name: 'Presentation Slides', url: '#' },
    ]
  }
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
export const getSpeakers = async (): Promise<Speaker[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(speakers);
        }, 400);
    });
}


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
