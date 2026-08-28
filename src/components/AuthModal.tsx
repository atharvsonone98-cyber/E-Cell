import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEcell } from '../context/EcellContext';
import { Rocket, ShieldCheck, Mail, Lock, User, CheckCircle2, X, Sparkles, Building2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_USERS } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose }) => {
  const { login, register, switchUserRole } = useAuth();
  const { showToast } = useEcell();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'student' | 'mentor' | 'founder'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('3rd Year');
  const [collegeId, setCollegeId] = useState('');
  const [company, setCompany] = useState('');
  const [specialization, setSpecialization] = useState('SaaS & Product Strategy');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email || 'aarav.sharma@college.edu');
    setLoading(false);
    if (success) {
      showToast('Welcome Back!', 'Signed into E-Cell Innovation Ecosystem', 'success');
      onClose();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    const success = await register({
      name,
      email,
      role,
      branch,
      year,
      collegeId: collegeId || `2026${branch.slice(0, 2).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`,
      bio: `${role === 'mentor' ? 'Industry Advisor' : 'Student Founder & Innovator'} in campus ecosystem.`
    });
    setLoading(false);
    if (success) {
      showToast('Welcome to E-CELL!', 'Your ecosystem profile has been initialized (+100 XP)', 'success');
      onClose();
    }
  };

  const handleQuickDemo = (userProfile: any) => {
    switchUserRole(userProfile.role);
    showToast(`Switched to ${userProfile.name} (${userProfile.role.toUpperCase()})`, `Level ${userProfile.level} • ${userProfile.xp} XP`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-[#0f1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-white/10 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg mx-auto mb-3">
              <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
                <Rocket className="w-6 h-6 text-indigo-400" />
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-white tracking-tight">
              {mode === 'login' ? 'Welcome Back to E-Cell' : 'Join the Campus Venture Ecosystem'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">BUILD. LAUNCH. LEAD.</p>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/5 border border-white/10 mt-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-1.5 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-1.5 rounded-lg transition-all ${
                  mode === 'register' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                New Account
              </button>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="px-6 pt-4 pb-2 border-b border-white/5 bg-white/[0.01]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
              Quick Test Demo Profiles (1-Click)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {INITIAL_USERS.slice(0, 4).map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickDemo(u)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all group"
                >
                  <span className="text-[11px] font-bold text-white block truncate group-hover:text-indigo-300">
                    {u.name.split(' ')[0]}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-indigo-400 block -mt-0.5">
                    {u.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-thin">
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@college.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-xs font-bold text-white shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all mt-2"
                >
                  {loading ? 'Signing In...' : 'Sign In to Ecosystem'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Select Account Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['student', 'founder', 'mentor'] as const).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                          role === r ? 'bg-indigo-600 text-white border-indigo-400 shadow-md' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@college.edu"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {role === 'mentor' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Current Company / Firm *
                      </label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Google / Peak XV Partners"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Domain Specialization *
                      </label>
                      <input
                        type="text"
                        required
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="e.g. B2B SaaS, Seed Fundraising, GTM"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Academic Branch
                        </label>
                        <select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none"
                        >
                          <option value="Computer Engineering">Computer Engg</option>
                          <option value="Electronics & Comm">Electronics</option>
                          <option value="Mechanical Engg">Mechanical</option>
                          <option value="Data Science & AI">AI & Data</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                          Year
                        </label>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Alumni">Alumni</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading || !name.trim() || !email.trim()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-xs font-bold text-white shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all mt-2"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration (+100 XP)'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
