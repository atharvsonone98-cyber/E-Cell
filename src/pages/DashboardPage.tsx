import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEcell } from '../context/EcellContext';
import { 
  User, 
  Rocket, 
  Calendar, 
  Compass, 
  Award, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ExternalLink,
  ChevronRight,
  Shield,
  Eye
} from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { StartupSubmitModal } from '../components/StartupSubmitModal';
import { EcellPassportCard } from '../components/universe/EcellPassportCard';
import { CertificateItem } from '../types';

export const DashboardPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { startups, events, mentorshipRequests, certificates } = useEcell();

  const [activeTab, setActiveTab] = useState<'overview' | 'passport' | 'startups' | 'events' | 'mentorship' | 'certificates'>('overview');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isStartupModalOpen, setIsStartupModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 max-w-md mx-auto text-center space-y-4">
        <User className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Sign In Required</h2>
        <p className="text-xs text-slate-400">Please sign in to access your personal founder dashboard and venture milestones.</p>
        <button
          onClick={() => onNavigate('/')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 font-bold text-xs text-white"
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Filter items relevant to current user
  const myStartups = startups.filter(s => s.founderName === user.name || s.id === 'st-1');
  const myEvents = events.filter(e => e.isRegistered);
  const myMentorships = mentorshipRequests.filter(m => m.studentId === user.id || m.studentName === user.name);
  const myCertificates = certificates.filter(c => c.recipientName === user.name || c.id === 'cert-1');

  const xpProgress = Math.min(100, (user.xp % 500) / 5);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#101528] via-[#0d1222] to-[#12182c] border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl" />
            <span className="absolute -bottom-2 -right-2 text-[10px] font-black text-amber-400 bg-[#0a0d17] border border-amber-400/40 px-2 py-0.5 rounded-full shadow-lg">
              LVL {user.level}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.name}</h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {user.branch} • {user.year} • ID: <span className="font-mono text-slate-300">{user.collegeId}</span>
            </p>
            <p className="text-xs text-slate-300 pt-1 max-w-md line-clamp-1">{user.bio}</p>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full md:w-64 p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold">Season XP</span>
            <span className="text-amber-400 font-bold">{user.xp} XP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full" style={{ width: `${xpProgress}%` }} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Level {user.level}</span>
            <span>{500 - (user.xp % 500)} XP to Level {user.level + 1}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-white/10">
        {[
          { id: 'overview', label: 'Ecosystem Overview', icon: TrendingUp },
          { id: 'passport', label: 'E-Cell Passport', icon: Shield },
          { id: 'startups', label: `My Startups (${myStartups.length})`, icon: Rocket },
          { id: 'events', label: `Event Passes (${myEvents.length})`, icon: Calendar },
          { id: 'mentorship', label: `Mentorship (${myMentorships.length})`, icon: Compass },
          { id: 'certificates', label: `Certificates (${myCertificates.length})`, icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-indigo-500 text-white bg-white/[0.04]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 0. E-CELL PASSPORT */}
      {activeTab === 'passport' && (
        <EcellPassportCard 
          user={user} 
          events={myEvents} 
          certificates={myCertificates} 
        />
      )}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Ventures Founded</span>
              <p className="text-2xl font-extrabold text-white mt-1">{myStartups.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Events Registered</span>
              <p className="text-2xl font-extrabold text-white mt-1">{myEvents.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Mentor Sessions</span>
              <p className="text-2xl font-extrabold text-white mt-1">{myMentorships.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Verified Credentials</span>
              <p className="text-2xl font-extrabold text-white mt-1">{myCertificates.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions Card */}
            <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Founder Accelerators</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setIsStartupModalOpen(true)}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-950/20 text-left transition-all group"
                >
                  <Rocket className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Register Startup</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">List venture in showcase (+200 XP)</p>
                </button>

                <button
                  onClick={() => onNavigate('/ai-assistant')}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/50 hover:bg-purple-950/20 text-left transition-all group"
                >
                  <Sparkles className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">AI Venture Copilot</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Validate TAM & pitch decks (+25 XP)</p>
                </button>

                <button
                  onClick={() => onNavigate('/mentors')}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-left transition-all group"
                >
                  <Compass className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Book Mentorship</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">1-on-1 advisor clinic (+40 XP)</p>
                </button>

                <button
                  onClick={() => onNavigate('/pitch-arena')}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-fuchsia-500/50 hover:bg-fuchsia-950/20 text-left transition-all group"
                >
                  <Award className="w-5 h-5 text-fuchsia-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-bold text-white">Pitch Arena</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Qualify for Demo Day (+100 XP)</p>
                </button>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white">Recent XP History</h3>
              <div className="space-y-3">
                {[
                  { title: 'Attended National Entrepreneurship Summit', xp: '+100 XP', time: '2 hours ago' },
                  { title: 'Booked 1-on-1 Mentorship with Vikramaditya', xp: '+40 XP', time: 'Yesterday' },
                  { title: 'Validated Lean Canvas using AI Copilot', xp: '+25 XP', time: '3 days ago' },
                  { title: 'Upvoted CleanTech pitch in Pitch Arena', xp: '+10 XP', time: '4 days ago' }
                ].map((act, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{act.title}</p>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                    <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {act.xp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MY STARTUPS */}
      {activeTab === 'startups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Your Listed Ventures</h3>
            <button
              onClick={() => setIsStartupModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register New Startup</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myStartups.map(stp => (
              <div key={stp.id} className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={stp.logo} alt={stp.name} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                    <div>
                      <h4 className="text-base font-bold text-white">{stp.name}</h4>
                      <p className="text-xs text-indigo-400">{stp.industry} • {stp.stage}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">
                    {stp.likes} Upvotes
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{stp.solution}</p>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs text-slate-400">
                  <p><strong className="text-white">TAM:</strong> {stp.marketSize}</p>
                  <p><strong className="text-white">Business Model:</strong> {stp.businessModel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MY EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Your Confirmed Event Passes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myEvents.map(evt => (
              <div key={evt.id} className="p-5 rounded-2xl bg-[#0e1220] border border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    CONFIRMED RSVP
                  </span>
                  <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                  <p className="text-xs text-slate-400">{evt.date} • {evt.time}</p>
                  <p className="text-xs text-slate-400">{evt.location}</p>
                </div>
                <span className="text-xs font-bold text-amber-400">+{evt.xpReward} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MY MENTORSHIP */}
      {activeTab === 'mentorship' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Mentorship Consultations</h3>
          <div className="space-y-3">
            {myMentorships.map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-[#0e1220] border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{req.topic}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Session with {req.mentorName}</h4>
                  <p className="text-xs text-slate-400">Preferred Date: {req.preferredDate}</p>
                </div>
                <span className="text-xs font-bold text-amber-400 capitalize bg-amber-500/10 px-2.5 py-1 rounded-full">
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. MY CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Earned Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myCertificates.map(cert => (
              <div key={cert.id} className="p-5 rounded-2xl bg-[#0e1220] border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">{cert.type}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{cert.title}</h4>
                  <p className="text-xs text-slate-400">Issued {cert.issueDate} • ID: {cert.credentialId}</p>
                </div>
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      <StartupSubmitModal isOpen={isStartupModalOpen} onClose={() => setIsStartupModalOpen(false)} />
    </div>
  );
};
