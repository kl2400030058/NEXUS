"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserProfile } from './types';
import { getUserProfile } from './data';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  toggleSessionBooking: (sessionId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock a logged-in user ID
const MOCK_USER_ID = 'user-123';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is "logged in" via localStorage
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setLoading(true);
      getUserProfile(MOCK_USER_ID).then(profile => {
        if (profile) {
          setUser(profile);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    console.log("Logging in with", email, pass);
    await new Promise(res => setTimeout(res, 500));
    const profile = await getUserProfile(MOCK_USER_ID);
    if(profile) {
      setUser(profile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
    }
    setLoading(false);
  };
  
  const googleLogin = async () => {
    await login('google-user@example.com', 'password');
  }

  const signup = async (name: string, email: string, pass: string) => {
    setLoading(true);
    console.log("Signing up with", name, email, pass);
    await new Promise(res => setTimeout(res, 500));
    const profile = await getUserProfile(MOCK_USER_ID);
     if(profile) {
      setUser({...profile, name, email, role: 'user'}); // New users are always 'user'
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedIn', 'true');
      }
    }
    setLoading(false);
  }

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (user) {
        setUser(prevUser => prevUser ? { ...prevUser, ...profileData } : null);
        await new Promise(res => setTimeout(res, 300)); // Simulate API call
    }
  }

  const toggleSessionBooking = async (sessionId: string) => {
    if (user) {
        setUser(prevUser => {
            if (!prevUser) return null;
            
            const isBooking = !prevUser.bookedSessions.includes(sessionId);
            const bookedSessions = isBooking
                ? [...prevUser.bookedSessions, sessionId]
                : prevUser.bookedSessions.filter(id => id !== sessionId);

            const pointsChange = isBooking ? 10 : -10;
            const newPoints = prevUser.gamification.points + pointsChange;

            const newBadges = [...prevUser.gamification.badges];
            if(newPoints >= 1300 && !newBadges.includes("Super Fan")) {
                newBadges.push("Super Fan");
            }

            return { 
                ...prevUser, 
                bookedSessions,
                gamification: {
                    ...prevUser.gamification,
                    points: newPoints,
                    badges: newBadges
                }
            };
        });
        await new Promise(res => setTimeout(res, 300));
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, signup, logout, updateUserProfile, toggleSessionBooking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
