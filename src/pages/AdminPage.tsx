import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEcell } from '../context/EcellContext';
import { 
  ShieldCheck, 
  Plus, 
  Calendar, 
  Rocket, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Sparkles,
  BarChart3,
  FileCheck,
  Edit,
  Mail,
  Linkedin,
  Github,
  X,
  UserPlus
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { CommitteeMember } from '../types';

export const AdminPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { user, isAdmin, switchUserRole } = useAuth();
  const { 
    events, 
    startups, 
    mentorshipRequests, 
    certificates, 
    committee,
    analytics, 
    createEvent, 
    createCertificate, 
    createCommitteeMember,
    updateCommitteeMember,
    deleteCommitteeMember,
    showToast 
  } = useEcell();

  const [activeTab, setActiveTab] = useState<'analytics' | 'events' | 'committee' | 'startups' | 'mentorship' | 'certificates'>('analytics');

  // Committee Modal State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
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
    domain: 'Workshop & Events',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    bio: '',
    email: '',
    linkedin: '',
    github: '',
    tags: 'Workshops, Operations',
    isLead: false,
    isFaculty: false
  });

  const openAddMemberModal = () => {
    setEditingMember(null);
    setMemberForm({
      name: '',
      role: '',
      domain: 'Workshop & Events',
      department: 'Computer Science & Engineering',
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
    setIsMemberModalOpen(true);
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
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role) {
      showToast('Please enter member name and role', undefined, 'warning');
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

    setIsMemberModalOpen(false);
  };

  // New Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<'Workshops' | 'Hackathons' | 'Pitch Competitions' | 'Speaker Sessions' | 'Networking' | 'Bootcamps'>('Workshops');
  const [eventDate, setEventDate] = useState(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState('10:00 AM - 1:00 PM');
  const [eventLocation, setEventLocation] = useState('Innovation Hub, Lab 3');
  const [eventDesc, setEventDesc] = useState('');
  const [eventCapacity, setEventCapacity] = useState(100);
  const [eventXP, setEventXP] = useState(50);
  const [eventBanner, setEventBanner] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80');

  // New Certificate Form State
  const [certRecipient, setCertRecipient] = useState('');
  const [certStudentId, setCertStudentId] = useState('usr-1');
  const [certTitle, setCertTitle] = useState('Certificate of Startup Incubation Excellence');
  const [certEventName, setCertEventName] = useState('Annual Venture Demo Day 2026');
  const [certType, setCertType] = useState<'participation' | 'winner' | 'incubated' | 'mentor'>('winner');
  const [certXP, setCertXP] = useState(150);

  // Mock analytics charts data
  const growthData = [
    { month: 'Sep', innovators: 120, startups: 12, funding: 2 },
    { month: 'Oct', innovators: 210, startups: 18, funding: 5 },
    { month: 'Nov', innovators: 320, startups: 26, funding: 10 },
    { month: 'Dec', innovators: 410, startups: 32, funding: 15 },
    { month: 'Jan', innovators: 480, startups: 38, funding: 20 },
    { month: 'Feb', innovators: 540, startups: 42, funding: 25 },
  ];

  const domainData = [
    { domain: 'CleanTech', count: 12 },
    { domain: 'AI SaaS', count: 15 },
    { domain: 'HealthTech', count: 6 },
    { domain: 'FinTech', count: 5 },
    { domain: 'DeepTech', count: 4 },
  ];

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    await createEvent({
      title: eventTitle,
      category: eventCategory,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDesc,
      capacity: Number(eventCapacity),
      xpReward: Number(eventXP),
      bannerImage: eventBanner,
      speaker: { name: 'E-Cell Faculty & Venture Board', role: 'Incubation Leads', company: 'E-Cell', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
      isVirtual: false
    });

    setEventTitle('');
    setEventDesc('');
    showToast('Event Published Successfully', 'Visible across campus calendar', 'success');
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certRecipient.trim()) return;

    await createCertificate({
      recipientName: certRecipient,
      studentId: certStudentId,
      title: certTitle,
      eventName: certEventName,
      type: certType,
      xpAwarded: Number(certXP)
    });

    setCertRecipient('');
    showToast('Certificate Issued & Cryptographically Signed!', 'Saved to public verification registry', 'success');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ecosystem Governance</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
              SSGMCE Owner Console
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            E-Cell SSGMCE Administrative Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Shri Sant Gajanan Maharaj College of Engineering (SSGMCE) • Managed by Atharv Sonone. Monitor incubation velocity, publish events, review startups, issue verifiable certificates, and oversee mentorship.
          </p>
        </div>

        {/* Quick Role Switcher Banner */}
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-3 self-start md:self-auto">
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Logged in As</span>
            <span className="text-white font-bold">{user?.name} ({user?.role})</span>
          </div>
          <button
            onClick={() => switchUserRole(user?.role === 'admin' ? 'student' : 'admin')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
          >
            Switch to {user?.role === 'admin' ? 'Student' : 'Owner/Admin'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-white/10">
        {[
          { id: 'analytics', label: 'Ecosystem Analytics', icon: BarChart3 },
          { id: 'committee', label: `Committee & Team (${committee.length})`, icon: Users },
          { id: 'events', label: `Event Manager (${events.length})`, icon: Calendar },
          { id: 'startups', label: `Startup Applications (${startups.length})`, icon: Rocket },
          { id: 'mentorship', label: `Mentorship Queue (${mentorshipRequests.length})`, icon: Users },
          { id: 'certificates', label: `Certificate Issuer (${certificates.length})`, icon: FileCheck }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-amber-400 text-white bg-white/[0.04]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Total Innovators</span>
              <p className="text-3xl font-extrabold text-white mt-1">{analytics.totalUsers}</p>
              <span className="text-[10px] text-emerald-400 font-semibold">+34% this quarter</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Ventures Incubated</span>
              <p className="text-3xl font-extrabold text-white mt-1">{analytics.totalStartups}</p>
              <span className="text-[10px] text-indigo-400 font-semibold">12 Early Traction</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Total Funding</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1">{analytics.fundingFacilitated}</p>
              <span className="text-[10px] text-slate-400">Seed Grants & Angels</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0e1220] border border-white/10">
              <span className="text-xs text-slate-400">Events Completed</span>
              <p className="text-3xl font-extrabold text-white mt-1">{analytics.totalEvents}</p>
              <span className="text-[10px] text-amber-400 font-semibold">2,100+ Total Attendees</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Innovator Growth */}
            <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Innovator Cohort Growth & Venture Creation</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorInnovators" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f1424', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="innovators" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorInnovators)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Domain Distribution */}
            <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white">Startups by Industry Sector</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={domainData}>
                    <XAxis dataKey="domain" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f1424', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                    <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVENT MANAGER */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Event Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              <span>Publish New Campus Event</span>
            </h3>

            <form onSubmit={handleCreateEvent} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. AI Founder Sprint 2026"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Category</label>
                  <select
                    value={eventCategory}
                    onChange={(e: any) => setEventCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs"
                  >
                    <option value="Workshops">Workshops</option>
                    <option value="Hackathons">Hackathons</option>
                    <option value="Pitch Competitions">Pitch Competitions</option>
                    <option value="Speaker Sessions">Speaker Sessions</option>
                    <option value="Networking">Networking</option>
                    <option value="Bootcamps">Bootcamps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Time</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Capacity</label>
                  <input
                    type="number"
                    value={eventCapacity}
                    onChange={(e) => setEventCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Location / Venue</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Details regarding agenda, prerequisites, and prizes..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={eventXP}
                    onChange={(e) => setEventXP(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    value={eventBanner}
                    onChange={(e) => setEventBanner(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition-all"
              >
                Publish Event to Calendar
              </button>
            </form>
          </div>

          {/* Active Events List */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-white">Active Calendar Events ({events.length})</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {events.map(e => (
                <div key={e.id} className="p-4 rounded-xl bg-[#0e1220] border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">{e.category}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{e.title}</h4>
                    <p className="text-[11px] text-slate-400">{e.date} • {e.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-white block">{e.registeredCount} / {e.capacity}</span>
                    <span className="text-[10px] text-amber-400 font-semibold">+{e.xpReward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CERTIFICATE ISSUER */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Issue Verified Certificate</span>
            </h3>

            <form onSubmit={handleIssueCertificate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Recipient Student Name *</label>
                <input
                  type="text"
                  required
                  value={certRecipient}
                  onChange={(e) => setCertRecipient(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Event / Milestone Program *</label>
                <input
                  type="text"
                  required
                  value={certEventName}
                  onChange={(e) => setCertEventName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Type</label>
                  <select
                    value={certType}
                    onChange={(e: any) => setCertType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs"
                  >
                    <option value="winner">Winner / 1st Place</option>
                    <option value="incubated">Incubated Graduate</option>
                    <option value="participation">Participation</option>
                    <option value="mentor">Mentor Appreciation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={certXP}
                    onChange={(e) => setCertXP(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-black shadow-lg transition-all"
              >
                Sign & Issue Official Credential
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-white">Issued Credentials Registry ({certificates.length})</h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {certificates.map(c => (
                <div key={c.id} className="p-4 rounded-xl bg-[#0e1220] border border-white/10 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">{c.type}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{c.title}</h4>
                    <p className="text-[11px] text-slate-400">Awarded to {c.recipientName} • ID: <span className="font-mono text-slate-300">{c.credentialId}</span></p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 shrink-0">Verified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Committee & Team Manager */}
      {activeTab === 'committee' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0e1220] border border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white">E-Cell SSGMCE Committee & Domain Leads</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage names, roles, branches, domains, bios, and profile links across all operational wings.
              </p>
            </div>
            <button
              onClick={openAddMemberModal}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 self-start sm:self-auto transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Team Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {committee.map((member) => (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-[#0e1220] border border-white/10 flex flex-col justify-between space-y-3 hover:border-indigo-500/40 transition-all shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            member.isLead ? 'bg-indigo-500/20 text-indigo-300' : member.isFaculty ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-300'
                          }`}>
                            {member.domain}
                          </span>
                          {member.year && (
                            <span className="text-[10px] text-slate-400 font-medium">{member.year}</span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1 truncate">{member.name}</h4>
                        <p className="text-xs text-indigo-300 font-semibold truncate">{member.role}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="text-[11px] text-slate-400">
                    <span>{member.department}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="p-1 rounded bg-white/5 text-slate-400 hover:text-white" title={member.email}>
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-1 rounded bg-white/5 text-slate-400 hover:text-indigo-400" title="LinkedIn">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noreferrer" className="p-1 rounded bg-white/5 text-slate-400 hover:text-white" title="GitHub">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditMemberModal(member)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-colors border border-white/5 hover:border-indigo-500/30"
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
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3 & 4 (Startups & Mentorship Lists) */}
      {(activeTab === 'startups' || activeTab === 'mentorship') && (
        <div className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white capitalize">{activeTab} Queue</h3>
          <div className="space-y-3">
            {activeTab === 'startups' ? (
              startups.map(s => (
                <div key={s.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.name}</h4>
                    <p className="text-xs text-slate-400">{s.tagline} • Founder: {s.founderName}</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">{s.stage}</span>
                </div>
              ))
            ) : (
              mentorshipRequests.map(m => (
                <div key={m.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{m.studentName} with {m.mentorName}</h4>
                    <p className="text-xs text-slate-400">Topic: {m.topic} • Date: {m.preferredDate}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full capitalize">{m.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Committee Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0f1424] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 my-8">
            <button
              onClick={() => setIsMemberModalOpen(false)}
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
                Customize their name, role, domain wing, contact details, and department information.
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
                  <input
                    type="text"
                    value={memberForm.avatar}
                    onChange={e => setMemberForm({ ...memberForm, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
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

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
