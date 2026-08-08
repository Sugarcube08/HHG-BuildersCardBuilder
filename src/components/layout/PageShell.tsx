import React, { type ReactNode } from 'react';
import { Header } from './Header';
import { StepTracker } from './StepTracker';
import { Footer } from './Footer';

export interface PageShellProps {
  children: ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#042E1F] text-[#FFF8E5] relative selection:bg-[#FF0080] selection:text-white">
      {/* Top Header Navigation */}
      <Header />

      {/* Interactive Step Progress Tracker */}
      <StepTracker />

      {/* Main Responsive Body with Decorative Background Sunrise Asset */}
      <main className="flex-1 relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6">
        {/* Ambient Background Sunrise Illustration */}
        <div className="absolute top-0 right-0 -mr-24 -mt-20 w-[480px] h-[480px] opacity-20 pointer-events-none rounded-full overflow-hidden mix-blend-screen">
          <img src="/backgrounds/Sun rise.png" alt="Sunrise Artwork" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-1/4 left-0 -ml-32 w-[380px] h-[380px] opacity-15 pointer-events-none mix-blend-screen scale-x-[-1]">
          <img src="/backgrounds/Sun rise.png" alt="Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto">{children}</div>
      </main>

      {/* Event Branded Footer */}
      <Footer />
    </div>
  );
};

