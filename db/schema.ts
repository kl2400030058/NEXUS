import { z } from 'zod';

// Base user schema
export const UserSchema = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']).default('user'),
  status: z.enum(['active', 'blocked']).default('active'),
  gamification: z.object({
    points: z.number().default(0),
    badges: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
  }).default({ points: 0, badges: [], achievements: [] }),
});

// Event schema
export const EventSchema = z.object({
  eventId: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(), // Using string for timestamp for simplicity, can be z.date()
  venue: z.string(),
  status: z.enum(['upcoming', 'live', 'completed']),
  createdBy: z.string(), // adminId
  crew: z.array(z.string()), // array of userIds
  participants: z.record(z.object({
    status: z.enum(['approved', 'pending', 'rejected']),
    attended: z.boolean(),
  })),
  resources: z.array(z.string()), // array of resource links or names
  eventType: z.enum(['conference', 'hackathon', 'study-jam', 'meetup', 'devfest', 'contest']),
});

// Feedback schema
export const FeedbackSchema = z.object({
  feedbackId: z.string(),
  eventId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  comments: z.string().optional(),
});

// Notification schema
export const NotificationSchema = z.object({
  notificationId: z.string(),
  targetRole: z.enum(['user', 'admin', 'all']),
  message: z.string(),
  createdAt: z.string(), // Using string for timestamp
});

export type User = z.infer<typeof UserSchema>;
export type Event = z.infer<typeof EventSchema>;
export type Feedback = z.infer<typeof FeedbackSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
