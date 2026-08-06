import React, { type ReactNode } from 'react';
import { Header } from './Header';
import { StepTracker } from './StepTracker';
import { Footer } from './Footer';
import sunriseBg from '../../assets/backgrounds/Sun rise.png';

export interface PageShellProps {
  children: ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0F172A] relative selection:bg-[#FF2E93] selection:text-white">
      {/* Top Header Navigation */}
      <Header />

      {/* Interactive Step Progress Tracker */}
      <StepTracker />

      {/* Main Responsive Body with Decorative Background Sunrise Asset */}
      <main className="flex-1 relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6">
        {/* Ambient Background Sunrise Illustration */}
        <div className="absolute top-0 right-0 -mr-24 -mt-20 w-96 h-96 opacity-10 pointer-events-none rounded-full overflow-hidden blur-sm">
          <img src={sunriseBg} alt="Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        <div className="absolute bottom-10 left-0 -ml-24 w-80 h-80 opacity-10 pointer-events-none rounded-full overflow-hidden blur-sm">
          <img src={sunriseBg} alt="Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto">{children}</div>
      </main>

      {/* Event Branded Footer */}
      <Footer />
    </div>
  );
};
