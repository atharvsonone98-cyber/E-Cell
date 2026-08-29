import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { EcellProvider } from './context/EcellContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { PremiumBackgroundSystem } from './components/background/PremiumBackgroundSystem';

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
import { CoFoundersPage } from './pages/CoFoundersPage';
import { GalleryPage } from './pages/GalleryPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { InitiativesPage } from './pages/InitiativesPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ContactPage } from './pages/ContactPage';

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
      case '/pitch':
      case '/pitches':
        return <PitchArenaPage />;
      case '/community':
        return <CommunityPage />;
      case '/leaderboard':
        return <LeaderboardPage />;
      case '/certificates':
      case '/verify':
      case '/verify-certificate':
        return <CertificatesPage />;
      case '/co-founders':
      case '/cofounders':
      case '/cofounder-match':
        return <CoFoundersPage />;
      case '/resources':
        return <ResourcesPage />;
      case '/ai-assistant':
      case '/assistant':
        return <AIAssistantPage />;
      case '/dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case '/admin':
        return <AdminPage onNavigate={handleNavigate} />;
      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;
      case '/committee':
      case '/team':
      case '/join':
      case '/apply':
      case '/join-us':
        return <CommitteePage onNavigate={handleNavigate} />;
      case '/gallery':
      case '/memories':
      case '/moments':
        return <GalleryPage />;
      case '/achievements':
      case '/awards':
      case '/podiums':
        return <AchievementsPage />;
      case '/initiatives':
      case '/programs':
      case '/sandbox':
        return <InitiativesPage onNavigate={handleNavigate} />;
      case '/announcements':
      case '/notices':
      case '/news':
      case '/newsroom':
        return <AnnouncementsPage onNavigate={handleNavigate} />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onOpenAuth={openAuth} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      {/* Living Multi-Layer Premium Background Engine */}
      <PremiumBackgroundSystem currentPath={currentPath} />

      {/* Subtle Global Atmospheric Gradient Overlay: Enhances text readability and section transitions while keeping background animations vivid */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] select-none"
        style={{
          background: 'radial-gradient(ellipse 100% 60% at 50% -10%, rgba(56, 189, 248, 0.06) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 90% 50%, rgba(129, 140, 248, 0.04) 0%, transparent 70%), linear-gradient(180deg, rgba(3, 7, 18, 0.35) 0%, rgba(3, 7, 18, 0.12) 15%, rgba(3, 7, 18, 0.2) 50%, rgba(3, 7, 18, 0.38) 85%, rgba(3, 7, 18, 0.78) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Global Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenAuth={openAuth}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full pt-20 relative z-10">
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
