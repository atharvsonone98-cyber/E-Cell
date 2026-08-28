import React from 'react';
import { useEcell } from '../context/EcellContext';
import { 
  Rocket, 
  Target, 
  Layers, 
  ShieldCheck, 
  Users, 
  Building2, 
  Award, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  HelpCircle,
  Mail,
  Linkedin
} from 'lucide-react';
import { EcellLogo } from '../components/EcellLogo';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { committee } = useEcell();

  const leadershipPreview = committee.slice(0, 4);

  const faqs = [
    {
      q: 'Who manages and operates E-Cell SSGMCE?',
      a: 'E-Cell SSGMCE is operated by the student executive board led by Atharv Sonone along with faculty advisors at Shri Sant Gajanan Maharaj College of Engineering, Shegaon.'
    },
    {
      q: 'Can 1st year SSGMCE students apply for venture incubation?',
      a: 'Yes! E-Cell SSGMCE actively encourages first-year innovators to enter through our Problem Discovery Hackathons. We provide rapid prototyping hardware credits, mentor pairing, and lab access.'
    },
    {
      q: 'Does SSGMCE take equity in student startups?',
      a: 'Zero equity for undergraduate prototypes. Startups graduating into our DST-supported incubator receive equity-free seed grants of up to ₹10,00,000 under national NIDHI-PRAYAS & MSME schemes.'
    },
    {
      q: 'How are certificates verified by external recruiters and investors?',
      a: 'Every certificate issued has a tamper-proof cryptographic credential ID and verifiable QR code that resolves to our public verification registry.'
    },
    {
      q: 'How does the Co-Founder matching algorithm work?',
      a: 'Our matrix pairs engineering developers, hardware makers, and AI researchers with business strategists and product designers based on complementary skills and target problem spaces.'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero with Official Emblem */}
      <div className="text-center space-y-4 max-w-3xl mx-auto flex flex-col items-center">
        <EcellLogo size={110} variant="neon" animated={true} interactive={true} showText={false} />
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          Shri Sant Gajanan Maharaj College of Engineering, Shegaon
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          E-Cell SSGMCE Innovation & Venture Ecosystem
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The official Entrepreneurship Cell of SSGMCE is the premier autonomous student-driven incubator empowering engineers to translate breakthrough research into scalable, venture-backed enterprises.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-[#0e1220] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Innovation Culture</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Eliminating risk aversion by offering safe-to-fail sandbox environments, cloud compute resources, and real-world customer testbeds.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0e1220] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Institutional Support</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Direct access to campus prototyping labs, 3D printers, IoT hardware benches, legal patent attorneys, and state startup seed funds.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0e1220] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Venture Scale</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Direct pipelines to Silicon Valley and national venture funds, Y-Combinator alumni mentorship, and national collegiate demo days.
          </p>
        </div>
      </div>

      {/* Leadership Board */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Executive Council & Faculty</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              E-Cell SSGMCE Leadership
            </h2>
            <p className="text-xs text-slate-400 mt-1">Led by Atharv Sonone and guided by experienced professors and student coordinators</p>
          </div>
          <button
            onClick={() => onNavigate('/committee')}
            className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 self-start sm:self-auto transition-all shadow-md"
          >
            <span>View Full Committee & Wings ({committee.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipPreview.map((member) => (
            <div key={member.id} className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 text-center space-y-3 shadow-xl hover:border-indigo-500/30 transition-all">
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-indigo-500/40 shadow-lg" />
              <div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  member.isLead ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-400'
                }`}>
                  {member.domain}
                </span>
                <h4 className="text-base font-bold text-white mt-1">{member.name}</h4>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">{member.role}</p>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{member.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1220] border border-white/10 space-y-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about joining the E-Cell ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white">{faq.q}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
