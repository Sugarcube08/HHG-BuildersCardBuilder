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
    <div className="flex flex-col gap-12 items-center text-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-5 max-w-3xl">
        <Badge variant="pink" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Hacker House Goa 2026 Official Identity Tool
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.1]">
          Claim Your <span className="text-[#0B3B2B] relative inline-block">HH Goa 2026</span> <br />
          <span className="text-[#FF2E93] underline decoration-[#FFB800] decoration-wavy underline-offset-8">
            Digital Builder Identity
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
          Generate an official, shareable builder card in seconds. Preserves your photo at 100% original aspect ratio with zero auto-cropping.
        </p>

        <div className="pt-3 flex flex-wrap justify-center gap-4">
          <Button
            variant="accent"
            size="lg"
            onClick={() => setStep('UPLOAD')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="text-base sm:text-lg px-8 py-4 shadow-lg hover:scale-102 transition-all"
          >
            Create Your Builder Card
          </Button>
        </div>
      </div>

      {/* Hero Visual Card Showcase with Event Artwork */}
      <Card variant="emerald" shadow="yellow" className="w-full max-w-4xl overflow-hidden relative p-8 sm:p-10">
        {/* Background Sunrise Illustration Overlay */}
        <div className="absolute -right-12 -bottom-12 opacity-25 pointer-events-none w-80 h-80">
          <img src="/backgrounds/Sun rise.png" alt="Goa Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 text-left">
          <div className="flex flex-col gap-5">
            <Badge variant="yellow" className="w-fit">
              #FrameInGoa
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Designed for Hackers. <br />
              Built for Goa.
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Showcase your role, motto, and tech stack framed naturally inside official Hacker House Goa 2026 illustrations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img src="/decorations/goa_hindi.svg" alt="Goa Hindi Graphic" className="h-7 w-auto" />
              <span className="text-xs font-mono font-bold text-emerald-300">March 2026 • Goa, India</span>
            </div>
          </div>

          {/* Interactive Card Mockup Frame */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border-3 border-[#0F172A] hh-shadow-pink max-w-xs transform group-hover:-rotate-1 transition-all duration-300">
                <div className="relative rounded-xl overflow-hidden border-2 border-[#0F172A]">
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
                  <span className="text-base font-black text-[#0B3B2B] tracking-tight">
                    HARSH RAIKWAR
                  </span>
                  <span className="text-xs font-bold text-[#FF2E93] uppercase tracking-wider">
                    Full Stack Developer
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono italic">
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
        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-6 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 border-2.5 border-[#0F172A] flex items-center justify-center text-[#0B3B2B] mb-4 hh-shadow-sm">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base text-[#0F172A] mb-1.5">Zero Auto-Crop</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
            Portrait, landscape, or square — your photo is always preserved at original aspect ratio.
          </p>
        </Card>

        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-6 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-pink-100 border-2.5 border-[#0F172A] flex items-center justify-center text-[#FF2E93] mb-4 hh-shadow-sm">
            <QrCode className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base text-[#0F172A] mb-1.5">Digital Builder ID</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
            Every card generates a deterministic Builder ID and scannable verification payload.
          </p>
        </Card>

        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-6 hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2.5 border-[#0F172A] flex items-center justify-center text-[#FFB800] mb-4 hh-shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base text-[#0F172A] mb-1.5">100% Client-Side</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
            No backend or image uploads to external servers. Your photo stays strictly in your browser.
          </p>
        </Card>
      </div>
    </div>
  );
};
