import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Wand2, 
  FileSpreadsheet, 
  Presentation, 
  ShieldAlert, 
  TrendingUp, 
  Mic, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

type ToolId = 
  | 'idea-validator' 
  | 'startup-name-generator' 
  | 'business-model-generator' 
  | 'pitch-deck-assistant' 
  | 'swot-generator' 
  | 'market-research-assistant' 
  | 'investor-pitch-coach';

interface ToolMeta {
  id: ToolId;
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
  description: string;
  badge: string;
}

const TOOLS: ToolMeta[] = [
  {
    id: 'idea-validator',
    title: 'Idea Validator',
    category: 'Validation',
    icon: Lightbulb,
    color: 'text-amber-400',
    description: 'Score problem severity, beachhead persona, fatal risk modes & 14-day MVP roadmap.',
    badge: 'YC Partner Grade'
  },
  {
    id: 'startup-name-generator',
    title: 'Startup Name Generator',
    category: 'Branding',
    icon: Wand2,
    color: 'text-cyan-400',
    description: 'Generate 6 memorable, venture-scale brand names with domain suggestions & taglines.',
    badge: 'Brand Strategy'
  },
  {
    id: 'business-model-generator',
    title: 'Lean Model Generator',
    category: 'Strategy',
    icon: FileSpreadsheet,
    color: 'text-emerald-400',
    description: 'Architect a 1-page Lean Canvas with pricing tiers, cost structures, and unfair moats.',
    badge: 'Lean Canvas'
  },
  {
    id: 'pitch-deck-assistant',
    title: 'Pitch Deck Assistant',
    category: 'Fundraising',
    icon: Presentation,
    color: 'text-indigo-400',
    description: 'Craft a 10-slide high-converting investor pitch deck blueprint with slide punchlines.',
    badge: 'Investor Deck'
  },
  {
    id: 'swot-generator',
    title: 'SWOT Matrix Generator',
    category: 'Strategy',
    icon: ShieldAlert,
    color: 'text-violet-400',
    description: 'Construct a defensive Strengths, Weaknesses, Opportunities & Threats matrix.',
    badge: 'Strategic Matrix'
  },
  {
    id: 'market-research-assistant',
    title: 'Market Research & TAM',
    category: 'Research',
    icon: TrendingUp,
    color: 'text-pink-400',
    description: 'Calculate realistic TAM/SAM/SOM market sizes, CAGR growth drivers and tailwinds.',
    badge: 'Equity Research'
  },
  {
    id: 'investor-pitch-coach',
    title: 'Investor Q&A Teardown',
    category: 'Coaching',
    icon: Mic,
    color: 'text-rose-400',
    description: 'Simulate ruthless Angel/VC partner questions and get battle-tested counter answers.',
    badge: 'Live Teardown'
  }
];

export const AIStartupTools: React.FC = () => {
  const { showToast } = useEcell();
  const { addXP } = useAuth();

  const [activeToolId, setActiveToolId] = useState<ToolId>('idea-validator');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Form states per tool
  const [formData, setFormData] = useState({
    title: 'Smart EV Battery Swap & Telematics',
    description: 'A modular IoT diagnostic device plugged into commercial 2-wheeler EV fleets that predicts battery degradation and routes drivers to nearby swap pods before cell failure.',
    audience: 'Gig delivery drivers & 2-wheeler fleet logistics managers in Tier-1 cities',
    industry: 'CleanTech & Urban Mobility',
    concept: 'Autonomous IoT fleet battery diagnostics',
    tone: 'Futuristic, High-Tech, Robust',
    details: 'AI predictive maintenance for electric fleet batteries with 10x faster diagnostic cycles.',
    goal: '₹25L Angel Seed Grant & 5 Commercial Fleet Pilots',
    sector: 'Electric Vehicle Telematics & Energy Storage',
    geography: 'India & Southeast Asia',
    valueProp: 'Eliminate unexpected on-route breakdowns and extend battery pack lifespan by 30%',
    traction: '120 active pilot telemetry nodes logging 50,000 km/week across 2 fleet operators',
    pitch: 'We turn unpredictable commercial EV battery failures into scheduled 2-minute swaps using edge IoT intelligence.'
  });

  const handleInputChange = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleRunTool = async () => {
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('/api/ai/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolType: activeToolId,
          inputData: formData
        })
      });

      const data = await res.json();
      if (data.result) {
        setOutput(data.result);
        addXP(25, `Generated startup strategy using AI ${TOOLS.find(t => t.id === activeToolId)?.title}`);
        showToast('AI Generation Complete! ⚡', '+25 XP Earned', 'success');
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      }
    } catch (e) {
      showToast('Error generating response', 'Using cached strategic model', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast('Copied to Clipboard!', undefined, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTool = TOOLS.find(t => t.id === activeToolId)!;

  return (
    <div className="w-full space-y-6">
      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = tool.id === activeToolId;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveToolId(tool.id);
                setOutput('');
              }}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-indigo-950/70 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isActive ? tool.color : 'text-slate-400 group-hover:text-white'}`} />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  {tool.category}
                </span>
              </div>
              <h4 className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {tool.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Tool Workspace (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0e1322] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              {React.createElement(activeTool.icon, { className: `w-5 h-5 ${activeTool.color}` })}
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">{activeTool.title}</h3>
                <span className="text-[10px] text-indigo-400 font-semibold">{activeTool.badge}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {activeTool.description}
          </p>

          {/* Dynamic Inputs based on active tool */}
          {activeToolId === 'idea-validator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Startup Idea / Domain Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Problem & Solution Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Target Customer Segment
                </label>
                <input
                  type="text"
                  value={formData.audience}
                  onChange={(e) => handleInputChange('audience', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {activeToolId === 'startup-name-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Industry / Tech Domain
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Core Concept & Value
                </label>
                <textarea
                  rows={3}
                  value={formData.concept}
                  onChange={(e) => handleInputChange('concept', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Brand Persona Tone
                </label>
                <input
                  type="text"
                  value={formData.tone}
                  onChange={(e) => handleInputChange('tone', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {activeToolId === 'business-model-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Industry Sector
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Concept & Value Proposition
                </label>
                <textarea
                  rows={4}
                  value={formData.concept}
                  onChange={(e) => handleInputChange('concept', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeToolId === 'pitch-deck-assistant' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Startup Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Problem & Solution Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Target Round / Ask
                </label>
                <input
                  type="text"
                  value={formData.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeToolId === 'swot-generator' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Startup Venture Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Tech & Solution Details
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeToolId === 'market-research-assistant' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Sector / Industry
                </label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Geographic Scope
                </label>
                <input
                  type="text"
                  value={formData.geography}
                  onChange={(e) => handleInputChange('geography', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Value Proposition
                </label>
                <textarea
                  rows={2}
                  value={formData.valueProp}
                  onChange={(e) => handleInputChange('valueProp', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeToolId === 'investor-pitch-coach' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Venture Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Current Traction / Stage
                </label>
                <input
                  type="text"
                  value={formData.traction}
                  onChange={(e) => handleInputChange('traction', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Your 60-Second Elevator Pitch
                </label>
                <textarea
                  rows={3}
                  value={formData.pitch}
                  onChange={(e) => handleInputChange('pitch', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleRunTool}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-90 text-xs font-bold text-white shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Analyzing with E-CELL AI...' : `Execute ${activeTool.title}`}</span>
          </button>
        </div>

        {/* Right Column: AI Output Canvas */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0b0e1a] border border-white/10 flex flex-col justify-between min-h-[450px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Venture Intelligence Blueprint
                </span>
              </div>

              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Output'}</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-white">Synthesizing Venture Strategy...</p>
                <p className="text-[11px] text-slate-400">Evaluating unit economics, market signals & competitive moats</p>
              </div>
            ) : output ? (
              <div className="text-xs text-slate-200 leading-relaxed space-y-3 whitespace-pre-wrap font-sans max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {output}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
                <p className="text-xs font-medium text-slate-300">Ready to synthesize your venture model</p>
                <p className="text-[11px] max-w-sm mx-auto">
                  Fill in your startup variables on the left and click execute to receive founder-grade analysis.
                </p>
              </div>
            )}
          </div>

          {output && (
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Powered by Gemini 3.7 Flash Model</span>
              <span className="text-indigo-400 font-semibold">E-CELL Venture Intelligence</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
