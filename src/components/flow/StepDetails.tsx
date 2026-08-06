'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useBuilder } from '../../context/BuilderContext';
import type { BuilderDetailsFormData } from '../../types/builder';
import { PRESET_ROLES } from '../../constants/steps';
import { generateTagline } from '../../engine/theme/cardComposer';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { User, Briefcase, Quote, AtSign, Code, ArrowRight, ArrowLeft, Wand2 } from 'lucide-react';

export const StepDetails: React.FC = () => {
  const { builderData, updateBuilderDetails, setStep } = useBuilder();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BuilderDetailsFormData>({
    defaultValues: builderData,
  });

  const selectedRole = watch('role');

  const handleRoleSelect = (role: string) => {
    setValue('role', role, { shouldValidate: true });
    const autoTagline = generateTagline(role);
    setValue('tagline', autoTagline, { shouldValidate: true });
  };

  const handleAutoTagline = () => {
    const autoTagline = generateTagline(selectedRole || 'Full Stack Developer');
    setValue('tagline', autoTagline, { shouldValidate: true });
  };

  const onSubmit = (data: BuilderDetailsFormData) => {
    updateBuilderDetails(data);
    setStep('PREVIEW');
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
      {/* Title & Instructions */}
      <div className="flex flex-col gap-2 text-center">
        <Badge variant="green" className="w-fit mx-auto">
          Step 3 of 6
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Builder Details</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Enter your hacker identity details. These will be stylized on your official card.
        </p>
      </div>

      {/* Form Card */}
      <Card variant="default" shadow="lg" className="w-full p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Full Name Input */}
          <Input
            label="Full Name / Hacker Alias *"
            placeholder="e.g., Harsh Raikwar"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.fullName?.message}
            {...register('fullName', {
              required: 'Full name or handle is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />

          {/* Role Selection & Quick Presets */}
          <div className="flex flex-col gap-2 text-left">
            <Input
              label="Primary Role *"
              placeholder="e.g., Full Stack Developer"
              leftIcon={<Briefcase className="w-4 h-4" />}
              error={errors.role?.message}
              {...register('role', { required: 'Role is required' })}
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 mr-1 self-center">Presets:</span>
              {PRESET_ROLES.map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                    selectedRole === role
                      ? 'bg-[#0B3B2B] text-white border-[#0F172A]'
                      : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Tagline Input & Generator */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Builder Motto / Tagline *
              </label>
              <button
                type="button"
                onClick={handleAutoTagline}
                className="text-xs font-bold text-[#FF2E93] hover:underline flex items-center gap-1"
              >
                <Wand2 className="w-3 h-3" /> Auto Generate
              </button>
            </div>
            <Input
              placeholder='e.g., "The System Architect"'
              leftIcon={<Quote className="w-4 h-4" />}
              error={errors.tagline?.message}
              {...register('tagline', { required: 'Tagline is required' })}
            />
          </div>

          {/* Social Handle */}
          <Input
            label="Twitter / X Handle (Optional)"
            placeholder="@yourhandle"
            leftIcon={<AtSign className="w-4 h-4" />}
            {...register('twitterHandle')}
          />

          {/* Tech Stack */}
          <Input
            label="Primary Tech Stack (Optional)"
            placeholder="e.g., React, TypeScript, Rust, Solana"
            leftIcon={<Code className="w-4 h-4" />}
            {...register('techStack')}
          />

          {/* Navigation Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep('UPLOAD')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Preview Card
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
