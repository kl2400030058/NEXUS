
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
    longDescription: 'This session provides a deep dive into Google\'s Gemini model, the next generation of multimodal AI. We will cover its groundbreaking architecture, which allows it to understand and operate seamlessly across text, code, images, and video. We will explore various use cases, from advanced reasoning and problem-solving to creative content generation. This is an intermediate-level talk for developers interested in implementing cutting-edge AI in their applications. Attendees will leave with a clear understanding of how to leverage Gemini for complex tasks.',
    speakerId: 'speaker-1',
    date: '2024-08-15',
    time: '10:00 AM - 11:00 AM',
    venue: 'Main Auditorium',
    coverImageId: 'session-1',
    category: 'Talk',
    resources: [
        { name: 'Presentation Slides', url: '#' },
        { name: 'Gemini API Docs', url: '#' }
    ],
    tags: ['Gen AI', 'AI/ML']
  },
  {
    id: 'session-2',
    title: 'Building a Design System',
    description: 'Learn the fundamentals of creating a scalable and maintainable design system from scratch.',
    longDescription: 'Join this hands-on workshop to learn how to build a robust and scalable design system. We will cover the entire lifecycle, from establishing design principles and creating a component library to setting up tokenization for consistent styling across platforms. We will also discuss documentation best practices and strategies for driving adoption within your organization. Participants should have a basic understanding of component-based UI development. Laptops are required for this interactive session.',
    speakerId: 'speaker-2',
    date: '2024-08-15',
    time: '1:00 PM - 3:00 PM',
    venue: 'Workshop Room A',
    coverImageId: 'session-2',
    category: 'Workshop',
    resources: [
        { name: 'Workshop Materials (GitHub)', url: '#' },
    ],
    tags: ['UI/UX', 'Web Dev']
  },
  {
    id: 'session-3',
    title: 'Firebase for Web Apps',
    description: 'A hands-on codelab to get you up and running with Firebase for your next web project.',
    longDescription: 'This codelab will guide you step-by-step through building a real-time web application using the Firebase suite. You will learn to implement secure user authentication, manage data with Firestore, and deploy your application globally with Firebase Hosting. By the end of this session, you will have a functional, cloud-powered web app. Basic knowledge of HTML, CSS, and JavaScript is recommended to get the most out of this codelab.',
    speakerId: 'speaker-3',
    date: '2024-08-16',
    time: '11:00 AM - 1:00 PM',
    venue: 'Codelab Zone',
    coverImageId: 'session-3',
    category: 'Codelab',
    resources: [
       { name: 'Codelab Instructions', url: '#' },
       { name: 'Starter Project (GitHub)', url: '#' }
    ],
    tags: ['Web Dev', 'Cloud']
  },
   {
    id: 'session-4',
    title: 'Cross-Platform with Flutter',
    description: 'Discover how to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
    longDescription: 'This talk will introduce you to the Flutter framework and its power to create high-performance applications for any screen. We will explore its core concepts, declarative UI, widget-based architecture, and the magic of stateful hot-reload for rapid development. You will see a live demonstration of building a polished user interface that runs smoothly on both iOS and Android from one codebase.',
    speakerId: 'speaker-4',
    date: '2024-08-16',
    time: '2:00 PM - 3:00 PM',
    venue: 'Main Auditorium',
    coverImageId: 'session-5',
    category: 'Talk',
    resources: [],
    tags: ['Mobile']
  },
  {
    id: 'session-5',
    title: 'Introduction to Web Security',
    description: 'A beginner-friendly workshop on common web vulnerabilities and how to prevent them.',
    longDescription: 'In this interactive and beginner-friendly workshop, you\'ll learn about the most common security threats that web applications face, including Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and SQL injection. We\'ll demonstrate how these attacks work in a safe environment and, more importantly, teach you the best practices and coding techniques to defend against them. No prior security experience is needed.',
    speakerId: 'speaker-5',
    date: '2024-08-17',
    time: '10:00 AM - 12:00 PM',
    venue: 'Workshop Room B',
    coverImageId: 'session-6',
    category: 'Workshop',
     resources: [
       { name: 'OWASP Top 10', url: '#' },
    ],
    tags: ['Web Dev', 'Security']
  },
   {
    id: 'session-6',
    title: 'Advanced Git Techniques',
    description: 'Master your version control workflow with advanced Git commands and strategies.',
    longDescription: 'Ready to move beyond `git add`, `commit`, and `push`? This session dives deep into the power of Git for professional development teams. We will explore advanced features like interactive rebase for a cleaner history, using submodules to manage complex projects, recovering lost work with the reflog, and quickly finding bugs with bisect. You\'ll leave with the skills to maintain a clean, efficient, and collaborative repository.',
    speakerId: 'speaker-1',
    date: '2024-08-17',
    time: '1:00 PM - 2:00 PM',
    venue: 'Room 101',
    coverImageId: 'session-7',
    category: 'Talk',
    resources: [
       { name: 'Presentation Slides', url: '#' },
    ],
    tags: ['Tools', 'Web Dev']
  },
  {
    id: 'session-7',
    title: 'Building Scalable APIs with Node.js',
    description: 'Learn to build and deploy high-performance, scalable RESTful APIs using Node.js, Express, and best practices.',
    longDescription: 'This workshop covers the essentials of backend development with Node.js. Participants will learn how to set up an Express server, design RESTful routes, connect to a database, and implement middleware for authentication and error handling. We will also cover deployment strategies to ensure your API can handle production traffic. This is a hands-on session ideal for frontend developers looking to go full-stack or anyone new to backend development.',
    speakerId: 'speaker-3',
    date: '2024-08-18',
    time: '10:00 AM - 1:00 PM',
    venue: 'Workshop Room A',
    coverImageId: 'session-8',
    category: 'Workshop',
    resources: [
       { name: 'API Starter Kit (GitHub)', url: '#' },
    ],
    tags: ['Web Dev', 'Cloud']
  },
  {
    id: 'session-8',
    title: 'Your First Progressive Web App (PWA)',
    description: 'A hands-on codelab that teaches you how to turn your web app into an installable, offline-capable PWA.',
    longDescription: 'Progressive Web Apps (PWAs) provide a native-app-like experience on the web. In this codelab, you will learn how to implement the core components of a PWA, including the Web App Manifest to make your app installable and a Service Worker to enable offline functionality. You will take a simple web page and progressively enhance it into a reliable and engaging PWA. Basic HTML and JavaScript knowledge is required.',
    speakerId: 'speaker-2',
    date: '2024-08-18',
    time: '2:00 PM - 4:00 PM',
    venue: 'Codelab Zone',
    coverImageId: 'session-9',
    category: 'Codelab',
    resources: [
       { name: 'PWA Codelab Guide', url: '#' },
    ],
    tags: ['Web Dev', 'Mobile']
  },
  {
    id: 'session-9',
    title: 'Angular Signals Deep Dive',
    description: 'A codelab exploring the new reactive primitive in Angular for fine-grained change detection.',
    longDescription: 'This codelab is for experienced Angular developers who want to master the new Signals feature. We will dive into creating and using signals, understanding computed signals and effects, and how they integrate with the existing Angular change detection mechanism. You will refactor a traditional component to use Signals and see the performance benefits firsthand. A solid understanding of Angular is a prerequisite for this session.',
    speakerId: 'speaker-5',
    date: '2024-08-19',
    time: '11:00 AM - 1:00 PM',
    venue: 'Codelab Zone',
    coverImageId: 'session-10',
    category: 'Codelab',
    resources: [
        { name: 'Angular Signals Docs', url: '#' },
    ],
    tags: ['Web Dev', 'Angular']
  },
  {
    id: 'session-10',
    title: 'Gen AI Exchange Program',
    description: 'An immersive 48-hour hackathon to build the next generation of AI-powered applications.',
    longDescription: 'Join the Gen AI Exchange Program, a flagship event where developers, designers, and innovators come together to solve real-world problems using the latest in generative AI. Participants will get access to exclusive workshops, mentorship from Google experts, and cutting-edge tools. Compete for prizes and the opportunity to showcase your project to industry leaders.',
    speakerId: 'speaker-1',
    date: '2024-07-20',
    time: '9:00 AM July 20 - 5:00 PM July 21',
    venue: 'Innovation Hub',
    coverImageId: 'session-11',
    category: 'Hackathon',
    resources: [],
    tags: ['Gen AI', 'Hackathon']
  },
  {
    id: 'session-11',
    title: 'Cloud-Native Challenge',
    description: 'A 24-hour hackathon focused on building and deploying scalable applications on Google Cloud.',
    longDescription: 'Test your cloud skills in this fast-paced hackathon. Teams will be challenged to build a cloud-native solution for a specific problem statement, leveraging services like Cloud Run, Kubernetes Engine, and Firestore. Judges will evaluate solutions based on scalability, innovation, and effective use of cloud technologies.',
    speakerId: 'speaker-3',
    date: '2024-06-15',
    time: '10:00 AM - 10:00 AM next day',
    venue: 'Virtual Event',
    coverImageId: 'session-12',
    category: 'Hackathon',
    resources: [],
    tags: ['Cloud', 'Hackathon']
  },
  {
    id: 'session-12',
    title: 'Flutter Forward Hackathon',
    description: 'Create a beautiful and functional cross-platform app with Flutter in just one weekend.',
    longDescription: 'The Flutter Forward Hackathon challenges you to bring your creative app ideas to life. Whether it\'s a utility, a game, or a social app, build it with Flutter for a chance to win prizes and recognition. This event is open to all skill levels, with mentors available to help beginners get started.',
    speakerId: 'speaker-4',
    date: '2024-05-25',
    time: '6:00 PM May 25 - 6:00 PM May 26',
    venue: 'Community Hall',
    coverImageId: 'session-13',
    category: 'Hackathon',
    resources: [],
    tags: ['Mobile', 'Flutter', 'Hackathon']
  },
  {
    id: 'session-13',
    title: 'Secure Code Warriors',
    description: 'A competitive hackathon where teams find and fix security vulnerabilities in sample applications.',
    longDescription: 'Think like a hacker to defend against them. In Secure Code Warriors, teams will be given applications riddled with common security flaws. Your mission is to identify, exploit, and then patch these vulnerabilities. The team that secures their application most effectively wins. This is a hands-on event for developers who want to level up their security skills.',
    speakerId: 'speaker-5',
    date: '2024-04-12',
    time: 'All Day',
    venue: 'Online',
    coverImageId: 'session-14',
    category: 'Hackathon',
    resources: [],
    tags: ['Security', 'Hackathon']
  },
  {
    id: 'session-14',
    title: 'Sustainable Tech Hack',
    description: 'Develop innovative tech solutions to address environmental and sustainability challenges.',
    longDescription: 'Use your tech skills for good. The Sustainable Tech Hack is focused on creating projects that contribute to a greener planet. From waste reduction apps to energy consumption monitors, we challenge you to build solutions that make a real impact. This hackathon is a partnership with local environmental NGOs.',
    speakerId: 'speaker-2',
    date: '2024-03-22',
    time: '48 Hours',
    venue: 'University Campus',
    coverImageId: 'session-15',
    category: 'Hackathon',
    resources: [],
    tags: ['Social Good', 'Hackathon']
  },
  {
    id: 'session-15',
    title: 'AlgoRhythm Coding Contest',
    description: 'A competitive programming contest to test your algorithmic skills and problem-solving speed.',
    longDescription: 'Get ready for AlgoRhythm, our flagship coding contest. You\'ll face a series of algorithmic challenges of varying difficulty. Compete against the clock and other developers to climb the leaderboard. This is a great opportunity to practice for technical interviews and win exciting prizes. The contest will be hosted on an online judge platform.',
    speakerId: 'speaker-1',
    date: '2024-09-05',
    time: '6:00 PM - 9:00 PM',
    venue: 'Online',
    coverImageId: 'session-16',
    category: 'Contest',
    resources: [],
    tags: ['Algorithms', 'Contest']
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
        role: 'admin',
        notificationPreferences: {
            sessionReminders: true,
            communityNewsletters: false,
        }
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
