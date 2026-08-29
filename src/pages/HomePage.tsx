import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { CinematicIntro } from '../components/CinematicIntro';
import { HeroConstellation } from '../components/HeroConstellation';
import { LiveEcellBanner } from '../components/universe/LiveEcellBanner';
import { JourneyChooser } from '../components/universe/JourneyChooser';
import { EventStoriesShowcase } from '../components/universe/EventStoriesShowcase';
import { MomentOfTheMonth } from '../components/universe/MomentOfTheMonth';
import { EcellTimeMachine } from '../components/universe/EcellTimeMachine';
import { InteractiveTeamHierarchy } from '../components/universe/InteractiveTeamHierarchy';
import { EcellHallOfFame } from '../components/universe/EcellHallOfFame';
import { FloatingMemoryWall } from '../components/universe/FloatingMemoryWall';
import { BehindTheEventProcess } from '../components/universe/BehindTheEventProcess';
import { StudentVoices } from '../components/universe/StudentVoices';
import { EcellPassport } from '../components/universe/EcellPassport';
import { EcellNewsroom } from '../components/universe/EcellNewsroom';
import { ActivityMapTree } from '../components/universe/ActivityMapTree';
import { EcellCalendarView } from '../components/universe/EcellCalendarView';
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
  ExternalLink,
  Target,
  Layers,
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
  Send,
  Bell,
  Instagram,
  Linkedin,
  Youtube,
  Twitter
} from 'lucide-react';
import { motion } from 'motion/react';
import { EventItem, MentorItem, CommitteeMember, GalleryItem, SpeakerItem } from '../types';
import { SectionConnector } from '../components/background/SectionConnector';

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
    stories,
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

  return (
    <div className="min-h-screen text-[#F8FAFC] overflow-hidden pb-16 bg-transparent">
      {/* 0. CINEMATIC INTRO OVERLAY */}
      {showCinematicIntro && (
        <CinematicIntro onComplete={handleFinishIntro} />
      )}

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Action CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tag / Eyebrow with Established Year */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono text-xs font-bold tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>EST. 2014 • E-CELL SSGMCE</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
            >
              WHERE IDEAS <br />
              MEET ACTION<span className="text-sky-400">.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed font-normal"
            >
              Building a vibrant community of thinkers, creators and future leaders at Shri Sant Gajanan Maharaj College of Engineering, Shegaon.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                onClick={() => onNavigate('/about')}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-sky-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>EXPLORE E-CELL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setJoinDefaultDomain('Management');
                  setIsJoinModalOpen(true);
                }}
                className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all hover:scale-[1.02] cursor-pointer backdrop-blur-md"
              >
                JOIN E-CELL
              </button>

              <button
                onClick={() => onNavigate('/events')}
                className="px-5 py-3.5 rounded-2xl text-slate-400 hover:text-sky-300 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5"
              >
                <span>Explore Events</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive 6-Node Constellation Hub */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <HeroConstellation onNavigate={onNavigate} />
          </div>
        </div>

        {/* Vertical Social Media Bar (Right Edge) */}
        <div className="hidden 2xl:flex flex-col items-center gap-5 absolute -right-6 top-1/3 -translate-y-1/2 z-30">
          <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-white/20 to-white/10" />
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-white transition-colors hover:scale-110"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-white transition-colors hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-white transition-colors hover:scale-110"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-white transition-colors hover:scale-110"
            title="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <div className="w-[1px] h-14 bg-gradient-to-b from-white/10 via-white/20 to-transparent" />
        </div>

        {/* 2. STATISTICAL METRICS CAPSULE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 max-w-6xl mx-auto rounded-3xl bg-[#080d1e]/85 border border-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-7"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { icon: Calendar, value: '10+', line1: 'YEARS', line2: 'OF E-CELL', color: 'text-sky-400' },
              { icon: Star, value: `${events.length > 0 ? events.length + 15 : 50}+`, line1: 'EVENTS', line2: 'CONDUCTED', color: 'text-indigo-400' },
              { icon: Users, value: '2500+', line1: 'STUDENTS', line2: 'ENGAGED', color: 'text-cyan-400' },
              { icon: BookOpen, value: '25+', line1: 'WORKSHOPS', line2: 'CONDUCTED', color: 'text-sky-400' },
              { icon: Trophy, value: '15+', line1: 'COMPETITIONS', line2: 'ORGANIZED', color: 'text-purple-400' },
              { icon: Users, value: `${committee.length > 0 ? committee.length : 30}+`, line1: 'TEAM', line2: 'MEMBERS', color: 'text-indigo-400' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3 sm:px-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2.5">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stat.value}</p>
                <p className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">{stat.line1}</p>
                <p className="text-[8.5px] sm:text-[9.5px] font-medium text-slate-400 uppercase tracking-widest">{stat.line2}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. LIVE E-CELL STATUS BANNER */}
      <LiveEcellBanner
        events={events}
        onSelectEvent={setSelectedEvent}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Universe Hub" toLabel="Choose Your Route" />

      {/* 4. CHOOSE YOUR E-CELL JOURNEY */}
      <JourneyChooser onNavigate={onNavigate} />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Pathways" toLabel="About Committee" />

      {/* 5. ABOUT E-CELL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT THE COMMITTEE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              MORE THAN A COMMITTEE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
                A CATALYST FOR INNOVATION.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The Entrepreneurship Cell (E-Cell) of Shri Sant Gajanan Maharaj College of Engineering, Shegaon is an official student-led committee dedicated to nurturing an entrepreneurial mindset, technical leadership, and collaborative problem-solving across all engineering disciplines.
            </p>

            {/* Journey Flow: IDEA -> LEARNING -> CONNECTION -> EXPERIENCE -> IMPACT */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">
                THE E-CELL JOURNEY:
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-white">
                <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300">IDEA</span>
                <span className="text-slate-500">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300">LEARNING</span>
                <span className="text-slate-500">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300">CONNECTION</span>
                <span className="text-slate-500">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300">EXPERIENCE</span>
                <span className="text-slate-500">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300">IMPACT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
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
                <ArrowRight className="w-4 h-4 text-sky-400" />
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

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Vision & Culture" toLabel="Event Stories" />

      {/* 6. EVENT STORIES SHOWCASE (5-Phase Journey) */}
      <EventStoriesShowcase
        events={events}
        gallery={gallery}
        onSelectEvent={setSelectedEvent}
        onOpenLightbox={setSelectedGalleryItem}
      />

      {/* 7. FEATURED MOMENT OF THE MONTH */}
      <MomentOfTheMonth
        events={events}
        achievements={achievements}
        onSelectEvent={setSelectedEvent}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Stories" toLabel="Time Machine" />

      {/* 8. E-CELL TIME MACHINE (2023 - 2026) */}
      <EcellTimeMachine
        events={events}
        achievements={achievements}
        gallery={gallery}
        committee={committee}
        onSelectEvent={setSelectedEvent}
        onOpenLightbox={setSelectedGalleryItem}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Decade Timeline" toLabel="Committee Hierarchy" />

      {/* 9. INTERACTIVE TEAM HIERARCHY */}
      <InteractiveTeamHierarchy
        committee={committee}
        onSelectMember={setSelectedMember}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Team Wings" toLabel="Hall of Fame" />

      {/* 10. E-CELL HALL OF FAME */}
      <EcellHallOfFame
        achievements={achievements}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Honors" toLabel="Photo Memory Wall" />

      {/* 11. FLOATING PHOTOGRAPH MEMORY WALL */}
      <FloatingMemoryWall
        gallery={gallery}
        onOpenLightbox={setSelectedGalleryItem}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Memory Vault" toLabel="Execution Workflow" />

      {/* 12. BEHIND THE EVENT (7-Step Process) */}
      <BehindTheEventProcess />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Process" toLabel="Student Voices" />

      {/* 13. STUDENT VOICES */}
      <StudentVoices testimonials={testimonials} />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Voices" toLabel="Student Passport" />

      {/* 14. E-CELL STUDENT PASSPORT & DIGITAL STAMPS */}
      <EcellPassport
        onOpenAuth={() => onOpenAuth('login')}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Passport" toLabel="Industry Voices" />

      {/* 15. INDUSTRY VOICES / GUEST MENTORS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>INDUSTRY VOICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            LEARN FROM INDUSTRY LEADERS
          </h2>
          <p className="text-sm text-slate-400">
            Fireside chats and practical masterclasses with serial founders, corporate executives, and distinguished alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakers.map(speaker => (
            <div
              key={speaker.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all shadow-lg"
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
                  <p className="text-xs font-semibold text-sky-400">{speaker.role}</p>
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

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Mentors" toLabel="Newsroom" />

      {/* 16. E-CELL NEWSROOM */}
      <EcellNewsroom
        announcements={announcements}
        stories={stories}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Newsroom" toLabel="Activity Architecture" />

      {/* 17. ACTIVITY MAP TREE */}
      <ActivityMapTree onNavigate={onNavigate} />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Activity Map" toLabel="Schedule" />

      {/* 18. E-CELL CALENDAR */}
      <EcellCalendarView
        events={events}
        onSelectEvent={setSelectedEvent}
        onNavigate={onNavigate}
      />

      {/* CONNECTOR */}
      <SectionConnector fromLabel="Calendar" toLabel="Induction & Outreach" />

      {/* 19. FINAL JOIN E-CELL CTA & 4 PATHWAYS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE NEXT CHAPTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            THE UNIVERSE IS BUILT BY ITS PEOPLE.
          </h2>
          <p className="text-sm text-slate-400">
            Your next idea could be the beginning of something bigger. Choose how you want to be part of E-Cell SSGMCE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pathway 1: Join Committee */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-sky-900/20 to-slate-900 border border-sky-500/30 flex flex-col justify-between space-y-4 hover:border-sky-400 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
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
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
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

      {/* 20. CONTACT & INSTITUTIONAL INFORMATION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider">
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
                <MapPin className="w-5 h-5 text-sky-400 mt-0.5 shrink-0" />
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isContactSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
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

