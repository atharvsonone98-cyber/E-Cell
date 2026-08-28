import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, 
  Flame, 
  Star, 
  Award, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  TrendingUp,
  Medal
} from 'lucide-react';
import { motion } from 'motion/react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard } = useEcell();
  const { user } = useAuth();
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'founder'>('all');

  const filtered = leaderboard.filter(u => {
    if (filterRole === 'all') return true;
    return u.role === filterRole;
  });

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  const badges = [
    { name: 'Incubation MVP', icon: '🚀', desc: 'Shipped a functional 14-day prototype' },
    { name: 'Demo Day Champion', icon: '🏆', desc: 'Placed Top 3 in Annual Collegiate Pitch' },
    { name: 'Seed Grant Recipient', icon: '💎', desc: 'Secured ₹5L+ in equity-free grant capital' },
    { name: 'Venture Architect', icon: '⚡', desc: 'Completed 10+ strategic mentor sessions' },
    { name: 'Community Catalyst', icon: '🌟', desc: 'Received 50+ upvotes on venture feedback' },
    { name: 'Ecosystem Legend', icon: '👑', desc: 'Reached Level 5 with 1,500+ XP' }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ecosystem Gamification</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
              Term Season 4 Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Founder XP Leaderboard & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Earn Experience Points (XP) by attending workshops, deploying prototypes, booking mentors, and winning collegiate pitch battles.
          </p>
        </div>

        {/* User Progress Preview */}
        {user && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 flex items-center gap-4 self-start md:self-auto shadow-xl">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover border border-indigo-400/40" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{user.name}</span>
                <span className="text-[10px] font-black text-amber-400 bg-amber-500/20 px-2 py-0.2 rounded-full">
                  Level {user.level}
                </span>
              </div>
              <p className="text-xs text-indigo-300 font-semibold mt-0.5">{user.xp} Total XP</p>
              <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1.5">
                <div className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full" style={{ width: `${Math.min(100, (user.xp % 500) / 5)}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TOP 3 PODIUM */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end">
          {/* #2 Rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/40 to-[#0e1220] border border-slate-400/30 text-center space-y-3 relative order-2 md:order-1"
          >
            <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center mx-auto shadow-lg">
              2
            </div>
            <img src={top3[1].avatar} alt={top3[1].name} className="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-slate-300 shadow-xl" />
            <div>
              <h3 className="text-base font-bold text-white">{top3[1].name}</h3>
              <p className="text-xs text-indigo-400 font-medium">{top3[1].role} • {top3[1].branch}</p>
            </div>
            <div className="py-1.5 px-3 rounded-xl bg-white/5 border border-white/10 inline-block text-xs font-bold text-amber-400">
              {top3[1].xp} XP • Level {top3[1].level}
            </div>
          </motion.div>

          {/* #1 Rank (Center, Prominent) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.0 }}
            className="p-8 rounded-3xl bg-gradient-to-b from-amber-950/50 via-[#101426] to-[#0a0d17] border-2 border-amber-400/50 text-center space-y-4 relative order-1 md:order-2 shadow-2xl shadow-amber-500/10 -translate-y-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black font-black text-xs shadow-lg">
              <Trophy className="w-3.5 h-3.5 fill-black" />
              <span>TERM 1 CHAMPION</span>
            </div>
            <img src={top3[0].avatar} alt={top3[0].name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-amber-400 shadow-2xl" />
            <div>
              <h3 className="text-lg font-extrabold text-white">{top3[0].name}</h3>
              <p className="text-xs text-amber-300 font-medium">{top3[0].role} • {top3[0].branch}</p>
            </div>
            <div className="py-2 px-4 rounded-xl bg-amber-500/20 border border-amber-400/40 inline-block text-sm font-extrabold text-amber-300">
              {top3[0].xp} XP • Level {top3[0].level}
            </div>
          </motion.div>

          {/* #3 Rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-b from-amber-950/20 to-[#0e1220] border border-amber-700/30 text-center space-y-3 relative order-3"
          >
            <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center mx-auto shadow-lg">
              3
            </div>
            <img src={top3[2].avatar} alt={top3[2].name} className="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-amber-700 shadow-xl" />
            <div>
              <h3 className="text-base font-bold text-white">{top3[2].name}</h3>
              <p className="text-xs text-indigo-400 font-medium">{top3[2].role} • {top3[2].branch}</p>
            </div>
            <div className="py-1.5 px-3 rounded-xl bg-white/5 border border-white/10 inline-block text-xs font-bold text-amber-400">
              {top3[2].xp} XP • Level {top3[2].level}
            </div>
          </motion.div>
        </div>
      )}

      {/* LEADERBOARD TABLE */}
      <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-white">Full Cohort Leaderboard</h3>
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {(['all', 'student', 'founder'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterRole(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filterRole === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filtered.map((entry, index) => {
            const isCurrentUser = entry.id === user?.id;
            return (
              <div
                key={entry.id}
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                  isCurrentUser
                    ? 'bg-indigo-950/50 border-indigo-500/50 shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-bold text-sm text-slate-400">
                    #{index + 1}
                  </span>
                  <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{entry.name}</h4>
                      {isCurrentUser && (
                        <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.2 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{entry.branch} • {entry.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded-full">
                    Level {entry.level}
                  </span>
                  <span className="text-sm font-extrabold text-amber-400 min-w-[70px] text-right">
                    {entry.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MILESTONE BADGES */}
      <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4 shadow-xl">
        <div>
          <h3 className="text-base font-bold text-white">Ecosystem Achievement Badges</h3>
          <p className="text-xs text-slate-400 mt-0.5">Unlock collectible verified NFT credentials and campus awards</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex items-start gap-3">
              <span className="text-3xl p-2 rounded-xl bg-white/5">{b.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-white">{b.name}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
