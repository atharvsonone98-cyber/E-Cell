import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { StartupNodeVisualizer } from '../components/StartupNodeVisualizer';
import { EcellEventsHub } from '../components/EcellEventsHub';
import { EcellIdeathonTracksModal } from '../components/EcellIdeathonTracksModal';
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
  Heart,
  ExternalLink,
  Target,
  Layers,
  Code,
  Flame,
  Building2,
  Terminal,
  Download,
  Mail,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { StartupDetailModal } from '../components/StartupDetailModal';
import { EventDetailModal } from '../components/EventDetailModal';
import { MentorRequestModal } from '../components/MentorRequestModal';
import { StartupItem, EventItem, MentorItem, CommitteeMember } from '../types';
import { EcellLogo } from '../components/EcellLogo';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAuth }) => {
  const { startups, events, mentors, committee, analytics, likeStartup } = useEcell();
  const { user } = useAuth();

  const [selectedStartup, setSelectedStartup] = useState<StartupItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<MentorItem | null>(null);
  const [isProblemStatementsOpen, setIsProblemStatementsOpen] = useState(false);
  const [activeCommitteeDomain, setActiveCommitteeDomain] = useState<string>('All');

  const featuredStartups = startups.slice(0, 3);
  const upcomingEvents = events.slice(0, 4);
  const spotlightMentors = mentors.slice(0, 3);

  const committeeDomains = [
    'All',
    'Leadership',
    'Final Year Advisors',
    'Technical',
    'Management',
    'Publicity & PR',
    'Social Media & Content',
    'Sponsorship',
    'Discipline',
    'Faculty Advisory'
  ];

  const filteredHomeCommittee = committee.filter(m => {
    if (activeCommitteeDomain === 'All') return true;
    return m.domain === activeCommitteeDomain;
  });

  const stats = [
    { label: 'Active Innovators', value: `${analytics.totalUsers}+`, change: '+34% this term' },
    { label: 'Incubated Startups', value: `${analytics.totalStartups}`, change: '4 in seed due diligence' },
    { label: 'Annual Events & Sprints', value: `${analytics.totalEvents}+`, change: '₹15L prize pool' },
    { label: 'Venture Mentors', value: `${analytics.totalMentors}`, change: 'YC & Tier-1 VCs' },
    { label: 'Seed Capital Facilitated', value: analytics.fundingFacilitated, change: 'Grants & Angel Rounds' }
  ];

  const whatWeDo = [
    {
      title: 'Problem Ideation & Discovery',
      icon: Target,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-transparent',
      description: 'Structured design thinking hackathons and customer discovery frameworks to turn raw observations into market opportunities.'
    },
    {
      title: '14-Day MVP Launchpad',
      icon: Code,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-transparent',
      description: 'Rapid prototyping sprints with cloud credits, API grants, and technical architectures to ship functional products.'
    },
    {
      title: '1-on-1 Venture Mentorship',
      icon: Compass,
      color: 'text-indigo-400',
      bgGlow: 'from-indigo-500/10 to-transparent',
      description: 'Direct advisory sessions with venture-backed founders, product leads, and partners from top investment syndicates.'
    },
    {
      title: 'Pitch Arena & Demo Days',
      icon: Trophy,
      color: 'text-rose-400',
      bgGlow: 'from-rose-500/10 to-transparent',
      description: 'High-stakes collegiate pitch battles with live community upvoting, mentor teardowns, and direct angel qualification.'
    },
    {
      title: 'Seed Grants & Incubation',
      icon: DollarSign,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-transparent',
      description: 'Access to university incubation grants, DST/NIDHI schemes, dedicated co-working offices, and legal compliance.'
    },
    {
      title: 'Co-Founder Matching Matrix',
      icon: Users,
      color: 'text-purple-400',
      bgGlow: 'from-purple-500/10 to-transparent',
      description: 'Cross-disciplinary network pairing engineering builders with growth marketers, domain specialists, and UI/UX designers.'
    }
  ];

  return (
    <div className="min-h-screen text-[#F8FAFC] overflow-hidden pb-16">
      {/* 1. HERO SECTION WITH PROFESSIONAL POLISH SPLIT GRID */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Cohort Badge with Interactive EcellLogo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-transparent border border-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-6 w-fit shadow-lg shadow-indigo-500/10"
            >
              <EcellLogo size={24} variant="glow" animated={true} interactive={true} showText={false} />
              <span>Shri Sant Gajanan Maharaj College of Engineering • E-Cell SSGMCE</span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-[84px] leading-[0.9] font-bold tracking-tighter text-white mb-6"
            >
              BUILD.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                LAUNCH.
              </span><br />
              LEAD.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed mb-8"
            >
              Official Entrepreneurship Cell of Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon. Empowering student innovators from idea to venture scale with mentorship, funding, and incubation.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => onNavigate('/startups')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all group shadow-lg shadow-indigo-600/20"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('/pitch-arena')}
                className="border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all bg-white/[0.02]"
              >
                Pitch your idea
              </button>
            </motion.div>

            {/* Metric Counters */}
            <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-3xl font-bold mb-1 text-white">{analytics.totalStartups}+</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Startups Launched</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1 text-white">{analytics.fundingFacilitated}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Seed Funding</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1 text-white">{analytics.totalMentors}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Industry Mentors</p>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Interactive Founder Glass Card */}
          <div className="lg:col-span-5 relative h-full flex flex-col justify-center">
            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-2xl relative">
              {/* Founder Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg text-sm">
                    {user ? user.name.slice(0, 2).toUpperCase() : 'AR'}
                  </div>
                  <div>
                    <p className="font-bold text-white">{user ? user.name : 'Alex Rivera'}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-tight font-bold">
                      {user ? `${user.levelTitle} Level ${user.level}` : 'Innovator Level 4'}
                    </p>
                  </div>
                </div>
                <div className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-bold border border-indigo-500/20">
                  {user ? `${user.xp} XP` : '850 XP'}
                </div>
              </div>

              <div className="space-y-5">
                {/* Progress Bar */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="text-xs font-bold text-gray-300">Startup Progress</h3>
                    <span className="text-[10px] text-indigo-400 uppercase font-bold">MVP Phase</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 w-[68%] h-full rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
                  </div>
                </div>

                {/* Upcoming Action */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Upcoming Action</p>
                  <div 
                    onClick={() => onNavigate('/pitch-arena')}
                    className="flex items-center gap-3 p-3.5 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 cursor-pointer hover:bg-indigo-600/15 transition-colors"
                  >
                    <div className="w-9 h-9 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">Series A Pitch Prep</p>
                      <p className="text-[10px] text-gray-400 truncate">Tomorrow at 10:00 AM • Main Arena</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0" />
                  </div>
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                    <div className="text-xl mb-1">🏆</div>
                    <p className="text-[10px] text-gray-300 uppercase font-bold leading-tight">Pitch Winner Badge</p>
                  </div>
                  <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center text-center">
                    <div className="text-xl mb-1">🚀</div>
                    <p className="text-[10px] text-gray-300 uppercase font-bold leading-tight">MVP Builder Badge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Certificate Notification Pill */}
            <div 
              onClick={() => onNavigate('/certificates')}
              className="mt-4 sm:mt-0 sm:absolute -bottom-4 -left-6 bg-black/90 border border-white/10 rounded-2xl p-3.5 shadow-2xl z-20 flex items-center gap-3 w-fit sm:w-52 cursor-pointer hover:border-white/25 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Certificate Issued</p>
                <p className="text-[10px] text-gray-500">ID: ECELL-2026-04</p>
              </div>
            </div>
          </div>
        </div>

        {/* 9-Stage Interactive Incubation Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <StartupNodeVisualizer />
        </motion.div>
      </section>

      {/* OFFICIAL E-CELL SSGMCE FLAGSHIP EVENTS & VENTURE HUB */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <EcellEventsHub
          onNavigate={onNavigate}
          onOpenEventModal={(evt) => setSelectedEvent(evt)}
          onOpenProblemStatements={() => setIsProblemStatementsOpen(true)}
        />
      </section>

      {/* 3. THE 3-PILLAR FOUNDER JOURNEY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Ecosystem Framework</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Where Ideas Become Venture-Scale Realities
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            A battle-tested 3-pillar pipeline designed to eliminate fatal risks before founders spend capital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors space-y-3 relative overflow-hidden">
            <span className="text-3xl font-black text-indigo-500/20 font-mono absolute top-4 right-5">01</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Discover & Validate</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Identify non-obvious engineering pain points, conduct structured customer discovery interviews, and quantify willingness-to-pay using our E-CELL AI tool suite.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors space-y-3 relative overflow-hidden">
            <span className="text-3xl font-black text-purple-500/20 font-mono absolute top-4 right-5">02</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Assemble & Build</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Find complementary co-founders across Computer, Electronics & Mechanical branches. Ship functional 14-day MVPs supported by campus incubation hardware labs.
            </p>
          </div>

          <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors space-y-3 relative overflow-hidden">
            <span className="text-3xl font-black text-cyan-500/20 font-mono absolute top-4 right-5">03</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Pitch & Scale</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Present in the Pitch Arena, earn community votes, book 1-on-1 advisor sessions with YC alumni, and raise institutional seed funding through angel syndicates.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO — 6 FEATURE CARDS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Programs & Resources</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Comprehensive Incubation Stack
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/about')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 self-start md:self-auto"
          >
            <span>Learn about our mission</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatWeDo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all space-y-3 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${item.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED STARTUPS SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Venture Spotlight</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Top Collegiate Startups
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/startups')}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <span>View All {startups.length} Startups</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStartups.map((stp) => {
            const isLiked = (stp.likedBy || []).includes(user?.id || '');
            return (
              <div
                key={stp.id}
                className="rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Banner */}
                  <div className="relative h-36 w-full overflow-hidden">
                    <img src={stp.banner} alt={stp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {stp.industry}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-indigo-300 bg-indigo-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-indigo-500/30">
                      {stp.stage}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={stp.logo} alt={stp.name} className="w-10 h-10 rounded-xl bg-white/10 p-0.5 object-cover shrink-0 border border-white/10" />
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">{stp.name}</h4>
                        <p className="text-[11px] text-gray-400 font-medium truncate max-w-[190px]">{stp.tagline}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {stp.solution}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stp.technology.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] bg-white/5 border border-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <button
                    onClick={() => likeStartup(stp.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isLiked ? 'text-rose-400 bg-rose-500/10' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                    <span>{stp.likes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedStartup(stp)}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Inspect Venture</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. UPCOMING EVENTS & SPRINT SCHEDULE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Events Hub</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Summits, Hackathons & Workshops
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/events')}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <span>Full Schedule ({events.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-indigo-600 px-2.5 py-1 rounded-full shadow-lg">
                    {evt.category}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/30">
                    +{evt.xpReward} XP
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-indigo-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {evt.registeredCount} / {evt.capacity} seats filled
                </span>
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md"
                >
                  RSVP Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TEAM NAVONMESH 2026-27 & E-CELL COMMITTEE SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Official Roster</span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                SSGMCE Shegaon
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Team Navonmesh 2026-27 Committee & Wings
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Led by Chairperson Atharv Sonone and domain directors spanning Management, Publicity, Technical, Social Media, Sponsorship, and Discipline.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/committee')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-lg shadow-indigo-600/30 shrink-0"
          >
            <span>Explore All {committee.length} Members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Wing Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {committeeDomains.map((dom) => (
            <button
              key={dom}
              onClick={() => setActiveCommitteeDomain(dom)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeCommitteeDomain === dom
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredHomeCommittee.slice(0, 8).map((member) => (
            <div
              key={member.id}
              onClick={() => onNavigate('/committee')}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.04] cursor-pointer transition-all flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover border border-white/10 group-hover:border-indigo-400 transition-colors shrink-0"
                  />
                  <div className="min-w-0">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      member.isLead ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/5 text-slate-400'
                    }`}>
                      {member.domain}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate mt-0.5">
                      {member.name}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-indigo-300/90 font-medium line-clamp-1">{member.role}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{member.bio}</p>
              </div>

              <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">{member.department}</span>
                <span className="text-[10px] text-indigo-400 group-hover:translate-x-0.5 transition-transform font-bold flex items-center gap-1">
                  <span>View</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. MENTOR SPOTLIGHT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Advisory Board</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Learn from Venture Partners & Founders
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/mentors')}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <span>All {mentors.length} Mentors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightMentors.map((mnt) => (
            <div
              key={mnt.id}
              className="p-6 rounded-[28px] bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={mnt.avatar} alt={mnt.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">{mnt.name}</h4>
                    <p className="text-xs text-indigo-400 font-medium">{mnt.role} @ {mnt.company}</p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 mt-0.5">
                      <span>★ {mnt.rating.toFixed(1)}</span>
                      <span className="text-gray-400">({mnt.sessionsCompleted} sessions)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                  {mnt.biography}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {mnt.expertise.map(exp => (
                    <span key={exp} className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {mnt.availability}
                </span>
                <button
                  onClick={() => setSelectedMentor(mnt)}
                  className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md"
                >
                  Book 1-on-1
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. E-CELL AI TEASER CALLOUT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>POWERED BY GEMINI 3.7 FLASH</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test Your Hypothesis with E-CELL AI
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Validate problem severity, calculate market TAM, structure 10-slide pitch decks, and simulate tough Angel Investor objection teardowns before stepping on stage.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onNavigate('/ai-assistant')}
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch 7 Venture AI Tools</span>
            </button>
          </div>
        </div>
      </section>

      {/* MODALS */}
      <StartupDetailModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} />
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <MentorRequestModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      <EcellIdeathonTracksModal
        isOpen={isProblemStatementsOpen}
        onClose={() => setIsProblemStatementsOpen(false)}
        onSelectTrack={(trackTitle) => {
          const genesisEvt = events.find(e => e.id === 'ecell-genesis-ideathon') || events[0];
          setSelectedEvent(genesisEvt);
        }}
      />
    </div>
  );
};
