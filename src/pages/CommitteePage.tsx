import React, { useState, useEffect } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { CommitteeMember } from '../types';
import { 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Linkedin, 
  Github, 
  Award, 
  Layers, 
  BookOpen, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  Wrench, 
  Cpu, 
  Briefcase, 
  Palette, 
  Compass, 
  Building2,
  Calendar,
  X,
  Target,
  ArrowRight,
  Edit,
  Trash2,
  UserPlus,
  Table,
  LayoutGrid,
  Download,
  RotateCcw,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommitteePageProps {
  onNavigate?: (path: string) => void;
}

export const CommitteePage: React.FC<CommitteePageProps> = ({ onNavigate }) => {
  const { committee, showToast, createCommitteeMember, updateCommitteeMember, deleteCommitteeMember, resetCommittee } = useEcell();
  const { user, isAdmin, addXP } = useAuth();

  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.includes('join') || window.location.pathname.includes('apply'))) {
      setIsApplyModalOpen(true);
    }
  }, []);

  // Avatar presets for quick picking
  const AVATAR_PRESETS = [
    { label: 'Male 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
    { label: 'Male 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
    { label: 'Male 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
    { label: 'Male 4', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
    { label: 'Female 1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
    { label: 'Female 2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
    { label: 'Female 3', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
    { label: 'Faculty / Prof', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' }
  ];

  // Edit / Add Member Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [memberForm, setMemberForm] = useState<{
    name: string;
    role: string;
    domain: CommitteeMember['domain'];
    department: string;
    year: string;
    avatar: string;
    bio: string;
    email: string;
    linkedin: string;
    github: string;
    tags: string;
    isLead: boolean;
    isFaculty: boolean;
  }>({
    name: '',
    role: '',
    domain: 'Technical',
    department: 'SSGMCE Shegaon',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    bio: '',
    email: '',
    linkedin: '',
    github: '',
    tags: '',
    isLead: false,
    isFaculty: false
  });

  const openAddMemberModal = () => {
    setEditingMember(null);
    setMemberForm({
      name: '',
      role: '',
      domain: 'Technical',
      department: 'SSGMCE Shegaon',
      year: '3rd Year',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
      bio: '',
      email: '',
      linkedin: '',
      github: '',
      tags: '',
      isLead: false,
      isFaculty: false
    });
    setIsEditModalOpen(true);
  };

  const openEditMemberModal = (member: CommitteeMember) => {
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      role: member.role,
      domain: member.domain,
      department: member.department,
      year: member.year || '',
      avatar: member.avatar,
      bio: member.bio,
      email: member.email || '',
      linkedin: member.linkedin || '',
      github: member.github || '',
      tags: member.tags ? member.tags.join(', ') : '',
      isLead: !!member.isLead,
      isFaculty: !!member.isFaculty
    });
    setIsEditModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role) {
      showToast('Please enter member name and role', '', 'warning');
      return;
    }

    const payload = {
      name: memberForm.name,
      role: memberForm.role,
      domain: memberForm.domain,
      department: memberForm.department,
      year: memberForm.year,
      avatar: memberForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
      bio: memberForm.bio,
      email: memberForm.email,
      linkedin: memberForm.linkedin,
      github: memberForm.github,
      tags: memberForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      isLead: memberForm.isLead,
      isFaculty: memberForm.isFaculty
    };

    if (editingMember) {
      await updateCommitteeMember(editingMember.id, payload);
    } else {
      await createCommitteeMember(payload);
    }

    setIsEditModalOpen(false);
  };

  // Application form state
  const [applicantName, setApplicantName] = useState(user?.name || '');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || '');
  const [applicantBranch, setApplicantBranch] = useState(user?.branch || '');
  const [applicantYear, setApplicantYear] = useState('2nd Year');
  const [preferredDomain, setPreferredDomain] = useState('Technical');
  const [statement, setStatement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const domainCategories = [
    'All',
    'Leadership',
    'Final Year Advisors',
    'Management',
    'Publicity & PR',
    'Social Media & Content',
    'Technical',
    'Sponsorship',
    'Discipline',
    'Faculty Advisory'
  ];

  const filteredCommittee = committee.filter(m => {
    const matchesDomain = selectedDomain === 'All' || m.domain === selectedDomain;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const leadMember = committee.find(m => m.isLead);
  const facultyMembers = committee.filter(m => m.isFaculty);
  const studentMembers = committee.filter(m => !m.isFaculty && !m.isLead);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !statement) {
      showToast('Please fill all required fields', '', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsApplyModalOpen(false);
      setStatement('');
      addXP(50);
      showToast(
        'Application Submitted Successfully!',
        `Your application to join the ${preferredDomain} Wing has been forwarded to Chairperson Atharv Sonone and the SSGMCE Executive Board. (+50 XP)`,
        'success'
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Shri Sant Gajanan Maharaj College of Engineering, Shegaon</span>
        </div>
        <div className="space-y-1">
          <span className="text-sm font-bold text-amber-400 tracking-wider uppercase block">
            Entrepreneurship Cell (E-Cell) SSGMCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            TEAM – NAVONMESH 2026-27
          </h1>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The autonomous student-driven council and esteemed faculty advisory board empowering future founders, organizing national hackathons, and fostering innovation across campus.
        </p>

        {/* Quick Action Pill */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {isAdmin && (
            <button
              onClick={openAddMemberModal}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add Team Member</span>
            </button>
          )}
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Join Team Navonmesh</span>
          </button>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/events')}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>View Workshop & Event Calendar</span>
            </button>
          )}
        </div>
      </div>

      {/* Lead & Executive Spotlight Banner */}
      {leadMember && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950/60 via-[#0e1220] to-[#0a0c14] border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
            <div className="relative shrink-0">
              <img
                src={leadMember.avatar}
                alt={leadMember.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-indigo-400 shadow-xl shadow-indigo-500/20"
              />
              <span className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-indigo-600 text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  Lead & Chief Administrator
                </span>
                <span className="text-xs text-slate-400 font-semibold">{leadMember.year}</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{leadMember.name}</h2>
                <p className="text-xs sm:text-sm text-indigo-300 font-medium">{leadMember.role} • {leadMember.department}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {leadMember.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                {leadMember.tags?.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium">
                    #{tag}
                  </span>
                ))}
                {leadMember.email && (
                  <a
                    href={`mailto:${leadMember.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{leadMember.email}</span>
                  </a>
                )}
                {isAdmin && (
                  <button
                    onClick={() => openEditMemberModal(leadMember)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Edit Lead Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Committee Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">18+</div>
          <div className="text-xs text-indigo-300 font-semibold mt-0.5">Core Committee Leads</div>
          <div className="text-[10px] text-slate-400 mt-1">Across all SSGMCE branches</div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">5</div>
          <div className="text-xs text-purple-300 font-semibold mt-0.5">Faculty Advisory Mentors</div>
          <div className="text-[10px] text-slate-400 mt-1">Incubation & Research Council</div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">6</div>
          <div className="text-xs text-cyan-300 font-semibold mt-0.5">Operational Domain Wings</div>
          <div className="text-[10px] text-slate-400 mt-1">Workshops, Tech, PR, Media</div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-white">₹50L+</div>
          <div className="text-xs text-emerald-300 font-semibold mt-0.5">Venture Grants Facilitated</div>
          <div className="text-[10px] text-slate-400 mt-1">DST & NIDHI Prayas schemes</div>
        </div>
      </div>

      {/* Admin Team Roster Toolbar */}
      {isAdmin && (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Admin Team Controls Active</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Editable Roster
                </span>
              </div>
              <p className="text-[11px] text-indigo-200/80">
                You can add, edit, reorder, or delete any council member or faculty advisor in real-time.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>

            <button
              onClick={openAddMemberModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Member</span>
            </button>

            <button
              onClick={() => {
                const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(committee, null, 2)
                )}`;
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute('href', jsonString);
                downloadAnchor.setAttribute('download', 'ecell_ssgmce_committee.json');
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
                showToast('Exported Team JSON', 'File downloaded successfully', 'info');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Export Team Roster as JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (confirm('Reset team roster to official SSGMCE default list?')) {
                  resetCommittee();
                }
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 transition-colors"
              title="Reset to Default Roster"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Domain Navigation & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 scrollbar-none">
            {domainCategories.map(domain => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDomain === domain
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-72 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team member or role..."
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* VIEW 1: TABLE / SPREADSHEET VIEW */}
        {viewMode === 'table' ? (
          <div className="rounded-2xl bg-[#0e1220] border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/40 border-b border-white/10 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Member</th>
                    <th className="py-3.5 px-4">Role & Domain</th>
                    <th className="py-3.5 px-4">Department & Year</th>
                    <th className="py-3.5 px-4">Contacts</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredCommittee.map((member) => (
                    <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{member.name}</span>
                            {member.isLead && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                LEAD
                              </span>
                            )}
                            {member.isFaculty && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                FACULTY
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{member.bio}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-indigo-300 block">{member.role}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{member.domain}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white block">{member.department}</span>
                        <span className="text-[10px] text-slate-400">{member.year || 'N/A'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-white" title={member.email}>
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400">
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditMemberModal(member)}
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-semibold flex items-center gap-1 border border-indigo-500/30 transition-colors"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${member.name} from committee?`)) {
                                deleteCommitteeMember(member.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* VIEW 2: CARD GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredCommittee.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="group p-6 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 group-hover:border-indigo-400 transition-colors shrink-0 shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          member.isFaculty 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : member.isLead
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-white/5 text-slate-300 border border-white/10'
                        }`}>
                          {member.domain}
                        </span>
                        {member.year && (
                          <span className="text-[10px] text-slate-400 font-medium">{member.year}</span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 truncate">{member.name}</h3>
                      <p className="text-xs text-indigo-300 font-semibold line-clamp-1">{member.role}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{member.department}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {member.tags && member.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {member.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Connects */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs gap-2">
                  <span className="text-[11px] text-slate-400 font-medium truncate">SSGMCE Shegaon</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title={member.email}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-indigo-400 transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {isAdmin && (
                      <div className="flex items-center gap-1 ml-1">
                        <button
                          onClick={() => openEditMemberModal(member)}
                          className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white transition-colors"
                          title="Edit Member Profile & Role"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to remove ${member.name}?`)) {
                              deleteCommitteeMember(member.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Domain Wings Organizational Structure */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1220] border border-white/10 space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Governance & Structure</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            E-Cell SSGMCE Operational Wings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            How our committee operates to serve 2,500+ engineering students and campus startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Workshop & Bootcamps Wing</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Curates hands-on coding bootcamps, hardware prototyping in Fab Labs, design thinking workshops, and MVP sprints.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Technical & AI Wing</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maintains the E-Cell SSGMCE web platform, integrates Gemini AI startup tools, develops registration portals, and verifies certificates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Corporate Alliances & PR</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Brings national venture capitalists, angel syndicates, alumni founders, and corporate sponsorships to SSGMCE.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Palette className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Design, Media & Branding</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Handles visual brand identity, UI/UX design, event teaser videos, digital credentials, and social media campaigns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Incubation & Startup Desk</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Facilitates NIDHI-PRAYAS seed grants, campus lab workspace allocation, pitch arena jury scoring, and mentor pairing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Operations & Logistics</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Manages campus auditoriums, visiting guest hospitality, hardware developer kits, and stage management.
            </p>
          </div>
        </div>
      </div>

      {/* Recruitment / Join Committee Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-[#0f1424] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-auto"
            >
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Committee Recruitment 2026</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">Join E-Cell SSGMCE Committee</h3>
                <p className="text-xs text-slate-300">
                  Fill in your details to apply for student coordinator or domain lead positions under the guidance of Lead Atharv Sonone and Faculty Advisors.
                </p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g. name@ssgmce.ac.in"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Engineering Branch</label>
                    <input
                      type="text"
                      value={applicantBranch}
                      onChange={(e) => setApplicantBranch(e.target.value)}
                      placeholder="e.g. Computer Science & Engg"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Academic Year</label>
                    <select
                      value={applicantYear}
                      onChange={(e) => setApplicantYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="1st Year">1st Year (FE)</option>
                      <option value="2nd Year">2nd Year (SE)</option>
                      <option value="3rd Year">3rd Year (TE)</option>
                      <option value="4th Year">4th Year (BE)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Preferred Domain Wing *</label>
                  <select
                    value={preferredDomain}
                    onChange={(e) => setPreferredDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Technical">Technical Wing</option>
                    <option value="Management">Management & Operations</option>
                    <option value="Publicity & PR">Publicity & Public Relations</option>
                    <option value="Social Media & Content">Social Media & Content</option>
                    <option value="Sponsorship">Sponsorship & Alliances</option>
                    <option value="Discipline">Discipline & Protocol</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Why do you want to join E-Cell SSGMCE? *</label>
                  <textarea
                    rows={3}
                    required
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Tell us about your past experiences, skills, and what you hope to build or organize..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* Edit / Add Member Modal for Admins/Leads */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0f1424] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8"
            >
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {editingMember ? 'Update Profile' : 'New Member Registration'}
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {editingMember ? `Edit ${editingMember.name}'s Profile` : 'Add Committee Member'}
                </h3>
                <p className="text-xs text-slate-400">
                  Modify name, role, domain wing, department, year, bio, and social links.
                </p>
              </div>

              <form onSubmit={handleSaveMember} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={memberForm.name}
                      onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                      placeholder="e.g. Atharv Sonone"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Role / Designation *</label>
                    <input
                      type="text"
                      required
                      value={memberForm.role}
                      onChange={e => setMemberForm({ ...memberForm, role: e.target.value })}
                      placeholder="e.g. Lead & Overall Student Administrator"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Domain Wing *</label>
                    <select
                      value={memberForm.domain}
                      onChange={e => setMemberForm({ ...memberForm, domain: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Leadership">Leadership</option>
                      <option value="Final Year Advisors">Final Year Advisors</option>
                      <option value="Management">Management</option>
                      <option value="Publicity & PR">Publicity & PR</option>
                      <option value="Social Media & Content">Social Media & Content</option>
                      <option value="Technical">Technical</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Discipline">Discipline</option>
                      <option value="Faculty Advisory">Faculty Advisory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Department / Branch</label>
                    <input
                      type="text"
                      value={memberForm.department}
                      onChange={e => setMemberForm({ ...memberForm, department: e.target.value })}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Academic Year</label>
                    <input
                      type="text"
                      value={memberForm.year}
                      onChange={e => setMemberForm({ ...memberForm, year: e.target.value })}
                      placeholder="e.g. Final Year (BE) or 3rd Year"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Avatar / Photo URL</label>
                    <div className="flex items-center gap-2">
                      <img
                        src={memberForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80'}
                        alt="Preview"
                        className="w-9 h-9 rounded-xl object-cover border border-white/15 shrink-0"
                      />
                      <input
                        type="text"
                        value={memberForm.avatar}
                        onChange={e => setMemberForm({ ...memberForm, avatar: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Avatar Presets */}
                <div className="space-y-1.5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <span className="text-[11px] font-bold text-slate-400 block">Quick Photo Presets:</span>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMemberForm({ ...memberForm, avatar: preset.url })}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-indigo-600/30 text-[11px] text-slate-300 hover:text-white border border-white/10 transition-colors"
                      >
                        <img src={preset.url} alt={preset.label} className="w-4 h-4 rounded-full object-cover" />
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Bio / Profile Summary</label>
                  <textarea
                    rows={2}
                    value={memberForm.bio}
                    onChange={e => setMemberForm({ ...memberForm, bio: e.target.value })}
                    placeholder="Summary of experience, contributions, or achievements..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                      placeholder="atharv@ssgmce.ac.in"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={memberForm.linkedin}
                      onChange={e => setMemberForm({ ...memberForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={memberForm.github}
                      onChange={e => setMemberForm({ ...memberForm, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                    <input
                      type="checkbox"
                      checked={memberForm.isLead}
                      onChange={e => setMemberForm({ ...memberForm, isLead: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Mark as Overall Lead / Spotlight</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                    <input
                      type="checkbox"
                      checked={memberForm.isFaculty}
                      onChange={e => setMemberForm({ ...memberForm, isFaculty: e.target.checked })}
                      className="rounded border-white/20 bg-white/5 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Mark as Faculty Advisory Board</span>
                  </label>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10">
                  {editingMember ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove ${editingMember.name}?`)) {
                          deleteCommitteeMember(editingMember.id);
                          setIsEditModalOpen(false);
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Member</span>
                    </button>
                  ) : <div />}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-colors"
                    >
                      {editingMember ? 'Save Changes' : 'Create Member'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
