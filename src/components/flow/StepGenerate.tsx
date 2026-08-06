import React, { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import sunriseArt from '../../assets/Sun rise.png';
import goaHindiSvg from '../../assets/goa_hindi.svg';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const StepGenerate: React.FC = () => {
  const { setStep } = useBuilder();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Goa Canvas...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(35);
      setStatusText('Applying Zero-Crop Framing...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(70);
      setStatusText('Embedding HH Goa 2026 Visual Identity...');
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Card Ready!');
    }, 1400);

    const timer4 = setTimeout(() => {
      setStep('PREVIEW');
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [setStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] max-w-lg mx-auto text-center">
      <Card variant="emerald" shadow="yellow" className="w-full p-8 relative overflow-hidden">
        {/* Ambient Sunrise Illustration */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src={sunriseArt} alt="Sunrise Artwork" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FF2E93] border-2 border-white flex items-center justify-center text-white hh-shadow-md animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Badge variant="yellow" className="text-xs">
              Step 4 of 7
            </Badge>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Building Your Goa Identity...
            </h3>
            <p className="text-xs text-emerald-200 font-mono flex items-center gap-1.5">
              <span>{statusText}</span>
              {progress === 100 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-emerald-950 h-3.5 rounded-full overflow-hidden border-2 border-[#0F172A]">
            <div
              className="bg-[#FF2E93] h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 pt-2 opacity-80">
            <img src={goaHindiSvg} alt="Goa Hindi" className="h-5 w-auto" />
            <span className="text-[11px] font-mono text-emerald-300">HH GOA 2026</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
