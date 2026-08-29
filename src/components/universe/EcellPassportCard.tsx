import React, { useRef } from 'react';
import { UserProfile, EventItem, CertificateItem } from '../../types';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Trophy, 
  QrCode,
  Download,
  Share2,
  Zap,
  BookmarkCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface EcellPassportCardProps {
  user: UserProfile;
  events?: EventItem[];
  certificates?: CertificateItem[];
}

export const EcellPassportCard: React.FC<EcellPassportCardProps> = ({ user, events = [], certificates = [] }) => {
  const passportRef = useRef<HTMLDivElement | null>(null);

  const stamps = [
    {
      id: 'stamp-1',
      title: 'E-SUMMIT 2026',
      category: 'E-SUMMIT',
      date: 'April 2026',
      verified: true,
      code: 'SUMMIT-26-SSGMCE',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400',
      icon: '🏛️'
    },
    {
      id: 'stamp-2',
      title: 'NATIONAL IDEATHON',
      category: 'PITCH COMPETITION',
      date: 'March 2026',
      verified: true,
      code: 'IDEA-26-VERIFIED',
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/40',
      textColor: 'text-cyan-400',
      icon: '💡'
    },
    {
      id: 'stamp-3',
      title: 'DEV WORKSHOP',
      category: 'WORKSHOP',
      date: 'Feb 2026',
      verified: true,
      code: 'WKP-APP-2026',
      color: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/40',
      textColor: 'text-purple-400',
      icon: '⚡'
    },
    {
      id: 'stamp-4',
      title: 'LEADERSHIP CONCLAVE',
      category: 'GUEST SESSION',
      date: 'Jan 2026',
      verified: true,
      code: 'CONCLAVE-26-PASS',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      icon: '🎙️'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Passport Outer Shell */}
      <div 
        ref={passportRef}
        className="rounded-3xl bg-gradient-to-br from-[#0c1022] via-[#090d1c] to-[#070914] border-2 border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.15)] p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Ambient Holographic Pattern / Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Passport Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-500/20 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
                Official Student Innovation Record
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>E-CELL PASSPORT</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  VERIFIED
                </span>
              </h2>
            </div>
          </div>

          <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
            <span className="text-[10px] font-mono text-slate-400">PASSPORT NO.</span>
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              {user.collegeId || `SSGMCE-EC-${user.id.slice(-6).toUpperCase()}`}
            </span>
          </div>
        </div>

        {/* Passport Identity Strip */}
        <div className="py-6 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          {/* Avatar & Level */}
          <div className="md:col-span-4 flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl bg-slate-800"
              />
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono font-black text-[10px] border border-indigo-400 shadow-md">
                LVL {user.level}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{user.name}</h3>
              <p className="text-xs text-indigo-300 font-medium capitalize">{user.role} Member</p>
              <p className="text-[11px] text-slate-400">{user.branch || 'SSGMCE Shegaon'}</p>
            </div>
          </div>

          {/* Core Metrics Capsules */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Season XP</span>
              <p className="text-lg font-black text-amber-400">{user.xp}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Rank Tier</span>
              <p className="text-xs font-bold text-white mt-1 uppercase text-indigo-300">{user.levelTitle}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Badges</span>
              <p className="text-lg font-black text-cyan-400">{user.badges?.length || 4}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Stamps</span>
              <p className="text-lg font-black text-emerald-400">{stamps.length}</p>
            </div>
          </div>
        </div>

        {/* Collectible Event Stamps Grid (Section 18) */}
        <div className="pt-6 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLECTIBLE EVENT STAMPS</span>
            </h4>
            <span className="text-[11px] text-slate-400">4 of 4 Verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stamps.map((stamp) => (
              <motion.div
                key={stamp.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-2xl bg-gradient-to-br ${stamp.color} border ${stamp.borderColor} backdrop-blur-md relative flex flex-col justify-between space-y-3 shadow-lg`}
              >
                {/* Visual Stamp Seal Header */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{stamp.icon}</span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-[9px] font-mono font-bold text-white">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Stamp Name & Category */}
                <div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${stamp.textColor}`}>
                    {stamp.category}
                  </span>
                  <h5 className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">
                    {stamp.title}
                  </h5>
                </div>

                {/* Date & Stamp Serial */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>{stamp.date}</span>
                  <span className="text-slate-300">{stamp.code}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Passport Footer Seal */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs relative z-10">
          <div className="flex items-center gap-2 text-[11px]">
            <BookmarkCheck className="w-4 h-4 text-indigo-400" />
            <span>Cryptographically issued by E-Cell SSGMCE Shegaon</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-500">AUTHENTICATED • TEAM NAVONMESH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
