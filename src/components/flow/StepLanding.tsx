import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import sunriseArt from '../../assets/Sun rise.png';
import hackersArt from '../../assets/hackers.png';
import goaHindiSvg from '../../assets/goa_hindi.svg';
import { ArrowRight, Sparkles, Image as ImageIcon, ShieldCheck, Zap } from 'lucide-react';

export const StepLanding: React.FC = () => {
  const { setStep } = useBuilder();

  return (
    <div className="flex flex-col gap-10 items-center text-center">
      {/* Hero Header Badge & Title */}
      <div className="flex flex-col items-center gap-4 max-w-2xl">
        <Badge variant="pink" icon={<Sparkles className="w-3.5 h-3.5" />}>
          Hacker House Goa 2026 Official Tool
        </Badge>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
          Claim Your <span className="text-[#0B3B2B]">HH Goa 2026</span> <br />
          <span className="text-[#FF2E93] underline decoration-[#FFB800] decoration-wavy">
            Builder Identity Card
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          Generate a high-resolution, shareable builder card in seconds. No cropping, no quality loss, 100% browser local.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Button
            variant="accent"
            size="lg"
            onClick={() => setStep('UPLOAD')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Create Your Builder Card
          </Button>
        </div>
      </div>

      {/* Hero Visual Card Showcase with Event Artwork */}
      <Card variant="emerald" shadow="yellow" className="w-full max-w-3xl overflow-hidden relative p-8">
        <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none w-72 h-72">
          <img src={sunriseArt} alt="Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 text-left">
          <div className="flex flex-col gap-4">
            <Badge variant="yellow" className="w-fit">
              #FrameInGoa
            </Badge>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Designed for Hackers, Built for Goa.
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Showcase your role, tech stack, and motto with the official Hacker House Goa 2026 visual identity.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <img src={goaHindiSvg} alt="Goa Hindi" className="h-6 w-auto" />
              <span className="text-xs font-mono text-emerald-300">March 2026 • Goa, India</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative group">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border-4 border-[#0F172A] hh-shadow-pink max-w-xs transform group-hover:-rotate-1 transition-all duration-300">
                <img
                  src={hackersArt}
                  alt="Hacker House Workspace Illustration"
                  className="rounded-xl border-2 border-[#0F172A] w-full object-cover"
                />
                <div className="mt-3 text-center">
                  <span className="text-xs font-extrabold text-[#0B3B2B] uppercase tracking-wider block">
                    Official Builder Badge
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    1080 × 1080 • Ready for X & LinkedIn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-[#0F172A] flex items-center justify-center text-[#0B3B2B] mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-sm text-[#0F172A] mb-1">Zero Auto-Crop</h3>
          <p className="text-xs text-slate-500 leading-normal">
            Portrait, landscape, or square — your photo is always preserved at original aspect ratio.
          </p>
        </Card>

        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-5">
          <div className="w-12 h-12 rounded-xl bg-pink-100 border-2 border-[#0F172A] flex items-center justify-center text-[#FF2E93] mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-sm text-[#0F172A] mb-1">Adaptive Backdrop</h3>
          <p className="text-xs text-slate-500 leading-normal">
            Canvas dynamically frames empty space with Goa tropical patterns and event graphics.
          </p>
        </Card>

        <Card variant="default" shadow="md" className="flex flex-col items-center text-center p-5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 border-2 border-[#0F172A] flex items-center justify-center text-[#FFB800] mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-sm text-[#0F172A] mb-1">100% Private</h3>
          <p className="text-xs text-slate-500 leading-normal">
            No server uploads or backend APIs. Your image stays strictly in your browser.
          </p>
        </Card>
      </div>
    </div>
  );
};
