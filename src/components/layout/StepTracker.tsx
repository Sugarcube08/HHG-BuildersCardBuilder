import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { APP_STEPS, STEP_ORDER } from '../../constants/steps';
import { Check } from 'lucide-react';

export const StepTracker: React.FC = () => {
  const { currentStep, setStep } = useBuilder();
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="w-full bg-[#FAF7F2] border-b-2 border-[#0F172A]/10 py-4 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Step Indicator */}
        <div className="hidden md:flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0 rounded-full" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0B3B2B] z-0 rounded-full transition-all duration-300"
            style={{
              width: `${(currentIndex / (APP_STEPS.length - 1)) * 100}%`,
            }}
          />

          {/* Step Items */}
          {APP_STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isClickable = idx <= currentIndex;

            return (
              <button
                key={step.id}
                onClick={() => isClickable && setStep(step.id)}
                disabled={!isClickable}
                className={`relative z-10 flex flex-col items-center group focus:outline-none ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full font-extrabold text-xs flex items-center justify-center border-2 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#0B3B2B] text-white border-[#0F172A] hh-shadow-sm'
                      : isCurrent
                      ? 'bg-[#FF2E93] text-white border-[#0F172A] scale-110 hh-shadow-sm'
                      : 'bg-white text-slate-400 border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                </div>
                <span
                  className={`mt-1.5 text-[11px] font-bold tracking-tight whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'text-[#FF2E93]'
                      : isCompleted
                      ? 'text-[#0B3B2B]'
                      : 'text-slate-400'
                  }`}
                >
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile Step Bar */}
        <div className="flex md:hidden flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#0B3B2B] uppercase tracking-wider">
              Step {currentIndex + 1} of {APP_STEPS.length}
            </span>
            <span className="text-[#FF2E93] font-extrabold">
              {APP_STEPS[currentIndex]?.title}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-[#0F172A]/20">
            <div
              className="bg-[#FF2E93] h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / APP_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
