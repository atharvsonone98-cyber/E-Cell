export type UserRole = 'student' | 'mentor' | 'founder' | 'organizer' | 'admin';

export type StartupStage = 'Idea' | 'MVP' | 'Early Stage' | 'Growth' | 'Funded';

export type EventCategory = 
  | 'Workshops' 
  | 'Hackathons' 
  | 'Pitch Competitions' 
  | 'Competitions'
  | 'Conferences'
  | 'Speaker Sessions' 
  | 'Networking' 
  | 'Startup Bootcamps';

export type ResourceCategory = 
  | 'Business' 
  | 'Funding' 
  | 'Marketing' 
  | 'Product' 
  | 'Technology' 
  | 'Legal' 
  | 'Pitching';

export type ResourceType = 'PDF' | 'Template' | 'Video' | 'Article' | 'Guide';

export type XPLevelTitle = 'Explorer' | 'Innovator' | 'Builder' | 'Founder' | 'Entrepreneur';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar: string;
  collegeId?: string;
  branch?: string;
  year?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  lookingFor?: string[];
  xp: number;
  level: number;
  levelTitle: XPLevelTitle;
  badges: Badge[];
  startupId?: string;
  mentorProfile?: {
    company: string;
    role: string;
    experienceYears: number;
    specialization: string[];
    rating: number;
    reviewCount: number;
    availability: string;
    linkedin?: string;
  };
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
  unlocked: boolean;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  domain: 
    | 'Leadership' 
    | 'Final Year Advisors' 
    | 'Management' 
    | 'Publicity & PR' 
    | 'Social Media & Content' 
    | 'Technical' 
    | 'Sponsorship' 
    | 'Discipline' 
    | 'Faculty Advisory'
    | string;
  department: string;
  year?: string;
  avatar: string;
  bio: string;
  email?: string;
  linkedin?: string;
  github?: string;
  isLead?: boolean;
  isFaculty?: boolean;
  tags?: string[];
}

export interface WorkshopTeamMember {
  name: string;
  role: string;
  avatar?: string;
  department?: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  meetingLink?: string;
  bannerImage: string;
  description: string;
  speakers: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  schedule: {
    time: string;
    title: string;
    description: string;
  }[];
  capacity: number;
  registeredCount: number;
  xpReward: number;
  prizePool?: string;
  organizer: string;
  registrationOpen: boolean;
  featured?: boolean;
  workshopTeam?: WorkshopTeamMember[];
  facultyLead?: string;
  prerequisites?: string[];
  takeaways?: string[];
  resourceLinks?: { title: string; url: string; type: 'slides' | 'github' | 'guide' }[];
}

export interface StartupItem {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  banner?: string;
  founderId: string;
  founderName: string;
  founderAvatar: string;
  founderRole: string;
  team: {
    name: string;
    role: string;
    avatar: string;
    branch?: string;
  }[];
  industry: string;
  stage: StartupStage;
  year: number;
  problem: string;
  solution: string;
  marketSize: string;
  businessModel: string;
  technology: string[];
  fundingStatus: string;
  website?: string;
  pitchDeckUrl?: string;
  pitchVideoUrl?: string;
  featured: boolean;
  approved: boolean;
  likes: number;
  likedBy?: string[];
}

export interface MentorItem {
  id: string;
  userId?: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  expertise: string[];
  biography: string;
  achievements: string[];
  companiesWorked: string[];
  availability: string;
  availableDays: string[];
  linkedin: string;
  sessionsCompleted: number;
}

export interface MentorshipRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentBranch?: string;
  topic: string;
  notes: string;
  preferredDate: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  meetingLink?: string;
  createdAt: string;
}

export interface PitchItem {
  id: string;
  startupName: string;
  founderId: string;
  founderName: string;
  founderAvatar: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  market: string;
  videoUrl?: string;
  deckUrl?: string;
  votes: number;
  votedBy: string[];
  score: number; // 0 - 100 Judge score
  mentorFeedbackCount: number;
  stage: 'Submitted' | 'Mentor Review' | 'Community Voting' | 'Judged' | 'Demo Day';
  featured: boolean;
  createdAt: string;
}

export interface CertificateItem {
  id: string;
  certificateId: string; // e.g. ECELL-2026-001245
  userId: string;
  userName: string;
  userEmail: string;
  collegeId: string;
  eventName: string;
  issueDate: string;
  category: string;
  rank?: string;
  qrCodeUrl?: string;
  signatureName: string;
  signatureRole: string;
  status: 'valid' | 'revoked';
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  authorBranch?: string;
  title: string;
  content: string;
  category: 'Ideas' | 'Team Search' | 'Ask Mentor' | 'Feedback' | 'Wins' | 'General';
  tags: string[];
  likes: number;
  likedBy: string[];
  comments: CommunityComment[];
  interestedCount: number;
  interestedUsers: string[];
  createdAt: string;
}

export interface CommunityComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: ResourceCategory;
  type: ResourceType;
  description: string;
  author: string;
  downloadsCount: number;
  fileSize: string;
  readTime?: string;
  url: string;
  tags: string[];
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'event' | 'mentor' | 'certificate' | 'pitch' | 'xp' | 'system';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface CoFounderCandidate {
  id: string;
  name: string;
  avatar: string;
  branch: string;
  year: string;
  skills: string[];
  experience: string;
  interests: string[];
  lookingFor: string[];
  compatibility: number; // e.g. 92
  recommendationReason: string;
  pitchIdea?: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  branch: string;
  xp: number;
  level: number;
  levelTitle: XPLevelTitle;
  badgesCount: number;
  startupsCount: number;
  eventsAttended: number;
}

export interface AdminAnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalStartups: number;
  totalEvents: number;
  totalRegistrations: number;
  totalMentorshipSessions: number;
  totalCertificates: number;
  totalFundingFacilitated: string;
  userGrowth: { label: string; students: number; mentors: number; founders: number }[];
  eventRegistrationsByMonth: { month: string; registrations: number; attendees: number }[];
  startupsByStage: { stage: StartupStage; count: number }[];
  xpDistribution: { level: string; users: number }[];
  recentActivities: { id: string; user: string; action: string; target: string; time: string; type: string }[];
}

export interface EventPhaseFlow {
  planning: string;
  promotion: string;
  execution: string;
  followUp: string;
}

export interface WorkReportTimeline {
  planning?: string;
  promotion?: string;
  execution: string;
  followUp?: string;
}

export interface WorkReportItem {
  id: string;
  eventName: string;
  dateConducted: string;
  shortDescription: string;
  category: 'Hackathons' | 'Competitions' | 'Workshops' | 'Masterclasses' | 'Symposiums & Fests' | 'Student Engagement';
  flow: EventPhaseFlow;
  timeline: WorkReportTimeline;
  venue?: string;
  prizes?: string;
  keyOutcomes?: string[];
  bannerImage?: string;
  speakerOrGuest?: string;
  speakerRole?: string;
  speakerCompany?: string;
  highlightStats?: string;
  attendance?: string;
  department?: string;
}

export interface SeniorConsultedItem {
  name: string;
  contactNo: string;
  email: string;
  yearOfStudy: string;
  postHeld: string;
  avatar?: string;
}
