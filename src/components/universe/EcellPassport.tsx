import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEcell } from '../../context/EcellContext';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Award, 
  Calendar, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  Flame,
  Star,
  GraduationCap
} from 'lucide-react';

interface EcellPassportProps {
  onOpenAuth: () => void;
  onNavigate: (path: string) => void;
}

export const EcellPassport: React.FC<EcellPassportProps> = ({
  onOpenAuth,
  onNavigate
}) => {
  const { user } = useAuth();
  const { certificates, events } = useEcell();

  // User's real certificates
  const userCerts = user 
    ? certificates.filter(c => c.userId === user.id || c.userEmail === user.email)
    : [];

  const userBadges = user?.badges || [];

  // Digital Passport Stamps definition
  const STAMPS = [
    {
      id: 'stamp-summit',
      title: 'E-SUMMIT',
      category: 'Flagship Event',
      color: 'border-sky-500 text-sky-400 bg-sky-500/10',
      earned: user ? userCerts.length > 0 : true
    },
    {
      id: 'stamp-hackathon',
      title: 'HACKATHON',
      category: 'Prototyping',
      color: 'border-purple-500 text-purple-400 bg-purple-500/10',
      earned: user ? userBadges.length > 0 : true
    },
    {
      id: 'stamp-pitch',
      title: 'PITCH ARENA',
      category: 'Idea Pitching',
      color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
      earned: user ? (user.xp > 300) : false
    },
    {
      id: 'stamp-workshop',
      title: 'WORKSHOP',
      category: 'Skill Building',
      color: 'border-amber-500 text-amber-400 bg-amber-500/10',
      earned: user ? true : true
    },
    {
      id: 'stamp-guest',
      title: 'GUEST SESSION',
      category: 'Industry Keynote',
      color: 'border-rose-500 text-rose-400 bg-rose-500/10',
      earned: user ? (user.xp > 150) : false
    },
    {
      id: 'stamp-bootcamp',
      title: 'BOOTCAMP',
      category: 'Foundations',
      color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      earned: user ? true : false
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIGITAL CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            E-CELL STUDENT PASSPORT
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Your official digital passport documenting workshops, hackathons, and verifiable credentials earned at SSGMCE.
          </p>
        </div>

        {!user ? (
          <button
            onClick={onOpenAuth}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto shadow-lg shadow-sky-500/20"
          >
            Claim Your Passport
          </button>
        ) : (
          <button
            onClick={() => onNavigate('/certificates')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold transition-all self-start md:self-auto flex items-center gap-2"
          >
            <span>My Verified Credentials</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          </button>
        )}
      </div>

      {/* Main Passport Card */}
      <div className="rounded-3xl bg-[#080d1e]/95 border border-sky-500/20 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Passport Identity Profile (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {user ? user.name.charAt(0) : 'E'}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {user ? user.name : 'Guest Student Explorer'}
                  </h4>
                  <p className="text-xs text-sky-400">
                    {user ? `${user.branch || 'SSGMCE'} • Year ${user.year || '2026'}` : 'SSGMCE Shegaon'}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                {user ? user.levelTitle : 'Explorer'}
              </span>
            </div>

            {/* Passport Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-lg font-black text-sky-400">{user?.xp || 250}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">XP Points</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-lg font-black text-purple-400">{userCerts.length || (user ? 1 : 2)}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Certs</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <p className="text-lg font-black text-emerald-400">{STAMPS.filter(s => s.earned).length}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Stamps</p>
              </div>
            </div>

            {/* Verifiable QR Code & College ID Tag */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  PASSPORT ID NO:
                </p>
                <p className="text-xs font-mono font-bold text-white tracking-widest">
                  {user ? `EC-SSGMCE-${user.id.slice(0, 8).toUpperCase()}` : 'EC-SSGMCE-DEMO-2026'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-slate-950" />
              </div>
            </div>
          </div>

          {/* Right: Event Passport Stamps Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-400" />
                OFFICIAL EVENT PASSPORT STAMPS
              </h4>
              <span className="text-xs text-slate-400">
                Earned via on-ground participation
              </span>
            </div>

            {/* Stamps Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {STAMPS.map(stamp => (
                <div
                  key={stamp.id}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center relative ${
                    stamp.earned
                      ? stamp.color + ' shadow-md'
                      : 'border-dashed border-slate-800 bg-slate-950/40 text-slate-600 opacity-60'
                  }`}
                >
                  {stamp.earned && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </div>
                  )}

                  <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-mono font-black text-xs mb-1.5 rotate-[-6deg]">
                    ✓
                  </div>

                  <h5 className="text-xs font-black tracking-wider uppercase">
                    {stamp.title}
                  </h5>
                  <span className="text-[9px] opacity-75 font-mono">
                    {stamp.category}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 pt-2">
              Stamps and verified certificates are awarded automatically upon attending workshops and submitting team pitch projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
