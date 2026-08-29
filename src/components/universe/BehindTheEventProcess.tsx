import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  ClipboardList, 
  Palette, 
  Megaphone, 
  UserCheck, 
  Flame, 
  Heart, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const BehindTheEventProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'idea',
      stepNum: '01',
      title: 'IDEA GENERATION',
      subtitle: 'Problem Finding & Theme Framing',
      icon: Lightbulb,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
      desc: 'Identifying campus innovation gaps, emerging tech domains, and industry requirements to frame high-impact tracks and hackathon problem statements.',
      details: [
        'Curating industry-aligned challenge statements with faculty mentors.',
        'Analyzing student feedback from preceding editions.',
        'Defining target audience skill levels and prerequisites.'
      ]
    },
    {
      id: 'planning',
      stepNum: '02',
      title: 'STRATEGIC PLANNING',
      subtitle: 'Budgets, Timelines & Logistics',
      icon: ClipboardList,
      color: 'text-sky-400',
      borderColor: 'border-sky-500/40',
      bgGradient: 'from-sky-500/10 to-blue-500/5',
      desc: 'Formulating end-to-end operational roadmaps, laboratory allocations, keynote invitations, and prize-pool sponsorship acquisition.',
      details: [
        'Venue coordination across auditorium and prototyping labs.',
        'Sponsorship decks drafted and presented to institutional partners.',
        'Hour-by-hour contingency schedule mapped out.'
      ]
    },
    {
      id: 'design',
      stepNum: '03',
      title: 'CREATIVE DESIGN',
      subtitle: 'Brand Identity & Visual Assets',
      icon: Palette,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgGradient: 'from-purple-500/10 to-pink-500/5',
      desc: 'Crafting the visual identity, motion teasers, event banners, custom certificates, ID badges, and interactive web portals.',
      details: [
        'Original graphic design language tailored for each event theme.',
        'Motion teasers and countdown reels for digital engagement.',
        'Design of verifiable smart credential certificates.'
      ]
    },
    {
      id: 'promotion',
      stepNum: '04',
      title: 'PROMOTION & OUTREACH',
      subtitle: 'Classroom Roadshows & Social Buzz',
      icon: Megaphone,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgGradient: 'from-rose-500/10 to-red-500/5',
      desc: 'Executing classroom announcements across all engineering branches, alumni network outreach, and social media campaigns.',
      details: [
        'Branch-to-branch interactive orientation sessions.',
        'Instagram stories, LinkedIn announcements, and WhatsApp hubs.',
        'Direct invitations to neighboring engineering colleges.'
      ]
    },
    {
      id: 'registration',
      stepNum: '05',
      title: 'REGISTRATION & PORTAL',
      subtitle: 'Team Formations & Ticket Issuance',
      icon: UserCheck,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      bgGradient: 'from-indigo-500/10 to-purple-500/5',
      desc: 'Managing team registrations, screening abstracts, allocating mentor cohorts, and generating real-time participant badges.',
      details: [
        'Seamless single-click digital portal registration.',
        'Cross-disciplinary team pairing assistance.',
        'Automated confirmation notifications and Discord/WhatsApp community access.'
      ]
    },
    {
      id: 'eventday',
      stepNum: '06',
      title: 'EVENT DAY EXECUTION',
      subtitle: 'On-Ground Orchestration & Judging',
      icon: Flame,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgGradient: 'from-emerald-500/10 to-teal-500/5',
      desc: 'High-energy live coordination, stage management, jury evaluations, prototype testing, and live leaderboard updates.',
      details: [
        'Dedicated student volunteer squads for tech support and guest hospitality.',
        'Jury panel scoring and founder pitch sessions.',
        'Award ceremony and cash prize distributions.'
      ]
    },
    {
      id: 'memory',
      stepNum: '07',
      title: 'MEMORY & RECAP',
      subtitle: 'Work Reports & Lifelong Impact',
      icon: Heart,
      color: 'text-pink-400',
      borderColor: 'border-pink-500/40',
      bgGradient: 'from-pink-500/10 to-rose-500/5',
      desc: 'Publishing post-event recap stories, issuing digital certificates, archiving event photos, and gathering participant feedback.',
      details: [
        'Archiving high-resolution photographs in the official gallery.',
        'Distributing verifiable certificates directly to student credentials and digital registry.',
        'Internal committee post-mortem meeting to elevate next year.'
      ]
    }
  ];

  const current = steps[activeStep];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>COMMITTEE WORKFLOW</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          BEHIND THE EVENT
        </h2>
        <p className="text-sm text-slate-300">
          How Team Navonmesh conceptualizes, executes, and archives every flagship experience.
        </p>
      </div>

      {/* 7-Step Interactive Workflow Pipeline */}
      <div className="rounded-3xl bg-[#080d1e]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Horizontal Step Indicator Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-2xl text-left transition-all relative border ${
                  isSelected
                    ? `${step.borderColor} bg-white/[0.06] shadow-lg`
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-black ${isSelected ? step.color : 'text-slate-500'}`}>
                    {step.stepNum}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? step.color : 'text-slate-500'}`} />
                </div>
                <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-white font-black' : 'text-slate-300'}`}>
                  {step.title.split(' ')[0]}
                </h4>
                {isSelected && (
                  <motion.div
                    layoutId="activeBehindStepBar"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Step Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${current.bgGradient} border ${current.borderColor} space-y-6`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  {React.createElement(current.icon, { className: `w-7 h-7 ${current.color}` })}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    STEP {current.stepNum} OF 07
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {current.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {current.subtitle}
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/5 border border-white/10 ${current.color} self-start sm:self-auto`}>
                Official Protocol
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed max-w-3xl">
              {current.desc}
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Execution Deliverables:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {current.details.map((point, i) => (
                  <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${current.color} mt-0.5 shrink-0`} />
                    <span className="text-xs text-slate-300 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
