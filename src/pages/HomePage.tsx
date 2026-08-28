import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { CinematicIntro } from '../components/CinematicIntro';
import { EntrepreneurshipNetworkHero } from '../components/EntrepreneurshipNetworkHero';
import { JoinModal } from '../components/JoinModal';
import { GalleryLightboxModal } from '../components/GalleryLightboxModal';
import { TeamMemberDetailModal } from '../components/TeamMemberDetailModal';
import { EventDetailModal } from '../components/EventDetailModal';
import { MentorRequestModal } from '../components/MentorRequestModal';
import { 
  Rocket, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Compass, 
  Trophy, 
  Users, 
  Award, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  DollarSign, 
  ExternalLink,
  Target,
  Layers,
  Code,
  Flame,
  Building2,
  Mail,
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Quote,
  Lightbulb,
  BookOpen,
  ArrowUpRight,
  Send,
  Bell,
  SlidersHorizontal,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import { EventItem, MentorItem, CommitteeMember, GalleryItem, SpeakerItem } from '../types';
import { EcellLogo } from '../components/EcellLogo';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAuth }) => {
  const { 
    events, 
    mentors, 
    committee, 
    gallery, 
    achievements, 
    initiatives, 
    announcements, 
    speakers, 
    testimonials,
    partners,
    submitContactMessage,
    registerForEvent
  } = useEcell();
  const { user } = useAuth();

  // 0. Cinematic Intro (once per session)
  const [showCinematicIntro, setShowCinematicIntro] = useState<boolean>(() => {
    const seen = sessionStorage.getItem('ecell_intro_seen');
    return !seen;
  });

  const handleFinishIntro = () => {
    sessionStorage.setItem('ecell_intro_seen', 'true');
    setShowCinematicIntro(false);
  };

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<MentorItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinDefaultDomain, setJoinDefaultDomain] = useState<string>('Management');

  // Event category tabs
  const [eventCategoryFilter, setEventCategoryFilter] = useState<'All' | 'Upcoming' | 'Past'>('All');
  
  // Committee domain tabs
  const [committeeDomainFilter, setCommitteeDomainFilter] = useState<string>('All');

  // Timeline year selector
  const [selectedTimelineYear, setSelectedTimelineYear] = useState<'2026' | '2025' | '2024' | '2023'>('2026');

  // Gallery category tabs
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) return;
    setIsContactSubmitting(true);
    await submitContactMessage({
      name: contactName,
      email: contactEmail,
      phone: contactPhone || undefined,
      subject: contactSubject,
      message: contactMessage
    });
    setIsContactSubmitting(false);
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactSubject('');
      setContactMessage('');
    }, 3000);
  };

  // Filtered Events
  const filteredEvents = events.filter(ev => {
    if (eventCategoryFilter === 'Upcoming') return ev.status === 'upcoming' || ev.status === 'ongoing';
    if (eventCategoryFilter === 'Past') return ev.status === 'completed';
    return true;
  }).slice(0, 6);

  // Filtered Committee
  const committeeDomains = [
    'All',
    'Faculty Incharge',
    'Leadership',
    'Technical',
    'Management',
    'Publicity & PR',
    'Social Media & Content',
    'Sponsorship',
    'Discipline'
  ];

  const filteredCommittee = committee.filter(m => {
    if (committeeDomainFilter === 'All') return true;
    if (committeeDomainFilter === 'Faculty Incharge') return m.domain === 'Faculty Incharge' || m.domain === 'Faculty Advisory';
    return m.domain === committeeDomainFilter;
  }).slice(0, 8);

  // Filtered Gallery
  const galleryCategories = ['All', 'Events', 'Workshops', 'Competitions', 'Guest Sessions', 'Team & Campus'];
  const filteredGallery = gallery.filter(g => {
    if (galleryCategoryFilter === 'All') return true;
    return g.category === galleryCategoryFilter;
  }).slice(0, 6);

  // Journey Timeline Data
  const timelineMilestones: Record<string, { title: string; subtitle: string; points: string[]; badge: string }> = {
    '2026': {
      title: 'Venture Congress & AI Hackathons',
      subtitle: 'Expanded national footprints and DST NIDHI grant incubation',
      points: [
        "Launched E-Summit '26 with ₹1.5L+ prize pool and 600+ delegates from across India.",
        'Conducted Srujan 24h Non-Stop Technical Hackathon and Genesis Ideathon.',
        'Incubated 5 campus hardware & AI startups with university prototyping access.'
      ],
      badge: 'Current Era'
    },
    '2025': {
      title: 'Institutional Recognition & Masterclasses',
      subtitle: 'Scaling cross-platform workshops and industrial tie-ups',
      points: [
        'Organized App Development & React Native Bootcamp with 100+ attendees.',
        'Hosted Country Head Mr. Pankaj Nirale for Product-Market Fit masterclasses.',
        'VoltSync campus venture secured 1st prize at National MeitY Smart City Hackathon.'
      ],
      badge: 'Expansion'
    },
    '2024': {
      title: 'Best Campus Committee Honor',
      subtitle: 'Institutional awards and structured wing system',
      points: [
        'Awarded Best Technical & Leadership Committee by SSGMCE administration.',
        'Organized over 20+ skill sessions in web, cloud, and IoT for student builders.',
        'Surpassed 2,000+ cumulative student registrations across all flagship initiatives.'
      ],
      badge: 'Award Winning'
    },
    '2023': {
      title: 'Foundational Sandbox & Ideathons',
      subtitle: 'Building the initial incubation infrastructure',
      points: [
        'Established dedicated prototyping laboratory in collaboration with Alumni Association.',
        'Pioneered the Roadies leadership stamina arena and inter-branch hackathons.',
        'Formed structured domain divisions: Technical, Management, PR, and Design wings.'
      ],
      badge: 'Milestone'
    }
  };

  return (
    <div className="min-h-screen text-[#F8FAFC] overflow-hidden pb-16 bg-[#030712]">
      {/* 0. CINEMATIC INTRO OVERLAY */}
      {showCinematicIntro && (
        <CinematicIntro onComplete={handleFinishIntro} />
      )}

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          {/* Institutional Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-mono tracking-wider shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>E-CELL SSGMCE • ESTD. 2014 • SHRI SANT GAJANAN MAHARAJ COLLEGE OF ENGINEERING</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight"
          >
            WHERE IDEAS <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              MEET ACTION.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            The Official Entrepreneurship Cell of Shri Sant Gajanan Maharaj College of Engineering, Shegaon. 
            Fostering innovation, building student leaders, and empowering the next generation of changemakers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <button
              onClick={() => onNavigate('/events')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/25 flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={() => {
                setJoinDefaultDomain('Management');
                setIsJoinModalOpen(true);
              }}
              className="px-6 py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Join E-Cell</span>
            </button>

            <button
              onClick={() => onNavigate('/about')}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm sm:text-base transition-all"
            >
              Learn About Us
            </button>
          </motion.div>
        </div>

        {/* Interactive E-Cell Ecosystem Network Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-6"
        >
          <EntrepreneurshipNetworkHero onNavigate={onNavigate} />
        </motion.div>
      </section>

      {/* 2. STATISTICAL METRICS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Years of Innovation', value: '10+', sub: 'Estd. 2014 at SSGMCE', icon: Award, color: 'text-amber-400' },
            { label: 'Events Conducted', value: `${events.length > 0 ? events.length + 15 : 50}+`, sub: 'Workshops & hackathons', icon: Calendar, color: 'text-blue-400' },
            { label: 'Students Impacted', value: '1000+', sub: 'Active campus builders', icon: Users, color: 'text-cyan-400' },
            { label: 'Workshops & Labs', value: '25+', sub: 'Hands-on tech bootcamps', icon: Code, color: 'text-emerald-400' },
            { label: 'Hackathons & Sprints', value: '15+', sub: 'National competitions', icon: Trophy, color: 'text-rose-400' },
            { label: 'Team Navonmesh', value: `${committee.length > 0 ? committee.length : 30}+`, sub: 'Student leaders & leads', icon: ShieldCheck, color: 'text-purple-400' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col items-start justify-between space-y-2 hover:border-slate-700 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className={`text-2xl sm:text-3xl font-black ${stat.color} tracking-tight`}>
                  {stat.value}
                </p>
                <p className="text-xs font-bold text-white mt-0.5">{stat.label}</p>
                <p className="text-[11px] text-slate-400 leading-tight">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT E-CELL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
              <span>ABOUT THE COMMITTEE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              MORE THAN A COMMITTEE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                A CATALYST FOR INNOVATION.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The Entrepreneurship Cell (E-Cell) of Shri Sant Gajanan Maharaj College of Engineering, Shegaon is an official student-led committee dedicated to nurturing an entrepreneurial mindset, technical leadership, and collaborative problem-solving across all engineering disciplines.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To establish SSGMCE as a regional powerhouse for high-impact student startups, technological innovations, and ethical entrepreneurial leaders in India.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Rocket className="w-4 h-4" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To provide structured skill workshops, seed grant incubation, founder mentorship, and national competitive arenas to turn classroom concepts into scalable ventures.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-all"
              >
                <span>Read Full Story & History</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>

          {/* Right Pillar Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            {[
              { title: 'Leadership', desc: 'Cultivating executive decision making & team ownership.', icon: Compass, color: 'text-amber-400', border: 'border-amber-400/30' },
              { title: 'Innovation', desc: 'Transforming technical coursework into real products.', icon: Lightbulb, color: 'text-cyan-400', border: 'border-cyan-400/30' },
              { title: 'Execution', desc: 'Disciplined event orchestration & measurable outcomes.', icon: Zap, color: 'text-emerald-400', border: 'border-emerald-400/30' },
              { title: 'Community', desc: 'Fostering peer collaboration across all academic years.', icon: Users, color: 'text-purple-400', border: 'border-purple-400/30' },
            ].map((pillar, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl bg-slate-900/60 border ${pillar.border} backdrop-blur-md space-y-2`}
              >
                <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO / INITIATIVES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold tracking-wider">
              CORE INITIATIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              WHAT WE DO AT E-CELL
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              From first-year orientation to seed capital qualification, we conduct end-to-end programs that empower students.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/initiatives')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 self-start md:self-auto"
          >
            <span>Explore All Initiatives</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((init) => (
            <div
              key={init.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 backdrop-blur-md flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {init.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{init.frequency}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {init.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {init.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Key Outcomes:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {init.outcomes.map((out, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] font-medium text-slate-300">
                      ✓ {out}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED EVENTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
              EVENTS & ACTIVITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              WHAT'S HAPPENING AT E-CELL
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Participate in flagship competitions, bootcamps, and technical symposiums designed by Team Navonmesh.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['All', 'Upcoming', 'Past'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setEventCategoryFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  eventCategoryFilter === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="rounded-3xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80'}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/80 text-blue-400 border border-blue-500/30 backdrop-blur-md">
                      {event.category}
                    </span>
                    {event.status === 'upcoming' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white">
                        REGISTERING
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {event.date}
                    </span>
                    {event.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {event.venue}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  View Details
                </button>

                {event.status === 'upcoming' ? (
                  <button
                    onClick={async () => {
                      if (!user) {
                        onOpenAuth('login');
                      } else {
                        await registerForEvent(event.id);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all"
                  >
                    Register Now
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-mono">Concluded</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('/events')}
            className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-white text-sm font-bold transition-all inline-flex items-center gap-2"
          >
            <span>Browse Complete Events Hub & Archives</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </section>

      {/* 6. E-CELL JOURNEY / TIMELINE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono font-bold tracking-wider">
            OUR EVOLUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            E-CELL THROUGH THE YEARS
          </h2>
          <p className="text-sm text-slate-400">
            A decade of relentless student initiative, building institutional excellence year after year.
          </p>

          {/* Interactive Year Selector */}
          <div className="flex items-center justify-center gap-3 pt-4">
            {(['2026', '2025', '2024', '2023'] as const).map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedTimelineYear(yr)}
                className={`px-5 py-2 rounded-xl text-sm font-bold font-mono transition-all ${
                  selectedTimelineYear === yr
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Year Milestone Showcase */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-3xl sm:text-4xl font-black text-blue-400 font-mono">
              {selectedTimelineYear}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
              {timelineMilestones[selectedTimelineYear].badge}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {timelineMilestones[selectedTimelineYear].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {timelineMilestones[selectedTimelineYear].subtitle}
            </p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            {timelineMilestones[selectedTimelineYear].points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEET THE TEAM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold tracking-wider">
              STUDENT & FACULTY LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              MEET TEAM NAVONMESH 2026-27
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Guided by dedicated faculty mentors and driven by passionate student coordinators across all technical & management wings.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/team')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 self-start md:self-auto"
          >
            <span>View Full Council Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Domain Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {committeeDomains.map(dom => (
            <button
              key={dom}
              onClick={() => setCommitteeDomainFilter(dom)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                committeeDomainFilter === dom
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredCommittee.map(member => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 backdrop-blur-md cursor-pointer transition-all flex flex-col items-center text-center group shadow-lg"
            >
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 mb-3 border-2 border-slate-700 group-hover:border-blue-400 transition-colors">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-900/30 text-blue-300 font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>
                )}
                {member.isLead && (
                  <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[8px] font-bold bg-amber-500 text-slate-950">
                    LEAD
                  </span>
                )}
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-1.5">
                {member.domain}
              </span>

              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                {member.name}
              </h3>

              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                {member.role}
              </p>

              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                {member.department}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ACHIEVEMENTS & RECOGNITION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold tracking-wider">
              HONORS & MILESTONES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              OUR ACHIEVEMENTS
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Celebrating institutional accolades, grant benchmarks, and national hackathon victories.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/achievements')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 self-start md:self-auto"
          >
            <span>View All Recognitions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-400/40 backdrop-blur-md space-y-3 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{ach.badgeIcon}</span>
                <span className="text-xs font-mono font-bold text-amber-400">{ach.year}</span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {ach.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {ach.awardName} • <span className="text-slate-400">{ach.awardedBy}</span>
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {ach.description}
              </p>

              {ach.stats && (
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Impact Metric</span>
                  <span className="font-mono font-bold text-emerald-400">{ach.stats}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. SPEAKERS & INDUSTRY GUESTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            GUEST MENTORS & KEYNOTES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LEARN FROM INDUSTRY LEADERS
          </h2>
          <p className="text-sm text-slate-400">
            Fireside chats and practical teardowns with serial founders, country heads, and distinguished alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakers.map(speaker => (
            <div
              key={speaker.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400">
                    {speaker.type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{speaker.name}</h3>
                  <p className="text-xs font-semibold text-blue-400">{speaker.role}</p>
                  <p className="text-[11px] text-slate-400">{speaker.company}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Masterclass Topic:</p>
                  <p className="text-xs text-slate-200 font-medium mt-0.5 leading-snug">{speaker.topic}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{speaker.eventAttended}</span>
                <span className="font-mono text-slate-400">{speaker.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. GALLERY SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold tracking-wider">
              MEMORIES & MOMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              EVENT GALLERY
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Capturing the vibrant spirit of hackathons, workshops, and student summits at SSGMCE Shegaon.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setGalleryCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  galleryCategoryFilter === cat
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 aspect-[4/3] cursor-pointer border border-slate-800 hover:border-slate-600 shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/90 text-white backdrop-blur-md">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1">
                  {item.eventName} • {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('/gallery')}
            className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-white text-sm font-bold transition-all inline-flex items-center gap-2"
          >
            <span>View Complete Photo Gallery & Archives</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </section>

      {/* 11. STUDENT TESTIMONIALS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
            COMMUNITY EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WHAT STUDENTS & PATRONS SAY
          </h2>
          <p className="text-sm text-slate-400">
            Real stories of transformation, leadership, and startup momentum from the SSGMCE family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-blue-500/40" />
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <h3 className="text-xs font-bold text-white">{t.name}</h3>
                  <p className="text-[10px] text-blue-400 font-medium">{t.role}</p>
                  <p className="text-[10px] text-slate-400">{t.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. LATEST ANNOUNCEMENTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold tracking-wider">
              NOTICE BOARD
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              LATEST ANNOUNCEMENTS
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Stay updated with registration deadlines, track releases, and committee circulars.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/announcements')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 self-start md:self-auto"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.map(ann => (
            <div
              key={ann.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ann.badgeText && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ann.badgeText === 'HOT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        ann.badgeText === 'RECRUITMENT' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {ann.badgeText}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-400">{ann.category}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{ann.date}</span>
                </div>

                <h3 className="text-base font-bold text-white">{ann.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{ann.description}</p>
              </div>

              {ann.link && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (ann.link === '/join') {
                        setIsJoinModalOpen(true);
                      } else if (ann.link) {
                        onNavigate(ann.link);
                      }
                    }}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                  >
                    <span>{ann.linkText || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 13. JOIN E-CELL / STUDENT PARTICIPATION (4 PATHWAYS) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
            GET INVOLVED
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            BECOME PART OF E-CELL SSGMCE
          </h2>
          <p className="text-sm text-slate-400">
            Choose your pathway to engage with central India's most active student entrepreneurship ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pathway 1: Join Committee */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-900/20 to-slate-900 border border-blue-500/30 flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Join Committee</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Apply for Team Navonmesh 2026-27 across Technical, PR, Management, and Creative domains.
              </p>
            </div>
            <button
              onClick={() => {
                setJoinDefaultDomain('Management');
                setIsJoinModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all"
            >
              Apply for Induction
            </button>
          </div>

          {/* Pathway 2: Participate in Events */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-900/20 to-slate-900 border border-indigo-500/30 flex flex-col justify-between space-y-4 hover:border-indigo-400 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Participate in Events</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Register for hackathons, ideathons, and weekend coding bootcamps to earn verified credentials.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/events')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
            >
              Browse Event Hub
            </button>
          </div>

          {/* Pathway 3: Volunteer for Fests */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-900/20 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-4 hover:border-purple-400 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Volunteer for Fests</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Help organize E-Summit and Navonmesh Carnivals. Gain on-ground operations experience.
              </p>
            </div>
            <button
              onClick={() => {
                setJoinDefaultDomain('Event Operations');
                setIsJoinModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all"
            >
              Sign Up as Volunteer
            </button>
          </div>

          {/* Pathway 4: Collaborate & Sponsor */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-900/20 to-slate-900 border border-emerald-500/30 flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Partner / Sponsor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Companies, incubators, and student committees can collaborate with E-Cell SSGMCE on events.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/contact')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              Connect with PR Wing
            </button>
          </div>
        </div>
      </section>

      {/* 14. CONTACT & INSTITUTIONAL INFORMATION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              CONNECT WITH E-CELL SSGMCE
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Have questions about upcoming events, mentorship sessions, or want to invite us for an inter-college collaboration? Send us a note!
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">Shri Sant Gajanan Maharaj College of Engineering</p>
                  <p className="text-slate-400">Shegaon - 444203, Dist. Buldhana, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>ecell@ssgmce.ac.in</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <GlobeIcon className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>https://www.ssgmce.ac.in</span>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
            {contactSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out. Team Navonmesh Secretariat will review and respond to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send an Official Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Inquiry Type *</label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={e => setContactSubject(e.target.value)}
                      placeholder="e.g. Event Partnership / Speaker Invitation"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    placeholder="Write your inquiry or message here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isContactSubmitting}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isContactSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ALL MODAL OVERLAYS */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        defaultDomain={joinDefaultDomain}
      />

      <GalleryLightboxModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />

      <TeamMemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={() => {
            if (!user) onOpenAuth('login');
            else registerForEvent(selectedEvent.id);
          }}
        />
      )}

      {selectedMentor && (
        <MentorRequestModal
          mentor={selectedMentor}
          isOpen={!!selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  );
};

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
