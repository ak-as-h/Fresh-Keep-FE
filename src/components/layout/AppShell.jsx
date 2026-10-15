import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import BackgroundDecor from '../decorative/BackgroundDecor';

export default function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-bg min-h-screen relative">
      {/* Ambient decorative background — fixed so it stays behind everything */}
      <BackgroundDecor />

      {/* Desktop sidebar — fixed, full height */}
      <Sidebar />

      {/* Main content area — offset by sidebar width on desktop */}
      <main className="relative z-10 md:ml-64 min-h-screen">
        {/*
          pb-20 on mobile: clears the fixed bottom nav (height ~64px) + breathing room
          pt-5 on mobile, pt-8 on desktop: compact, consistent top gap
        */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20 md:pt-8 md:pb-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav — fixed at bottom */}
      <MobileNav isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
    </div>
  );
}
