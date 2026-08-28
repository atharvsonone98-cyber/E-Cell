import React from 'react';
import { Rocket, ShieldCheck, Mail, MapPin, Globe, Linkedin, Twitter, Instagram, Github, Heart } from 'lucide-react';
import { EcellLogo } from './EcellLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 text-gray-400 overflow-hidden pt-16 pb-8 z-20">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <EcellLogo
                size={44}
                variant="glow"
                animated={true}
                interactive={true}
                showText={false}
              />
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                E-Cell SSGMCE
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Shri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon. Empowering student innovators through technology incubation, angel networks, and venture scaling.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:text-white cursor-pointer transition-colors">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:text-white cursor-pointer transition-colors">
                X
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:text-white cursor-pointer transition-colors">
                LN
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:text-white cursor-pointer transition-colors">
                GH
              </a>
            </div>

            <div className="pt-2 text-xs text-gray-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DPIIT & MSME Recognized University Incubation Hub</span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('/startups')} className="hover:text-white transition-colors">
                  Startup Showcase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pitch-arena')} className="hover:text-white transition-colors">
                  Startup Pitch Arena
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/mentors')} className="hover:text-white transition-colors">
                  Mentor Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/co-founders')} className="hover:text-white transition-colors">
                  Co-Founder Matching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/committee')} className="hover:text-white transition-colors text-indigo-400 font-semibold">
                  Committee & Domain Wings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/events')} className="hover:text-white transition-colors">
                  Workshops, Bootcamps & Summits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/leaderboard')} className="hover:text-white transition-colors">
                  XP Leaderboard & Levels
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & AI */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Knowledge & Tools</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button onClick={() => onNavigate('/ai-assistant')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>E-CELL AI Copilot</span>
                  <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.2 rounded font-bold border border-indigo-500/20">PRO</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resources')} className="hover:text-white transition-colors">
                  Startup Pitch Deck Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resources')} className="hover:text-white transition-colors">
                  Cap Table & Legal Models
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/community')} className="hover:text-white transition-colors">
                  Community Discussion Forum
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/verify-certificate')} className="hover:text-white transition-colors">
                  Certificate Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  Constitution & Framework
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Location & Contacts */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Incubation Hub</h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>SSGMCE Innovation & Incubation Complex, Khamgaon Road, Shegaon, Maharashtra 444203</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>ecell@ssgmce.ac.in • atharvsonone98@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>SSGMCE Campus • Shegaon, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching design theme */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex gap-6 items-center uppercase font-bold tracking-widest text-[11px]">
            <span className="text-indigo-400">#EcellSSGMCE</span>
            <span>Shri Sant Gajanan Maharaj College of Engineering</span>
            <span>Lead: Atharv Sonone</span>
          </div>
          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} E-Cell SSGMCE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
