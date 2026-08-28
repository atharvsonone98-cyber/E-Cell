import React, { useState } from 'react';
import { 
  Flame, 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Download, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Building2, 
  ChevronRight, 
  Rocket, 
  ShieldCheck, 
  ArrowRight,
  Terminal,
  Zap,
  BookOpen,
  Target,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEcell } from '../context/EcellContext';
import { EventItem } from '../types';

interface EcellEventsHubProps {
  onNavigate: (path: string) => void;
  onOpenEventModal: (event: EventItem) => void;
  onOpenProblemStatements: () => void;
}

export const EcellEventsHub: React.FC<EcellEventsHubProps> = ({
  onNavigate,
  onOpenEventModal,
  onOpenProblemStatements
}) => {
  const { events, showToast, addXP } = useEcell();
  const [activeTab, setActiveTab] = useState<'events' | 'summit-highlights' | 'incubation' | 'leads'>('events');
  const [selectedEventId, setSelectedEventId] = useState<string>('ecell-summit-26');

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleDownloadDossier = () => {
    addXP(25);
    showToast(
      'E-Cell Calendar & Dossier Downloaded!',
      'E-Cell SSGMCE 2026-27 Event Calendar, Pitch Guidelines, and Incubation Handbook saved. (+25 XP)',
      'success'
    );
    const content = `==========================================================\nENTREPRENEURSHIP CELL (E-CELL) — SSGMCE SHEGAON\nShri Sant Gajanan Maharaj College of Engineering\nOfficial E-Cell Innovation & Event Dossier\n==========================================================\n\nFLAGSHIP ANNUAL CALENDAR & PROGRAMS:\n1. E-SUMMIT '26: Annual Entrepreneurship & Venture Summit (April 18, 2026)\n   - ₹1,50,000+ Total Cash Pool & Grants\n   - 50+ Startup Exhibition Stalls\n   - 15+ Visiting Angel Investors & VCs\n\n2. GENESIS '26: National Ideathon & B-Plan Challenge (May 02, 2026)\n   - ₹50,000 Cash Prize + Direct Pre-Incubation\n   - Problem Tracks: AgriTech, AI SaaS, Clean Energy, Rural FinTech, MedTech\n\n3. STARTUP LAUNCHPAD BOOTCAMP 3.0 (May 15, 2026)\n   - 7-Day Founder Cohort: 0 to MVP Sprint\n   - $1,500 Cloud Credits & Lab Access\n\n4. ANGEL SYNDICATE PITCH NIGHT: Pre-Seed Demo Hour\n   - ₹25,00,000 Syndicate Commitment Pool\n\nE-CELL SSGMCE LEADERSHIP & SUPPORT:\n- Atharv Sonone (Chairperson & Executive Lead)\n- Prof. C. M. Mankar (Chief Incubation Head)\n- Dr. S. B. Somani (Principal Patron)\n\nEmail: atharvsonone98@gmail.com | ecell@ssgmce.ac.in\n==========================================================`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ECELL_SSGMCE_Events_Dossier_2026.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative rounded-[36px] bg-gradient-to-b from-[#0e1428] via-[#0A0D18] to-[#080a14] border border-indigo-500/25 p-6 sm:p-10 shadow-2xl overflow-hidden my-12">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Ticker */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>E-CELL SSGMCE FLAGSHIP CALENDAR</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
              SSGMCE SHEGAON
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1">
              <Rocket className="w-3.5 h-3.5" />
              <span>Venture Incubation</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            E-Cell Flagship Events & Venture Summits
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            High-stakes venture summits, inter-college ideathons, 7-day founder launchpads, and live angel syndicate pitch nights curated by the Entrepreneurship Cell at Shri Sant Gajanan Maharaj College of Engineering.
          </p>
        </div>

        {/* Live Metrics */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[110px]">
            <p className="text-xl font-black text-amber-400">₹1,50k+</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Summit Prize Pool</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[110px]">
            <p className="text-xl font-black text-indigo-400">15+ VCs</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Angel Network</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[110px]">
            <p className="text-xl font-black text-emerald-400">₹25L+</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Syndicate Pool</p>
          </div>
        </div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 my-6">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Featured Events ({events.slice(0, 4).length})
          </button>
          <button
            onClick={() => setActiveTab('summit-highlights')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'summit-highlights'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            E-Summit Highlights
          </button>
          <button
            onClick={() => setActiveTab('incubation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'incubation'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Incubation Pathways
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            E-Cell Executive Leads
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('/events')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>NEC Work Report Showcase</span>
          </button>
          <button
            onClick={onOpenProblemStatements}
            className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Genesis Challenge Tracks</span>
          </button>
          <button
            onClick={handleDownloadDossier}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-slate-300" />
            <span>Event Dossier</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Featured E-Cell Events */}
      {activeTab === 'events' && (
        <div className="relative z-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.slice(0, 4).map((evt) => {
              const isSelected = selectedEvent.id === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-950/80 to-[#101730] border-indigo-500 shadow-xl shadow-indigo-500/20'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        evt.category === 'Pitch Competitions'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : evt.category === 'Hackathons'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : evt.category === 'Startup Bootcamps'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {evt.category}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">
                        {evt.prizePool ? evt.prizePool.split(' ')[0] : 'Incubation'}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                      {evt.title.split(':')[0]}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {evt.tagline || evt.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-indigo-300 font-semibold">
                    <span>{evt.date}</span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Event Spotlight Card */}
          {selectedEvent && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-wider">
                    {selectedEvent.category}
                  </span>
                  {selectedEvent.prizePool && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      Prize Pool: {selectedEvent.prizePool}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedEvent.date} • {selectedEvent.time}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selectedEvent.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedEvent.description}
                </p>

                {/* Prerequisites / Highlights checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {selectedEvent.takeaways?.slice(0, 4).map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{req}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onOpenEventModal(selectedEvent)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Register / Secure Pass</span>
                  </button>

                  <button
                    onClick={onOpenProblemStatements}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs flex items-center gap-2 transition-all"
                  >
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span>View Challenge Problem Statements</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={selectedEvent.bannerImage}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 space-y-1">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{selectedEvent.location}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Organized by {selectedEvent.organizer || 'E-Cell SSGMCE'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: E-Summit Highlights */}
      {activeTab === 'summit-highlights' && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Startup Expo & Stalls</h4>
                <p className="text-xs text-slate-400">50+ Student & Regional Venture Booths</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Showcase your physical products, robotics hardware, SaaS apps, or prototypes to visiting angel investors, industrial buyers, and over 1,000+ campus attendees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Shark Pitch Arena</h4>
                <p className="text-xs text-slate-400">Live Stage Pitches for Pre-Seed Funding</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Top 10 shortlisted student ventures get 5 minutes on the main stage to pitch their traction, revenue metrics, and unit economics for direct on-the-spot seed commitments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">VC & Angel Roundtables</h4>
                <p className="text-xs text-slate-400">Direct 1-on-1 Mentoring Clinics</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sit down with institutional partners from Peak VC, Antler India, and Campus Founders Fund for candid feedback on valuation, cap tables, and product defensibility.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Incubation Pathways */}
      {activeTab === 'incubation' && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">SSGMCE Incubation Center Facilities</h4>
                <p className="text-xs text-slate-400">24x7 Infrastructure & Prototyping Access</p>
              </div>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dedicated co-working desks with gigabit Wi-Fi and presentation boardrooms.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>High-end FabLab: 3D printers, CNC milling, PCB prototyping, and IoT testing rigs.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Legal incorporation, GST filing, and trademark/patent assistance.</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Seed Grants & Venture Support</h4>
                <p className="text-xs text-slate-400">Catalyzing Student Innovations to Scalable Companies</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <p>• <strong className="text-white">Pre-Seed Grants:</strong> Milestone-based campus grant tranches up to ₹1,00,000 for early prototype fabrication.</p>
              <p>• <strong className="text-white">Cloud & SaaS Credits:</strong> Over $5,000 in AWS, Google Cloud, and AI development compute per validated startup.</p>
              <p>• <strong className="text-white">Investor Introductions:</strong> Curated demo days with regional angels and national student venture syndicates.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: E-Cell Leads */}
      {activeTab === 'leads' && (
        <div className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">Chairperson & Lead</span>
              <p className="text-sm font-bold text-white">Atharv Sonone</p>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>atharvsonone98@gmail.com</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase">Management Head</span>
              <p className="text-sm font-bold text-white">Satyajeet Patil</p>
              <p className="text-xs text-slate-400">Management & Event Logistics</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Publicity Head</span>
              <p className="text-sm font-bold text-white">Ajay Pawar</p>
              <p className="text-xs text-slate-400">PR & Outreach</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Technical Head</span>
              <p className="text-sm font-bold text-white">Om Hurpade</p>
              <p className="text-xs text-slate-400">Tech & Hackathon Architect</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                EC
              </div>
              <div>
                <p className="text-xs font-bold text-white">Entrepreneurship Cell • SSGMCE Shegaon</p>
                <p className="text-[11px] text-indigo-300">Guided by Prof. C. M. Mankar & Dr. S. B. Somani</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/committee')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shrink-0"
            >
              Meet Full E-Cell Team & Wings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
