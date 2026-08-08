'use client';

import React, { useState, useEffect } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { APP_STEPS, STEP_ORDER } from '../../constants/steps';
import { Check } from 'lucide-react';

export const StepTracker: React.FC = () => {
  const { currentStep, setStep } = useBuilder();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentIndex = mounted ? STEP_ORDER.indexOf(currentStep) : 0;

  return (
    <nav aria-label="Progress" className="w-full bg-[#042E1F] border-b-2 border-[#FFD800]/20 py-4 px-4 sm:px-6 select-none">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Step Indicator */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Connecting Base Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#006B3C] z-0 rounded-full border border-[#062319]" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#FFD800] z-0 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${(currentIndex / (APP_STEPS.length - 1)) * 100}%`,
            }}
          />

          {/* Step Nodes */}
          {APP_STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isClickable = idx <= currentIndex;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isClickable && setStep(step.id)}
                disabled={!isClickable}
                aria-current={isCurrent ? 'step' : undefined}
                className={`relative z-10 flex flex-col items-center group focus:outline-none ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full font-mono-hh font-extrabold text-xs flex items-center justify-center border-2.5 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#FFD800] text-[#062319] border-[#062319] hh-shadow-sm'
                      : isCurrent
                      ? 'bg-[#FF0080] text-white border-[#062319] scale-110 hh-shadow-sm ring-4 ring-[#FFD800]/50'
                      : 'bg-[#006B3C] text-[#FFF8E5]/60 border-[#062319]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                </div>
                <span
                  className={`mt-1.5 text-[11px] font-mono-hh font-extrabold uppercase tracking-tight whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'text-[#FFD800]'
                      : isCompleted
                      ? 'text-[#FFF8E5]'
                      : 'text-[#FFF8E5]/50'
                  }`}
                >
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Step Progress Bar */}
        <div className="flex md:hidden flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono-hh font-extrabold">
            <span className="text-[#FFD800] uppercase tracking-wider">
              Step {currentIndex + 1} of {APP_STEPS.length}
            </span>
            <span className="text-[#FF0080] font-extrabold">
              {APP_STEPS[currentIndex]?.title}
            </span>
          </div>
          <div className="w-full bg-[#006B3C] h-3 rounded-full overflow-hidden border-2 border-[#062319]">
            <div
              className="bg-[#FF0080] h-full transition-all duration-300 ease-out border-r border-[#FFD800]"
              style={{
                width: `${((currentIndex + 1) / APP_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

