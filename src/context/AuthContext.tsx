import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { INITIAL_USERS } from '../data/initialData';
import confetti from 'canvas-confetti';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  register: (data: Partial<UserProfile>) => Promise<boolean>;
  logout: () => void;
  switchUserRole: (role: UserRole) => void;
  addXP: (amount: number, reason: string) => void;
  updateUser: (data: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMentor: boolean;
  isFounder: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to student Aarav Sharma so app is immediately populated and active
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ecell_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USERS[0];
      }
    }
    return INITIAL_USERS[0];
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ecell_token') || 'demo_token_ecell_2026';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ecell_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ecell_user');
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('ecell_token', data.token);
        return true;
      }
    } catch (e) {
      console.warn('API login fallback to local user lookup');
    }

    // Fallback lookup
    const found = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || INITIAL_USERS[0];
    setUser(found);
    setToken(`demo_token_${found.id}`);
    return true;
  };

  const register = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (resData.success && resData.user) {
        setUser(resData.user);
        setToken(resData.token);
        localStorage.setItem('ecell_token', resData.token);
        return true;
      }
    } catch (e) {
      console.warn('API register fallback');
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name || 'Student Innovator',
      email: data.email || 'student@college.edu',
      role: data.role || 'student',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.name || 'student')}`,
      collegeId: data.collegeId || '2026CS9999',
      branch: data.branch || 'Computer Engineering',
      year: data.year || '1st Year',
      bio: data.bio || 'Aspiring entrepreneur in campus innovation ecosystem.',
      skills: data.skills || ['Ideation', 'Tech', 'Prototyping'],
      interests: data.interests || ['Startups', 'CleanTech', 'AI'],
      lookingFor: data.lookingFor || ['Co-Founders', 'Mentorship'],
      xp: 100,
      level: 1,
      levelTitle: 'Explorer',
      badges: [
        { id: 'b-init', name: 'Ecosystem Member', description: 'Joined the E-Cell campus community', icon: '🚀', unlocked: true, earnedAt: '2026-08-27' }
      ],
      createdAt: '2026-08-27'
    };

    setUser(newUser);
    setToken(`token_${newUser.id}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ecell_token');
    localStorage.removeItem('ecell_user');
  };

  const switchUserRole = (role: UserRole) => {
    const found = INITIAL_USERS.find(u => u.role === role);
    if (found) {
      setUser(found);
      setToken(`demo_token_${found.id}`);
    } else {
      if (user) {
        setUser({ ...user, role });
      }
    }
  };

  const addXP = (amount: number, reason: string) => {
    if (!user) return;
    const newXP = user.xp + amount;
    let newLevel = user.level;
    let newTitle = user.levelTitle;

    if (newXP >= 1500) { newLevel = 5; newTitle = 'Entrepreneur'; }
    else if (newXP >= 800) { newLevel = 4; newTitle = 'Founder'; }
    else if (newXP >= 400) { newLevel = 3; newTitle = 'Builder'; }
    else if (newXP >= 150) { newLevel = 2; newTitle = 'Innovator'; }

    const leveledUp = newLevel > user.level;

    setUser(prev => prev ? {
      ...prev,
      xp: newXP,
      level: newLevel,
      levelTitle: newTitle
    } : null);

    if (leveledUp) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Call backend API in background
    fetch('/api/users/add-xp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, xp: amount, reason })
    }).catch(() => {});
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        switchUserRole,
        addXP,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isMentor: user?.role === 'mentor',
        isFounder: user?.role === 'founder' || !!user?.startupId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
