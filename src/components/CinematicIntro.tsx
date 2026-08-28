import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Sparkles, Rocket, ArrowDown, ChevronRight } from 'lucide-react';
import { EcellLogo } from './EcellLogo';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // Stage 0: Dark Screen -> "EVERY BIG IDEA STARTS WITH A FIRST STEP."
  // Stage 1: Glowing point expands into "IDEA"
  // Stage 2: Progression: IDEA -> INNOVATION -> ENTREPRENEURSHIP -> ACTION -> IMPACT
  // Stage 3: E-CELL SSGMCE + "BUILD. LAUNCH. LEAD."
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 1400); // 1.4s -> Glowing Point / IDEA
    const t2 = setTimeout(() => setStage(2), 2600); // 2.6s -> Progression cascade
    const t3 = setTimeout(() => setStage(3), 4200); // 4.2s -> E-CELL SSGMCE & BUILD. LAUNCH. LEAD.
    const t4 = setTimeout(() => onComplete(), 5800); // 5.8s -> Transition into homepage

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const progressionSteps = [
    { label: 'IDEA', color: 'from-amber-400 to-amber-200', text: 'text-amber-300' },
    { label: 'INNOVATION', color: 'from-cyan-400 to-blue-300', text: 'text-cyan-300' },
    { label: 'ENTREPRENEURSHIP', color: 'from-indigo-400 to-violet-300', text: 'text-indigo-300' },
    { label: 'ACTION', color: 'from-rose-400 to-pink-300', text: 'text-rose-300' },
    { label: 'IMPACT', color: 'from-emerald-400 to-teal-300', text: 'text-emerald-300' },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center overflow-hidden select-none font-sans"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12)_0%,rgba(3,7,18,0.95)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(147,51,234,0.08)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Tech grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>SSGMCE SHEGAON • ENTREPRENEURSHIP CELL</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={onComplete}
          className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono tracking-widest text-slate-300 hover:text-white transition-all backdrop-blur-md"
        >
          [ SKIP INTRO ]
        </motion.button>
      </div>

      {/* Stage Flow */}
      <AnimatePresence mode="wait">
        {/* STAGE 0: Initial Thought */}
        {stage === 0 && (
          <motion.div
            key="stage-0"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.3 } }}
            className="text-center px-6 max-w-xl z-10 space-y-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400"
            >
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </motion.div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              EVERY BIG IDEA<br />
              <span className="text-blue-400 font-light">STARTS WITH A FIRST STEP.</span>
            </h2>
          </motion.div>
        )}

        {/* STAGE 1: Glowing Point -> Expanding IDEA */}
        {stage === 1 && (
          <motion.div
            key="stage-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="text-center flex flex-col items-center justify-center z-10"
          >
            <motion.div
              initial={{ scale: 0, boxShadow: '0 0 0 rgba(251,191,36,0)' }}
              animate={{ 
                scale: [0, 1.2, 1],
                boxShadow: ['0 0 0 rgba(251,191,36,0)', '0 0 80px rgba(251,191,36,0.9)', '0 0 40px rgba(251,191,36,0.5)']
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 mb-6 shadow-2xl"
            >
              <Lightbulb className="w-10 h-10 stroke-[2.5]" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-6xl font-black text-white tracking-[0.25em]"
            >
              IDEA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-mono text-amber-300/80 tracking-widest mt-2 uppercase"
            >
              The Spark of Creation
            </motion.p>
          </motion.div>
        )}

        {/* STAGE 2: Journey Ladder: IDEA -> INNOVATION -> ENTREPRENEURSHIP -> ACTION -> IMPACT */}
        {stage === 2 && (
          <motion.div
            key="stage-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            className="flex flex-col items-center justify-center z-10 w-full max-w-md px-4"
          >
            <div className="w-full space-y-2">
              {progressionSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.18, duration: 0.4 }}
                  className="flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">0{index + 1}</span>
                    <span className={`text-sm sm:text-base font-bold tracking-wider ${step.text}`}>
                      {step.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 3: Final Reveal: E-CELL SSGMCE & BUILD. LAUNCH. LEAD. */}
        {stage === 3 && (
          <motion.div
            key="stage-3"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
            className="text-center flex flex-col items-center justify-center z-10 px-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="mb-4"
            >
              <EcellLogo size="xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl font-black text-white tracking-wider"
            >
              E-CELL <span className="text-blue-400">SSGMCE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-xs sm:text-sm font-mono text-slate-400 tracking-widest mt-1 uppercase"
            >
              Shri Sant Gajanan Maharaj College of Engineering, Shegaon
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 font-extrabold text-sm sm:text-base tracking-[0.25em]"
            >
              <span>BUILD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>LAUNCH</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>LEAD</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle bottom progress meter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5.6, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
        />
      </div>
    </motion.div>
  );
};
