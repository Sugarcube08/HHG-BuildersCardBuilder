'use client';

import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { CheckCircle2, Download, ExternalLink, Sparkles, X, Info } from 'lucide-react';
import { shareToX } from '../../engine/export/share';

interface ShareFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  role: string;
  builderId?: string;
  shareUrl?: string;
}

export const ShareFeedbackModal: React.FC<ShareFeedbackModalProps> = ({
  isOpen,
  onClose,
  fullName,
  role,
  builderId,
  shareUrl,
}) => {
  if (!isOpen) return null;

  const handleReopenX = () => {
    shareToX(fullName, role, builderId, shareUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <Card
        variant="sand"
        shadow="lg"
        className="w-full max-w-lg bg-[#FAF7F2] border-2 border-emerald-500/30 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="green" icon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
              ✅ Builder Passport Downloaded
            </Badge>
            <Badge variant="pink" icon={<Sparkles className="w-3.5 h-3.5 text-pink-600" />}>
              X Post Prepared
            </Badge>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight pt-1">
            Almost done! Attach your Passport image
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            We’ve automated every supported step. Follow these 3 simple steps to complete your post on X:
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="flex flex-col gap-3 bg-white/80 rounded-xl p-4 border border-amber-200/80">
          <div className="flex items-start gap-3 text-left">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0 mt-0.5">
              1
            </div>
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-bold text-[#0F172A]">Image Downloaded</span>
              <span className="text-slate-600 text-xs">
                Your 3x Retina Builder Passport PNG is saved in your downloads folder.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left border-t border-slate-100 pt-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs shrink-0 mt-0.5">
              2
            </div>
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-bold text-[#0F172A]">X Compose Opened</span>
              <span className="text-slate-600 text-xs">
                X opened in a new tab with your pre-filled caption & verification link.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left border-t border-slate-100 pt-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs shrink-0 mt-0.5">
              3
            </div>
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-bold text-[#0F172A]">Attach & Publish</span>
              <span className="text-slate-600 text-xs">
                Click the 📷 image button in X, select your downloaded PNG, and publish!
              </span>
            </div>
          </div>
        </div>

        {/* Technical Rationale Note */}
        <div className="flex items-start gap-2.5 bg-amber-50/80 p-3 rounded-lg border border-amber-200 text-[11px] text-amber-900 text-left">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Browser Security Standard:</strong> Modern browsers prevent websites from directly injecting local files into external sites. We streamlined everything allowed into a single click!
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Button
            variant="outline"
            onClick={handleReopenX}
            leftIcon={<ExternalLink className="w-4 h-4 text-slate-700" />}
            className="w-full sm:w-auto text-xs"
          >
            Re-open X Compose
          </Button>

          <Button
            variant="primary"
            onClick={onClose}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
            className="w-full sm:flex-1 text-xs"
          >
            Got it, publish post!
          </Button>
        </div>
      </Card>
    </div>
  );
};
