import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Search, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Cpu, 
  Sprout, 
  HeartPulse, 
  Coins, 
  Building, 
  ShieldCheck, 
  ExternalLink,
  Users,
  Award,
  Zap,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEcell } from '../context/EcellContext';

interface EcellIdeathonTracksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack?: (trackName: string) => void;
}

interface ProblemStatement {
  id: string;
  track: string;
  category: 'AI & SaaS' | 'AgriTech & Rural' | 'CleanTech & Energy' | 'FinTech & Commerce' | 'Healthcare & BioTech' | 'Open Innovation';
  title: string;
  difficulty: 'Intermediate' | 'Advanced' | 'All Levels';
  prize: string;
  description: string;
  expectedDeliverables: string[];
  techStack: string[];
}

export const ECELL_PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'ECELL-AI-01',
    track: 'Ideathon Track 1 — AI & Enterprise SaaS',
    category: 'AI & SaaS',
    title: 'Autonomous Multi-Agent Workflow Engine for Small Businesses',
    difficulty: 'Advanced',
    prize: '₹15,000 Cash + Seed Grant',
    description: 'Build an autonomous multi-modal agent system that automates client onboarding, invoice parsing, WhatsApp customer support, and CRM sync for micro-enterprises.',
    expectedDeliverables: [
      'Functional web app with multi-agent orchestration',
      'Integration with Gemini Flash / LLM tool-calling APIs',
      'Real-time analytics dashboard with customer conversion tracking'
    ],
    techStack: ['Gemini API / LangChain', 'React / Next.js', 'FastAPI / Express', 'PostgreSQL']
  },
  {
    id: 'ECELL-AGRI-02',
    track: 'Ideathon Track 2 — AgriTech & Rural Commerce',
    category: 'AgriTech & Rural',
    title: 'Mandi Price Arbitrage & Dynamic Cold-Storage Telemetry',
    difficulty: 'Intermediate',
    prize: '₹15,000 Cash + Seed Grant',
    description: 'Design an IoT-integrated telemetry platform to monitor regional farm storage micro-grids, forecast APMC mandi spot pricing, and connect farmers directly with institutional bulk buyers in Vidarbha.',
    expectedDeliverables: [
      'Simulated or live IoT sensor telemetry dashboard (Temperature, Humidity, Power)',
      'Automated SMS/WhatsApp spot price alerts in Marathi and Hindi',
      'Direct buyer-seller order matching and digital escrow simulator'
    ],
    techStack: ['ESP32 / IoT Gateways', 'Node.js / Express', 'Tailwind CSS', 'Recharts']
  },
  {
    id: 'ECELL-CLEAN-03',
    track: 'Ideathon Track 3 — CleanTech & EV Mobility',
    category: 'CleanTech & Energy',
    title: 'Predictive Battery Health & Smart Swapping Fleet Orchestrator',
    difficulty: 'Advanced',
    prize: '₹10,000 Cash + Incubation Desk',
    description: 'A hardware/software platform analyzing battery telemetry, thermal degradation patterns, and optimizing energy consumption for 2-wheeler and 3-wheeler commercial delivery fleets.',
    expectedDeliverables: [
      'Battery State of Health (SOH) and State of Charge (SOC) predictive model',
      'Map-based battery swap station recommendation algorithm',
      'Fleet manager telemetry dashboard with real-time health alerts'
    ],
    techStack: ['Python / Scikit-Learn', 'React', 'Google Maps / Leaflet', 'WebSockets']
  },
  {
    id: 'ECELL-FIN-04',
    track: 'Ideathon Track 4 — FinTech & Social Commerce',
    category: 'FinTech & Commerce',
    title: 'Alternative Micro-Credit Scoring for Rural Artisans & Merchants',
    difficulty: 'Intermediate',
    prize: '₹10,000 Cash + Incubation Desk',
    description: 'Build an alternative credit evaluation engine utilizing GST micro-invoices, utility payment consistency, and UPI merchant flows to enable fair lending to informal businesses.',
    expectedDeliverables: [
      'Alternative credit score calculator (300-900)',
      'Interactive risk heat-map for micro-finance lenders',
      'Automated repayment schedule simulator'
    ],
    techStack: ['TypeScript', 'Node.js', 'Chart.js / Recharts', 'PostgreSQL']
  },
  {
    id: 'ECELL-HEALTH-05',
    track: 'Ideathon Track 5 — Healthcare & BioTech',
    category: 'Healthcare & BioTech',
    title: 'Rural Tele-Triage & AI Audio Symptom Interpreter',
    difficulty: 'Advanced',
    prize: '₹10,000 Cash + Lab Credits',
    description: 'Develop an intelligent primary triage assistant for rural health centers that ingests patient symptom speech notes, vital signs, and photo diagnostics to flag critical medical emergencies.',
    expectedDeliverables: [
      'Multilingual audio symptom intake with structured clinical summary',
      'Emergency risk scoring and doctor consultation queue',
      'FHIR compliant encrypted health summary exporter'
    ],
    techStack: ['Gemini 3.7 Flash', 'React', 'Web Audio API', 'Firestore']
  },
  {
    id: 'ECELL-OPEN-06',
    track: 'Ideathon Open Track — Wildcard Innovation',
    category: 'Open Innovation',
    title: 'Breakthrough Solutions in EdTech, CyberSec & Sustainable Tech',
    difficulty: 'All Levels',
    prize: '₹15,000 Total Pool',
    description: 'Pitch any novel, venture-scale technological solution addressing student empowerment, collegiate collaboration, cybersecurity resilience, or UN Sustainable Development Goals.',
    expectedDeliverables: [
      'High-fidelity working prototype demonstrating core value proposition',
      'Complete business model canvas and go-to-market strategy',
      '3-minute elevator pitch video demo'
    ],
    techStack: ['Any Modern Stack', 'Cloud Deployment', 'Open Source']
  }
];

export const EcellIdeathonTracksModal: React.FC<EcellIdeathonTracksModalProps> = ({
  isOpen,
  onClose,
  onSelectTrack
}) => {
  const { showToast, addXP } = useEcell();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(ECELL_PROBLEM_STATEMENTS[0]);

  if (!isOpen) return null;

  const categories = ['All', 'AI & SaaS', 'AgriTech & Rural', 'CleanTech & Energy', 'FinTech & Commerce', 'Healthcare & BioTech', 'Open Innovation'];

  const filteredPS = ECELL_PROBLEM_STATEMENTS.filter(ps => {
    const matchesCat = selectedCategory === 'All' || ps.category === selectedCategory;
    const matchesSearch = ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ps.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ps.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownloadHandbook = () => {
    addXP(20);
    showToast(
      'Ideathon Handbook Downloaded!',
      'E-Cell SSGMCE Ideathon & Challenge Tracks Handbook saved. (+20 XP)',
      'success'
    );
    const content = `==========================================================\nCAMPUS IDEATHON & B-PLAN CHALLENGE\nEntrepreneurship Cell (E-Cell) SSGMCE Shegaon\n==========================================================\n\nTRACKS & PROBLEM STATEMENTS:\n1. AI & Enterprise SaaS (Autonomous Multi-Agent Workflow Engine)\n2. AgriTech & Rural Commerce (Mandi Price Arbitrage & Cold-Storage)\n3. CleanTech & EV Mobility (Battery State of Health & Swapping)\n4. FinTech & Commerce (Alternative Micro-Credit Scoring)\n5. Healthcare & BioTech (Rural Tele-Triage & Clinical AI)\n6. Open Innovation Wildcard (EdTech, CyberSec, Sustainability)\n\nPRIZES & PERKS:\n- ₹50,000+ Total Cash Pool across Tracks\n- 6-Month Pre-Incubation at SSGMCE Innovation Center\n- $1,500 AWS / GCP Compute Credits per Team\n- Direct pitch to Angel Syndicates\n\nTEAM GUIDELINES:\n- Team Size: 1 to 4 members\n- Open to all engineering & management students\n\nContact: atharvsonone98@gmail.com | ecell@ssgmce.ac.in\n==========================================================`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Ideathon_Challenge_Handbook_SSGMCE.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl rounded-[32px] bg-[#0A0D18] border border-indigo-500/30 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-[#0A0D18] border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                  E-CELL IDEATHON • SSGMCE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                  ₹50,000+ Prize Pool & Incubation
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-6 h-6 text-indigo-400" />
                <span>Ideathon Challenge Statements & Problem Tracks</span>
              </h2>
              <p className="text-xs text-slate-300">
                Curated venture problem statements evaluated by SSGMCE Incubation Center and industry angel mentors.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleDownloadHandbook}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Handbook</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-6 bg-white/[0.02] border-b border-white/5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search problem statements or technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141A2E] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[520px] overflow-y-auto">
            {/* List Column */}
            <div className="lg:col-span-5 border-r border-white/5 divide-y divide-white/5 overflow-y-auto">
              {filteredPS.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No problem statements match your search.
                </div>
              ) : (
                filteredPS.map((ps) => (
                  <div
                    key={ps.id}
                    onClick={() => setSelectedPS(ps)}
                    className={`p-4 sm:p-5 cursor-pointer transition-all ${
                      selectedPS?.id === ps.id
                        ? 'bg-indigo-600/15 border-l-4 border-indigo-500'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
                        {ps.id}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {ps.prize}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {ps.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px]">
                        {ps.category}
                      </span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-[10px] text-slate-400">{ps.difficulty}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Detail Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0C101F] overflow-y-auto space-y-6">
              {selectedPS ? (
                <>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                        {selectedPS.id}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-xs font-semibold">
                        {selectedPS.track}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold">
                        {selectedPS.prize}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {selectedPS.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem Overview</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      {selectedPS.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Expected Deliverables</h4>
                    <div className="space-y-2">
                      {selectedPS.expectedDeliverables.map((del, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recommended Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPS.techStack.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-400">
                      Incubation: <span className="text-white font-bold">SSGMCE Innovation Center</span> • Free Mentorship
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        if (onSelectTrack) onSelectTrack(selectedPS.title);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Register for this Ideathon Track</span>
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
