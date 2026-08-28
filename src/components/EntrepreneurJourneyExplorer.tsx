import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Code, 
  Mic2, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Compass, 
  Trophy, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface JourneyStage {
  id: 'idea' | 'building' | 'pitch' | 'launch';
  title: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgGlow: string;
  tagline: string;
  steps: {
    number: string;
    title: string;
    desc: string;
    xp: string;
  }[];
  primaryAction: {
    label: string;
    path: string;
    icon: React.ElementType;
  };
  secondaryAction: {
    label: string;
    path: string;
    icon: React.ElementType;
  };
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'idea',
    title: 'I HAVE AN IDEA',
    badge: 'STAGE 1 • DISCOVERY',
    icon: Lightbulb,
    color: 'text-amber-400',
    borderColor: 'border-amber-400/40',
    bgGlow: 'from-amber-500/20 via-amber-500/5 to-transparent',
    tagline: 'You have spotted an unsolved friction or engineering bottleneck and want to know if it is a real business.',
    steps: [
      {
        number: '01',
        title: 'Validate Problem & TAM with E-CELL AI',
        desc: 'Run customer discovery prompts, calculate addressable market size, and generate a 1-page Lean Canvas.',
        xp: '+25 XP'
      },
      {
        number: '02',
        title: 'Explore Ideathon Tracks & Problem Statements',
        desc: 'Compare your hypothesis with industry challenges from Team Navonmesh 2026-27 and agricultural/engineering briefs.',
        xp: '+50 XP'
      },
      {
        number: '03',
        title: 'Find Your Complementary Co-Founder',
        desc: 'Match with CS, ENTC, and Mechanical builders to form a balanced founding team of hackers and hustlers.',
        xp: '+75 XP'
      }
    ],
    primaryAction: {
      label: 'Launch AI Idea Validator',
      path: '/ai-assistant',
      icon: Sparkles
    },
    secondaryAction: {
      label: 'Find Co-Founders',
      path: '/co-founders',
      icon: Users
    }
  },
  {
    id: 'building',
    title: "I'M BUILDING",
    badge: 'STAGE 2 • PROTOTYPE',
    icon: Code,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-400/40',
    bgGlow: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    tagline: 'You are writing code, wiring breadboards, or designing 3D CAD models and need technical review & labs.',
    steps: [
      {
        number: '01',
        title: 'Book 1-on-1 Mentor Clinic',
        desc: 'Schedule weekly office hours with YC alumni and tech directors to unblock architecture and pricing.',
        xp: '+40 XP'
      },
      {
        number: '02',
        title: 'Campus Incubation Hardware & Cloud Access',
        desc: 'Leverage SSGMCE innovation labs, test rigs, and cloud server credits for rapid sprint deployment.',
        xp: '+100 XP'
      },
      {
        number: '03',
        title: 'Register MVP in E-Cell Startup Showcase',
        desc: 'Get your venture listed publicly, start collecting student upvotes, and build social proof on campus.',
        xp: '+200 XP'
      }
    ],
    primaryAction: {
      label: 'Register Startup in Showcase',
      path: '/startups',
      icon: Rocket
    },
    secondaryAction: {
      label: 'Book 1-on-1 Mentor Session',
      path: '/mentors',
      icon: Compass
    }
  },
  {
    id: 'pitch',
    title: "I'M READY TO PITCH",
    badge: 'STAGE 3 • COMPETITION',
    icon: Mic2,
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-400/40',
    bgGlow: 'from-fuchsia-500/20 via-fuchsia-500/5 to-transparent',
    tagline: 'Your MVP is functional, you have early pilot traction, and you need to showcase to investors and judges.',
    steps: [
      {
        number: '01',
        title: 'Generate 10-Slide Pitch Deck with AI Copilot',
        desc: 'Structure problem, solution, unit economics, and competitive moat into a clean investor-ready format.',
        xp: '+50 XP'
      },
      {
        number: '02',
        title: 'Submit Venture to Pitch Arena',
        desc: 'Upload pitch video and deck for peer community upvotes, mentor feedback, and stage rankings.',
        xp: '+150 XP'
      },
      {
        number: '03',
        title: 'Compete in Demo Day for Non-Dilutive Grants',
        desc: 'Present live before venture capitalists, angel investors, and win cash prizes from our ₹25L+ prize pool.',
        xp: '+300 XP'
      }
    ],
    primaryAction: {
      label: 'Enter Pitch Arena',
      path: '/pitch-arena',
      icon: Trophy
    },
    secondaryAction: {
      label: 'AI Investor Pitch Coach',
      path: '/ai-assistant',
      icon: Sparkles
    }
  },
  {
    id: 'launch',
    title: "I'M READY TO LAUNCH",
    badge: 'STAGE 4 • INCUBATION & SCALE',
    icon: Rocket,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-400/40',
    bgGlow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    tagline: 'You have revenue or enterprise pilot interest and want official DPIIT startup incorporation & angel rounds.',
    steps: [
      {
        number: '01',
        title: 'Apply for Seed Funding & NIDHI Grants',
        desc: 'Access DST/NIDHI Prayas schemes, university innovation grants, and syndicate angel introductions.',
        xp: '+500 XP'
      },
      {
        number: '02',
        title: 'Incubation Center Physical Office Allotment',
        desc: 'Get dedicated co-working desks, legal mentorship, intellectual property (IP/Patent) filings on campus.',
        xp: '+250 XP'
      },
      {
        number: '03',
        title: 'Earn Cryptographic Certificate of Incubation',
        desc: 'Receive tamper-proof institutional credentials verifiable by angel syndicates and recruiters worldwide.',
        xp: '+150 XP'
      }
    ],
    primaryAction: {
      label: 'Apply for Incubation & Funding',
      path: '/admin',
      icon: ShieldCheck
    },
    secondaryAction: {
      label: 'View Verified Credentials',
      path: '/certificates',
      icon: ShieldCheck
    }
  }
];

export const EntrepreneurJourneyExplorer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedStageId, setSelectedStageId] = useState<JourneyStage['id']>('idea');

  const activeStage = JOURNEY_STAGES.find(s => s.id === selectedStageId) || JOURNEY_STAGES[0];

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>PERSONALIZED FOUNDER PLAYBOOK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Where Are You In Your Entrepreneurial Journey?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Select your current stage to unlock a tailored roadmap, direct AI tools, mentors, and incubation resources.
        </p>
      </div>

      {/* 4 Stage Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {JOURNEY_STAGES.map((stage) => {
          const Icon = stage.icon;
          const isSelected = stage.id === selectedStageId;

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${
                isSelected
                  ? `bg-white/[0.06] ${stage.borderColor} shadow-2xl scale-[1.02]`
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              {/* Glow background when selected */}
              {isSelected && (
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.bgGlow} opacity-60 pointer-events-none`} />
              )}

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${stage.color}`} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/10 text-white' : 'text-slate-500 bg-white/5'
                  }`}>
                    0{JOURNEY_STAGES.findIndex(s => s.id === stage.id) + 1}
                  </span>
                </div>

                <div>
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${stage.color} block`}>
                    {stage.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-0.5 group-hover:text-indigo-300 transition-colors">
                    {stage.title}
                  </h3>
                </div>
              </div>

              <div className="relative z-10 pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {isSelected ? 'Active Selection' : 'Select Stage'}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-white' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Action Panel for Selected Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-[#0c1020] via-[#090c17] to-[#0d1222] border border-white/15 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Summary & Action Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${activeStage.color}`}>
                    {activeStage.badge}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="text-xs text-slate-400">Step-by-Step Playbook</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeStage.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeStage.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate(activeStage.primaryAction.path)}
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all group"
                >
                  <activeStage.primaryAction.icon className="w-4 h-4" />
                  <span>{activeStage.primaryAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate(activeStage.secondaryAction.path)}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <activeStage.secondaryAction.icon className="w-4 h-4 text-slate-400" />
                  <span>{activeStage.secondaryAction.label}</span>
                </button>
              </div>
            </div>

            {/* Right: Step Roadmap Cards */}
            <div className="lg:col-span-7 space-y-3">
              {activeStage.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md shrink-0">
                        {step.xp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
