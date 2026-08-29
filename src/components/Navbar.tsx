import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEcell } from '../context/EcellContext';
import { 
  Sparkles, 
  Search, 
  Bell, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ShieldCheck, 
  Award, 
  Rocket, 
  Calendar, 
  Compass, 
  Users, 
  BookOpen, 
  MessageSquare, 
  LayoutDashboard,
  CheckCircle2,
  ChevronDown,
  Trophy,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { EcellLogo } from './EcellLogo';
import { EcellBrandLogo } from './EcellBrandLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

interface NavLinkItem {
  label: string;
  path: string;
  icon?: React.ElementType;
  highlight?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenAuth }) => {
  const { user, logout, switchUserRole, isAdmin } = useAuth();
  const { notifications, markNotificationRead, setCommandPaletteOpen } = useEcell();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read);

  const publicNavLinks: NavLinkItem[] = [
    { label: 'HOME', path: '/', icon: Rocket },
    { label: 'ABOUT', path: '/about', icon: ShieldCheck },
    { label: 'TEAM', path: '/committee', icon: Users },
    { label: 'EVENTS', path: '/events', icon: Calendar },
    { label: 'INITIATIVES', path: '/initiatives', icon: Sparkles },
    { label: 'ACHIEVEMENTS', path: '/achievements', icon: Trophy },
    { label: 'GALLERY', path: '/gallery', icon: Award },
    { label: 'CONTACT', path: '/contact', icon: Mail }
  ];

  const authNavLinks: NavLinkItem[] = [
    { label: 'HOME', path: '/', icon: Rocket },
    { label: 'DASHBOARD', path: '/dashboard', icon: LayoutDashboard },
    { label: 'EVENTS', path: '/events', icon: Calendar },
    { label: 'TEAM', path: '/committee', icon: Users },
    { label: 'INITIATIVES', path: '/initiatives', icon: Sparkles },
    { label: 'ACHIEVEMENTS', path: '/achievements', icon: Trophy },
    { label: 'STARTUPS', path: '/startups', icon: Rocket },
    ...(isAdmin ? [{ label: 'ADMIN HUB', path: '/admin', icon: ShieldCheck }] : []),
    { label: 'GALLERY', path: '/gallery', icon: Award }
  ];

  const navLinks = user ? authNavLinks : publicNavLinks;

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsNotificationsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Official Ecell Brand Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center group text-left focus:outline-none shrink-0"
          >
            <EcellBrandLogo />
          </button>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wider text-gray-300">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative py-1 transition-all duration-200 uppercase ${
                    isActive
                      ? 'text-white font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_8px_#818cf8]" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white text-xs transition-all"
              title="Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden xl:inline text-[11px] text-gray-400">Search</span>
              <kbd className="hidden sm:inline-block text-[9px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(prev => !prev)}
                  className="relative p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white transition-all"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-indigo-500 text-[8px] font-bold text-white flex items-center justify-center shadow-lg">
                      {unreadNotifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl"
                    >
                      <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-white/[0.02]">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-indigo-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                        </div>
                        {unreadNotifications.length > 0 && (
                          <button
                            onClick={() => markNotificationRead()}
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-white/5 scrollbar-thin">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-gray-400">No notifications yet</div>
                        ) : (
                          notifications.map(n => (
                            <div
                              key={n.id}
                              onClick={() => {
                                markNotificationRead(n.id);
                                if (n.link) handleNavClick(n.link);
                              }}
                              className={`p-3.5 text-left transition-colors cursor-pointer hover:bg-white/[0.04] flex items-start gap-3 ${
                                !n.read ? 'bg-indigo-500/10' : ''
                              }`}
                            >
                              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-indigo-400" />
                              <div className="flex-1">
                                <h5 className="text-xs font-semibold text-white">{n.title}</h5>
                                <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed">{n.message}</p>
                                <span className="text-[9px] text-gray-500 mt-1 block">{n.createdAt}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Quick Role Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsRoleSwitcherOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-all"
                title="Switch Demo Role"
              >
                <span className="capitalize">{user?.role || 'Guest'}</span>
                <ChevronDown className="w-3 h-3 text-indigo-400" />
              </button>

              <AnimatePresence>
                {isRoleSwitcherOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-44 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
                  >
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2.5 py-1">
                      Demo Role Switch
                    </div>
                    {(['student', 'mentor', 'founder', 'admin'] as const).map(role => (
                      <button
                        key={role}
                        onClick={() => {
                          switchUserRole(role);
                          setIsRoleSwitcherOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs capitalize flex items-center justify-between transition-colors ${
                          user?.role === role ? 'bg-indigo-600 text-white font-semibold' : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{role}</span>
                        {user?.role === role && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-semibold text-white group-hover:text-indigo-300 leading-tight">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-indigo-400 font-medium leading-none mt-0.5">
                      Lvl {user.level} • {user.xp} XP
                    </p>
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-white/20 bg-indigo-950"
                  />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl p-1.5"
                    >
                      <div className="p-3 border-b border-white/10 bg-white/[0.02] rounded-xl mb-1">
                        <p className="text-xs font-bold text-white">{user.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                            {user.levelTitle} (Lvl {user.level})
                          </span>
                          <span className="text-[11px] font-semibold text-indigo-300">{user.xp} XP</span>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <button
                          onClick={() => handleNavClick('/dashboard')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-200 hover:text-white hover:bg-white/10 transition-colors text-left"
                        >
                          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                          Founder Dashboard
                        </button>
                        <button
                          onClick={() => handleNavClick('/certificates')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-200 hover:text-white hover:bg-white/10 transition-colors text-left"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Certificates & Wallet
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleNavClick('/admin')}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-300 hover:text-white hover:bg-red-950/40 transition-colors text-left font-semibold"
                          >
                            <ShieldCheck className="w-4 h-4 text-red-400" />
                            Admin Console
                          </button>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-rose-400" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-5 py-2 text-xs font-bold tracking-wider uppercase border border-white/20 rounded-xl hover:bg-white/10 text-white transition-all bg-black/40"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-5 py-2 text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-lg shadow-purple-900/30 hover:scale-[1.02]"
                >
                  JOIN E-CELL
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-[#0a0d16]/98 border-l border-white/15 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <span className="font-extrabold text-white text-base">E-CELL ECOSYSTEM</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPath === link.path;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600/30 text-white font-semibold border border-indigo-500/40'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon && <link.icon className="w-4 h-4 text-indigo-400" />}
                        <span>{link.label}</span>
                      </div>
                      {link.highlight && (
                        <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                          AI Tool
                        </span>
                      )}
                    </button>
                  );
                })}

                {isAdmin && (
                  <button
                    onClick={() => handleNavClick('/admin')}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-red-400 bg-red-950/30 border border-red-500/30 hover:bg-red-950/50"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Admin Dashboard
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Footer / Auth */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              {user ? (
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-indigo-400">Level {user.level} • {user.xp} XP</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full mt-3 py-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-900/50 transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-lg"
                  >
                    Join E-Cell
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
