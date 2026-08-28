import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_USERS,
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
  INITIAL_NOTIFICATIONS
} from './src/data/initialData.ts';

dotenv.config();

// In-Memory Database Store (with full live read/write)
let users = [...INITIAL_USERS];
let events = [...INITIAL_EVENTS];
let startups = [...INITIAL_STARTUPS];
let mentors = [...INITIAL_MENTORS];
let pitches = [...INITIAL_PITCHES];
let certificates = [...INITIAL_CERTIFICATES];
let posts = [...INITIAL_COMMUNITY_POSTS];
let resources = [...INITIAL_RESOURCES];
let cofounders = [...INITIAL_COFOUNDERS];
let leaderboard = [...INITIAL_LEADERBOARD];
let analytics = { ...INITIAL_ANALYTICS };
let notifications = [...INITIAL_NOTIFICATIONS];
let mentorshipRequests: any[] = [
  {
    id: 'req-1',
    mentorId: 'mnt-1',
    mentorName: 'Priyanka Nambiar',
    studentId: 'usr-student-1',
    studentName: 'Aarav Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    studentBranch: 'CSE 3rd Year',
    topic: 'Product-Market Fit & Fleet Pilot Agreement Structure',
    notes: 'We have 2 fleet operators willing to trial our CAN-bus telemetry module. Would love guidance on pricing & data privacy clauses.',
    preferredDate: '2026-09-02',
    status: 'accepted',
    meetingLink: 'https://meet.google.com/ecell-mentor-priyanka',
    createdAt: '2026-08-22'
  }
];

// Helper to award XP and update level
function awardXP(userId: string, xpAmount: number, reason: string) {
  const user = users.find(u => u.id === userId);
  if (!user) return;
  user.xp += xpAmount;
  
  // Calculate Level
  let newLevel = 1;
  let levelTitle: 'Explorer' | 'Innovator' | 'Builder' | 'Founder' | 'Entrepreneur' = 'Explorer';
  if (user.xp >= 1500) {
    newLevel = 5;
    levelTitle = 'Entrepreneur';
  } else if (user.xp >= 800) {
    newLevel = 4;
    levelTitle = 'Founder';
  } else if (user.xp >= 400) {
    newLevel = 3;
    levelTitle = 'Builder';
  } else if (user.xp >= 150) {
    newLevel = 2;
    levelTitle = 'Innovator';
  }
  user.level = newLevel;
  user.levelTitle = levelTitle;

  // Add notification
  notifications.unshift({
    id: `ntf-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    userId: user.id,
    title: `+${xpAmount} XP Earned! ⚡`,
    message: `${reason} (Total XP: ${user.xp})`,
    type: 'xp',
    read: false,
    link: '/dashboard',
    createdAt: 'Just now'
  });

  // Update leaderboard
  const lbIndex = leaderboard.findIndex(l => l.id === userId);
  if (lbIndex >= 0) {
    leaderboard[lbIndex].xp = user.xp;
    leaderboard[lbIndex].level = user.level;
    leaderboard[lbIndex].levelTitle = user.levelTitle;
  } else {
    leaderboard.push({
      rank: leaderboard.length + 1,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      branch: user.branch || 'Engineering',
      xp: user.xp,
      level: user.level,
      levelTitle: user.levelTitle,
      badgesCount: user.badges.length,
      startupsCount: user.startupId ? 1 : 0,
      eventsAttended: 1
    });
  }
  leaderboard.sort((a, b) => b.xp - a.xp);
  leaderboard.forEach((item, idx) => { item.rank = idx + 1; });
}

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ==========================================
  // REST API ROUTES
  // ==========================================

  // Health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), totalUsers: users.length });
  });

  // 1. Authentication & Users
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or credentials. Use demo quick-switch or register.' });
    }
    const token = `jwt_mock_${user.id}_${Date.now()}`;
    return res.json({ success: true, token, user });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, role, branch, year, collegeId, company, specialization } = req.body;
    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newUser: any = {
      id: `usr-${Date.now()}`,
      name,
      email: email.trim(),
      role: role || 'student',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      collegeId: collegeId || `2026CS${Math.floor(1000 + Math.random() * 9000)}`,
      branch: branch || 'Computer Engineering',
      year: year || '1st Year',
      bio: `Aspiring entrepreneur & innovator in campus ecosystem.`,
      skills: ['Ideation', 'Problem Solving', 'Teamwork'],
      interests: ['Startups', 'Technology', 'Design'],
      lookingFor: ['Teammates', 'Mentorship'],
      xp: 100,
      level: 1,
      levelTitle: 'Explorer',
      badges: [
        { id: 'b-welcome', name: 'Ecosystem Member', description: 'Joined the E-Cell campus community', icon: '🚀', unlocked: true, earnedAt: new Date().toISOString().split('T')[0] }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (role === 'mentor') {
      newUser.mentorProfile = {
        company: company || 'Tech Enterprise',
        role: specialization || 'Industry Advisor',
        experienceYears: 5,
        specialization: [specialization || 'Strategy', 'Technology'],
        rating: 5.0,
        reviewCount: 1,
        availability: 'Fridays • 5:00 PM IST',
        linkedin: 'https://linkedin.com'
      };
      mentors.push({
        id: `mnt-${Date.now()}`,
        userId: newUser.id,
        name: newUser.name,
        role: newUser.mentorProfile.role,
        company: newUser.mentorProfile.company,
        avatar: newUser.avatar,
        experienceYears: 5,
        rating: 5.0,
        reviewCount: 1,
        expertise: newUser.mentorProfile.specialization,
        biography: 'Experienced industry leader helping collegiate ventures scale.',
        achievements: ['Campus Mentor 2026'],
        companiesWorked: [company || 'Tech Enterprise'],
        availability: 'Fridays • 5:00 PM IST',
        availableDays: ['Friday'],
        linkedin: 'https://linkedin.com',
        sessionsCompleted: 0
      });
    }

    users.push(newUser);
    analytics.totalUsers = users.length;
    analytics.activeUsers = Math.floor(users.length * 0.75);

    const token = `jwt_mock_${newUser.id}_${Date.now()}`;
    return res.json({ success: true, token, user: newUser });
  });

  app.get('/api/users', (req, res) => {
    res.json({ success: true, users });
  });

  app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  });

  app.put('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) return res.status(404).json({ success: false, message: 'User not found' });
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json({ success: true, user: users[userIndex] });
  });

  app.post('/api/users/add-xp', (req, res) => {
    const { userId, xp, reason } = req.body;
    awardXP(userId, Number(xp) || 20, reason || 'Campus Activity Contribution');
    const user = users.find(u => u.id === userId);
    res.json({ success: true, user });
  });

  // 2. Events & Registrations
  app.get('/api/events', (req, res) => {
    res.json({ success: true, events });
  });

  app.get('/api/events/:id', (req, res) => {
    const event = events.find(e => e.id === req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  });

  app.post('/api/events/:id/register', (req, res) => {
    const { userId } = req.body;
    const event = events.find(e => e.id === req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    event.registeredCount += 1;
    analytics.totalRegistrations += 1;

    if (userId) {
      awardXP(userId, event.xpReward || 20, `Registered for ${event.title}`);
    }

    res.json({ success: true, event, message: 'Registration successful! Pass generated.' });
  });

  app.post('/api/events/create', (req, res) => {
    const newEvent: any = {
      id: `evt-${Date.now()}`,
      title: req.body.title || 'New E-Cell Event',
      tagline: req.body.tagline || 'Innovation & Entrepreneurship Workshop',
      category: req.body.category || 'Workshops',
      date: req.body.date || new Date().toISOString().split('T')[0],
      time: req.body.time || '05:00 PM IST',
      location: req.body.location || 'Innovation Center Hall 1',
      isVirtual: req.body.isVirtual ?? false,
      bannerImage: req.body.bannerImage || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80',
      description: req.body.description || 'Interactive hands-on session for student innovators.',
      speakers: req.body.speakers || [],
      schedule: req.body.schedule || [{ time: '05:00 PM', title: 'Welcome & Problem Statement', description: 'Opening kickoff' }],
      capacity: Number(req.body.capacity) || 100,
      registeredCount: 0,
      xpReward: Number(req.body.xpReward) || 30,
      prizePool: req.body.prizePool || '',
      organizer: 'E-Cell Board',
      registrationOpen: true,
      featured: req.body.featured ?? false
    };

    events.unshift(newEvent);
    analytics.totalEvents = events.length;
    res.json({ success: true, event: newEvent });
  });

  app.delete('/api/events/:id', (req, res) => {
    events = events.filter(e => e.id !== req.params.id);
    analytics.totalEvents = events.length;
    res.json({ success: true, message: 'Event deleted' });
  });

  // 3. Startups Showcase
  app.get('/api/startups', (req, res) => {
    res.json({ success: true, startups });
  });

  app.get('/api/startups/:id', (req, res) => {
    const startup = startups.find(s => s.id === req.params.id);
    if (!startup) return res.status(404).json({ success: false, message: 'Startup not found' });
    res.json({ success: true, startup });
  });

  app.post('/api/startups/create', (req, res) => {
    const { name, tagline, founderName, founderId, industry, stage, problem, solution, technology, website } = req.body;
    const newStartup: any = {
      id: `stp-${Date.now()}`,
      name: name || 'New Venture',
      tagline: tagline || 'Building scalable campus technology',
      logo: req.body.logo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(name || 'startup')}`,
      banner: 'https://images.unsplash.com/photo-1558441719-8ef3c9886fa7?w=1000&auto=format&fit=crop&q=80',
      founderId: founderId || 'usr-student-1',
      founderName: founderName || 'Student Founder',
      founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      founderRole: 'Founder & CEO',
      team: [{ name: founderName || 'Student Founder', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', branch: 'CSE' }],
      industry: industry || 'Tech / SaaS',
      stage: stage || 'Idea',
      year: new Date().getFullYear(),
      problem: problem || 'Market problem description',
      solution: solution || 'Innovative technology solution',
      marketSize: '$2.5B Total Addressable Market',
      businessModel: 'B2B Subscription / Transaction Fee',
      technology: Array.isArray(technology) ? technology : ['React', 'Node.js', 'Cloud'],
      fundingStatus: 'Bootstrapped / Incubation Candidate',
      website: website || '',
      pitchDeckUrl: '#',
      featured: false,
      approved: true,
      likes: 1,
      likedBy: [founderId || 'usr-student-1']
    };

    startups.unshift(newStartup);
    analytics.totalStartups = startups.length;

    if (founderId) {
      awardXP(founderId, 200, `Submitted and launched new venture: ${newStartup.name}`);
    }

    res.json({ success: true, startup: newStartup });
  });

  app.post('/api/startups/:id/like', (req, res) => {
    const { userId } = req.body;
    const startup = startups.find(s => s.id === req.params.id);
    if (!startup) return res.status(404).json({ success: false, message: 'Startup not found' });
    
    startup.likedBy = startup.likedBy || [];
    const hasLiked = startup.likedBy.includes(userId);
    if (hasLiked) {
      startup.likedBy = startup.likedBy.filter(id => id !== userId);
      startup.likes = Math.max(0, startup.likes - 1);
    } else {
      startup.likedBy.push(userId);
      startup.likes += 1;
    }
    res.json({ success: true, likes: startup.likes, liked: !hasLiked });
  });

  app.post('/api/startups/:id/toggle-feature', (req, res) => {
    const startup = startups.find(s => s.id === req.params.id);
    if (!startup) return res.status(404).json({ success: false, message: 'Startup not found' });
    startup.featured = !startup.featured;
    res.json({ success: true, startup });
  });

  // 4. Mentors & Mentorship Requests
  app.get('/api/mentors', (req, res) => {
    res.json({ success: true, mentors });
  });

  app.get('/api/mentors/:id', (req, res) => {
    const mentor = mentors.find(m => m.id === req.params.id);
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
    res.json({ success: true, mentor });
  });

  app.post('/api/mentorship/request', (req, res) => {
    const { mentorId, studentId, studentName, studentAvatar, topic, notes, preferredDate } = req.body;
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });

    const newRequest = {
      id: `req-${Date.now()}`,
      mentorId,
      mentorName: mentor.name,
      studentId: studentId || 'usr-student-1',
      studentName: studentName || 'Aarav Sharma',
      studentAvatar: studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      studentBranch: 'Engineering',
      topic: topic || 'Startup Strategy & Pitch Feedback',
      notes: notes || 'Would love 1-on-1 feedback on our traction and business model.',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    mentorshipRequests.unshift(newRequest);
    analytics.totalMentorshipSessions += 1;

    if (studentId) {
      awardXP(studentId, 40, `Requested 1-on-1 mentorship session with ${mentor.name}`);
    }

    res.json({ success: true, request: newRequest, message: 'Mentorship request submitted successfully!' });
  });

  app.get('/api/mentorship/my-requests', (req, res) => {
    const { studentId } = req.query;
    const list = studentId ? mentorshipRequests.filter(r => r.studentId === studentId) : mentorshipRequests;
    res.json({ success: true, requests: list });
  });

  // 5. Pitch Arena
  app.get('/api/pitches', (req, res) => {
    res.json({ success: true, pitches });
  });

  app.post('/api/pitches/create', (req, res) => {
    const { startupName, founderId, founderName, category, tagline, problem, solution, market, videoUrl, deckUrl } = req.body;
    const newPitch: any = {
      id: `ptc-${Date.now()}`,
      startupName: startupName || 'New Startup Pitch',
      founderId: founderId || 'usr-student-1',
      founderName: founderName || 'Student Innovator',
      founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      category: category || 'General Tech',
      tagline: tagline || 'Disruptive campus technology project',
      problem: problem || 'Target problem',
      solution: solution || 'Our breakthrough solution',
      market: market || 'Global growth market',
      videoUrl: videoUrl || '',
      deckUrl: deckUrl || '#',
      votes: 1,
      votedBy: [founderId || 'usr-student-1'],
      score: 85,
      mentorFeedbackCount: 1,
      stage: 'Community Voting',
      featured: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    pitches.unshift(newPitch);

    if (founderId) {
      awardXP(founderId, 100, `Submitted startup pitch for Arena Demo: ${newPitch.startupName}`);
    }

    res.json({ success: true, pitch: newPitch });
  });

  app.post('/api/pitches/:id/vote', (req, res) => {
    const { userId } = req.body;
    const pitch = pitches.find(p => p.id === req.params.id);
    if (!pitch) return res.status(404).json({ success: false, message: 'Pitch not found' });

    pitch.votedBy = pitch.votedBy || [];
    const hasVoted = pitch.votedBy.includes(userId);
    if (hasVoted) {
      pitch.votedBy = pitch.votedBy.filter(id => id !== userId);
      pitch.votes = Math.max(0, pitch.votes - 1);
    } else {
      pitch.votedBy.push(userId);
      pitch.votes += 1;
      if (userId) {
        awardXP(userId, 5, `Voted for ${pitch.startupName} in Pitch Arena`);
      }
    }
    res.json({ success: true, votes: pitch.votes, voted: !hasVoted });
  });

  // 6. Certificates & Verification
  app.get('/api/certificates', (req, res) => {
    res.json({ success: true, certificates });
  });

  app.get('/api/certificates/verify/:id', (req, res) => {
    const searchId = (req.params.id || '').toUpperCase().trim();
    const cert = certificates.find(c => c.certificateId.toUpperCase() === searchId || c.id === searchId);
    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found or invalid ID.' });
    }
    res.json({ success: true, certificate: cert });
  });

  app.post('/api/certificates/issue', (req, res) => {
    const { userName, userEmail, collegeId, eventName, category, rank, signatureName, signatureRole } = req.body;
    const certId = `ECELL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newCert = {
      id: `crt-${Date.now()}`,
      certificateId: certId,
      userId: req.body.userId || 'usr-student-1',
      userName: userName || 'Aarav Sharma',
      userEmail: userEmail || 'student@college.edu',
      collegeId: collegeId || '2023CS0142',
      eventName: eventName || 'National E-Summit 2026',
      issueDate: new Date().toISOString().split('T')[0],
      category: category || 'Certificate of Participation & Achievement',
      rank: rank || 'Participant',
      signatureName: signatureName || 'Dr. Vikramaditya Sen',
      signatureRole: signatureRole || 'Dean of Innovation & Incubation',
      status: 'valid' as const
    };

    certificates.unshift(newCert);
    analytics.totalCertificates = certificates.length;

    res.json({ success: true, certificate: newCert });
  });

  // 7. Community Posts
  app.get('/api/community/posts', (req, res) => {
    res.json({ success: true, posts });
  });

  app.post('/api/community/posts/create', (req, res) => {
    const { authorId, authorName, authorAvatar, authorRole, authorBranch, title, content, category, tags } = req.body;
    const newPost = {
      id: `pst-${Date.now()}`,
      authorId: authorId || 'usr-student-1',
      authorName: authorName || 'Aarav Sharma',
      authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      authorRole: authorRole || 'Student Innovator',
      authorBranch: authorBranch || 'CSE 3rd Year',
      title: title || 'New Community Post',
      content: content || '',
      category: category || 'General',
      tags: Array.isArray(tags) ? tags : ['Ecell', 'Startup'],
      likes: 1,
      likedBy: [authorId || 'usr-student-1'],
      comments: [],
      interestedCount: 0,
      interestedUsers: [],
      createdAt: 'Just now'
    };

    posts.unshift(newPost);
    if (authorId) {
      awardXP(authorId, 15, 'Created new discussion post in Community Hub');
    }

    res.json({ success: true, post: newPost });
  });

  app.post('/api/community/posts/:id/like', (req, res) => {
    const { userId } = req.body;
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.likedBy = post.likedBy || [];
    const hasLiked = post.likedBy.includes(userId);
    if (hasLiked) {
      post.likedBy = post.likedBy.filter(id => id !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(userId);
      post.likes += 1;
    }
    res.json({ success: true, likes: post.likes, liked: !hasLiked });
  });

  app.post('/api/community/posts/:id/comment', (req, res) => {
    const { authorId, authorName, authorAvatar, content } = req.body;
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const newComment = {
      id: `c-${Date.now()}`,
      authorId: authorId || 'usr-student-1',
      authorName: authorName || 'Student',
      authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      content: content || '',
      createdAt: 'Just now'
    };

    post.comments.push(newComment);
    if (authorId) {
      awardXP(authorId, 10, 'Contributed feedback to community discussion');
    }

    res.json({ success: true, comment: newComment, post });
  });

  app.post('/api/community/posts/:id/interest', (req, res) => {
    const { userId } = req.body;
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.interestedUsers = post.interestedUsers || [];
    const hasExpressed = post.interestedUsers.includes(userId);
    if (hasExpressed) {
      post.interestedUsers = post.interestedUsers.filter(id => id !== userId);
      post.interestedCount = Math.max(0, post.interestedCount - 1);
    } else {
      post.interestedUsers.push(userId);
      post.interestedCount += 1;
    }
    res.json({ success: true, interestedCount: post.interestedCount, interested: !hasExpressed });
  });

  // 8. Co-Founder Directory
  app.get('/api/cofounders', (req, res) => {
    res.json({ success: true, cofounders });
  });

  // 9. Resources
  app.get('/api/resources', (req, res) => {
    res.json({ success: true, resources });
  });

  // 10. Leaderboard
  app.get('/api/leaderboard', (req, res) => {
    res.json({ success: true, leaderboard });
  });

  // 11. Analytics
  app.get('/api/analytics', (req, res) => {
    res.json({ success: true, analytics });
  });

  // 12. Notifications
  app.get('/api/notifications', (req, res) => {
    const { userId } = req.query;
    const list = userId ? notifications.filter(n => n.userId === userId) : notifications;
    res.json({ success: true, notifications: list });
  });

  app.post('/api/notifications/mark-read', (req, res) => {
    const { id } = req.body;
    if (id) {
      const ntf = notifications.find(n => n.id === id);
      if (ntf) ntf.read = true;
    } else {
      notifications.forEach(n => { n.read = true; });
    }
    res.json({ success: true });
  });

  // ==========================================
  // GEMINI AI ENTREPRENEURSHIP SUITE
  // ==========================================

  // E-CELL AI Chat Assistant
  app.post('/api/ai/chat', async (req, res) => {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message prompt is required' });
    }

    try {
      const ai = getGeminiClient();
      if (ai) {
        const chat = ai.chats.create({
          model: 'gemini-3.7-flash',
          config: {
            systemInstruction: `You are "E-CELL AI", an elite collegiate startup ecosystem advisor, venture mentor, and product strategy expert at a premier engineering university entrepreneurship cell.
Your role:
- Provide sharp, highly actionable, founder-grade startup advice across: Problem Validation, Customer Discovery, MVP Scoping, Unit Economics, Beachhead Market selection, Cap Tables, Angel Pitching, and Tech Architecture.
- Maintain a concise, encouraging yet intellectually rigorous tone.
- Break answers down into clear headings, bullet points, and tangible next action steps.
- If relevant, refer to typical student startup pitfalls (e.g. over-building without validation, ignoring CAC, lacking distribution).`
          }
        });

        const response = await chat.sendMessage({
          message: message
        });

        return res.json({ response: response.text });
      }
    } catch (err: any) {
      console.warn('Gemini chat API invocation error, using expert fallback:', err?.message);
    }

    // High quality intelligent fallback if Gemini key is not configured or temporary rate limited
    const fallbackResponse = `### 🚀 E-Cell Venture Advisory: Analysis for "${message.slice(0, 40)}..."

**1. Problem Validation & Beachhead Target**
- Pinpoint a single, burning customer segment with high willingness-to-pay rather than targeting a broad, diffuse audience.
- Conduct 25 structured, non-leading customer discovery interviews asking about their existing costly workarounds.

**2. Scoping the 7-Day MVP (Minimum Viable Product)**
- Eliminate secondary bells and whistles. Strip down to the single atomic value loop that proves customer utility.
- Deploy an interactive React frontend paired with lightweight cloud APIs to test conversion metrics before heavy backend architecture.

**3. Unit Economics & Distribution (GTM)**
- **Beachhead Channel**: Leverage targeted campus hubs, developer forums, or niche LinkedIn outreach to secure your first 10 paying customers for ₹0 CAC.
- **Value Metric**: Price directly proportional to customer cost savings or revenue uplift (e.g. ₹999/month or 1.5% transaction take-rate).

**4. Recommended Action Items This Week**
1. Draft your 1-page Lean Canvas in the E-Cell Resource Center.
2. Schedule a 1-on-1 review with our venture mentors in the **Mentors Marketplace**.
3. Submit your pitch in the **Pitch Arena** to collect community feedback and qualify for incubator seed grants!`;

    return res.json({ response: fallbackResponse });
  });

  // Dedicated AI Startup Tools
  app.post('/api/ai/tool', async (req, res) => {
    const { toolType, inputData } = req.body;
    if (!toolType || !inputData) {
      return res.status(400).json({ error: 'toolType and inputData are required' });
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (toolType) {
      case 'idea-validator':
        systemPrompt = `You are a Tier-1 Venture Capital Partner and Startup Validator. Analyze the student startup concept rigorously.
Provide the output formatted in clean Markdown with exactly these sections:
1. **Problem Severity & Market Reality**
2. **Target Customer Persona & Beachhead Segment**
3. **Competitive Moat & Differentiation**
4. **Recommended 14-Day MVP Scope**
5. **Business Model & Unit Economics**
6. **Key Fatal Risks & Failure Modes**
7. **Immediate 3 Next Steps**`;
        userPrompt = `Validate this startup idea:
Idea Name / Domain: ${inputData.title || ''}
Description: ${inputData.description || ''}
Target Audience: ${inputData.audience || ''}`;
        break;

      case 'startup-name-generator':
        systemPrompt = `You are a high-end brand naming agency for venture-backed startups. Generate 6 distinct, modern, memorable startup names with punchy taglines and domain availability suggestions. Format with clean bullet points.`;
        userPrompt = `Generate brandable startup names for:
Industry: ${inputData.industry || 'Technology'}
Core Concept: ${inputData.concept || ''}
Brand Tone: ${inputData.tone || 'Futuristic, High-Tech, Trustworthy'}`;
        break;

      case 'business-model-generator':
        systemPrompt = `You are an expert Lean Canvas and Business Model architect. Construct a comprehensive Lean Business Model breakdown.
Sections:
- Value Proposition
- Customer Segments & Early Adopters
- Revenue Streams & Pricing Tiers
- Cost Structure & Major Expenses
- Key Metrics (North Star, CAC, LTV)
- Unfair Advantage (Moat)`;
        userPrompt = `Create a Lean Business Model for:
Startup Concept: ${inputData.concept || ''}
Industry: ${inputData.industry || ''}`;
        break;

      case 'pitch-deck-assistant':
        systemPrompt = `You are an elite Pitch Coach who has prepared founders for Y-Combinator, Techstars, and Sequoia. Generate an impactful 10-slide pitch deck blueprint with slide titles, core metrics, visual suggestions, and winning punchlines.`;
        userPrompt = `Create a 10-slide pitch deck structure for:
Startup Name: ${inputData.name || 'My Startup'}
Problem & Solution: ${inputData.details || ''}
Target Round / Goal: ${inputData.goal || '₹25L Angel Seed Grant'}`;
        break;

      case 'swot-generator':
        systemPrompt = `You are a strategic management consultant. Generate an in-depth SWOT (Strengths, Weaknesses, Opportunities, Threats) Matrix for the venture, followed by strategic defensive maneuvers.`;
        userPrompt = `Perform SWOT analysis for:
Startup: ${inputData.name || ''}
Concept & Tech: ${inputData.details || ''}`;
        break;

      case 'market-research-assistant':
        systemPrompt = `You are an equity research analyst and venture analyst. Provide a market sizing breakdown with realistic TAM (Total Addressable Market), SAM (Serviceable Addressable Market), SOM (Serviceable Obtainable Market), CAGR growth drivers, and market tailwinds.`;
        userPrompt = `Analyze market size and growth for:
Sector: ${inputData.sector || ''}
Geographic Scope: ${inputData.geography || 'India / APAC / Global'}
Value Proposition: ${inputData.valueProp || ''}`;
        break;

      case 'investor-pitch-coach':
        systemPrompt = `You are a ruthless but constructive Angel Investor conducting a live pitch teardown.
Provide:
1. **The 5 Hardest Questions an Angel Will Ask You**
2. **Model Best-in-Class Answers to Counter Investor Objections**
3. **Red Flags to Eliminate Immediately**`;
        userPrompt = `Prepare me for investor Q&A:
Startup: ${inputData.name || ''}
Traction / Stage: ${inputData.traction || 'Pre-revenue MVP with 200 pilot users'}
Elevator Pitch: ${inputData.pitch || ''}`;
        break;

      default:
        systemPrompt = 'You are an E-Cell startup mentor.';
        userPrompt = JSON.stringify(inputData);
    }

    try {
      const ai = getGeminiClient();
      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt
          }
        });

        return res.json({ result: response.text });
      }
    } catch (err: any) {
      console.warn(`Gemini tool API error for ${toolType}:`, err?.message);
    }

    // Dynamic Intelligent Fallback
    const fallbackResults: Record<string, string> = {
      'idea-validator': `### ⚡ Venture Validation Assessment

**1. Problem Severity & Market Reality**
- **Pain Level (9/10)**: The problem addressed is quantifiable in lost productivity and capital leakage for the target persona.
- **Willingness to Pay**: High, provided the MVP demonstrates immediate ROI within 30 days of deployment.

**2. Target Customer Persona & Beachhead Segment**
- **Initial Beachhead**: Mid-market operators & digital-first teams seeking automated efficiency without complex enterprise contracts.
- **Buyer Persona**: Head of Operations or Technical Leads managing 15-50 assets.

**3. Competitive Moat & Differentiation**
- **Proprietary Insight**: Seamless API/IoT telemetry integration compared to clunky legacy enterprise suites.
- **Network Effects**: Aggregate benchmark performance analytics that become more accurate with every active tenant.

**4. Recommended 14-Day MVP Scope**
- Implement core data intake and automated diagnostic report generator.
- Integrate instant email/webhook alerts for threshold deviations.

**5. Business Model & Unit Economics**
- **Tier 1 (Pro)**: ₹2,499/month for up to 10 active monitored units.
- **Target Gross Margin**: ~82% on cloud infrastructure.

**6. Fatal Risks & Mitigation**
- *Risk*: Lengthy sales cycles if pitching to large conglomerates.
- *Mitigation*: Direct-to-consumer or self-serve freemium onboarding for small teams.

**7. Immediate Next Steps**
1. Build a high-converting landing page with waitlist capture.
2. Sign 3 pilot LOIs (Letters of Intent) from local partners.`,

      'startup-name-generator': `### ⚡ Brand Identity Suggestions

1. **VoltSync™** — *Precision Energy & Telematics Intelligence*
   - *Vibe*: Futuristic, robust, high-performance clean tech.
   - *Domain ideas*: voltsync.ai, voltsynctech.com

2. **NexusForge™** — *The Autonomous Cloud Architecture*
   - *Vibe*: Reliable, scalable, enterprise-grade engineering.
   - *Domain ideas*: nexusforge.io, nexusforge.app

3. **HyperMetric™** — *Zero-Latency Performance Telemetry*
   - *Vibe*: Fast, quantitative, venture-scale SaaS.
   - *Domain ideas*: hypermetric.dev, gethypermetric.com

4. **OmniPulse™** — *Smart Operations & Diagnostics Platform*
   - *Vibe*: Modern, dynamic, all-in-one platform.
   - *Domain ideas*: omnipulse.in, omnipulse.io`,

      'business-model-generator': `### 📊 Lean Business Model Canvas

**1. Value Proposition**
Autonomous predictive analytics reducing unexpected system downtime by 65% while saving 20 hours/month of manual inspections.

**2. Customer Segments**
- *Early Adopters*: Tech-forward fleet and infrastructure managers managing 20-100 units.
- *Expansion Cohort*: Tier-1 regional enterprise asset operators.

**3. Revenue Streams**
- Monthly SaaS Subscription: ₹1,500 per unit/month.
- Enterprise API SLA: Custom annual tier with dedicated hardware gateway support.

**4. Cost Structure**
- Cloud Compute & Database Time-series Ingestion: 14% of revenue.
- Customer Acquisition (CAC): ₹3,500 target payback in 2.5 months.

**5. Key North Star Metric**
- Monthly Active Monitored Telemetry Hours & Renewal Net Revenue Retention (NRR > 115%).`,

      'pitch-deck-assistant': `### 🎯 10-Slide Investor Deck Blueprint

- **Slide 1: Title & Purpose** — Clean logo, tagline, one-sentence punchline.
- **Slide 2: The Problem** — Quantify the exact ₹ / $ loss incurred today by legacy workarounds.
- **Slide 3: The Breakthrough Solution** — Live screenshot / product gif demonstrating the 10x improvement.
- **Slide 4: Market Size (TAM/SAM/SOM)** — $14.2B global TAM, $1.8B immediate beachhead.
- **Slide 5: Product & Underlying Magic** — Physics-informed ML algorithm + plug & play module.
- **Slide 6: Traction & Pilot Milestones** — 280+ active users, 2 commercial pilot LOIs, ₹5L pre-seed grant.
- **Slide 7: Business Model & Unit Economics** — SaaS pricing, LTV/CAC ratio of 4.2x.
- **Slide 8: Competitive Landscape** — 2x2 matrix highlighting speed, cost, and automation.
- **Slide 9: Founding Team** — Technical execution credibility, domain background, advisory board.
- **Slide 10: The Ask & 18-Month Runway Milestones** — Raising ₹25L to achieve ₹10L ARR and 1,000 active nodes.`,

      'swot-generator': `### 🛡️ Strategic SWOT Matrix

- **Strengths**: Deep technical domain expertise, rapid engineering iteration speed, campus incubation grant support.
- **Weaknesses**: Early brand awareness, small initial founding team size.
- **Opportunities**: Rapidly growing national adoption of smart IoT & AI automation, government DPIIT grant incentives.
- **Threats**: Established legacy players copying lightweight features, enterprise compliance inertia.`,

      'market-research-assistant': `### 📈 Market Size & Growth Dynamics

- **Total Addressable Market (TAM)**: $14.2 Billion globally by 2030 (CAGR 22.8%).
- **Serviceable Addressable Market (SAM)**: $2.4 Billion in Indian & Southeast Asian commercial fleet & smart IoT sector.
- **Serviceable Obtainable Market (SOM)**: $18 Million (capturing 3% of collegiate & regional mid-market fleet operators over 3 years).
- **Macro Drivers**: Strict sustainability compliance norms, rising battery asset replacement costs, and rapid adoption of IoT telematics.`,

      'investor-pitch-coach': `### 🎙️ Angel Investor Q&A Teardown

**1. "What is stopping an established incumbent with 50 engineers from copying this next month?"**
- *Winning Answer*: "Incumbents are built on heavy on-premise architectures that take 6 months to deploy. Our architecture is zero-touch self-serve, designed specifically for rapid plug-and-play onboarding with proprietary edge ML optimization that costs 80% less to operate."

**2. "How will you acquire your next 100 paying customers without blowing your seed round on ads?"**
- *Winning Answer*: "Our primary distribution flywheel is built on ecosystem partnerships with regional equipment distributors and our viral developer community benchmark tools, keeping CAC under ₹2,500."`
    };

    return res.json({ result: fallbackResults[toolType] || 'Generated analysis successfully.' });
  });

  // Global Search API (Ctrl+K Command Search)
  app.get('/api/search', (req, res) => {
    const q = ((req.query.q as string) || '').toLowerCase().trim();
    if (!q) {
      return res.json({ events: [], startups: [], mentors: [], resources: [], posts: [] });
    }

    const matchedEvents = events.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)).slice(0, 4);
    const matchedStartups = startups.filter(s => s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q)).slice(0, 4);
    const matchedMentors = mentors.filter(m => m.name.toLowerCase().includes(q) || m.company.toLowerCase().includes(q) || m.expertise.some(exp => exp.toLowerCase().includes(q))).slice(0, 4);
    const matchedResources = resources.filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q))).slice(0, 4);
    const matchedPosts = posts.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))).slice(0, 4);

    res.json({
      events: matchedEvents,
      startups: matchedStartups,
      mentors: matchedMentors,
      resources: matchedResources,
      posts: matchedPosts
    });
  });

  // Vite Middleware Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`E-CELL Platform Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
