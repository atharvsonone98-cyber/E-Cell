import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { CoFounderCandidate } from '../types';
import { 
  Users, 
  Search, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Code, 
  TrendingUp, 
  Palette, 
  Cpu, 
  Briefcase,
  GraduationCap,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { CoFounderConnectModal } from '../components/CoFounderConnectModal';

export const CoFoundersPage: React.FC = () => {
  const { coFounders, showToast } = useEcell();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<CoFounderCandidate | null>(null);

  const roleCategories = [
    'All',
    'Technical / CTO',
    'Marketing & GTM',
    'UI/UX & Product Design',
    'Hardware & IoT',
    'Operations & Strategy'
  ];

  const branchCategories = [
    'All',
    'Computer Science & Engineering',
    'Electronics & Telecommunication',
    'Mechanical Engineering',
    'Electrical & Power',
    'Information Technology'
  ];

  // Dynamic compatibility match score calculator
  const calculateMatchScore = (candidate: CoFounderCandidate): number => {
    if (!user) return candidate.compatibility || 85;
    let score = candidate.compatibility || 70; // baseline
    // If user skills are complementary
    if (user.skills && candidate.skills) {
      const complementary = candidate.skills.filter(s => !user.skills.includes(s));
      score += Math.min(15, complementary.length * 4);
    }
    // If interests align
    if (user.interests && candidate.interests) {
      const sharedInterests = candidate.interests.filter(i => user.interests.includes(i));
      score += Math.min(10, sharedInterests.length * 3);
    }
    return Math.min(99, score);
  };

  const filteredCandidates = coFounders.filter(cand => {
    const matchesSearch = 
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cand.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.branch.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = 
      selectedRole === 'All' || 
      cand.lookingForRole.toLowerCase().includes(selectedRole.toLowerCase()) ||
      cand.roleTitle?.toLowerCase().includes(selectedRole.toLowerCase());

    const matchesBranch = 
      selectedBranch === 'All' || 
      cand.branch.toLowerCase().includes(selectedBranch.toLowerCase());

    return matchesSearch && matchesRole && matchesBranch;
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Campus Talent Network</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
              AI Matchmaking Engine
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Co-Founder & Builder Matching Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Find complementary technical architects, product designers, and growth marketers across SSGMCE engineering departments to form balanced founding teams.
          </p>
        </div>

        <button
          onClick={() => {
            showToast('Co-Founder Profile Updated!', 'Your profile is now actively indexed in campus matching.', 'success');
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-90 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-cyan-600/20 self-start md:self-auto transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>List Yourself as Co-Founder</span>
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="p-6 rounded-3xl bg-[#0e1220] border border-white/10 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skills (e.g. React, IoT, Marketing), branch, or name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              {roleCategories.map(r => (
                <option key={r} value={r}>Role: {r}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-500"
            >
              {branchCategories.map(b => (
                <option key={b} value={b}>Branch: {b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Popular Skills:</span>
          {['React', 'Node.js', 'Python', 'IoT', 'Figma', 'GTM Marketing', 'SolidWorks', 'Embedded C'].map(skill => (
            <button
              key={skill}
              onClick={() => setSearchQuery(skill)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors shrink-0 text-[11px]"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* CANDIDATES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Available Co-Founder Candidates ({filteredCandidates.length})
          </h2>
          <span className="text-xs text-slate-400">Showing all verified campus profiles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((cand) => {
            const calculatedScore = calculateMatchScore(cand);

            return (
              <div
                key={cand.id}
                className="p-6 rounded-[28px] bg-[#0e1220] border border-white/10 hover:border-cyan-500/50 hover:bg-[#101628] transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Candidate Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-white/15 bg-indigo-950/50 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                            {cand.name}
                          </h3>
                        </div>
                        <p className="text-xs text-cyan-400 font-semibold truncate">{cand.lookingForRole}</p>
                        <p className="text-[11px] text-slate-400 truncate">{cand.branch} • {cand.year}</p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-xs font-black text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 rounded-full shadow-lg">
                        {calculatedScore}% MATCH
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {cand.bio}
                  </p>

                  {/* Skills Grid */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Competencies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] bg-white/5 border border-white/10 text-slate-200 px-2 py-0.5 rounded-md font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interests / Looking For */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-[11px] text-slate-300">
                    <p><strong className="text-white">Interested in:</strong> {cand.interests.join(', ')}</p>
                    <p><strong className="text-white">Seeking:</strong> {cand.lookingForRole}</p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> SSGMCE Verified
                  </span>

                  <button
                    onClick={() => setSelectedCandidate(cand)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-90 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>Connect & Pitch</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <CoFounderConnectModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </div>
  );
};
