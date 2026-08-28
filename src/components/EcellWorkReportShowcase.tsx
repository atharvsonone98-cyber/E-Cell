import React, { useState } from 'react';
import { 
  FileText, 
  Award, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Flame, 
  Layers, 
  ChevronRight, 
  Sliders, 
  Search, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Target,
  Trophy,
  Share2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkReportItem, SeniorConsultedItem } from '../types';
import { INITIAL_WORK_REPORTS, SENIORS_CONSULTED_DATA, ECELL_NEC_METRICS } from '../data/initialData';
import { useEcell } from '../context/EcellContext';
import { EcellLogo } from './EcellLogo';

interface EcellWorkReportShowcaseProps {
  onSelectEventReport?: (report: WorkReportItem) => void;
}

export const EcellWorkReportShowcase: React.FC<EcellWorkReportShowcaseProps> = ({
  onSelectEventReport
}) => {
  const { showToast, addXP } = useEcell();
  const [selectedReportId, setSelectedReportId] = useState<string>(INITIAL_WORK_REPORTS[0].id);
  const [activeTab, setActiveTab] = useState<'reports' | 'flow-explorer' | 'timeline' | 'seniors'>('reports');
  const [activePhase, setActivePhase] = useState<'planning' | 'promotion' | 'execution' | 'followUp'>('execution');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSpotlightFX, setIsSpotlightFX] = useState<boolean>(true);
  const [shakeTrigger, setShakeTrigger] = useState<number>(0);
  const [modalReport, setModalReport] = useState<WorkReportItem | null>(null);

  const selectedReport = INITIAL_WORK_REPORTS.find(r => r.id === selectedReportId) || INITIAL_WORK_REPORTS[0];

  const categories = ['All', 'Hackathons', 'Competitions', 'Workshops', 'Masterclasses', 'Symposiums & Fests', 'Student Engagement'];

  const filteredReports = INITIAL_WORK_REPORTS.filter(report => {
    const matchesCat = filterCategory === 'All' || report.category === filterCategory;
    const matchesSearch = report.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (report.speakerOrGuest && report.speakerOrGuest.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const triggerShakeFX = () => {
    setShakeTrigger(prev => prev + 1);
  };

  const handleDownloadOfficialReport = () => {
    addXP(30);
    showToast(
      'Official Work Report Downloaded!',
      'E-Cell SSGMCE National Entrepreneurship Challenge 2026 Work Report saved successfully. (+30 XP)',
      'success'
    );
    const content = `======================================================================
EVENT WORK REPORT — ENTREPRENEURSHIP CELL (E-CELL) SSGMCE
Shri Sant Gajanan Maharaj College of Engineering, Shegaon, Maharashtra
Affiliation: National Entrepreneurship Challenge (NEC 2026) — E-Cell IIT Bombay
College NECID: ${ECELL_NEC_METRICS.necid} | Team Name: ${ECELL_NEC_METRICS.teamName}
Events Conducted Previous Year: ${ECELL_NEC_METRICS.eventsConductedPreviousYear} | Total Reported: ${ECELL_NEC_METRICS.totalEventsReported}
Overall Participation Count: ${ECELL_NEC_METRICS.overallParticipationCount}
======================================================================

EXECUTIVE SUMMARY:
This document serves as the official event work report and operational showcase of E-Cell SSGMCE. 
Documenting 10 comprehensive milestone events, internal selection hackathons, business competitions, 
hands-on technical workshops, obstacle leadership arenas, and nationwide technical carnivals.

----------------------------------------------------------------------
CHRONOLOGICAL EVENT BREAKDOWN & FLOWS:
----------------------------------------------------------------------
${INITIAL_WORK_REPORTS.map((r, i) => `
[EVENT #${i + 1}] ${r.eventName.toUpperCase()}
Date Conducted: ${r.dateConducted}
Category: ${r.category} | Venue: ${r.venue || 'SSGMCE Campus'}
${r.speakerOrGuest ? `Invited Expert: ${r.speakerOrGuest} (${r.speakerRole || ''}, ${r.speakerCompany || ''})\n` : ''}${r.prizes ? `Prizes / Outcomes: ${r.prizes}\n` : ''}
Short Description:
${r.shortDescription}

Event Flow:
- Planning Phase: ${r.flow.planning}
- Promotion Phase: ${r.flow.promotion}
- Execution Phase: ${r.flow.execution}
- Follow-up Phase: ${r.flow.followUp}

Timeline:
- Planning: ${r.timeline.planning || 'N/A'}
- Promotion: ${r.timeline.promotion || 'N/A'}
- Execution: ${r.timeline.execution}
- Follow-up: ${r.timeline.followUp || 'N/A'}
`).join('\n----------------------------------------------------------------------\n')}

----------------------------------------------------------------------
DETAILS OF SENIORS CONSULTED:
----------------------------------------------------------------------
${SENIORS_CONSULTED_DATA.map((s, idx) => `
${idx + 1}. ${s.name}
   - Post Held: ${s.postHeld} (${s.yearOfStudy})
   - Contact No: ${s.contactNo}
   - Email: ${s.email}
`).join('\n')}

======================================================================
Report Generated & Authenticated by E-Cell SSGMCE Portal
======================================================================`;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ECELL_SSGMCE_Official_Work_Report_NEC2026.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative rounded-[36px] bg-gradient-to-b from-[#0B0F1F] via-[#080B16] to-[#05070E] border border-indigo-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden my-8">
      {/* Dynamic Ambient Blur Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge & Verification Ticker */}
      <div className="relative z-10 space-y-6 pb-8 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <EcellLogo size={68} variant="solar" animated={true} interactive={true} showText={false} className="shrink-0 hidden sm:flex" />
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>OFFICIAL WORK REPORT SHOWCASE</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono">
                  NECID: {ECELL_NEC_METRICS.necid}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  Team: {ECELL_NEC_METRICS.teamName}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold hidden sm:inline-flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>NEC 2026 • E-Cell IIT Bombay</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                E-Cell SSGMCE Event Work Report & Showcase
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Official institutional portfolio documenting <strong className="text-white">7+ previous year events</strong>, <strong className="text-white">520+ participants</strong>, and 10 detailed lifecycle reports across Hackathons, Eureka! B-Plan tracks, Expert Masterclasses, and National Carnivals.
              </p>
            </div>
          </div>

          {/* Interactive FX Controller & Download */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setIsSpotlightFX(!isSpotlightFX);
                triggerShakeFX();
                showToast(
                  isSpotlightFX ? 'Standard FX Mode' : 'Advanced Showcase FX Activated!',
                  isSpotlightFX ? 'Spotlight and shake dynamics reduced.' : 'Enhanced glassmorphism, dynamic tilt shake, and blur depth enabled.',
                  'info'
                );
              }}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                isSpotlightFX
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-indigo-400 text-indigo-200 shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isSpotlightFX ? 'text-amber-300 animate-spin' : ''}`} />
              <span>{isSpotlightFX ? 'Showcase FX: Active' : 'Enable Showcase FX'}</span>
            </button>

            <button
              onClick={handleDownloadOfficialReport}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Export Official Report</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid with Glassmorphic Highlight */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all">
            <p className="text-2xl sm:text-3xl font-black text-amber-400">{ECELL_NEC_METRICS.overallParticipationCount}</p>
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Overall Participation</p>
            <p className="text-[10px] text-slate-400">Cross-departmental reach</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all">
            <p className="text-2xl sm:text-3xl font-black text-indigo-400">{ECELL_NEC_METRICS.eventsConductedPreviousYear}</p>
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Events Previous Year</p>
            <p className="text-[10px] text-slate-400">Official NEC Track Count</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all">
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">{INITIAL_WORK_REPORTS.length}</p>
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Work Reports Logged</p>
            <p className="text-[10px] text-slate-400">Full 4-phase lifecycle data</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all">
            <p className="text-2xl sm:text-3xl font-black text-purple-400">3 Seniors</p>
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Consulted Leaders</p>
            <p className="text-[10px] text-slate-400">Publicity, Tech & Event Heads</p>
          </div>
        </div>
      </div>

      {/* Showcase Mode Navigation Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 my-6">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => {
              setActiveTab('reports');
              triggerShakeFX();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Work Reports ({INITIAL_WORK_REPORTS.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('flow-explorer');
              triggerShakeFX();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'flow-explorer'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            4-Phase Flow Explorer
          </button>
          <button
            onClick={() => {
              setActiveTab('timeline');
              triggerShakeFX();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Timeline Milestones
          </button>
          <button
            onClick={() => {
              setActiveTab('seniors');
              triggerShakeFX();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'seniors'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Seniors Consulted ({SENIORS_CONSULTED_DATA.length})
          </button>
        </div>

        {/* Quick Search inside showcase */}
        {activeTab === 'reports' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search event reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#12172A] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: ALL WORK REPORTS (GRID + SPOTLIGHT INSPECTOR WITH SHAKE/BLUR) */}
      {activeTab === 'reports' && (
        <div className="relative z-10 space-y-6">
          {/* Category Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report, idx) => {
              const isSelected = selectedReport.id === report.id;
              return (
                <motion.div
                  key={report.id}
                  layout
                  animate={isSpotlightFX && shakeTrigger > 0 ? {
                    x: [0, -3, 3, -2, 2, 0],
                    transition: { duration: 0.35, delay: idx * 0.03 }
                  } : {}}
                  whileHover={{ 
                    scale: 1.02, 
                    rotate: isSpotlightFX ? (idx % 2 === 0 ? 0.5 : -0.5) : 0,
                    transition: { duration: 0.2 } 
                  }}
                  onClick={() => {
                    setSelectedReportId(report.id);
                    if (onSelectEventReport) onSelectEventReport(report);
                  }}
                  className={`relative p-5 rounded-3xl cursor-pointer border transition-all overflow-hidden flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-950/80 via-[#101730] to-[#0A0D18] border-indigo-400 shadow-2xl shadow-indigo-600/30'
                      : isSpotlightFX 
                      ? 'bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                      : 'bg-[#101524] border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Subtle Background Glow for selected */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                  )}

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        report.category === 'Hackathons'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : report.category === 'Competitions'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : report.category === 'Masterclasses'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : report.category === 'Workshops'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : report.category === 'Symposiums & Fests'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {report.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-400" />
                        <span>{report.dateConducted}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {report.eventName}
                    </h4>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {report.shortDescription}
                    </p>

                    {report.speakerOrGuest && (
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-semibold text-white truncate">{report.speakerOrGuest}</span>
                        <span className="text-slate-400 text-[10px] truncate">({report.speakerCompany || report.speakerRole})</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300 font-semibold relative z-10">
                    <span className="text-[11px] text-amber-300 font-bold">
                      {report.highlightStats || 'Official NEC Report'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalReport(report);
                      }}
                      className="flex items-center gap-1 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded-lg"
                    >
                      <span>Full Flow</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Report Deep-Dive Inspector Panel */}
          {selectedReport && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E152E] via-[#0C1124] to-[#0A0D18] border border-indigo-500/30 shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-wider">
                    {selectedReport.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Conducted: {selectedReport.dateConducted}</span>
                  </span>
                  {selectedReport.prizes && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      {selectedReport.prizes}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedReport.eventName}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  {selectedReport.shortDescription}
                </p>

                {/* 4-Phase Quick Matrix */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Event Lifecycle Flow</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase">1. Planning Phase</span>
                      <p className="text-xs text-slate-300 line-clamp-2">{selectedReport.flow.planning}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-purple-400 uppercase">2. Promotion Phase</span>
                      <p className="text-xs text-slate-300 line-clamp-2">{selectedReport.flow.promotion}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase">3. Execution Phase</span>
                      <p className="text-xs text-slate-300 line-clamp-2">{selectedReport.flow.execution}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">4. Follow-up Phase</span>
                      <p className="text-xs text-slate-300 line-clamp-2">{selectedReport.flow.followUp}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setModalReport(selectedReport)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Complete Work Report Dossier</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Event Report: ${selectedReport.eventName}\nDate: ${selectedReport.dateConducted}\nDescription: ${selectedReport.shortDescription}`);
                      showToast('Copied to Clipboard', `Excerpt for ${selectedReport.eventName} copied.`, 'info');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <Share2 className="w-4 h-4 text-slate-300" />
                    <span>Share Excerpt</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={selectedReport.bannerImage}
                    alt={selectedReport.eventName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D18] via-transparent to-black/30" />
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 space-y-1">
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{selectedReport.venue || 'SSGMCE Shegaon'}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Documented by Team Hierarchy • NECID {ECELL_NEC_METRICS.necid}
                    </p>
                  </div>
                </div>

                {/* Key Outcomes Box */}
                {selectedReport.keyOutcomes && (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <h5 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Key Outcomes & Impact</h5>
                    <div className="space-y-1.5">
                      {selectedReport.keyOutcomes.map((out, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* TAB 2: 4-PHASE FLOW EXPLORER */}
      {activeTab === 'flow-explorer' && (
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit">
            {(['planning', 'promotion', 'execution', 'followUp'] as const).map((phase) => (
              <button
                key={phase}
                onClick={() => {
                  setActivePhase(phase);
                  triggerShakeFX();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  activePhase === phase
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {phase === 'followUp' ? 'Follow-up Phase' : `${phase} Phase`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INITIAL_WORK_REPORTS.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-indigo-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{report.eventName}</h4>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {report.dateConducted}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#11172B] border border-white/5 text-xs text-slate-300 leading-relaxed">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {activePhase.toUpperCase()} ACTIONS:
                  </span>
                  {report.flow[activePhase]}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Category: {report.category}</span>
                  <button
                    onClick={() => setModalReport(report)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    View All 4 Phases →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TIMELINE MILESTONES */}
      {activeTab === 'timeline' && (
        <div className="relative z-10 space-y-6">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-8 my-4">
            {INITIAL_WORK_REPORTS.map((report, idx) => (
              <div key={report.id} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0B0F1F] group-hover:scale-125 transition-transform" />

                <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      {report.dateConducted}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      {report.category}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white">
                    {report.eventName}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {report.shortDescription}
                  </p>

                  {/* Timeline specific phases */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-400">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Planning:</strong>
                      <span>{report.timeline.planning || 'Initiated'}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Promotion:</strong>
                      <span>{report.timeline.promotion || 'Digital/Campus'}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Execution:</strong>
                      <span>{report.timeline.execution}</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Follow-up:</strong>
                      <span>{report.timeline.followUp || 'Certificates & Report'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SENIORS CONSULTED */}
      {activeTab === 'seniors' && (
        <div className="relative z-10 space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Senior Advisory & Consultative Governance:</strong> In adherence with the National Entrepreneurship Challenge guidelines, the E-Cell core team actively consulted outgoing senior student heads for operational frameworks, jury guidelines, and departmental coordination.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SENIORS_CONSULTED_DATA.map((senior) => (
              <div
                key={senior.name}
                className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition-all space-y-4 text-center group"
              >
                <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-indigo-500/40 group-hover:scale-105 transition-transform">
                  <img
                    src={senior.avatar}
                    alt={senior.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">{senior.name}</h4>
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{senior.postHeld}</p>
                  <p className="text-[11px] text-slate-400">{senior.yearOfStudy}</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-center gap-2 font-mono bg-white/5 py-1.5 px-3 rounded-xl">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{senior.contactNo}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 font-mono bg-white/5 py-1.5 px-3 rounded-xl truncate">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate">{senior.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL REPORT POPUP MODAL */}
      <AnimatePresence>
        {modalReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-[32px] bg-[#0A0D18] border border-indigo-500/40 shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-[#0A0D18] border-b border-white/10 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                      NEC EVENT REPORT • {modalReport.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                      {modalReport.dateConducted}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {modalReport.eventName}
                  </h3>
                </div>
                <button
                  onClick={() => setModalReport(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Short Description</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    {modalReport.shortDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Comprehensive Event Flow</h4>
                  <div className="space-y-2.5">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">1. Planning Phase</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{modalReport.flow.planning}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">2. Promotion Phase</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{modalReport.flow.promotion}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">3. Execution Phase</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{modalReport.flow.execution}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">4. Follow-up Phase</span>
                      <p className="text-xs text-slate-300 leading-relaxed">{modalReport.flow.followUp}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Timeline Milestones</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="bg-white/5 p-3 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Planning:</strong>
                      {modalReport.timeline.planning || 'Initiated'}
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Promotion:</strong>
                      {modalReport.timeline.promotion || 'Digital/Campus'}
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Execution:</strong>
                      {modalReport.timeline.execution}
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                      <strong className="text-white block text-[10px] uppercase">Follow-up:</strong>
                      {modalReport.timeline.followUp || 'Certificates & Report'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  NEC ID: <strong className="text-white">{ECELL_NEC_METRICS.necid}</strong> • SSGMCE Shegaon
                </span>
                <button
                  onClick={() => setModalReport(null)}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                >
                  Close Showcase
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
