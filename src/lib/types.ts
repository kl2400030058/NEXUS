
export type Speaker = {
  id: string;
  name: string;
  bio: string;
  email: string;
  avatarImageId: string;
};

export type Session = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  speakerId: string;
  date: string;
  time: string;
  venue: string;
  coverImageId: string;
  category: 'Workshop' | 'Talk' | 'Codelab';
  resources?: { name: string; url: string }[];
};

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  chapter: string;
  bookedSessions: string[];
  avatarImageId: string;
  role: 'user' | 'admin';
  notificationPreferences: {
    sessionReminders: boolean;
    communityNewsletters: boolean;
  };
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
