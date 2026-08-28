import React from 'react';
import { motion } from 'motion/react';
import { X, Mail, Phone, Linkedin, Award, Calendar, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { CommitteeMember } from '../types';

interface TeamMemberDetailModalProps {
  member: CommitteeMember | null;
  onClose: () => void;
}

export const TeamMemberDetailModal: React.FC<TeamMemberDetailModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-[#0f172a] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-800 border-2 border-blue-500/30 shrink-0">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-900/40 text-blue-300 font-bold text-2xl">
                {member.name.charAt(0)}
              </div>
            )}
            {member.isLead && (
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-slate-950">
                LEAD
              </span>
            )}
          </div>

          <div className="text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {member.domain}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {member.academicYear || member.year || '2026-27'}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {member.name}
            </h3>

            <p className="text-sm font-semibold text-blue-400">
              {member.role}
            </p>

            <p className="text-xs text-slate-400">
              {member.department}
            </p>
          </div>
        </div>

        {member.bio && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Leadership & Focus
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {member.bio}
            </p>
          </div>
        )}

        {member.keyResponsibilities && member.keyResponsibilities.length > 0 && (
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Key Domain Responsibilities
            </h4>
            <div className="space-y-1.5">
              {member.keyResponsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Links */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{member.email}</span>
              </a>
            )}
            {member.contact && (
              <span className="flex items-center gap-1.5 text-slate-400">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>{member.contact}</span>
              </span>
            )}
          </div>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 flex items-center gap-1.5 font-medium transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};
