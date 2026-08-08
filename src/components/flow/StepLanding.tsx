'use client';

import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ArrowRight, Sparkles, Image as ImageIcon, ShieldCheck, QrCode } from 'lucide-react';

export const StepLanding: React.FC = () => {
  const { setStep } = useBuilder();

  return (
    <div className="flex flex-col gap-14 items-center text-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-6 max-w-4xl relative z-10">
        <Badge variant="pink" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Hacker House Goa 2026 • Official Identity Tool
        </Badge>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-editorial font-black tracking-tight text-[#FFF8E5] leading-[1.08] select-none">
          Claim Your <span className="text-[#FFD800] underline decoration-[#FF0080] decoration-wavy underline-offset-8">HH Goa 2026</span> <br />
          <span className="text-[#FF0080] font-display-hh">
            Digital Builder Identity
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#FFF8E5]/90 font-medium leading-relaxed max-w-2xl font-sans">
          Generate an official, shareable builder card in seconds. Preserves your photo at 100% original aspect ratio with zero auto-cropping.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setStep('UPLOAD')}
            rightIcon={<ArrowRight className="w-5 h-5 text-[#062319]" />}
            className="text-base sm:text-xl px-10 py-5 shadow-2xl hover:scale-103 transition-all"
          >
            Create Your Builder Card
          </Button>
        </div>
      </div>

      {/* Hero Visual Card Showcase with Event Artwork */}
      <Card variant="emerald" shadow="yellow" className="w-full max-w-4xl overflow-hidden relative p-8 sm:p-12 border-4 border-[#062319]">
        {/* Background Sunrise Illustration Overlay */}
        <div className="absolute -right-12 -bottom-12 opacity-30 pointer-events-none w-96 h-96 mix-blend-screen">
          <img src="/backgrounds/Sun rise.png" alt="Goa Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 text-left">
          <div className="flex flex-col gap-6">
            <Badge variant="yellow" className="w-fit">
              #FrameInGoa
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-black text-[#FFF8E5] leading-tight">
              Designed for Hackers. <br />
              <span className="text-[#FFD800] font-display-hh">Built for Goa.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#FFF8E5]/90 leading-relaxed font-sans">
              Showcase your role, motto, and tech stack framed naturally inside official Hacker House Goa 2026 illustrations.
            </p>

            <div className="flex items-center gap-4 pt-2 border-t border-[#FFD800]/30">
              <img src="/decorations/goa_hindi.svg" alt="Goa Hindi Graphic" className="h-8 w-auto filter drop-shadow-md" />
              <span className="text-xs font-mono-hh font-bold text-[#FFD800]">October 2026 • Goa, India</span>
            </div>
          </div>

          {/* Interactive Card Mockup Frame */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="bg-[#FFF8E5] p-5 rounded-2xl border-3 border-[#062319] hh-shadow-pink max-w-xs transform group-hover:-rotate-1 transition-all duration-300">
                <div className="relative rounded-xl overflow-hidden border-2 border-[#062319]">
                  <img
                    src="/illustrations/hackers.png"
                    alt="Hacker House Workspace Illustration"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="pink" className="text-[9px] py-0.5 px-2">
                      HH-26-8A31F4
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 text-center flex flex-col gap-1">
                  <span className="text-lg font-serif-editorial font-black text-[#006B3C] tracking-tight uppercase">
                    HARSH RAIKWAR
                  </span>
                  <span className="text-xs font-mono-hh font-bold text-[#FF0080] uppercase tracking-wider">
                    Full Stack Developer
                  </span>
                  <span className="text-[11px] text-[#062319]/70 font-serif-editorial italic">
                    "The System Architect"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-6 sm:p-8 hover:-translate-y-1 transition-transform bg-[#FFF8E5] border-3 border-[#062319]">
          <div className="w-14 h-14 rounded-2xl bg-[#FFD800] border-3 border-[#062319] flex items-center justify-center text-[#062319] mb-4 hh-shadow-sm">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="font-display-hh font-extrabold text-base text-[#062319] mb-1.5">Zero Auto-Crop</h3>
          <p className="text-xs sm:text-sm text-[#062319]/80 leading-normal font-sans">
            Portrait, landscape, or square — your photo is always preserved at original aspect ratio.
          </p>
        </Card>

        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-6 sm:p-8 hover:-translate-y-1 transition-transform bg-[#FFF8E5] border-3 border-[#062319]">
          <div className="w-14 h-14 rounded-2xl bg-[#FF0080] border-3 border-[#062319] flex items-center justify-center text-white mb-4 hh-shadow-sm">
            <QrCode className="w-7 h-7" />
          </div>
          <h3 className="font-display-hh font-extrabold text-base text-[#062319] mb-1.5">Digital Builder ID</h3>
          <p className="text-xs sm:text-sm text-[#062319]/80 leading-normal font-sans">
            Every card generates a deterministic Builder ID and scannable verification payload.
          </p>
        </Card>

        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-6 sm:p-8 hover:-translate-y-1 transition-transform bg-[#FFF8E5] border-3 border-[#062319]">
          <div className="w-14 h-14 rounded-2xl bg-[#006B3C] border-3 border-[#062319] flex items-center justify-center text-[#FFD800] mb-4 hh-shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-display-hh font-extrabold text-base text-[#062319] mb-1.5">100% Client-Side</h3>
          <p className="text-xs sm:text-sm text-[#062319]/80 leading-normal font-sans">
            No backend or image uploads to external servers. Your photo stays strictly in your browser.
          </p>
        </Card>
      </div>
    </div>
  );
};

