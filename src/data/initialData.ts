import {
  UserProfile,
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
  CommitteeMember,
  WorkReportItem,
  SeniorConsultedItem,
  GalleryItem,
  AchievementItem,
  InitiativeItem,
  AnnouncementItem,
  SpeakerItem,
  PartnerItem,
  TestimonialItem,
  JoinApplication,
  ContactMessage,
  StoryItem
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-student-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    phone: '+91 98765 43210',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    collegeId: '2023CS0142',
    branch: 'Computer Science & Engineering',
    year: '3rd Year',
    bio: 'Full-stack builder passionate about autonomous systems & EV battery health intelligence. Building VoltSync.',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'IoT', 'Tailwind CSS'],
    interests: ['CleanTech', 'EV Infrastructure', 'AI/ML', 'Robotics'],
    lookingFor: ['Marketing Co-Founder', 'Hardware Specialist', 'Angel Mentor'],
    xp: 680,
    level: 4,
    levelTitle: 'Builder',
    startupId: 'stp-1',
    badges: [
      { id: 'b1', name: 'Pitch Champion', description: 'Placed in Top 3 at Inter-College Demo Day', icon: '🏆', unlocked: true, earnedAt: '2026-02-15' },
      { id: 'b2', name: 'MVP Builder', description: 'Shipped and deployed functional MVP on cloud', icon: '🚀', unlocked: true, earnedAt: '2026-01-20' },
      { id: 'b3', name: 'Idea Generator', description: 'Validated 3 concepts through customer interviews', icon: '💡', unlocked: true, earnedAt: '2025-11-10' },
      { id: 'b4', name: 'Networker', description: 'Connected with 5+ alumni mentors in ecosystem', icon: '🤝', unlocked: true, earnedAt: '2025-12-05' },
      { id: 'b5', name: 'Startup Founder', description: 'Incorporated active startup in campus incubator', icon: '🔥', unlocked: true, earnedAt: '2026-03-01' }
    ],
    createdAt: '2025-08-10'
  },
  {
    id: 'usr-admin-1',
    name: 'Atharv Sonone',
    email: 'atharvsonone98@gmail.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    collegeId: 'SSGMCE-OWNER-01',
    branch: 'Lead & Administrator • E-Cell SSGMCE',
    bio: 'Platform Owner & Lead Administrator, E-Cell SSGMCE (Shri Sant Gajanan Maharaj College of Engineering, Shegaon). Empowering student entrepreneurs and startup ecosystems.',
    xp: 3200,
    level: 5,
    levelTitle: 'Entrepreneur',
    badges: [
      { id: 'b-owner', name: 'Platform Founder', description: 'Lead Administrator & Ecosystem Architect of E-Cell SSGMCE', icon: '👑', unlocked: true, earnedAt: '2026-01-01' }
    ],
    createdAt: '2024-01-01'
  },
  {
    id: 'usr-mentor-1',
    name: 'Priyanka Nambiar',
    email: 'priyanka@nexusventures.in',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bio: 'VP of Product at ScaleStream. Former Y-Combinator Alum (W21). Passionate about early-stage B2B SaaS.',
    mentorProfile: {
      company: 'ScaleStream (ex-Stripe)',
      role: 'VP of Product',
      experienceYears: 11,
      specialization: ['Product Strategy', 'Fundraising', 'B2B GTM', 'Pricing'],
      rating: 4.95,
      reviewCount: 38,
      availability: 'Wed & Sat • 4:00 PM - 7:00 PM IST',
      linkedin: 'https://linkedin.com/in/priyanka-nambiar'
    },
    xp: 1850,
    level: 5,
    levelTitle: 'Entrepreneur',
    badges: [],
    createdAt: '2024-06-15'
  }
];

export const INITIAL_COMMITTEE: CommitteeMember[] = [
  // ==========================================
  // TEAM – NAVONMESH 2026-27 (E-CELL SSGMCE)
  // ==========================================

  // 1. EXECUTIVE LEADERSHIP
  {
    id: 'comm-1',
    name: 'Atharv Sonone',
    role: 'Chairperson',
    domain: 'Leadership',
    department: 'Computer Science & Engineering',
    year: 'Final Year (BE)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Chairperson & Platform Architect of E-Cell SSGMCE (Team Navonmesh 2026-27). Leading incubation strategy, national venture challenges, and student founder ecosystem.',
    email: 'atharvsonone98@gmail.com',
    linkedin: 'https://linkedin.com/in/atharvsonone',
    github: 'https://github.com/atharvsonone',
    isLead: true,
    tags: ['Chairperson', 'Team Navonmesh', 'Lead Administrator']
  },
  {
    id: 'comm-2',
    name: 'Dolly Bhutada',
    role: 'Vice-Chairperson',
    domain: 'Leadership',
    department: 'SSGMCE Shegaon',
    year: 'Final Year (BE)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Vice-Chairperson driving strategic execution, inter-domain synchronization, and enterprise partnerships across collegiate innovation tracks.',
    email: 'dolly.bhutada@ssgmce.ac.in',
    linkedin: 'https://linkedin.com',
    tags: ['Vice-Chairperson', 'Strategic Planning']
  },
  {
    id: 'comm-coo',
    name: 'Amol Gawande',
    role: 'Chief Operating Officer (COO)',
    domain: 'Leadership',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Chief Operating Officer orchestrating daily operations, wing execution matrices, and milestone delivery for Team Navonmesh.',
    email: 'amol.gawande@ssgmce.ac.in',
    tags: ['COO', 'Operations Executive']
  },
  {
    id: 'comm-gs',
    name: 'Sanchita Gawande',
    role: 'General Secretary',
    domain: 'Leadership',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'General Secretary heading institutional governance, official council correspondence, and cross-cell coordination.',
    email: 'sanchita.gawande@ssgmce.ac.in',
    tags: ['General Secretary', 'Governance']
  },
  {
    id: 'comm-js',
    name: 'Sarvesh Werulakar',
    role: 'Joint Secretary',
    domain: 'Leadership',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Joint Secretary managing wing communications, council documentation, and inter-departmental event alignment.',
    email: 'sarvesh.werulakar@ssgmce.ac.in',
    tags: ['Joint Secretary', 'Coordination']
  },
  {
    id: 'comm-tr',
    name: 'Ram Kharat',
    role: 'Treasurer',
    domain: 'Leadership',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing financial budgeting, sponsorship ledgering, seed grant disbursements, and cash flow governance for E-Cell initiatives.',
    email: 'ram.kharat@ssgmce.ac.in',
    tags: ['Treasurer', 'Finance & Budget']
  },

  // 2. FINAL YEAR ADVISORS
  {
    id: 'adv-1',
    name: 'Nihal Kankal',
    role: 'Final Year Advisor',
    domain: 'Final Year Advisors',
    department: 'Final Year, SSGMCE',
    year: 'Final Year (BE)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    bio: 'Senior advisor providing mentorship on institutional heritage, hackathon scaling, and strategic venture roadmaps.',
    tags: ['Final Year Advisor', 'Senior Mentor']
  },
  {
    id: 'adv-2',
    name: 'Rutuja Deshmukh',
    role: 'Final Year Advisor',
    domain: 'Final Year Advisors',
    department: 'Final Year, SSGMCE',
    year: 'Final Year (BE)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Senior advisor guiding founder validation, pitch deck storytelling, and corporate sponsorship relations.',
    tags: ['Final Year Advisor', 'Incubation Mentor']
  },
  {
    id: 'adv-3',
    name: 'Sanchit Dangra',
    role: 'Final Year Advisor',
    domain: 'Final Year Advisors',
    department: 'Final Year, SSGMCE',
    year: 'Final Year (BE)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    bio: 'Senior advisor specializing in ecosystem building, industry outreach, and student entrepreneur guidance.',
    tags: ['Final Year Advisor', 'Strategy Advisor']
  },

  // 3. TECHNICAL WING
  {
    id: 'tech-head',
    name: 'Om Hurpade',
    role: 'Technical Head',
    domain: 'Technical',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    bio: 'Leading the development of E-Cell web platforms, automated evaluation tools, and technology infrastructure.',
    email: 'om.hurpade@ssgmce.ac.in',
    github: 'https://github.com',
    tags: ['Technical Head', 'Full-Stack', 'Systems']
  },
  {
    id: 'tech-1',
    name: 'Ram Bhosale',
    role: 'Technical Team Member',
    domain: 'Technical',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    bio: 'Developing interactive web features, certificate validation tools, and event management modules.',
    tags: ['Technical Team', 'Web Developer']
  },
  {
    id: 'tech-2',
    name: 'Sarvesh Mesare',
    role: 'Technical Team Member',
    domain: 'Technical',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Building frontend user interfaces, responsive portals, and real-time leaderboard trackers.',
    tags: ['Technical Team', 'Frontend Engineer']
  },
  {
    id: 'tech-3',
    name: 'Ram',
    role: 'Technical Team Member',
    domain: 'Technical',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Working on backend integrations, API endpoints, and cloud database persistence.',
    tags: ['Technical Team', 'Software Dev']
  },

  // 4. MANAGEMENT & NEC WING
  {
    id: 'mgmt-head',
    name: 'Satyajeet Patil',
    role: 'Management Head',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Head of Management overseeing event logistics, auditorium bookings, stage execution, and volunteer coordination.',
    email: 'satyajeet.patil@ssgmce.ac.in',
    tags: ['Management Head', 'Operations Lead']
  },
  {
    id: 'mgmt-nec',
    name: 'Gargi Mane',
    role: 'NEC Task Manager',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing National Entrepreneurship Challenge (NEC) submissions, milestone compliances, and task tracking for SSGMCE.',
    email: 'gargi.mane@ssgmce.ac.in',
    tags: ['NEC Task Manager', 'National Challenge']
  },
  {
    id: 'mgmt-1',
    name: 'Rahul Bombatkar',
    role: 'Management Team Member',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    bio: 'Coordinating venue readiness, audio-visual operations, and stage hospitality.',
    tags: ['Management Team', 'Event Logistics']
  },
  {
    id: 'mgmt-2',
    name: 'Nidhi Khodpe',
    role: 'Management Team Member',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Handling attendee registrations, participant seating flows, and helpdesk desks.',
    tags: ['Management Team', 'Hospitality']
  },
  {
    id: 'mgmt-3',
    name: 'Mrunal Nimkarde',
    role: 'Management Team Member',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing registration booths, speaker escorts, and kit distributions.',
    tags: ['Management Team', 'Operations']
  },
  {
    id: 'mgmt-4',
    name: 'Hemant Karkare',
    role: 'Management Team Member',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing equipment logistics, on-ground crowd movements, and timer countdowns for pitch sessions.',
    tags: ['Management Team', 'Logistics']
  },
  {
    id: 'mgmt-5',
    name: 'Gauri Raut',
    role: 'Management Team Member',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    bio: 'Assisting workshop execution, attendee refreshments, and resource distribution.',
    tags: ['Management Team', 'Coordination']
  },
  {
    id: 'mgmt-6',
    name: 'Mayuri Thakare',
    role: 'Management Team Member',
    domain: 'Management',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Handling delegate registrations, certificate handovers, and session desk operations.',
    tags: ['Management Team', 'Admin Support']
  },

  // 5. PUBLICITY & PUBLIC RELATIONS WING
  {
    id: 'pr-head',
    name: 'Ajay Pawar',
    role: 'Public Relations Manager & Publicity Head',
    domain: 'Publicity & PR',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    bio: 'Heading Public Relations and Campus Publicity campaigns, classroom drives, and press communications across Vidarbha colleges.',
    email: 'ajay.pawar@ssgmce.ac.in',
    tags: ['Public Relations Manager', 'Publicity Head', 'Outreach']
  },
  {
    id: 'pub-1',
    name: 'Tejram Dudhapachare',
    role: 'Publicity Team Member',
    domain: 'Publicity & PR',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Leading classroom campaigns, college noticeboard drives, and student engagement.',
    tags: ['Publicity Team', 'Campus Campaigner']
  },
  {
    id: 'pub-2',
    name: 'Dhammjot Helode',
    role: 'Publicity Team Member',
    domain: 'Publicity & PR',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Organizing inter-department announcements, flier distribution, and word-of-mouth outreach.',
    tags: ['Publicity Team', 'Promotions']
  },
  {
    id: 'pub-3',
    name: 'Rutuja Aadarkar',
    role: 'Publicity Team Member',
    domain: 'Publicity & PR',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Facilitating student interactions, club collabs, and event signups across batches.',
    tags: ['Publicity Team', 'Outreach']
  },
  {
    id: 'pub-4',
    name: 'Shashwat Joshi',
    role: 'Publicity Team Member',
    domain: 'Publicity & PR',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    bio: 'Coordinating flash announcements, desk promotions, and peer network outreach.',
    tags: ['Publicity Team', 'Outreach']
  },
  {
    id: 'pub-5',
    name: 'Tanisha Mahore',
    role: 'Publicity Team Member',
    domain: 'Publicity & PR',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Promoting hackathon registrations and workshop awareness among early-year engineering students.',
    tags: ['Publicity Team', 'Student Outreach']
  },

  // 6. SOCIAL MEDIA & CONTENT WING
  {
    id: 'sm-head',
    name: 'Swaraj Deshmukh',
    role: 'Social Media Head',
    domain: 'Social Media & Content',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    bio: 'Directing digital media presence, Instagram reels, LinkedIn storyboards, and algorithmic reach for E-Cell SSGMCE.',
    email: 'swaraj.deshmukh@ssgmce.ac.in',
    tags: ['Social Media Head', 'Digital Creator']
  },
  {
    id: 'content-head',
    name: 'Ashlesha Sultane',
    role: 'Content Head',
    domain: 'Social Media & Content',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Crafting official captions, newsletter articles, keynote scripts, and storytelling for student ventures.',
    email: 'ashlesha.sultane@ssgmce.ac.in',
    tags: ['Content Head', 'Copywriting & Editorial']
  },
  {
    id: 'sm-1',
    name: 'Vedant Ghorade',
    role: 'Social Media Team Member',
    domain: 'Social Media & Content',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    bio: 'Producing video snippets, event highlights, and engaging interactive stories.',
    tags: ['Social Media Team', 'Video & Stories']
  },
  {
    id: 'sm-2',
    name: 'Pavan Thombare',
    role: 'Social Media Team Member',
    domain: 'Social Media & Content',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Managing live coverage during hackathons, keynote reels, and post-event analytics.',
    tags: ['Social Media Team', 'Content Production']
  },

  // 7. SPONSORSHIP WING
  {
    id: 'spon-head',
    name: 'Ritik Kale',
    role: 'Sponsorship Head',
    domain: 'Sponsorship',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Leading corporate sponsorship pitches, industry partnerships, grant applications, and partner deliverables.',
    email: 'ritik.kale@ssgmce.ac.in',
    tags: ['Sponsorship Head', 'Corporate Alliances', 'Fundraising']
  },

  // 8. DISCIPLINE & PROTOCOL WING
  {
    id: 'disc-head',
    name: 'Yash Nemane',
    role: 'Discipline Head',
    domain: 'Discipline',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Overseeing campus discipline, event conduct protocols, security coordination, and code-of-conduct adherence.',
    email: 'yash.nemane@ssgmce.ac.in',
    tags: ['Discipline Head', 'Protocol & Security']
  },
  {
    id: 'disc-1',
    name: 'Vaishnavi Dhamankar',
    role: 'Discipline Team Member',
    domain: 'Discipline',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Ensuring orderly seating, registration queues, and participant compliance during major summits.',
    tags: ['Discipline Team', 'Protocol Coordinator']
  },
  {
    id: 'disc-2',
    name: 'Shantika Ugle',
    role: 'Discipline Team Member',
    domain: 'Discipline',
    department: 'SSGMCE Shegaon',
    year: '2nd / 3rd Year',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Assisting auditorium discipline, volunteer duty schedules, and entry-pass verifications.',
    tags: ['Discipline Team', 'Event Protocol']
  },

  // 9. FACULTY ADVISORY BOARD
  {
    id: 'fac-1',
    name: 'Dr. S. B. Somani',
    role: 'Chief Patron & Principal',
    domain: 'Faculty Advisory',
    department: 'Principal, SSGMCE Shegaon',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Guiding SSGMCE Shegaon towards national innovation rankings and supporting student-led entrepreneurship with institutional grants.',
    email: 'principal@ssgmce.ac.in',
    isFaculty: true,
    tags: ['Chief Patron', 'Institutional Leadership']
  },
  {
    id: 'fac-2',
    name: 'Prof. C. M. Mankar',
    role: 'Chief Faculty Coordinator & Incubation Head',
    domain: 'Faculty Advisory',
    department: 'Innovation & Incubation Council, SSGMCE',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    bio: 'Chief Mentor overseeing government grant schemes (NIDHI-PRAYAS, MSME), patent facilitation, and seed incubation at the SSGMCE Innovation Complex.',
    email: 'cmmankar@ssgmce.ac.in',
    isFaculty: true,
    tags: ['Faculty Advisor', 'Incubation Head', 'Grant Mentor']
  },
  {
    id: 'fac-3',
    name: 'Dr. D. D. Nawgaje',
    role: 'Senior Advisory Member',
    domain: 'Faculty Advisory',
    department: 'Head, Dept of Electronics & Telecommunication',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Advising deep-tech and hardware startups in embedded IoT, VLSI prototyping, and national technical challenges.',
    email: 'ddnawgaje@ssgmce.ac.in',
    isFaculty: true,
    tags: ['Faculty Advisor', 'Hardware & IoT Desk']
  },
  {
    id: 'fac-4',
    name: 'Prof. S. U. Deshmukh',
    role: 'Faculty Technical Mentor',
    domain: 'Faculty Advisory',
    department: 'Dept of Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    bio: 'Mentoring student developers in AI/ML algorithms, cloud scalability, software security, and hackathon technical evaluations.',
    email: 'sudeshmukh@ssgmce.ac.in',
    isFaculty: true,
    tags: ['Faculty Advisor', 'AI & Software Mentor']
  },
  {
    id: 'fac-5',
    name: 'Prof. P. M. Kuchar',
    role: 'Faculty Prototyping Mentor',
    domain: 'Faculty Advisory',
    department: 'Dept of Mechanical Engineering',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Facilitating rapid mechanical fabrication, 3D printing, and CleanTech automotive prototype development in campus fabrication labs.',
    email: 'pmkuchar@ssgmce.ac.in',
    isFaculty: true,
    tags: ['Faculty Advisor', 'Fab Lab & Prototyping']
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ecell-summit-26',
    title: "E-Summit '26: Annual Entrepreneurship & Venture Summit",
    tagline: 'Central India’s Largest Student Venture Congress & Innovation Conclave with ₹1,50,000+ Prize Pool',
    category: 'Pitch Competitions',
    date: '2026-04-18',
    time: '09:30 AM - 06:30 PM IST',
    location: 'SSGMCE Main Auditorium & Centenary Quadrangle, Shegaon',
    isVirtual: false,
    bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80',
    description: 'E-Summit is the annual flagship entrepreneurship congress of E-Cell SSGMCE. Uniting visionary venture capitalists, angel syndicates, startup founders, and collegiate innovators across India for keynote masterclasses, 50+ startup stalls expo, high-stakes live pitch battles, and venture grant matching.',
    facultyLead: 'Prof. C. M. Mankar (Chief Incubation Head) & Dr. S. B. Somani',
    workshopTeam: [
      { name: 'Atharv Sonone', role: 'Chairperson & Executive Lead', department: 'E-Cell SSGMCE' },
      { name: 'Satyajeet Patil', role: 'Management Head', department: 'Management Wing' },
      { name: 'Ajay Pawar', role: 'Publicity Head', department: 'PR Wing' },
      { name: 'Om Hurpade', role: 'Technical Head', department: 'Technical Wing' }
    ],
    prerequisites: [
      'Open to all student entrepreneurs, researchers, and tech enthusiasts',
      'Team or individual registration with College ID',
      'Pitch decks in PPTX/PDF for startup expo participants'
    ],
    takeaways: [
      '₹1,50,000+ Total Cash Prizes, Venture Grants & Trophies',
      'Direct one-on-one networking with 15+ visiting Angel Investors & VCs',
      'SSGMCE Incubation Center Fast-Track Pre-Seed Access',
      'Official E-Summit Certificate of Excellence & Swag Kits'
    ],
    speakers: [
      { name: 'Devendra Rao', role: 'Founder & CEO', company: 'NeuralForge AI', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kavita Menon', role: 'Principal Partner', company: 'Peak Venture Capital', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
      { name: 'Sameer Joshi', role: 'Co-Founder & CEO', company: 'ZetaFlow (Alum)', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' }
    ],
    schedule: [
      { time: '09:30 AM', title: 'Grand Inauguration & Keynote Address', description: 'Opening by College Dignitaries and Chief Guest Venture Capitalists.' },
      { time: '11:00 AM', title: 'Startup Expo & Innovation Stalls Walkthrough', description: 'Interactive demo booths featuring 50+ student ventures.' },
      { time: '02:00 PM', title: 'E-Summit Shark Pitch Arena (Top 10 Finalists)', description: '5-minute live founder pitches in front of angel jury.' },
      { time: '05:00 PM', title: 'Award Ceremony & Seed Grant Commitments', description: 'Prize handover and incubation onboarding.' }
    ],
    capacity: 600,
    registeredCount: 485,
    xpReward: 60,
    prizePool: '₹1,50,000+ Cash Prizes & Grants',
    organizer: 'E-Cell SSGMCE Core Committee',
    registrationOpen: true,
    featured: true
  },
  {
    id: 'ecell-genesis-ideathon',
    title: "GENESIS '26: National Ideathon & B-Plan Challenge",
    tagline: 'Transform Disruptive Ideas into Seed-Funded Startups with ₹50,000+ Cash Pool',
    category: 'Hackathons',
    date: '2026-05-02',
    time: '10:00 AM - 06:00 PM IST',
    location: 'SSGMCE Innovation Complex & Computer Labs, Shegaon',
    isVirtual: false,
    bannerImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80',
    description: 'Genesis is E-Cell SSGMCE’s flagship inter-college ideathon and business model challenge. Teams tackle real-world tracks across AgriTech, AI SaaS, Clean Energy, Rural FinTech, and MedTech to pitch viable commercial solutions to industry evaluators.',
    facultyLead: 'Prof. S. U. Deshmukh & Dr. D. D. Nawgaje',
    workshopTeam: [
      { name: 'Om Hurpade', role: 'Technical & Challenge Lead', department: 'Technical Wing' },
      { name: 'Swaraj Deshmukh', role: 'Media & Marketing Lead', department: 'Media Wing' },
      { name: 'Ritik Kale', role: 'Sponsorship Lead', department: 'Sponsorship Wing' }
    ],
    prerequisites: [
      'Teams of 2 to 4 students (inter-departmental teams encouraged)',
      'Executive summary or slide deck covering problem, TAM, and solution',
      'Laptop for live deck refinement during mentoring clinic'
    ],
    takeaways: [
      '₹50,000 Cash Prizes across Track Winners',
      'Guaranteed 6-month pre-incubation desk at SSGMCE Innovation Center',
      'Mentorship from successful alumni founders and product directors',
      'National Ideathon Certification'
    ],
    speakers: [
      { name: 'Manoj Joshi', role: 'Director of Systems', company: 'VoltTech Innovations', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    schedule: [
      { time: '10:00 AM', title: 'Ideathon Briefing & Mentor Clinic', description: 'Refining value proposition with allocated startup mentors.' },
      { time: '01:30 PM', title: 'Round 1: Track-wise Screening Pitches', description: 'Parallel jury rooms for AgriTech, AI, and CleanTech.' },
      { time: '04:30 PM', title: 'Grand Finale Showcase', description: 'Top 6 teams pitch on the main stage.' }
    ],
    capacity: 250,
    registeredCount: 194,
    xpReward: 45,
    prizePool: '₹50,000 Cash Prizes + Incubation Support',
    organizer: 'E-Cell SSGMCE Innovation Wing',
    registrationOpen: true,
    featured: true
  },
  {
    id: 'ecell-bootcamp-3',
    title: 'Startup Launchpad Bootcamp 3.0: 0 to MVP in 7 Days',
    tagline: 'Intensive 7-Day Founder Cohort: Market Validation, Prototyping & Seed Readiness',
    category: 'Startup Bootcamps',
    date: '2026-05-15',
    time: '04:00 PM - 07:00 PM IST (Daily Evening Sprints)',
    location: 'SSGMCE Incubation Center Lab & Hybrid Stream',
    isVirtual: true,
    meetingLink: 'https://meet.google.com/ecell-startup-bootcamp',
    bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    description: 'An elite 7-day experiential bootcamp created specifically for early-stage student founders. Covers customer discovery, unit economics, rapid full-stack prototyping with AI tools, IP/legal incorporation, and creating pitch decks that convert.',
    facultyLead: 'Prof. C. M. Mankar & Prof. P. M. Kuchar',
    workshopTeam: [
      { name: 'Atharv Sonone', role: 'Cohort Director', department: 'E-Cell SSGMCE' },
      { name: 'Ashlesha Sultane', role: 'Editorial & Content Lead', department: 'Content Wing' },
      { name: 'Sanchita Gawande', role: 'Cohort Ops Coordinator', department: 'Leadership' }
    ],
    prerequisites: [
      'Early-stage concept, prototype, or willingness to build a venture',
      'Commitment to attend all 7 evening modules and complete milestone deliverables'
    ],
    takeaways: [
      'Comprehensive Founder Playbook & Financial Model Templates',
      '$1,500 AWS / Google Cloud Compute Credits per graduating team',
      'Direct entry to SSGMCE Angel Syndicate Pitch Night',
      'Bootcamp Graduate Founder Credential'
    ],
    speakers: [
      { name: 'Rohan Mehra', role: 'Managing Partner', company: 'Campus Founders Fund', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ananya Roy', role: 'Principal Investor', company: 'Antler India', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    schedule: [
      { time: 'Day 1', title: 'Problem Discovery & TAM Quantification', description: 'Frameworks for non-obvious market opportunities.' },
      { time: 'Day 3', title: 'Rapid Full-Stack Prototyping & AI Workflows', description: 'Building the core functional MVP in 48 hours.' },
      { time: 'Day 5', title: 'Unit Economics, Pricing & Go-To-Market', description: 'Customer acquisition cost vs lifetime value.' },
      { time: 'Day 7', title: 'Demo Day & Cohort Graduation', description: 'Live pitch presentations to angel mentors.' }
    ],
    capacity: 100,
    registeredCount: 88,
    xpReward: 50,
    prizePool: 'Cloud Credits ($1,500/team) + Incubation Grants',
    organizer: 'E-Cell SSGMCE Incubation Wing',
    registrationOpen: true,
    featured: true
  },
  {
    id: 'evt-ai-workshop',
    title: 'Zero to One: Building Full-Stack AI Products',
    tagline: 'Architecting Scalable SaaS & Gemini AI Workflows with SSGMCE Labs',
    category: 'Workshops',
    date: '2026-04-10',
    time: '04:30 PM - 07:30 PM IST',
    location: 'SSGMCE Computer Center Lab 304 & Live Stream',
    isVirtual: true,
    bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    description: 'Learn how to architect, validate, and ship a production MVP in 7 days using modern full-stack frameworks, serverless cloud databases, and Gemini AI agentic workflows.',
    facultyLead: 'Prof. S. U. Deshmukh (CSE)',
    workshopTeam: [
      { name: 'Atharv Sonone', role: 'Chairperson & Full-Stack Lead', department: 'E-Cell SSGMCE' },
      { name: 'Om Hurpade', role: 'Technical Head', department: 'Technical Wing' }
    ],
    prerequisites: ['Laptop with Node.js and VS Code', 'Basic JavaScript / Python knowledge'],
    takeaways: ['Deployable SaaS starter template', 'Free $1,000 cloud compute credits', 'Workshop Certificate'],
    speakers: [
      { name: 'Siddharth Iyer', role: 'Principal Architect', company: 'HyperScale Systems', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' }
    ],
    schedule: [
      { time: '04:30 PM', title: 'Scoping the Minimum Viable Loop', description: 'Eliminating bloated features.' },
      { time: '05:30 PM', title: 'Live Coding: Rapid Full-Stack Deployment', description: 'Building the database, auth, and AI microservice.' }
    ],
    capacity: 150,
    registeredCount: 132,
    xpReward: 20,
    prizePool: 'Cloud Hosting Credits ($1,000/team)',
    organizer: 'E-Cell SSGMCE Technical Wing',
    registrationOpen: true,
    featured: false
  },
  {
    id: 'evt-4',
    title: 'Angel Syndicate Pitch Night: Pre-Seed Demo Hour',
    tagline: '10 Student Startups pitch live to 12 Active Angel Investors',
    category: 'Pitch Competitions',
    date: '2026-09-26',
    time: '05:00 PM - 08:30 PM IST',
    location: 'SSGMCE Seminar Hall 1, Administrative Wing',
    isVirtual: false,
    bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80',
    description: 'Our premier investor showcase where the semester’s most promising SSGMCE startups present their traction, unit economics, and growth roadmap for direct angel cheque facilitation.',
    facultyLead: 'Prof. C. M. Mankar (Incubation Head)',
    workshopTeam: [
      { name: 'Atharv Sonone', role: 'Lead & Moderator', department: 'E-Cell SSGMCE' },
      { name: 'Shruti Tayade', role: 'Startup Relations Head', department: 'CSE' },
      { name: 'Saurabh Raut', role: 'Investor Liaison Lead', department: 'Mech' }
    ],
    speakers: [
      { name: 'Rohan Mehra', role: 'Managing Partner', company: 'Campus Founders Fund', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ananya Roy', role: 'Principal Investor', company: 'Antler India', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    schedule: [
      { time: '05:00 PM', title: 'Investor Networking & Tea', description: 'Private briefing for syndicate members and faculty.' },
      { time: '05:30 PM', title: '10 Founder Pitches (5 min pitch + 4 min Q&A)', description: 'High-intensity student venture pitches.' },
      { time: '07:30 PM', title: 'Term Sheet Expressions of Interest & Awards', description: 'Cheque matching and incubation grants.' }
    ],
    capacity: 80,
    registeredCount: 68,
    xpReward: 35,
    prizePool: '₹25,00,000 Syndicate Commitment Pool',
    organizer: 'E-Cell SSGMCE Corporate Relations Desk',
    registrationOpen: true,
    featured: false
  },
  {
    id: 'evt-5',
    title: 'Venture Fireside: From SSGMCE Classroom to $100M Valuation',
    tagline: 'Exclusive interactive session with Alumni Unicorn Founder',
    category: 'Speaker Sessions',
    date: '2026-10-04',
    time: '06:00 PM - 07:45 PM IST',
    location: 'SSGMCE Centenary Hall & Virtual Stream',
    isVirtual: true,
    meetingLink: 'https://meet.google.com/ecell-fireside-unicorn',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80',
    description: 'Hear raw, unvarnished lessons on early customer discovery, surviving brutal co-founder breakups, pivoting during market shifts, and executing high-growth viral distribution.',
    facultyLead: 'Dr. S. B. Somani & Prof. C. M. Mankar',
    workshopTeam: [
      { name: 'Tanvi Shinde', role: 'Speaker Relations Lead', department: 'EE' },
      { name: 'Pranali More', role: 'PR & Media Coordinator', department: 'EXTC' }
    ],
    speakers: [
      { name: 'Sameer Joshi', role: 'Co-Founder & CEO', company: 'ZetaFlow (Alum 2018)', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' }
    ],
    schedule: [
      { time: '06:00 PM', title: 'Fireside Chat: The 0 to 1 Inflection Point', description: 'Early campus traction stories.' },
      { time: '06:50 PM', title: 'Open Audience Mic Q&A', description: 'Direct questions from student entrepreneurs.' }
    ],
    capacity: 500,
    registeredCount: 420,
    xpReward: 15,
    organizer: 'E-Cell SSGMCE Speaker Relations Desk',
    registrationOpen: true,
    featured: false
  }
];

export const INITIAL_STARTUPS: StartupItem[] = [
  {
    id: 'stp-1',
    name: 'VoltSync Intelligence',
    tagline: 'AI-driven Battery Analytics & Predictive Health for Commercial EV Fleets',
    logo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1558441719-8ef3c9886fa7?w=1000&auto=format&fit=crop&q=80',
    founderId: 'usr-student-1',
    founderName: 'Aarav Sharma',
    founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    founderRole: 'Founder & CEO',
    team: [
      { name: 'Aarav Sharma', role: 'CEO & Algorithms Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', branch: 'CSE 3rd Year' },
      { name: 'Tanvi Deshmukh', role: 'CTO & Embedded Hardware', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80', branch: 'ECE 3rd Year' },
      { name: 'Kunal Patel', role: 'Head of Growth', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', branch: 'Mech 4th Year' }
    ],
    industry: 'CleanTech / EV',
    stage: 'Early Stage',
    year: 2025,
    problem: 'Commercial EV fleet operators lose up to 30% of lifetime battery asset value due to undetected thermal degradation, unbalanced cell cycles, and unplanned depot breakdowns.',
    solution: 'Plug-and-play IoT telemetry module coupled with cloud physics-informed machine learning that predicts thermal runaways 48 hours in advance and optimizes charging schedules.',
    marketSize: '$14.2B Global EV Telematics & Battery Health Market by 2030 (CAGR 24.5%)',
    businessModel: 'B2B SaaS: ₹1,200/vehicle/month hardware + predictive diagnostic telemetry suite.',
    technology: ['Python', 'TensorFlow', 'IoT / CAN-bus', 'Node.js', 'React', 'TimescaleDB'],
    fundingStatus: '₹15L Seed Grant from DST & NIDHI Prayas Incubator',
    website: 'https://voltsync.example.com',
    pitchDeckUrl: '#',
    pitchVideoUrl: 'https://youtube.com',
    featured: true,
    approved: true,
    likes: 142,
    likedBy: ['usr-student-1', 'usr-mentor-1']
  },
  {
    id: 'stp-2',
    name: 'MediMorph AI',
    tagline: 'Autonomous Pathology Slide Pre-Screening & Cancer Triage Software',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=80',
    founderId: 'usr-student-2',
    founderName: 'Dr. Rehea Chakraborty',
    founderAvatar: 'https://images.unsplash.com/photo-1594824813589-9a738676239f?w=200&auto=format&fit=crop&q=80',
    founderRole: 'Founder & Chief Medical Officer',
    team: [
      { name: 'Dr. Rehea Chakraborty', role: 'CMO', avatar: 'https://images.unsplash.com/photo-1594824813589-9a738676239f?w=200&auto=format&fit=crop&q=80', branch: 'BioMed 4th Year' },
      { name: 'Harshit Varma', role: 'Computer Vision Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', branch: 'AI/ML 4th Year' }
    ],
    industry: 'HealthTech',
    stage: 'MVP',
    year: 2026,
    problem: 'Tier-2/3 diagnostic clinics suffer a 2-week backlog for histological slide interpretations due to acute shortages of oncopathologists.',
    solution: 'Deep learning gigapixel pathology scanner software that triages biopsy slides in 45 seconds with 98.4% sensitivity.',
    marketSize: '$3.8B Digital Pathology and AI Oncology market in APAC.',
    businessModel: 'Usage-based API pricing per slide processed with hospital PACS enterprise integration.',
    technology: ['PyTorch', 'FastAPI', 'Wasm', 'React', 'Docker'],
    fundingStatus: 'Bootstrapped + ₹5L E-Cell Genesis Grant',
    website: 'https://medimorph.example.com',
    pitchDeckUrl: '#',
    featured: true,
    approved: true,
    likes: 98,
    likedBy: []
  },
  {
    id: 'stp-3',
    name: 'KisanLedger',
    tagline: 'Decentralized Micro-Invoice Discounting for Rural Agri-Commodity FPOs',
    logo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000&auto=format&fit=crop&q=80',
    founderId: 'usr-student-3',
    founderName: 'Aditya Patil',
    founderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    founderRole: 'Founder & Product Lead',
    team: [
      { name: 'Aditya Patil', role: 'CEO', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80', branch: 'IT 3rd Year' },
      { name: 'Megha Rao', role: 'FinTech Compliance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', branch: 'MBA Fintech' }
    ],
    industry: 'FinTech / AgriTech',
    stage: 'Early Stage',
    year: 2025,
    problem: 'Smallholder Farmer Producer Organisations wait 90+ days for payment settlement from institutional mandis, crippling harvest working capital.',
    solution: 'Instant 48-hour invoice liquidity platform backed by automated warehouse e-receipt verification and NBFC liquidity pools.',
    marketSize: '$28B Indian Agri-Supply Chain Working Capital Credit Gap.',
    businessModel: '1.2% origination fee on funded invoices + treasury underwriting spread.',
    technology: ['Next.js', 'Go', 'PostgreSQL', 'UPI 2.0 / AA'],
    fundingStatus: '₹10L Pre-Seed Angel Round',
    website: 'https://kisanledger.example.com',
    pitchDeckUrl: '#',
    featured: false,
    approved: true,
    likes: 83,
    likedBy: []
  },
  {
    id: 'stp-4',
    name: 'CyberShield Sentinel',
    tagline: 'Zero-Trust Endpoint Isolation for Educational Campus Infrastructure',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80',
    founderId: 'usr-student-4',
    founderName: 'Sanjay Reddy',
    founderAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    founderRole: 'Security Lead',
    team: [
      { name: 'Sanjay Reddy', role: 'Security Architect', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80', branch: 'CyberSecurity 4th Year' }
    ],
    industry: 'DeepTech / SaaS',
    stage: 'Growth',
    year: 2024,
    problem: 'University and research networks suffer constant ransomware vectors through unsecured BYOD student laptops.',
    solution: 'Kernel-level micro-segmentation agent that isolates malicious outbound egress traffic in sub-milliseconds.',
    marketSize: '$7.4B Higher Education & Research Cybersecurity TAM.',
    businessModel: 'Annual institutional campus licensing ($4/student/year).',
    technology: ['Rust', 'eBPF', 'React', 'WebSockets', 'AWS'],
    fundingStatus: '₹35L Angel Round + Active in 4 Engineering Campuses',
    website: 'https://cybershield.example.com',
    pitchDeckUrl: '#',
    featured: true,
    approved: true,
    likes: 116,
    likedBy: []
  }
];

export const INITIAL_MENTORS: MentorItem[] = [
  {
    id: 'mnt-1',
    name: 'Priyanka Nambiar',
    role: 'VP of Product',
    company: 'ScaleStream (ex-Stripe)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    experienceYears: 11,
    rating: 4.95,
    reviewCount: 38,
    expertise: ['Product Strategy', 'Fundraising', 'B2B GTM', 'Pricing Models'],
    biography: 'Built and scaled B2B infrastructure products processing $2B+ in annual transaction volume. Passionate about helping collegiate technical founders find repeatable product-market fit.',
    achievements: [
      'YC W21 Alum with $12M Series A raised',
      'Mentored 24 student ventures to institutional seed rounds',
      'Keynote Speaker at ProductCon Asia'
    ],
    companiesWorked: ['Stripe', 'Freshworks', 'ScaleStream'],
    availability: 'Wed & Sat • 4:00 PM - 7:00 PM IST',
    availableDays: ['Wednesday', 'Saturday'],
    linkedin: 'https://linkedin.com/in/priyanka-nambiar',
    sessionsCompleted: 42
  },
  {
    id: 'mnt-2',
    name: 'Arjun Singhania',
    role: 'Managing Partner',
    company: 'Veloce Capital & Matrix Angel Syndicate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 52,
    expertise: ['Fundraising', 'Venture Capital', 'Pitch Deck Teardowns', 'Term Sheet Negotiation'],
    biography: 'Active angel investor in 40+ Indian and Southeast Asian startups with 4 successful exits. Specializes in helping pre-seed founders structure cap tables and negotiate founder-friendly terms.',
    achievements: [
      'Lead angel investor in 3 campus unicorns',
      'Member of Indian Angel Network & Venture Catalysts',
      'Guest Lecturer at Harvard Business School Online'
    ],
    companiesWorked: ['Sequoia India (Associate)', 'McKinsey & Co', 'Veloce Capital'],
    availability: 'Tuesdays & Thursdays • 06:00 PM - 08:30 PM IST',
    availableDays: ['Tuesday', 'Thursday'],
    linkedin: 'https://linkedin.com/in/arjun-singhania',
    sessionsCompleted: 78
  },
  {
    id: 'mnt-3',
    name: 'Dr. Swati Kulkarni',
    role: 'Chief AI Scientist & Co-Founder',
    company: 'CogniVibe Systems',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    experienceYears: 14,
    rating: 4.88,
    reviewCount: 29,
    expertise: ['Technology', 'AI / Deep Learning', 'Patent Strategy', 'R&D Commercialization'],
    biography: 'Former Senior AI Researcher at Bell Labs and Google Research. Holds 9 patents in neural network compression and computer vision edge deployment.',
    achievements: [
      'Published 32 papers in NeurIPS, CVPR, and ICML',
      'Commercialized 3 university R&D patents into enterprise software',
      'Advisor to National DeepTech Mission'
    ],
    companiesWorked: ['Google Research', 'Bell Labs', 'CogniVibe'],
    availability: 'Mondays & Fridays • 05:00 PM - 07:00 PM IST',
    availableDays: ['Monday', 'Friday'],
    linkedin: 'https://linkedin.com/in/dr-swati-kulkarni',
    sessionsCompleted: 34
  },
  {
    id: 'mnt-4',
    name: 'Nikhil Rane',
    role: 'Growth Marketing Director',
    company: 'Razorpay / ex-Swiggy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    experienceYears: 9,
    rating: 4.92,
    reviewCount: 45,
    expertise: ['Marketing', 'Viral Loops', 'Performance GTM', 'Developer Community Marketing'],
    biography: 'Grew organic user acquisition from 10k to 2M+ active users. Specializes in low-cost guerrilla marketing, technical SEO, and viral referral mechanics.',
    achievements: [
      'Architected viral referral campaigns driving 400% YoY growth',
      'Consultant to 15+ FinTech startups',
      'Host of "The Zero CAC Playbook" podcast'
    ],
    companiesWorked: ['Swiggy', 'Razorpay', 'Urban Company'],
    availability: 'Sundays • 10:00 AM - 01:00 PM IST',
    availableDays: ['Sunday'],
    linkedin: 'https://linkedin.com/in/nikhil-rane',
    sessionsCompleted: 56
  }
];

export const INITIAL_PITCHES: PitchItem[] = [
  {
    id: 'ptc-1',
    startupName: 'VoltSync Intelligence',
    founderId: 'usr-student-1',
    founderName: 'Aarav Sharma',
    founderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    category: 'CleanTech / IoT',
    tagline: 'Cloud predictive battery management system for commercial EV fleets',
    problem: 'Fleet managers face sudden battery degradation causing $12k+ unbudgeted battery swaps and catastrophic route failures.',
    solution: 'Real-time CAN-bus telemetry module that detects cell voltage deviations and predicts degradation 48 hours in advance.',
    market: '$14.2B Global EV Telematics Market.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    deckUrl: '#',
    votes: 342,
    votedBy: ['usr-student-1', 'usr-student-2'],
    score: 92,
    mentorFeedbackCount: 8,
    stage: 'Community Voting',
    featured: true,
    createdAt: '2026-08-15'
  },
  {
    id: 'ptc-2',
    startupName: 'CodeSentry AI',
    founderId: 'usr-student-5',
    founderName: 'Rhea Sen',
    founderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    category: 'DevTools / AI',
    tagline: 'Autonomous pull request reviewer that guarantees zero API breaking changes and performance regressions',
    problem: 'Engineering teams spend 15+ hours/week reviewing complex microservice PRs, yet critical contract breakages still slip into production.',
    solution: 'Static semantic dependency graph AI that spins up ephemeral integration sandbox tests for every open GitHub pull request.',
    market: '$8.5B Enterprise DevSecOps & Automated Code Review Market.',
    deckUrl: '#',
    votes: 289,
    votedBy: ['usr-student-1'],
    score: 89,
    mentorFeedbackCount: 6,
    stage: 'Mentor Review',
    featured: true,
    createdAt: '2026-08-18'
  },
  {
    id: 'ptc-3',
    startupName: 'AquaPulse Micro-Sensors',
    founderId: 'usr-student-6',
    founderName: 'Devansh Bakshi',
    founderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    category: 'AgriTech / Hardware',
    tagline: 'Sub-surface acoustic moisture sensors saving 45% irrigation water in paddy and sugarcane farms',
    problem: 'Farmers over-irrigate due to lack of deep-root soil metrics, draining groundwater and rotting root nodules.',
    solution: 'Low-cost self-powered acoustic ultrasonic sensor that transmits soil moisture data via LoRaWAN up to 10km.',
    market: '$6.1B Precision Agriculture & Water Management TAM.',
    deckUrl: '#',
    votes: 215,
    votedBy: [],
    score: 86,
    mentorFeedbackCount: 4,
    stage: 'Demo Day',
    featured: false,
    createdAt: '2026-08-10'
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'crt-1',
    certificateId: 'ECELL-2026-001245',
    userId: 'usr-student-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@ssgmce.ac.in',
    collegeId: '2023CS0142',
    eventName: 'Genesis Hackathon 2026: CleanTech Track (SSGMCE)',
    issueDate: '2026-02-16',
    category: '1st Place Winner & Best Technical Innovation',
    rank: 'Winner (1st Prize)',
    signatureName: 'Atharv Sonone',
    signatureRole: 'Lead & Administrator, E-Cell SSGMCE',
    status: 'valid'
  },
  {
    id: 'crt-2',
    certificateId: 'ECELL-2026-000892',
    userId: 'usr-student-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@ssgmce.ac.in',
    collegeId: '2023CS0142',
    eventName: 'Zero to One Startup Bootcamp: MVP Acceleration (SSGMCE)',
    issueDate: '2026-01-22',
    category: 'Certificate of Excellence & Completion',
    signatureName: 'Priyanka Nambiar',
    signatureRole: 'VP of Product & Industry Mentor',
    status: 'valid'
  },
  {
    id: 'crt-3',
    certificateId: 'ECELL-2025-004521',
    userId: 'usr-student-2',
    userName: 'Rehea Chakraborty',
    userEmail: 'rehea.c@ssgmce.ac.in',
    collegeId: '2022BM0088',
    eventName: 'National Bio-Innovation Pitch Championship',
    issueDate: '2025-11-28',
    category: 'Grand Finalist & Incubation Grantee',
    rank: 'Top 3 Finalist',
    signatureName: 'Atharv Sonone',
    signatureRole: 'Lead & Administrator, E-Cell SSGMCE',
    status: 'valid'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'pst-1',
    authorId: 'usr-student-1',
    authorName: 'Aarav Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Founder • VoltSync',
    authorBranch: 'CSE 3rd Year',
    title: 'Looking for a UI/UX Designer & Product Marketer for our EV Battery Diagnostics Platform',
    content: 'Hey everyone! We recently won the Genesis Hackathon and received our pre-seed incubation grant. We are currently redesigning our telematics web dashboard for pilot fleet testing with 20 commercial electric vans. Looking for someone with Figma expertise and design systems experience to join as a founding team member! Reach out with your portfolio.',
    category: 'Team Search',
    tags: ['CoFounder', 'UIUX', 'Figma', 'CleanTech', 'Hiring'],
    likes: 38,
    likedBy: ['usr-student-1', 'usr-student-3'],
    comments: [
      {
        id: 'c1',
        authorId: 'usr-student-7',
        authorName: 'Neha Rao',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        content: 'Hey Aarav! Sent you a message on LinkedIn with my Dribbble link. Designed dashboards for IoT analytics previously.',
        createdAt: '2026-08-20'
      }
    ],
    interestedCount: 12,
    interestedUsers: ['usr-student-7', 'usr-student-8'],
    createdAt: '2026-08-19'
  },
  {
    id: 'pst-2',
    authorId: 'usr-mentor-1',
    authorName: 'Priyanka Nambiar',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Mentor • VP of Product',
    title: 'The 5 Most Common Mistakes College Founders Make When Pitching to Angels',
    content: 'After reviewing over 50 campus pitch decks this semester, here are the top 5 traps: 1) Spending 4 slides on macro TAM and only 10 seconds on the specific Beachhead customer. 2) Pitching features instead of verifiable customer pain. 3) Claiming "we have no competitors". 4) Ignoring unit economics / CAC vs LTV assumptions. 5) Not having a clear "The Ask" slide with milestones.',
    category: 'Ask Mentor',
    tags: ['Pitching', 'Fundraising', 'Mentorship', 'Advice'],
    likes: 89,
    likedBy: ['usr-student-1', 'usr-student-2', 'usr-student-3'],
    comments: [
      {
        id: 'c2',
        authorId: 'usr-student-1',
        authorName: 'Aarav Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        content: 'Invaluable advice Priyanka! Point #1 was a huge eye opener for our VoltSync pitch deck overhaul.',
        createdAt: '2026-08-22'
      }
    ],
    interestedCount: 0,
    interestedUsers: [],
    createdAt: '2026-08-21'
  },
  {
    id: 'pst-3',
    authorId: 'usr-student-2',
    authorName: 'Dr. Rehea Chakraborty',
    authorAvatar: 'https://images.unsplash.com/photo-1594824813589-9a738676239f?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Founder • MediMorph AI',
    authorBranch: 'BioMed 4th Year',
    title: 'Celebration: MediMorph AI received ethical IRB clearance for multi-center hospital clinical trial!',
    content: 'Huge milestone for our team today! After 9 months of rigorous algorithmic validation and regulatory paperwork, we received official IRB approval to pilot our cancer slide pre-screening AI across 3 regional cancer research hospitals. Big thanks to E-Cell legal mentors for the support!',
    category: 'Wins',
    tags: ['StartupWin', 'HealthTech', 'ClinicalTrial', 'EcellMilestone'],
    likes: 124,
    likedBy: ['usr-student-1', 'usr-student-4'],
    comments: [],
    interestedCount: 0,
    interestedUsers: [],
    createdAt: '2026-08-24'
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'The Ultimate Campus Founder Pitch Deck Template (12 Slides)',
    category: 'Pitching',
    type: 'Template',
    description: 'Battle-tested Google Slides & Figma pitch deck template used by 18 collegiate startups to raise over ₹5 Cr in institutional seed and angel capital.',
    author: 'E-Cell Venture Incubation Desk',
    downloadsCount: 1420,
    fileSize: '4.8 MB',
    url: '#',
    tags: ['Pitch Deck', 'Fundraising', 'Figma', 'PowerPoint']
  },
  {
    id: 'res-2',
    title: 'Student Startup Legal & Incorporation Master Guide (India / US Del)',
    category: 'Legal',
    type: 'Guide',
    description: 'Comprehensive walkthrough of Pvt Ltd registration, Startup India DPIIT recognition, 80-IAC tax exemptions, trademark filing, and founder vesting agreements.',
    author: 'Adv. S. K. Singhal (E-Cell Legal Counsel)',
    downloadsCount: 890,
    fileSize: '2.1 MB',
    readTime: '18 min read',
    url: '#',
    tags: ['Legal', 'Incorporation', 'Taxes', 'DPIIT', 'Founder Agreements']
  },
  {
    id: 'res-3',
    title: 'Lean Startup Validation & Customer Discovery Framework',
    category: 'Business',
    type: 'PDF',
    description: 'Step-by-step interview script and scoring rubric to conduct 50 non-biased customer problem discovery interviews and quantify willingness-to-pay.',
    author: 'Priyanka Nambiar (VP Product)',
    downloadsCount: 1150,
    fileSize: '1.4 MB',
    readTime: '12 min read',
    url: '#',
    tags: ['Validation', 'Customer Discovery', 'Lean Canvas', 'PMF']
  },
  {
    id: 'res-4',
    title: 'Financial Modeling & Cap Table Simulator (Excel / Sheets)',
    category: 'Funding',
    type: 'Template',
    description: 'Pre-formatted spreadsheet with automated unit economics, 3-year revenue projections, burn rate runway calculator, and SAFEs / convertible note dilution models.',
    author: 'Arjun Singhania (Angel Syndicate)',
    downloadsCount: 760,
    fileSize: '3.2 MB',
    url: '#',
    tags: ['Financial Model', 'Cap Table', 'SAFE', 'Runway Calculator']
  },
  {
    id: 'res-5',
    title: 'Full-Stack Startup Architecture Playbook: React, Node, AI & Cloud',
    category: 'Technology',
    type: 'Guide',
    description: 'Reference architecture blueprints for building scalable multi-tenant SaaS, rate-limiting, secure auth, LLM agent pipelines, and deployment setups.',
    author: 'Technical Wing E-Cell',
    downloadsCount: 1320,
    fileSize: '5.6 MB',
    readTime: '25 min read',
    url: '#',
    tags: ['FullStack', 'DevOps', 'TypeScript', 'Gemini AI', 'Architecture']
  }
];

export const INITIAL_COFOUNDERS: CoFounderCandidate[] = [
  {
    id: 'cof-1',
    name: 'Tanvi Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    branch: 'Electronics & Communication',
    year: '3rd Year',
    skills: ['IoT Hardware', 'Embedded C', 'PCB Design', 'CAN-Bus', 'Firmware'],
    experience: 'Built drone telemetry sensors; 1st prize in National Smart India Hackathon Hardware edition.',
    interests: ['EV Infrastructure', 'Robotics', 'Clean Energy', 'Agritech'],
    lookingFor: ['Software / AI Architect', 'Full Stack Developer', 'Operations'],
    compatibility: 94,
    recommendationReason: 'Complementary hardware skill set: Bridges the gap between embedded IoT sensors and cloud machine learning models.',
    pitchIdea: 'Smart Grid Peak-Load Shaving via Distributed Battery Aggregation'
  },
  {
    id: 'cof-2',
    name: 'Kunal Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    branch: 'Mechanical Engineering & Minor in Finance',
    year: '4th Year',
    skills: ['B2B Sales', 'Financial Modeling', 'Supply Chain', 'Go-To-Market', 'Contract Law'],
    experience: 'Organized National E-Summit; Closed ₹18L in corporate sponsorships; Ran college consulting club.',
    interests: ['FinTech', 'Supply Chain', 'Mobility', 'Industrial Tech'],
    lookingFor: ['Technical Co-Founder', 'Full Stack Lead', 'AI Engineer'],
    compatibility: 91,
    recommendationReason: 'High commercial execution synergy: Specializes in enterprise sales pipelines, investor relations, and financial modeling.',
    pitchIdea: 'Automated Fleet Insurance Underwriting via Real-Time Telematics'
  },
  {
    id: 'cof-3',
    name: 'Neha Rao',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    branch: 'Design & Human-Computer Interaction',
    year: '3rd Year',
    skills: ['Figma', 'UX Research', 'Design Systems', 'Motion Design', 'Brand Identity', 'Frontend React'],
    experience: 'Product Design Intern at high-growth fintech startup; 40k+ views on design case studies.',
    interests: ['EdTech', 'DevTools', 'Consumer Social', 'Creator Economy'],
    lookingFor: ['Backend Engineer', 'AI/ML Lead', 'Growth Marketer'],
    compatibility: 88,
    recommendationReason: 'Elite visual craft and usability expertise: Transforms complex data architectures into intuitive SaaS interfaces.',
    pitchIdea: 'Collaborative Code Review Canvas for Junior Developers'
  },
  {
    id: 'cof-4',
    name: 'Rohan Varma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    branch: 'Computer Science & AI',
    year: '4th Year',
    skills: ['PyTorch', 'LLMs', 'RAG Pipelines', 'Vector Databases', 'Python', 'FastAPI'],
    experience: 'Research paper accepted in ACL workshop; Built open-source document extraction agent with 1.2k stars.',
    interests: ['AI Agents', 'LegalTech', 'Bioinformatics', 'Search'],
    lookingFor: ['Full Stack Product Lead', 'Enterprise GTM', 'Product Designer'],
    compatibility: 85,
    recommendationReason: 'Deep artificial intelligence implementation capability for advanced agentic workflow startups.',
    pitchIdea: 'Autonomous Contract Due Diligence Agent for Early Stage VCs'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    id: 'usr-student-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    branch: 'CSE 3rd Year',
    xp: 680,
    level: 4,
    levelTitle: 'Builder',
    badgesCount: 5,
    startupsCount: 1,
    eventsAttended: 12
  },
  {
    rank: 2,
    id: 'usr-student-2',
    name: 'Dr. Rehea Chakraborty',
    avatar: 'https://images.unsplash.com/photo-1594824813589-9a738676239f?w=200&auto=format&fit=crop&q=80',
    branch: 'BioMed 4th Year',
    xp: 620,
    level: 4,
    levelTitle: 'Builder',
    badgesCount: 4,
    startupsCount: 1,
    eventsAttended: 10
  },
  {
    rank: 3,
    id: 'usr-student-4',
    name: 'Sanjay Reddy',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    branch: 'CyberSecurity 4th Year',
    xp: 590,
    level: 3,
    levelTitle: 'Builder',
    badgesCount: 4,
    startupsCount: 1,
    eventsAttended: 9
  },
  {
    rank: 4,
    id: 'usr-student-3',
    name: 'Aditya Patil',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    branch: 'IT 3rd Year',
    xp: 540,
    level: 3,
    levelTitle: 'Builder',
    badgesCount: 3,
    startupsCount: 1,
    eventsAttended: 8
  },
  {
    rank: 5,
    id: 'usr-student-5',
    name: 'Rhea Sen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    branch: 'CSE 2nd Year',
    xp: 490,
    level: 3,
    levelTitle: 'Innovator',
    badgesCount: 3,
    startupsCount: 1,
    eventsAttended: 7
  },
  {
    rank: 6,
    id: 'usr-student-6',
    name: 'Devansh Bakshi',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    branch: 'ECE 3rd Year',
    xp: 440,
    level: 2,
    levelTitle: 'Innovator',
    badgesCount: 2,
    startupsCount: 1,
    eventsAttended: 6
  },
  {
    rank: 7,
    id: 'usr-student-7',
    name: 'Neha Rao',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    branch: 'Design 3rd Year',
    xp: 380,
    level: 2,
    levelTitle: 'Explorer',
    badgesCount: 2,
    startupsCount: 0,
    eventsAttended: 5
  }
];

export const INITIAL_ANALYTICS: AdminAnalyticsData = {
  totalUsers: 584,
  activeUsers: 412,
  totalStartups: 42,
  totalEvents: 35,
  totalRegistrations: 1480,
  totalMentorshipSessions: 128,
  totalCertificates: 480,
  totalFundingFacilitated: '₹25,80,000',
  userGrowth: [
    { label: 'Jan', students: 120, mentors: 6, founders: 12 },
    { label: 'Feb', students: 210, mentors: 9, founders: 18 },
    { label: 'Mar', students: 310, mentors: 12, founders: 26 },
    { label: 'Apr', students: 390, mentors: 14, founders: 31 },
    { label: 'May', students: 460, mentors: 16, founders: 37 },
    { label: 'Jun', students: 510, mentors: 17, founders: 40 },
    { label: 'Jul', students: 584, mentors: 18, founders: 42 }
  ],
  eventRegistrationsByMonth: [
    { month: 'Genesis Hackathon', registrations: 350, attendees: 284 },
    { month: 'Zero to One MVP', registrations: 150, attendees: 132 },
    { month: 'Angel Pitch Night', registrations: 80, attendees: 68 },
    { month: 'Venture Fireside', registrations: 500, attendees: 420 },
    { month: 'Legal & DPIIT Bootcamp', registrations: 220, attendees: 195 }
  ],
  startupsByStage: [
    { stage: 'Idea', count: 14 },
    { stage: 'MVP', count: 16 },
    { stage: 'Early Stage', count: 8 },
    { stage: 'Growth', count: 3 },
    { stage: 'Funded', count: 1 }
  ],
  xpDistribution: [
    { level: 'Level 1: Explorer', users: 240 },
    { level: 'Level 2: Innovator', users: 180 },
    { level: 'Level 3: Builder', users: 110 },
    { level: 'Level 4: Founder', users: 44 },
    { level: 'Level 5: Entrepreneur', users: 10 }
  ],
  recentActivities: [
    { id: 'act-1', user: 'Aarav Sharma', action: 'registered for', target: 'E-SUMMIT 2026: Genesis Hackathon', time: '10 mins ago', type: 'event' },
    { id: 'act-2', user: 'Tanvi Deshmukh', action: 'booked mentorship with', target: 'Priyanka Nambiar', time: '25 mins ago', type: 'mentorship' },
    { id: 'act-3', user: 'Rhea Sen', action: 'submitted new pitch for', target: 'CodeSentry AI', time: '1 hour ago', type: 'pitch' },
    { id: 'act-4', user: 'Admin Desk', action: 'issued verified certificate to', target: 'Rehea Chakraborty (ECELL-2025-004521)', time: '3 hours ago', type: 'certificate' },
    { id: 'act-5', user: 'VoltSync Intelligence', action: 'advanced to stage', target: 'Early Stage', time: '5 hours ago', type: 'startup' }
  ]
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'ntf-1',
    userId: 'usr-student-1',
    title: 'Registration Confirmed! (+50 XP)',
    message: 'You have secured your seat for E-SUMMIT 2026: Genesis Hackathon. Check your student pass.',
    type: 'event',
    read: false,
    link: '/events/evt-1',
    createdAt: '15 mins ago'
  },
  {
    id: 'ntf-2',
    userId: 'usr-student-1',
    title: 'Mentorship Confirmed',
    message: 'Priyanka Nambiar accepted your session for Wednesday at 5:00 PM IST.',
    type: 'mentor',
    read: false,
    link: '/mentors',
    createdAt: '2 hours ago'
  },
  {
    id: 'ntf-3',
    userId: 'usr-student-1',
    title: 'Verified Certificate Issued',
    message: 'Your official certificate for Genesis Hackathon 2026 (ECELL-2026-001245) is ready in your wallet.',
    type: 'certificate',
    read: true,
    link: '/certificates',
    createdAt: '1 day ago'
  },
  {
    id: 'ntf-4',
    userId: 'usr-student-1',
    title: 'Leaderboard Climb! 🚀',
    message: 'You reached Rank #1 on the Entrepreneurship XP Leaderboard with 680 XP!',
    type: 'xp',
    read: true,
    link: '/leaderboard',
    createdAt: '2 days ago'
  }
];

export const SPONSORS_LIST = [
  { name: 'Peak Venture Capital', category: 'Angel Syndicate Partner', logo: 'PEAK VC' },
  { name: 'Google Cloud for Startups', category: 'Cloud & AI Infrastructure Partner', logo: 'GCP STARTUPS' },
  { name: 'DST & NIDHI Prayas', category: 'Government Grant Partner', logo: 'DST NIDHI' },
  { name: 'Stripe Climate', category: 'FinTech Ecosystem Partner', logo: 'STRIPE' },
  { name: 'AWS Activate', category: 'Hosting & Compute Partner', logo: 'AWS ACTIVATE' },
  { name: 'Freshworks for Startups', category: 'SaaS Tooling Partner', logo: 'FRESHWORKS' }
];

export const STORIES_LIST = [
  {
    id: 'str-1',
    title: 'From Campus Dorm to ₹1.5 Cr Angel Cheque: The VoltSync Story',
    category: 'Startup of the Month',
    author: 'Aarav Sharma (3rd Year CSE)',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558441719-8ef3c9886fa7?w=800&auto=format&fit=crop&q=80',
    summary: 'How an engineering research project on EV battery thermal runaway converted into an incubated B2B telematics company piloting with 20 commercial vans.'
  },
  {
    id: 'str-2',
    title: 'Demystifying Hospital Pilot Contracts as a 4th-Year MedTech Founder',
    category: 'Founder Interview',
    author: 'Dr. Rehea Chakraborty (BioMed)',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    summary: 'Key hurdles in medical AI certification, navigating clinical IRB ethics reviews, and building relationships with chief pathologists.'
  },
  {
    id: 'str-3',
    title: 'The 2026 E-Summit Highlights & Genesis Demo Day Recap',
    category: 'Event Recap',
    author: 'E-Cell Media Board',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
    summary: 'Over 400 attendees, 18 startup stalls, 12 active angel syndicate investors, and ₹25 Lakhs in term sheet commitments facilitated.'
  }
];

export const ECELL_NEC_METRICS = {
  necid: 'NEC2568932',
  teamName: 'Hierarchy',
  collegeName: 'Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon, Maharashtra',
  affiliation: 'National Entrepreneurship Challenge (NEC 2026) — E-Cell IIT Bombay',
  eventsConductedPreviousYear: 7,
  totalEventsReported: 10,
  overallParticipationCount: '520+',
  yearRange: '2024 – 2026',
  verificationStatus: 'Officially Verified Report'
};

export const SENIORS_CONSULTED_DATA: SeniorConsultedItem[] = [
  {
    name: 'Rutuja Deshmukh',
    contactNo: '9022886503',
    email: 'rutujadeshmukh1512@gmail.com',
    yearOfStudy: '2nd Year (Then)',
    postHeld: 'Publicity Head',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  },
  {
    name: 'Nihal Kankal',
    contactNo: '8767819508',
    email: 'nihalk9876@gmail.com',
    yearOfStudy: '2nd Year (Then)',
    postHeld: 'Technical Head',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  },
  {
    name: 'Sanchit Dangra',
    contactNo: '9309391688',
    email: 'sanchitdangra@gmail.com',
    yearOfStudy: '2nd Year (Then)',
    postHeld: 'Event Head',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_WORK_REPORTS: WorkReportItem[] = [
  {
    id: 'wr-sih-internal-2024',
    eventName: 'Internal Hackathon – SSGMCE 2024',
    dateConducted: '09/09/2024',
    shortDescription: 'The Internal Hackathon was organized to select the best teams from our college for the Smart India Hackathon 2024. The event encouraged innovation, startup ideas, and collaborative development among students from various branches.',
    category: 'Hackathons',
    venue: 'Seminar Hall, Mechanical Engineering Department, SSGMCE',
    prizes: 'Winner: ₹2,000 | Runner-up: ₹1,000 + Official SIH 2024 Nominations',
    keyOutcomes: [
      'Top qualifying engineering teams nominated directly for Smart India Hackathon 2024 portal',
      'Mandatory diversity criterion enforced (at least one female innovator per team)',
      'High-velocity 6-slide standardized PPT pitch screening under faculty evaluation'
    ],
    flow: {
      planning: 'Problem statements released, Team formation rules set (including at least one female member per team), Submission format (PPT max 6 slides) shared and Registration form circulated.',
      promotion: 'Event posted on social media, Circular shared via class representatives across all academic departments.',
      execution: 'Venue: Seminar Hall, Mechanical Engineering Department. Event started at 10:00 AM. Students presented innovative ideas through PPTs, Best teams selected for Smart India Hackathon 2024.',
      followUp: 'Winner awarded ₹2000, Runner-up ₹1000, Selected teams registered for SIH 2024 via the official portal.'
    },
    timeline: {
      planning: '22/08/2024 (Registration starts)',
      promotion: '28/08/2024 (Idea Submission deadline)',
      execution: '09/09/2024 (Hackathon conducted & evaluation)',
      followUp: '10/09/2024 (Portal upload & verification)'
    },
    highlightStats: 'Winner ₹2k • SIH 2024 Selected',
    department: 'Mechanical Engg Seminar Hall',
    bannerImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-eureka-2024',
    eventName: 'Eureka! Business Model Competition',
    dateConducted: '28/09/2024',
    shortDescription: "Eureka! is Asia's Largest Business Model Competition aimed to fast-track the journey of an innovative idea to commercial success. Eureka! prides itself on providing a 360-degree holistic experience over a 5-month period, which offers a comprehensive experience that includes personalized mentorship, opportunities for pitching and funding, exciting cash prizes, and more. Eureka! provides a wide range of support to help participants develop their ideas and bring them to market.",
    category: 'Competitions',
    venue: 'E-Cell SSGMCE Innovation Hall & IIT Bombay Partner Track',
    prizes: 'National Pitch Access, 5-Month Mentorship & Grand Prize Pool',
    keyOutcomes: [
      'Comprehensive 5-month venture incubation and business modeling journey',
      'Personalized mentor allocations with veteran industry founders',
      'High-impact deck evaluation and investor-readiness preparation'
    ],
    flow: {
      planning: 'Finalizing event idea, team structure, logistics, and pitch format.',
      promotion: 'Social media campaigns, poster release, class announcements and digital outreach.',
      execution: 'Teams presented PPTs and pitched ideas in front of judges in real-time.',
      followUp: 'Winners declared, certificates distributed, event report prepared and uploaded for NEC.'
    },
    timeline: {
      planning: '1st Sep – 10th Sep: Planning',
      promotion: '11th Sep – 25th Sep: Promotion',
      execution: '28th Sep: Event Execution',
      followUp: '29th Sep – 2nd Oct: Feedback & Documentation'
    },
    highlightStats: 'Asia’s #1 B-Plan Track • 5-Month Cohort',
    bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-ipl-auction-2024',
    eventName: 'IPL Auction Strategy Arena',
    dateConducted: '01/12/2024',
    shortDescription: 'An IPL-style auction where teams were given a fixed budget to bid on players. Teams had to build a balanced team based on roles and ratings, testing financial allocation, real-time negotiation, and probabilistic decision making.',
    category: 'Student Engagement',
    venue: 'SSGMCE Central Auditorium & Live Auction Arena',
    prizes: 'Trophies, Cash Prizes & Strategy Master Certificates',
    keyOutcomes: [
      'Simulated high-pressure budget management and bidding game theory',
      'Evaluation of team balance based on analytical role constraints and player ratings',
      'Campus-wide cross-year team building and dynamic negotiation'
    ],
    flow: {
      planning: 'Player pool preparation, rulebook creation, registration counters set up in common areas.',
      promotion: 'Digital promotions, campus marketing, and registration drive across hostels.',
      execution: 'Live auction event with team-based bidding and strategy in action. Real-time team formation and dynamic decision-making observed.',
      followUp: 'Evaluation of teams based on rating and criteria fulfillment, winner felicitation.'
    },
    timeline: {
      planning: '10th Nov – 20th Nov: Planning',
      promotion: '21st Nov – 30th Nov: Promotion',
      execution: '01st Dec: Event Day',
      followUp: '2nd Dec – 5th Dec: Results and Appreciation'
    },
    highlightStats: 'Real-time Bidding • Role Optimization',
    bannerImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-reel-alumni-2025',
    eventName: 'Reel It to Win It – Grand Alumni Meet 2025',
    dateConducted: '13th Jan 2025 – 28th Jan 2025',
    shortDescription: 'A reel-making competition to capture and share the vibes of the Grand Alumni Meet 2025, with a cash prize of ₹500 and viral campus media outreach.',
    category: 'Student Engagement',
    venue: 'SSGMCE Campus & Instagram Official Handle',
    prizes: '₹500 Cash Prize + Feature on Official E-Cell Channels',
    keyOutcomes: [
      'Over 25,000+ digital impressions generated across alumni and student networks',
      'Creative visual storytelling celebrating 40+ years of college heritage',
      'Shortlisting and assessment by a combined panel of faculty and student leads'
    ],
    flow: {
      planning: 'Concept finalized, rules framed, and promotion strategy designed. Judging criterion based on creativity and Instagram engagement was established. Coordination with Alumni Meet organizing committee ensured that the event aligned with the overall theme and timeline.',
      promotion: 'Instagram post on 13 Jan; reels promoted through stories and student groups.',
      execution: 'Reels created and uploaded by participants with proper tags. Submissions were accepted till 28th January 2025 and all entries were reviewed and shortlisted by a panel of faculty and student representatives.',
      followUp: 'Best reel judged; prize distribution and post-event story shared across platforms.'
    },
    timeline: {
      planning: '13th Jan – 14th Jan: Planning',
      promotion: '14th Jan – 16th Jan: Promotion',
      execution: '16th Jan – 25th Jan: Event Days & Filming',
      followUp: '26th – 27th Jan: Submissions | 28th Jan: Results & Prize'
    },
    highlightStats: '₹500 Prize • 25k+ Reach',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-pmf-mvp-2025',
    eventName: 'Product Market Fit and MVP Masterclass',
    dateConducted: '14/02/2025',
    shortDescription: 'An online executive masterclass on "Product Market Fit and MVP" on 14th February. The speaker, Mr. Pankaj Nirale, Country Head at Red Lane Group, Pune, shared key insights on startup validation, lean experimentation, and customer discovery.',
    category: 'Masterclasses',
    venue: 'Live Interactive Google Meet & Hybrid Screen',
    speakerOrGuest: 'Mr. Pankaj Nirale',
    speakerRole: 'Country Head',
    speakerCompany: 'Red Lane Group, Pune',
    prizes: 'E-Certificates of Completion & Startup Toolkit Access',
    keyOutcomes: [
      'Deconstructed real-world PMF frameworks for enterprise B2B and consumer SaaS',
      'Live Q&A session directly with corporate country head',
      'Distribution of verified participation e-certificates to all completing attendees'
    ],
    flow: {
      planning: 'Speaker coordination, content curation, lab readiness, Invited an industry expert with relevant experience to provide practical insights, finalized the topic.',
      promotion: 'Social media campaigns, Using digital posters and a QR code for registration.',
      execution: 'The session was held online, Q&A session and concluded with vote of thanks by the faculty.',
      followUp: 'Feedback Collection, Session Highlights shared online, resource sharing and E-Certificates were distributed to participants who attended the complete session.'
    },
    timeline: {
      planning: '1st Feb – 3rd Feb: Planning',
      promotion: '9th Feb – 11th Feb: Promotion',
      execution: '14th Feb: Event Execution (Live Masterclass)',
      followUp: '14th Feb: Feedback & Documentation'
    },
    highlightStats: 'Country Head Red Lane Group • E-Certs',
    bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-app-dev-2025',
    eventName: 'App Development Workshop (React Native)',
    dateConducted: '07/03/2025',
    shortDescription: 'Hands-on intensive workshop led by industry expert Mr. Ankush Dongre on React Native. Topics included cross-platform architecture, REST API integration, state management, and building full-stack mobile apps live in code.',
    category: 'Workshops',
    venue: 'Central Computer Center Lab & Mobile Dev Studio',
    speakerOrGuest: 'Mr. Ankush Dongre',
    speakerRole: 'Senior Mobile Architect & React Native Lead',
    speakerCompany: 'Tech Industry Veteran',
    prizes: 'Project Mini-Certifications & Source Code Repositories',
    keyOutcomes: [
      '100% of participants built and deployed a working React Native mobile app on their devices',
      'API authentication, mobile state management, and native debugging patterns covered',
      'Resource repository and boilerplate packages distributed post-session'
    ],
    flow: {
      planning: 'Identified and confirmed expert speaker coordination, content curation, lab readiness, curated learning materials and set up lab infrastructure.',
      promotion: 'Poster release, social campaigns, registration setup across departments.',
      execution: 'Live interactive workshop with demos and coding sessions. Participants developed mini projects during the workshop.',
      followUp: 'Feedback collection, resource sharing, certificate issuance.'
    },
    timeline: {
      planning: '15th Feb – 22nd Feb: Planning',
      promotion: '23rd Feb – 6th Mar: Promotion',
      execution: '07th Mar: Workshop (Hands-on Sprints)',
      followUp: '08th Mar – 10th Mar: Post-event communication & Certificates'
    },
    highlightStats: 'React Native • Live App Deployment',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-roadies-2025',
    eventName: 'Roadies 2-Day Obstacle Ground Arena',
    dateConducted: '07 & 08/03/2025',
    shortDescription: 'A 2-day obstacle-ground athletic and leadership event. Teams of 4 competed through grueling physical challenges, endurance courses, and tactical leadership trials with an escalated Day 2 difficulty track.',
    category: 'Student Engagement',
    venue: 'SSGMCE Sports Complex & Obstacle Field Arena',
    prizes: 'Trophies, Winner Medals & Roadies Champion Certificates',
    keyOutcomes: [
      'Tested collegiate teamwork, grit, tactical leadership, and physical stamina',
      'Multi-stage elimination with escalating obstacle complexity on Day 2',
      'Extensive campus media coverage and sports committee collaboration'
    ],
    flow: {
      planning: 'Obstacle design, safety planning, team assignment and medical desk setup.',
      promotion: 'Teasers, poster series, trial rounds, and physical registration booths.',
      execution: 'Day 1 - Moderate track competition or Basic obstacle challenges. Day 2 - Advanced track or Tougher challenges with increased difficulty.',
      followUp: 'Final result compilation, winners felicitation, media coverage and safety audits.'
    },
    timeline: {
      planning: '10th Feb – 20th Feb: Planning',
      promotion: '21st Feb – 6th Mar: Promotion',
      execution: '7th & 8th Mar: Event Execution (2-Day Clash)',
      followUp: '9th Mar – 11th Mar: Clean-up, Documentation, and Appreciation'
    },
    highlightStats: '2-Day Arena • Teams of 4',
    bannerImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-ideathon-2025',
    eventName: 'Ideathon 2025 by Team Hierarchy',
    dateConducted: '09/10/2025',
    shortDescription: 'The Ideathon was organized by Team Hierarchy of Shri Sant Gajanan Maharaj College of Engineering. The Ideathon encouraged students to present innovative ideas and transform them into future business ventures. It promoted entrepreneurship through effective planning, outreach, and organized execution.',
    category: 'Competitions',
    venue: 'SSGMCE Seminar Hall & Innovation Incubation Desk',
    prizes: 'Pre-Incubation Slots, Cash Grants & Trophy Honors',
    keyOutcomes: [
      'Screened 35+ early-stage venture ideas across hardware, software, and agro-tech',
      'Introduced students to business model canvas (BMC) and problem-solution fit',
      'Team Hierarchy leadership and outreach execution benchmark'
    ],
    flow: {
      planning: 'Event planning, budget preparation, and team assignment.',
      promotion: 'Guest invitations and event publicity across all academic branches.',
      execution: 'Idea presentations and judging by inter-disciplinary faculty panel.',
      followUp: 'Winner announcement, felicitation, and media coverage.'
    },
    timeline: {
      planning: '21st Sept – 30th Sept: Planning',
      promotion: '1st Oct – 4th Oct: Promotion',
      execution: '9th Oct: Event Execution & Idea Presentations',
      followUp: '9th Oct: Evaluation, Documentation, and Appreciation'
    },
    highlightStats: 'Team Hierarchy • Business Ventures',
    bannerImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-navonmesh-2026',
    eventName: 'Navonmesh National Technical Carnival',
    dateConducted: '23 & 25/03/2026',
    shortDescription: 'A 3-day National Level Technical Fest featuring a 24-hour Hackathon (Srujan), Project Competition & Exhibition (Ankur), and National Student Conference (Udbhav). The event promoted innovation, technical excellence, networking, and entrepreneurship among students across the country.',
    category: 'Symposiums & Fests',
    venue: 'SSGMCE Campus Innovation Complex & Centenary Auditorium',
    prizes: '₹1,00,000+ Total Prize Pool across Tracks, Trophies & Fast-Track Incubation',
    keyOutcomes: [
      'Day 1: 24-hour national hackathon sprint (Srujan) with non-stop prototyping',
      'Day 2: Hardware, IoT, and software project exhibition (Ankur)',
      'Day 3: National IEEE-aligned student research conference & networking (Udbhav)',
      'Over 520+ collegiate participants engaged across multiple tracks'
    ],
    flow: {
      planning: 'Event planning, team formation, budgeting, and coordination with mentors, judges, and sponsors.',
      promotion: 'Digital promotions, college outreach, publicity, and participant registrations nationwide.',
      execution: 'Day 1 – 24-hour Hackathon (Srujan). Day 2 – Project Competition & Exhibition (Ankur). Day 3 – National Level Student Conference, networking sessions, and interactions.',
      followUp: 'Result declaration, prize distribution, certificate issuance, and media coverage.'
    },
    timeline: {
      planning: '1st Jan – 31st Jan: Planning',
      promotion: '1st Feb – 15th Feb: Promotion & Registrations',
      execution: '23rd Mar: 24-hour Hackathon (Srujan) | 24th Mar: Project Competition (Ankur) | 25th Mar: Student Conference',
      followUp: '25th Mar: Evaluation, Prize Distribution & Closing Ceremony'
    },
    highlightStats: '3-Day National Fest • 24h Hackathon',
    bannerImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'wr-web-dev-2026',
    eventName: 'The Web Development Workshop (Pursuit 2026)',
    dateConducted: '25 & 28/03/2026',
    shortDescription: "A 2-day Web Development Workshop conducted under Pursuit '26. Participants learned HTML, CSS, Java, React, basic backend development, and deployed their first website live to cloud infrastructure.",
    category: 'Workshops',
    venue: 'Computer Labs & Pursuit 2026 Technical Sandbox',
    prizes: 'Pursuit Workshop Diplomas & Cloud Hosting Packs',
    keyOutcomes: [
      'Day 1: Fundamentals of modern HTML5, CSS3, modern JavaScript, and UI structuring',
      'Day 2: React component lifecycle, backend APIs, and live cloud deployment',
      'Every attendee walked away with their personal portfolio website published online'
    ],
    flow: {
      planning: 'Workshop planning, resource preparation, and speaker coordination.',
      promotion: 'Event publicity and participant registrations across college streams.',
      execution: 'Day 1 – HTML, CSS, Java, and web development basics. Day 2 – React, backend basics, and website deployment.',
      followUp: 'Certificate distribution and event documentation.'
    },
    timeline: {
      planning: '10th Mar – 20th Mar: Planning',
      promotion: '21st Mar – 24th Mar: Promotion & Registrations',
      execution: '25th Mar: Day 1 (Basics) | 28th Mar: Day 2 (React & Deployment)',
      followUp: '28th Mar: Certificate Distribution and Event Documentation'
    },
    highlightStats: 'React + Backend • Live Deployment',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'E-Summit Flagship Inauguration & Keynote',
    eventName: "E-Summit '26",
    date: '2026-04-18',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80',
    description: 'Lighting of the lamp and opening ceremony with college dignitaries, patron Dr. S. B. Somani, and visiting venture leaders.',
    location: 'Main Auditorium, SSGMCE',
    featured: true
  },
  {
    id: 'gal-2',
    title: 'Hands-on React Native & Mobile MVP Sprint',
    eventName: 'App Development Workshop',
    date: '2025-03-07',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    description: '100+ students building cross-platform native applications simultaneously in the Central Computer Center.',
    location: 'Lab 304, Computer Center',
    featured: true
  },
  {
    id: 'gal-3',
    title: 'Genesis Ideathon Live Pitch Jury Battle',
    eventName: "Genesis '26 Ideathon",
    date: '2026-05-02',
    category: 'Competitions',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80',
    description: 'Top collegiate finalists pitching innovative hardware and agritech prototypes to the expert jury panel.',
    location: 'Seminar Hall, SSGMCE',
    featured: true
  },
  {
    id: 'gal-4',
    title: 'Pankaj Nirale Masterclass on Product-Market Fit',
    eventName: 'PMF & MVP Masterclass',
    date: '2025-02-14',
    category: 'Guest Sessions',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    description: 'Country Head Mr. Pankaj Nirale breaking down lean startup experiments for student founders.',
    location: 'Hybrid Studio & Virtual Stream',
    featured: false
  },
  {
    id: 'gal-5',
    title: 'Team Navonmesh Annual Strategy & Inductions',
    eventName: 'E-Cell Annual Meet',
    date: '2026-01-15',
    category: 'Team & Campus',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    description: 'Team Navonmesh 2026-27 council planning annual event timelines and wing initiatives.',
    location: 'Incubation Center, SSGMCE',
    featured: true
  },
  {
    id: 'gal-6',
    title: 'Roadies 2-Day Obstacle & Leadership Course',
    eventName: 'Roadies 2025 Arena',
    date: '2025-03-08',
    category: 'Celebrations',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1000&auto=format&fit=crop&q=80',
    description: 'High-octane collegiate teamwork and stamina challenge testing leadership and resilience.',
    location: 'SSGMCE Sports Complex',
    featured: false
  },
  {
    id: 'gal-7',
    title: '24-Hour Non-Stop Srujan Hackathon Sprint',
    eventName: 'Navonmesh Technical Carnival',
    date: '2026-03-23',
    category: 'Competitions',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80',
    description: '500+ participants hacking overnight on real-world industry problem statements.',
    location: 'Innovation Complex, SSGMCE',
    featured: true
  },
  {
    id: 'gal-8',
    title: 'Zero to One Web Dev Deployment Workshop',
    eventName: 'Pursuit 2026',
    date: '2026-03-28',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80',
    description: 'Students launching their live cloud portfolios and web projects.',
    location: 'IT Sandbox Lab',
    featured: false
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    year: '2026',
    title: 'Ranked Top 10 Student E-Cells in Central India',
    category: 'Recognition',
    description: 'Recognized for highest student startup incubation throughput and high-impact national ideathons across Maharashtra.',
    awardName: 'Excellence in Collegiate Entrepreneurship',
    awardedBy: 'Western Region Innovation Consortium',
    badgeIcon: '🏆',
    stats: '500+ Active Builders',
    featured: true
  },
  {
    id: 'ach-2',
    year: '2025',
    title: '₹25,00,000+ Pre-Seed & Grant Facilitation',
    category: 'Ecosystem',
    description: 'Enabled campus student founders to secure DST NIDHI-PRAYAS, MSME incubation grants, and angel syndicate backing.',
    awardName: 'Ecosystem Impact Milestone',
    awardedBy: 'Innovation & Incubation Council, SSGMCE',
    badgeIcon: '🚀',
    stats: '₹25 Lakhs Grants',
    featured: true
  },
  {
    id: 'ach-3',
    year: '2025',
    title: '1st Place in National Smart City Hackathon',
    category: 'Competition Win',
    description: 'SSGMCE E-Cell incubated startup VoltSync secured 1st prize for IoT CAN-bus battery health monitoring algorithms.',
    awardName: 'National Grand Winner',
    awardedBy: 'Ministry of Electronics & IT (MeitY)',
    badgeIcon: '🥇',
    stats: '₹1,00,000 Cash Prize',
    featured: true
  },
  {
    id: 'ach-4',
    year: '2024',
    title: 'Best Technical & Leadership Committee Award',
    category: 'Award',
    description: 'Awarded by Shri Sant Gajanan Maharaj College of Engineering for organizing over 20+ seamless campus workshops.',
    awardName: 'Best Campus Committee Honor',
    awardedBy: 'SSGMCE Annual Institutional Awards',
    badgeIcon: '⭐',
    stats: '2,000+ Registrations',
    featured: true
  },
  {
    id: 'ach-5',
    year: '2023',
    title: 'Launch of Incubation Prototyping Sandbox',
    category: 'Ecosystem',
    description: 'Established dedicated hardware fabrication and cloud server clusters for student prototypes in collaboration with alumni.',
    awardName: 'Campus Infrastructure Milestone',
    awardedBy: 'SSGMCE Alumni Association',
    badgeIcon: '💡',
    stats: '24/7 Lab Access',
    featured: false
  }
];

export const INITIAL_INITIATIVES: InitiativeItem[] = [
  {
    id: 'init-1',
    title: 'Entrepreneurship Workshops',
    iconName: 'BookOpen',
    category: 'Skill Building',
    shortDescription: 'Hands-on weekend masterclasses taught by seasoned industry practitioners covering tech stacks, design systems, and product thinking.',
    longDescription: 'Comprehensive deep dives designed to transform curious students into confident builders. Topics include full-stack web & mobile development, cloud DevOps, UI/UX prototyping, and AI workflow integration.',
    outcomes: ['Deployable projects', 'Verified certificates', 'Direct mentor feedback'],
    targetAudience: 'All engineering & management students',
    frequency: 'Bi-weekly',
    highlights: ['React Native & Web Dev', 'Cloud Computing credits', 'Hands-on coding sprints']
  },
  {
    id: 'init-2',
    title: 'Startup Awareness & Discovery',
    iconName: 'Lightbulb',
    category: 'Culture & Mindset',
    shortDescription: 'Interactive orientation sessions breaking the myths of starting up, exploring problem validation, and fostering curiosity.',
    longDescription: 'Demystifying the startup world for first and second year students. We explore case studies of Indian startup journeys, unit economics, customer discovery interviews, and how to spot real-world engineering problems.',
    outcomes: ['Problem-Solution Fit frameworks', 'BMC drafting skills', 'Innovation mindset'],
    targetAudience: '1st & 2nd Year Students',
    frequency: 'Monthly',
    highlights: ['Case study teardowns', 'Campus problem hunting', 'Alumni founder talks']
  },
  {
    id: 'init-3',
    title: 'National Pitch Competitions & Hackathons',
    iconName: 'Trophy',
    category: 'Competitive Sprints',
    shortDescription: 'High-energy national competitions like Genesis Ideathon and Srujan 24h Hackathon with cash prize pools and jury evaluations.',
    longDescription: 'The arena where raw ideas are pressure-tested. Teams work across tracks in AI, AgriTech, FinTech, and CleanTech to present workable solutions in front of angel investors and corporate executives.',
    outcomes: ['Cash prize pools', 'Pre-incubation slots', 'Venture capital visibility'],
    targetAudience: 'Student teams across India',
    frequency: 'Quarterly',
    highlights: ['₹1.5L+ Prize pools', '24-hour prototype build', 'Angel jury reviews']
  },
  {
    id: 'init-4',
    title: 'Industry Interaction & Guest Masterclasses',
    iconName: 'Users',
    category: 'Mentorship',
    shortDescription: 'Fireside chats and intimate Q&A sessions with venture capitalists, serial founders, country heads, and alumni leaders.',
    longDescription: 'Connecting students directly with leaders who have built at scale. Students learn about hiring, fundraising realities, market expansion, and avoiding critical early-stage startup pitfalls.',
    outcomes: ['1-on-1 networking', 'Internship opportunities', 'Industry perspective'],
    targetAudience: 'Aspiring founders & core builders',
    frequency: 'Monthly',
    highlights: ['YC alumni speakers', 'Corporate country heads', 'Interactive Q&A']
  },
  {
    id: 'init-5',
    title: 'Leadership & Committee Training',
    iconName: 'Compass',
    category: 'Leadership',
    shortDescription: 'Rigorous student leadership programs cultivating project management, PR strategy, sponsorship negotiation, and event execution.',
    longDescription: 'E-Cell members are trained in enterprise operations—from managing budgets and designing brand collateral to leading 50+ member volunteer wings during national festivals.',
    outcomes: ['Public speaking confidence', 'Budget management', 'Team leadership'],
    targetAudience: 'E-Cell Committee & Volunteers',
    frequency: 'Ongoing',
    highlights: ['Navonmesh Fest leadership', 'Sponsorship pitch training', 'Crisis management']
  },
  {
    id: 'init-6',
    title: 'Incubation & Grant Facilitation',
    iconName: 'ShieldCheck',
    category: 'Funding & Support',
    shortDescription: 'Navigating government grant schemes (NIDHI-PRAYAS, MSME), patent filing, and campus co-working access with SSGMCE IIC.',
    longDescription: 'Bridging the gap between a college project and a legally registered business. We assist with company registration, provisional patent drafting, and seed grant applications.',
    outcomes: ['Government grant funding', 'Patent protection', 'Office space'],
    targetAudience: 'Advanced student prototypes',
    frequency: 'Quarterly cohort cycles',
    highlights: ['DST Grant mentorship', 'IPR documentation', 'Incubation lab desks']
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: "Registrations Open: E-Summit '26 Flagship Venture Congress",
    category: 'Registration Open',
    description: 'Registrations are officially open for central India’s largest student innovation congress. ₹1,50,000+ prize pool across pitch and hackathon tracks.',
    date: '2026-04-01',
    isImportant: true,
    link: '/events',
    linkText: 'Register Now',
    badgeText: 'HOT'
  },
  {
    id: 'ann-2',
    title: 'Team Navonmesh 2026-27 Committee Inductions Announced',
    category: 'Team Announcement',
    description: 'First and second year students can now apply for Management, Technical, PR, and Design wings of E-Cell SSGMCE.',
    date: '2026-03-28',
    isImportant: true,
    link: '/join',
    linkText: 'Apply to Join',
    badgeText: 'RECRUITMENT'
  },
  {
    id: 'ann-3',
    title: 'Genesis Ideathon Track Problem Statements Released',
    category: 'New Event',
    description: 'Explore problem statements across AgriTech, AI SaaS, Rural FinTech, and Clean Energy for Genesis 2026.',
    date: '2026-03-20',
    isImportant: false,
    link: '/events',
    linkText: 'View Tracks',
    badgeText: 'NEW'
  },
  {
    id: 'ann-4',
    title: 'Verified E-Certificates Issued for Pursuit 2026 Workshops',
    category: 'Results',
    description: 'All participants of the Web Development Workshop can now verify and download their official credential with QR code.',
    date: '2026-03-29',
    isImportant: false,
    link: '/certificates',
    linkText: 'Check Certificates',
    badgeText: 'CERTIFICATES'
  }
];

export const INITIAL_SPEAKERS: SpeakerItem[] = [
  {
    id: 'spk-1',
    name: 'Mr. Pankaj Nirale',
    role: 'Country Head',
    company: 'Red Lane Group, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    topic: 'Product-Market Fit & Lean MVP Experimentation',
    eventAttended: 'Product Market Fit Masterclass',
    year: '2025',
    bio: 'Corporate leader with 15+ years scaling tech and industrial operations across global markets.',
    linkedin: 'https://linkedin.com',
    type: 'Industry Leader'
  },
  {
    id: 'spk-2',
    name: 'Mr. Ankush Dongre',
    role: 'Senior Mobile Architect',
    company: 'Tech Industry Veteran',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    topic: 'Cross-Platform React Native Architecture & Scaling',
    eventAttended: 'App Development Workshop',
    year: '2025',
    bio: 'Mobile systems architect who has developed apps with over 5 million downloads on Play Store.',
    linkedin: 'https://linkedin.com',
    type: 'Expert'
  },
  {
    id: 'spk-3',
    name: 'Devendra Rao',
    role: 'Founder & CEO',
    company: 'NeuralForge AI (Alum)',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    topic: 'Zero to One: Bootstrapping an AI Startup from College',
    eventAttended: "E-Summit '26 Keynote",
    year: '2026',
    bio: 'SSGMCE alumnus who built and raised seed funding for an enterprise AI document processing suite.',
    linkedin: 'https://linkedin.com',
    type: 'Alumni'
  },
  {
    id: 'spk-4',
    name: 'Priyanka Nambiar',
    role: 'VP of Product',
    company: 'ScaleStream (ex-Stripe, YC W21)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    topic: 'Pricing, GTM, and Angel Fundraising Dynamics',
    eventAttended: 'Startup Launchpad Bootcamp',
    year: '2026',
    bio: 'Product strategist and angel investor helping student founders prepare for global accelerators.',
    linkedin: 'https://linkedin.com',
    type: 'Entrepreneur'
  }
];

export const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: 'part-1',
    name: 'Innovation & Incubation Council SSGMCE',
    category: 'Incubator',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop&q=80',
    description: 'Central campus incubation facility backed by DST and MSME grants.'
  },
  {
    id: 'part-2',
    name: 'SSGMCE Alumni Entrepreneurship Network',
    category: 'Alumni Venture',
    logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&auto=format&fit=crop&q=80',
    description: 'Global network of 5,000+ SSGMCE alumni providing mentorship and angel syndication.'
  },
  {
    id: 'part-3',
    name: 'Institution’s Innovation Council (IIC - MoE)',
    category: 'Ecosystem',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&auto=format&fit=crop&q=80',
    description: 'Government of India initiative to promote systematic student innovation.'
  },
  {
    id: 'part-4',
    name: 'AWS & Google Cloud Student Venture Hub',
    category: 'Industry Partner',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&auto=format&fit=crop&q=80',
    description: 'Providing up to $2,000 cloud credits per verified collegiate startup team.'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Rohan Deshmukh',
    role: 'Founder, VoltSync (3rd Year CSE)',
    department: 'Computer Science & Engineering',
    year: 'Class of 2026',
    quote: 'E-Cell SSGMCE transformed my college journey. What started as a mini-project in the lab became an award-winning prototype with ₹1L in grants thanks to the mentorship and Genesis Ideathon!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    eventAttended: "Genesis Ideathon & E-Summit '26",
    type: 'Student',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Sakshi Patil',
    role: 'PR & Outreach Lead, Team Navonmesh',
    department: 'Information Technology',
    year: 'Class of 2026',
    quote: 'Being part of E-Cell gave me real-world executive leadership skills. Managing sponsorships and coordinating national events with 600+ delegates is an experience you can never get in a classroom.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    eventAttended: 'Team Navonmesh Council',
    type: 'Student',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Mr. Pankaj Nirale',
    role: 'Country Head, Red Lane Group',
    department: 'Industry Partner & Speaker',
    year: 'Visiting Expert',
    quote: 'The energy, intellectual curiosity, and disciplined execution of the E-Cell SSGMCE student organizers is exceptional. Their events rival professional tech symposiums in tier-1 cities.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    eventAttended: 'Product-Market Fit Masterclass',
    type: 'Speaker',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Dr. S. B. Somani',
    role: 'Principal, SSGMCE Shegaon',
    department: 'Chief Patron',
    year: 'Faculty Leadership',
    quote: 'E-Cell SSGMCE is a cornerstone of our institution’s innovation ecosystem. We are proud of how our students blend engineering excellence with entrepreneurial leadership to create societal impact.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    eventAttended: 'Institutional Governance',
    type: 'Faculty',
    rating: 5
  }
];

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    title: "Behind The Scenes: How Team Navonmesh Built E-Summit '26",
    category: 'Behind The Scenes',
    date: '2026-04-20',
    readTime: '4 min read',
    banner: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80',
    author: 'Ashlesha Sultane',
    authorRole: 'Editorial & Content Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    excerpt: 'From 3 AM design sprints to coordinating 50+ startup booths and hosting angel investors across India, here is how SSGMCE organized central India’s biggest student venture congress.',
    content: `Organizing E-Summit '26 was not just an event—it was a test of teamwork, endurance, and strategic execution. Over 45 committee members across 8 wings synchronized their efforts over 60 days to welcome 600+ delegates from 25 colleges.

The Technical wing deployed our custom real-time ticketing and badge issuance platform; the PR wing achieved 50,000+ organic impressions; and our Management wing orchestrated seamless food, guest hospitality, and auditorium audio-visual flows.

This summit proved once again that when students are given trust and autonomy, they build world-class experiences.`,
    featured: true
  },
  {
    id: 'story-2',
    title: 'From College Lab Prototype to MeitY Grand Winner: The VoltSync Journey',
    category: 'Member Spotlight',
    date: '2026-03-15',
    readTime: '5 min read',
    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1000&auto=format&fit=crop&q=80',
    author: 'Atharv Sonone',
    authorRole: 'Chairperson, E-Cell SSGMCE',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    excerpt: 'How two CSE 3rd year students used the E-Cell prototyping sandbox to build an EV battery telemetry algorithm that won ₹1,00,000 at the National Hackathon.',
    content: `When Aarav and his team first pitched their battery health monitor during the Genesis Ideathon, their circuit was held together with breadboards and tape.

Through dedicated mentoring from faculty coordinator Dr. D. D. Nawgaje and hardware fabrication lab access, the team refined their CAN-bus telemetry module. Six months later, they stood on the national podium in New Delhi receiving the top prize from government dignitaries.`,
    featured: true
  },
  {
    id: 'story-3',
    title: 'Why Every Engineering Student Should Join a Committee',
    category: 'Team Story',
    date: '2026-02-10',
    readTime: '3 min read',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    author: 'Dolly Bhutada',
    authorRole: 'Vice-Chairperson',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    excerpt: 'Technical skills get you interviews, but leadership, crisis management, and stakeholder empathy make you an unforgettable leader.',
    content: `Working in E-Cell teaches you the unwritten curriculum of engineering: how to negotiate with corporate sponsors, how to lead peers without formal authority, and how to stay calm when a live demo encounters unexpected turbulence. These experiences forge lifelong confidence.`,
    featured: false
  }
];

export const INITIAL_APPLICATIONS: JoinApplication[] = [
  {
    id: 'app-1',
    fullName: 'Ravi Teja Kulkarni',
    email: 'ravi.kulkarni@ssgmce.ac.in',
    phone: '+91 94231 55678',
    department: 'Computer Science & Engineering',
    year: '2nd Year',
    collegeId: '2024CS0218',
    domainInterest: ['Technical', 'Management'],
    whyJoin: 'I want to build full-stack web platforms for E-Cell events, contribute to open-source campus tools, and learn leadership.',
    previousExperience: 'Built the branch coding club website and participated in Genesis Ideathon 2025.',
    status: 'pending',
    submittedAt: '2026-08-25'
  },
  {
    id: 'app-2',
    fullName: 'Tanvi Shinde',
    email: 'tanvi.shinde@ssgmce.ac.in',
    phone: '+91 98812 33445',
    department: 'Information Technology',
    year: '1st Year',
    collegeId: '2025IT0104',
    domainInterest: ['Social Media & Content', 'Publicity & PR'],
    whyJoin: 'I am passionate about graphic design, video editing for Instagram reels, and writing engaging tech event stories.',
    previousExperience: 'Managed school cultural fest social media handle and Canva design portfolios.',
    status: 'reviewed',
    submittedAt: '2026-08-26'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Kunal Joshi',
    email: 'kunal.joshi@techcorp.in',
    phone: '+91 98220 11223',
    subject: 'Corporate Sponsorship Inquiry for E-Summit 2026',
    message: 'Hello Team Navonmesh, our company would like to explore Title Sponsorship and mentorship booth opportunities for your upcoming E-Summit.',
    status: 'unread',
    createdAt: '2026-08-27'
  },
  {
    id: 'msg-2',
    name: 'Pooja Raut',
    email: 'pooja.raut@coep.ac.in',
    phone: '+91 97654 44556',
    subject: 'Inter-College Ideathon Delegation Registration',
    message: 'We have a contingent of 12 students from COEP Pune wishing to participate in the Genesis Ideathon. Can we get bulk registration assistance?',
    status: 'read',
    createdAt: '2026-08-24'
  }
];

