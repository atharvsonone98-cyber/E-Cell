import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EventItem,
  StartupItem,
  MentorItem,
  PitchItem,
  CertificateItem,
  CommunityPost,
  ResourceItem,
  CoFounderCandidate,
  LeaderboardEntry,
  AdminAnalyticsData,
  NotificationItem,
  MentorshipRequest,
  CommitteeMember
} from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_STARTUPS,
  INITIAL_MENTORS,
  INITIAL_PITCHES,
  INITIAL_CERTIFICATES,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_RESOURCES,
  INITIAL_COFOUNDERS,
  INITIAL_LEADERBOARD,
  INITIAL_ANALYTICS,
  INITIAL_NOTIFICATIONS,
  INITIAL_COMMITTEE
} from '../data/initialData';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface EcellContextType {
  events: EventItem[];
  startups: StartupItem[];
  mentors: MentorItem[];
  pitches: PitchItem[];
  certificates: CertificateItem[];
  committee: CommitteeMember[];
  posts: CommunityPost[];
  resources: ResourceItem[];
  cofounders: CoFounderCandidate[];
  leaderboard: LeaderboardEntry[];
  analytics: AdminAnalyticsData;
  notifications: NotificationItem[];
  mentorshipRequests: MentorshipRequest[];
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  registerForEvent: (eventId: string) => Promise<boolean>;
  createEvent: (data: Partial<EventItem>) => Promise<boolean>;
  deleteEvent: (eventId: string) => Promise<boolean>;
  createStartup: (data: Partial<StartupItem>) => Promise<boolean>;
  likeStartup: (startupId: string) => Promise<void>;
  toggleFeatureStartup: (startupId: string) => Promise<void>;
  requestMentorship: (mentorId: string, topic: string, notes: string, preferredDate: string) => Promise<boolean>;
  createPitch: (data: Partial<PitchItem>) => Promise<boolean>;
  votePitch: (pitchId: string) => Promise<void>;
  createPost: (title: string, content: string, category: any, tags: string[]) => Promise<boolean>;
  likePost: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  expressInterest: (postId: string) => Promise<void>;
  issueCertificate: (data: Partial<CertificateItem>) => Promise<CertificateItem | null>;
  verifyCertificate: (certId: string) => Promise<CertificateItem | null>;
  createCommitteeMember: (data: Omit<CommitteeMember, 'id'>) => Promise<boolean>;
  updateCommitteeMember: (id: string, updates: Partial<CommitteeMember>) => Promise<boolean>;
  deleteCommitteeMember: (id: string) => Promise<boolean>;
  markNotificationRead: (id?: string) => void;
  refreshData: () => Promise<void>;
}

const EcellContext = createContext<EcellContextType | undefined>(undefined);

export const EcellProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, addXP } = useAuth();

  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [startups, setStartups] = useState<StartupItem[]>(INITIAL_STARTUPS);
  const [mentors, setMentors] = useState<MentorItem[]>(INITIAL_MENTORS);
  const [pitches, setPitches] = useState<PitchItem[]>(INITIAL_PITCHES);
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [committee, setCommittee] = useState<CommitteeMember[]>(INITIAL_COMMITTEE);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [cofounders, setCofounders] = useState<CoFounderCandidate[]>(INITIAL_COFOUNDERS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [analytics, setAnalytics] = useState<AdminAnalyticsData>(INITIAL_ANALYTICS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([
    {
      id: 'req-1',
      mentorId: 'mnt-1',
      mentorName: 'Priyanka Nambiar',
      studentId: 'usr-student-1',
      studentName: 'Aarav Sharma',
      studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      studentBranch: 'CSE 3rd Year',
      topic: 'Product-Market Fit & Fleet Pilot Agreement Structure',
      notes: 'We have 2 fleet operators willing to trial our CAN-bus telemetry module. Need pricing advice.',
      preferredDate: '2026-09-02',
      status: 'accepted',
      meetingLink: 'https://meet.google.com/ecell-mentor-priyanka',
      createdAt: '2026-08-22'
    }
  ]);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Keyboard Shortcut for Command Palette (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshData = async () => {
    try {
      const [evts, stps, mnts, ptchs, crts, psts] = await Promise.all([
        fetch('/api/events').then(r => r.json()),
        fetch('/api/startups').then(r => r.json()),
        fetch('/api/mentors').then(r => r.json()),
        fetch('/api/pitches').then(r => r.json()),
        fetch('/api/certificates').then(r => r.json()),
        fetch('/api/community/posts').then(r => r.json())
      ]);

      if (evts.success) setEvents(evts.events);
      if (stps.success) setStartups(stps.startups);
      if (mnts.success) setMentors(mnts.mentors);
      if (ptchs.success) setPitches(ptchs.pitches);
      if (crts.success) setCertificates(crts.certificates);
      if (psts.success) setPosts(psts.posts);
    } catch (e) {
      console.log('Using active in-memory state');
    }
  };

  // Initial fetch
  useEffect(() => {
    refreshData();
  }, []);

  // 1. Register for Event
  const registerForEvent = async (eventId: string): Promise<boolean> => {
    const target = events.find(e => e.id === eventId);
    if (!target) return false;

    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
    if (user) {
      addXP(target.xpReward || 20, `Registered for ${target.title}`);
    }
    
    showToast(`Registered for ${target.title}!`, `+${target.xpReward || 20} XP added to your profile`, 'success');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });

    fetch(`/api/events/${eventId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id })
    }).catch(() => {});

    return true;
  };

  // 2. Create Event
  const createEvent = async (data: Partial<EventItem>): Promise<boolean> => {
    const newEvent: EventItem = {
      id: `evt-${Date.now()}`,
      title: data.title || 'New E-Cell Event',
      tagline: data.tagline || 'Startup Workshop',
      category: data.category || 'Workshops',
      date: data.date || new Date().toISOString().split('T')[0],
      time: data.time || '05:00 PM IST',
      location: data.location || 'Innovation Hub',
      isVirtual: data.isVirtual ?? false,
      bannerImage: data.bannerImage || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80',
      description: data.description || 'Hands-on session for innovators.',
      speakers: data.speakers || [],
      schedule: data.schedule || [{ time: '05:00 PM', title: 'Keynote', description: 'Opening' }],
      capacity: data.capacity || 100,
      registeredCount: 0,
      xpReward: data.xpReward || 30,
      prizePool: data.prizePool || '',
      organizer: 'E-Cell Board',
      registrationOpen: true,
      featured: data.featured ?? false
    };

    setEvents(prev => [newEvent, ...prev]);
    showToast('Event Created Successfully!', 'Now visible in the Events Hub', 'success');

    fetch('/api/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    }).catch(() => {});

    return true;
  };

  const deleteEvent = async (eventId: string): Promise<boolean> => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    showToast('Event Deleted', 'Removed from public schedule', 'info');
    fetch(`/api/events/${eventId}`, { method: 'DELETE' }).catch(() => {});
    return true;
  };

  // 3. Startups
  const createStartup = async (data: Partial<StartupItem>): Promise<boolean> => {
    const newStartup: StartupItem = {
      id: `stp-${Date.now()}`,
      name: data.name || 'My Startup Venture',
      tagline: data.tagline || 'Building innovative campus technology',
      logo: data.logo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(data.name || 'startup')}`,
      banner: data.banner || 'https://images.unsplash.com/photo-1558441719-8ef3c9886fa7?w=1000&auto=format&fit=crop&q=80',
      founderId: user?.id || 'usr-student-1',
      founderName: user?.name || 'Aarav Sharma',
      founderAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      founderRole: 'Founder & CEO',
      team: [{ name: user?.name || 'Student Founder', role: 'CEO', avatar: user?.avatar || '', branch: user?.branch || 'CSE' }],
      industry: data.industry || 'Tech / SaaS',
      stage: data.stage || 'Idea',
      year: new Date().getFullYear(),
      problem: data.problem || 'Significant inefficiency in target market.',
      solution: data.solution || 'Scalable technology platform solving customer pain.',
      marketSize: data.marketSize || '$3.5B Total Addressable Market',
      businessModel: data.businessModel || 'B2B Subscription Model',
      technology: data.technology || ['React', 'TypeScript', 'Node.js'],
      fundingStatus: data.fundingStatus || 'Bootstrapped / Incubation Ready',
      website: data.website || '',
      pitchDeckUrl: data.pitchDeckUrl || '#',
      featured: false,
      approved: true,
      likes: 1,
      likedBy: [user?.id || 'usr-student-1']
    };

    setStartups(prev => [newStartup, ...prev]);
    if (user) {
      addXP(200, `Launched and registered new startup: ${newStartup.name}`);
    }
    showToast('Startup Listed in Ecosystem! 🚀', '+200 XP Awarded for launching your venture', 'success');
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

    fetch('/api/startups/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStartup)
    }).catch(() => {});

    return true;
  };

  const likeStartup = async (startupId: string) => {
    if (!user) return;
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        const liked = (s.likedBy || []).includes(user.id);
        const newLikes = liked ? Math.max(0, s.likes - 1) : s.likes + 1;
        const newLikedBy = liked ? (s.likedBy || []).filter(id => id !== user.id) : [...(s.likedBy || []), user.id];
        return { ...s, likes: newLikes, likedBy: newLikedBy };
      }
      return s;
    }));

    fetch(`/api/startups/${startupId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    }).catch(() => {});
  };

  const toggleFeatureStartup = async (startupId: string) => {
    setStartups(prev => prev.map(s => s.id === startupId ? { ...s, featured: !s.featured } : s));
    showToast('Updated Featured Status', undefined, 'info');
    fetch(`/api/startups/${startupId}/toggle-feature`, { method: 'POST' }).catch(() => {});
  };

  // 4. Mentorship
  const requestMentorship = async (mentorId: string, topic: string, notes: string, preferredDate: string): Promise<boolean> => {
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) return false;

    const newReq: MentorshipRequest = {
      id: `req-${Date.now()}`,
      mentorId,
      mentorName: mentor.name,
      studentId: user?.id || 'usr-student-1',
      studentName: user?.name || 'Aarav Sharma',
      studentAvatar: user?.avatar || '',
      studentBranch: user?.branch || 'Engineering',
      topic: topic || 'Venture Strategy & Pitch Deck Critique',
      notes: notes || 'Would appreciate advice on early traction.',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      status: 'pending',
      createdAt: 'Just now'
    };

    setMentorshipRequests(prev => [newReq, ...prev]);
    if (user) {
      addXP(40, `Requested 1-on-1 Mentorship with ${mentor.name}`);
    }

    showToast(`Mentorship Request Sent to ${mentor.name}!`, `+40 XP Earned. Mentor will confirm your slot.`, 'success');
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });

    fetch('/api/mentorship/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReq)
    }).catch(() => {});

    return true;
  };

  // 5. Pitches
  const createPitch = async (data: Partial<PitchItem>): Promise<boolean> => {
    const newPitch: PitchItem = {
      id: `ptc-${Date.now()}`,
      startupName: data.startupName || 'New Startup Pitch',
      founderId: user?.id || 'usr-student-1',
      founderName: user?.name || 'Aarav Sharma',
      founderAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      category: data.category || 'General Tech',
      tagline: data.tagline || 'Disruptive campus solution',
      problem: data.problem || 'Significant unaddressed pain point.',
      solution: data.solution || 'Engineered platform providing 10x value.',
      market: data.market || '$2B Global TAM',
      videoUrl: data.videoUrl || '',
      deckUrl: data.deckUrl || '#',
      votes: 1,
      votedBy: [user?.id || 'usr-student-1'],
      score: 88,
      mentorFeedbackCount: 1,
      stage: 'Community Voting',
      featured: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPitches(prev => [newPitch, ...prev]);
    if (user) {
      addXP(100, `Submitted Startup Pitch for Demo Day Arena: ${newPitch.startupName}`);
    }

    showToast('Pitch Submitted to Arena! 🎯', '+100 XP Earned. Community & Mentors are now reviewing.', 'success');
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    fetch('/api/pitches/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPitch)
    }).catch(() => {});

    return true;
  };

  const votePitch = async (pitchId: string) => {
    if (!user) return;
    setPitches(prev => prev.map(p => {
      if (p.id === pitchId) {
        const hasVoted = (p.votedBy || []).includes(user.id);
        const newVotes = hasVoted ? Math.max(0, p.votes - 1) : p.votes + 1;
        const newVotedBy = hasVoted ? (p.votedBy || []).filter(id => id !== user.id) : [...(p.votedBy || []), user.id];
        return { ...p, votes: newVotes, votedBy: newLikedBy(p.votedBy, user.id, hasVoted) };
      }
      return p;
    }));

    function newLikedBy(list: string[] = [], id: string, hasVoted: boolean) {
      return hasVoted ? list.filter(item => item !== id) : [...list, id];
    }

    showToast('Vote Registered in Pitch Arena!', undefined, 'info');

    fetch(`/api/pitches/${pitchId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    }).catch(() => {});
  };

  // 6. Community Posts
  const createPost = async (title: string, content: string, category: any, tags: string[]): Promise<boolean> => {
    const newPost: CommunityPost = {
      id: `pst-${Date.now()}`,
      authorId: user?.id || 'usr-student-1',
      authorName: user?.name || 'Aarav Sharma',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      authorRole: user?.role === 'mentor' ? 'Industry Mentor' : 'Student Innovator',
      authorBranch: user?.branch || 'CSE 3rd Year',
      title,
      content,
      category: category || 'General',
      tags: tags.length ? tags : ['Ecell', 'Startup'],
      likes: 1,
      likedBy: [user?.id || 'usr-student-1'],
      comments: [],
      interestedCount: 0,
      interestedUsers: [],
      createdAt: 'Just now'
    };

    setPosts(prev => [newPost, ...prev]);
    if (user) {
      addXP(15, 'Created new discussion post in Community Hub');
    }

    showToast('Post Published to Community!', '+15 XP added to your profile', 'success');

    fetch('/api/community/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    }).catch(() => {});

    return true;
  };

  const likePost = async (postId: string) => {
    if (!user) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = (p.likedBy || []).includes(user.id);
        const newLikes = liked ? Math.max(0, p.likes - 1) : p.likes + 1;
        const newLikedBy = liked ? (p.likedBy || []).filter(id => id !== user.id) : [...(p.likedBy || []), user.id];
        return { ...p, likes: newLikes, likedBy: newLikedBy };
      }
      return p;
    }));

    fetch(`/api/community/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    }).catch(() => {});
  };

  const addComment = async (postId: string, content: string) => {
    if (!content.trim() || !user) return;
    const newComment = {
      id: `c-${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      content: content.trim(),
      createdAt: 'Just now'
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    addXP(10, 'Contributed comment to community discussion');
    showToast('Comment Posted!', '+10 XP Earned', 'success');

    fetch(`/api/community/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    }).catch(() => {});
  };

  const expressInterest = async (postId: string) => {
    if (!user) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const interested = (p.interestedUsers || []).includes(user.id);
        const newCount = interested ? Math.max(0, p.interestedCount - 1) : p.interestedCount + 1;
        const newUsers = interested ? (p.interestedUsers || []).filter(id => id !== user.id) : [...(p.interestedUsers || []), user.id];
        return { ...p, interestedCount: newCount, interestedUsers: newUsers };
      }
      return p;
    }));

    showToast('Interest Registered! Founder will be notified', undefined, 'info');

    fetch(`/api/community/posts/${postId}/interest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    }).catch(() => {});
  };

  // 7. Certificates
  const issueCertificate = async (data: Partial<CertificateItem>): Promise<CertificateItem | null> => {
    const certId = `ECELL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCert: CertificateItem = {
      id: `crt-${Date.now()}`,
      certificateId: certId,
      userId: data.userId || user?.id || 'usr-student-1',
      userName: data.userName || user?.name || 'Aarav Sharma',
      userEmail: data.userEmail || user?.email || 'student@college.edu',
      collegeId: data.collegeId || user?.collegeId || '2023CS0142',
      eventName: data.eventName || 'National E-Summit 2026',
      issueDate: new Date().toISOString().split('T')[0],
      category: data.category || 'Certificate of Participation & Achievement',
      rank: data.rank || 'Honorable Mention',
      signatureName: data.signatureName || 'Dr. Vikramaditya Sen',
      signatureRole: data.signatureRole || 'Dean of Innovation & Incubation',
      status: 'valid'
    };

    setCertificates(prev => [newCert, ...prev]);
    showToast(`Certificate Issued: ${certId}`, 'Verified credential recorded in institutional ledger', 'success');

    fetch('/api/certificates/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCert)
    }).catch(() => {});

    return newCert;
  };

  const verifyCertificate = async (certId: string): Promise<CertificateItem | null> => {
    const normalized = certId.toUpperCase().trim();
    const found = certificates.find(c => c.certificateId.toUpperCase() === normalized || c.id === normalized);
    return found || null;
  };

  // 8. Committee Management
  const createCommitteeMember = async (data: Omit<CommitteeMember, 'id'>): Promise<boolean> => {
    const newMember: CommitteeMember = {
      ...data,
      id: `comm-${Date.now()}`
    };
    setCommittee(prev => [newMember, ...prev]);
    showToast('Team Member Added', `${data.name} has been added to ${data.domain}`, 'success');
    return true;
  };

  const updateCommitteeMember = async (id: string, updates: Partial<CommitteeMember>): Promise<boolean> => {
    setCommittee(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    showToast('Profile Updated', 'Team member details saved successfully', 'success');
    return true;
  };

  const deleteCommitteeMember = async (id: string): Promise<boolean> => {
    const member = committee.find(m => m.id === id);
    setCommittee(prev => prev.filter(m => m.id !== id));
    showToast('Member Removed', member ? `${member.name} removed from committee` : 'Member deleted', 'info');
    return true;
  };

  const markNotificationRead = (id?: string) => {
    if (id) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } else {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
    fetch('/api/notifications/mark-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(() => {});
  };

  return (
    <EcellContext.Provider
      value={{
        events,
        startups,
        mentors,
        pitches,
        certificates,
        committee,
        posts,
        resources,
        cofounders,
        leaderboard,
        analytics,
        notifications,
        mentorshipRequests,
        toasts,
        showToast,
        removeToast,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        registerForEvent,
        createEvent,
        deleteEvent,
        createStartup,
        likeStartup,
        toggleFeatureStartup,
        requestMentorship,
        createPitch,
        votePitch,
        createPost,
        likePost,
        addComment,
        expressInterest,
        issueCertificate,
        verifyCertificate,
        createCommitteeMember,
        updateCommitteeMember,
        deleteCommitteeMember,
        markNotificationRead,
        refreshData
      }}
    >
      {children}
    </EcellContext.Provider>
  );
};

export const useEcell = () => {
  const context = useContext(EcellContext);
  if (!context) throw new Error('useEcell must be used within an EcellProvider');
  return context;
};
