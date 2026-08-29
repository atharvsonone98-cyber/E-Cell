import React, { useState } from 'react';
import { CommitteeMember } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ShieldCheck, 
  Linkedin, 
  Github, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface InteractiveTeamHierarchyProps {
  committee: CommitteeMember[];
  onSelectMember: (member: CommitteeMember) => void;
  onNavigate: (path: string) => void;
}

export const InteractiveTeamHierarchy: React.FC<InteractiveTeamHierarchyProps> = ({
  committee,
  onSelectMember,
  onNavigate
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');

  // Hierarchy grouping from real committee members
  const facultyMembers = committee.filter(m => 
    m.domain === 'Faculty Incharge' || 
    m.domain === 'Faculty Advisory' || 
    m.isFaculty || 
    m.role.toLowerCase().includes('faculty') ||
    m.role.toLowerCase().includes('incharge') ||
    m.role.toLowerCase().includes('adviser')
  );

  const presidents = committee.filter(m => 
    m.role.toLowerCase().includes('president') && !m.role.toLowerCase().includes('vice')
  );

  const vicePresidents = committee.filter(m => 
    m.role.toLowerCase().includes('vice president') || m.role.toLowerCase().includes('vp')
  );

  const coreLeads = committee.filter(m => 
    m.isLead && 
    !presidents.some(p => p.id === m.id) && 
    !vicePresidents.some(vp => vp.id === m.id) &&
    !facultyMembers.some(f => f.id === m.id)
  );

  const allDomains = [
    'All',
    'Technical',
    'Management',
    'Publicity & PR',
    'Social Media & Content',
    'Sponsorship',
    'Discipline'
  ];

  const departmentMembers = committee.filter(m => {
    if (selectedDomain === 'All') return !m.isFaculty;
    return m.domain === selectedDomain;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>ORGANIZATIONAL HIERARCHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            THE PEOPLE BEHIND E-CELL
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Guided by dedicated faculty mentors and driven by passionate student coordinators across all engineering wings.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/team')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold transition-all self-start md:self-auto"
        >
          <span>Full Council Directory</span>
          <ArrowRight className="w-4 h-4 text-sky-400" />
        </button>
      </div>

      {/* Visual Hierarchy Tree */}
      <div className="space-y-10">
        {/* LEVEL 1: FACULTY COORDINATORS */}
        {facultyMembers.length > 0 && (
          <div className="text-center space-y-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              FACULTY IN-CHARGE & ADVISORY
            </span>
            <div className="flex justify-center flex-wrap gap-6 pt-2">
              {facultyMembers.map(member => (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className="p-5 rounded-3xl bg-[#080d1e]/90 border border-amber-500/30 hover:border-amber-400 backdrop-blur-xl shadow-xl cursor-pointer transition-all hover:scale-105 flex flex-col items-center text-center max-w-[260px] group"
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 mb-3 border-2 border-amber-500/40">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-amber-400 mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {member.department}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tree Connector */}
        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500/40 to-sky-500/40" />
        </div>

        {/* LEVEL 2: PRESIDENT & VICE PRESIDENT */}
        <div className="text-center space-y-4">
          <span className="text-[11px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
            STUDENT EXECUTIVE LEADERSHIP
          </span>
          <div className="flex justify-center flex-wrap gap-6 pt-2">
            {[...presidents, ...vicePresidents].map(member => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member)}
                className="p-5 rounded-3xl bg-[#080d1e]/90 border border-sky-500/30 hover:border-sky-400 backdrop-blur-xl shadow-xl cursor-pointer transition-all hover:scale-105 flex flex-col items-center text-center max-w-[260px] group"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 mb-3 border-2 border-sky-500/40">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-sky-500 text-slate-950">
                    EXEC
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs font-semibold text-sky-400 mt-0.5">
                  {member.role}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {member.department}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tree Connector */}
        <div className="flex justify-center">
          <div className="w-0.5 h-8 bg-gradient-to-b from-sky-500/40 to-indigo-500/40" />
        </div>

        {/* LEVEL 3: DEPARTMENT DOMAINS & WINGS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-[11px] font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30 self-start">
              DEPARTMENT WINGS & COORDINATORS
            </span>

            {/* Domain Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {allDomains.map(dom => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedDomain === dom
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Department Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {departmentMembers.slice(0, 8).map(member => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member)}
                className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 backdrop-blur-md cursor-pointer transition-all flex flex-col items-center text-center group shadow-lg"
              >
                <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-slate-800 mb-3 border-2 border-slate-700 group-hover:border-indigo-400 transition-colors">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {member.isLead && (
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[8px] font-bold bg-amber-500 text-slate-950">
                      LEAD
                    </span>
                  )}
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-1.5">
                  {member.domain}
                </span>

                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {member.name}
                </h4>

                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  {member.role}
                </p>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {member.department}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
