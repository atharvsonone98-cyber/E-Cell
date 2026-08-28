import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { EcellProvider } from './context/EcellContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { StartupsPage } from './pages/StartupsPage';
import { EventsPage } from './pages/EventsPage';
import { MentorsPage } from './pages/MentorsPage';
import { PitchArenaPage } from './pages/PitchArenaPage';
import { CommunityPage } from './pages/CommunityPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { CommitteePage } from './pages/CommitteePage';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname === '/' ? '/' : window.location.pathname;
  });

  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login'
  });

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const closeAuth = () => {
    setAuthModalState(prev => ({ ...prev, isOpen: false }));
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return <HomePage onNavigate={handleNavigate} onOpenAuth={openAuth} />;
      case '/startups':
        return <StartupsPage />;
      case '/events':
        return <EventsPage />;
      case '/mentors':
        return <MentorsPage />;
      case '/pitch-arena':
        return <PitchArenaPage />;
      case '/community':
        return <CommunityPage />;
      case '/leaderboard':
        return <LeaderboardPage />;
      case '/certificates':
        return <CertificatesPage />;
      case '/resources':
        return <ResourcesPage />;
      case '/ai-assistant':
        return <AIAssistantPage />;
      case '/dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case '/admin':
        return <AdminPage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/committee':
      case '/team':
        return <CommitteePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onOpenAuth={openAuth} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F8FAFC] font-sans selection:bg-indigo-500 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

      {/* Global Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenAuth={openAuth}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette onNavigate={handleNavigate} />

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={closeAuth}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EcellProvider>
        <AppContent />
      </EcellProvider>
    </AuthProvider>
  );
}
