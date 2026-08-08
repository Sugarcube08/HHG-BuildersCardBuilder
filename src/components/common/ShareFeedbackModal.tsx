'use client';

import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { CheckCircle2, ExternalLink, Sparkles, X, Info } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#042E1F]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <Card
        variant="sand"
        shadow="yellow"
        className="w-full max-w-lg bg-[#FFF8E5] border-3 border-[#062319] p-6 sm:p-8 flex flex-col gap-6 relative text-[#062319]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#062319] hover:text-[#FF0080] p-1.5 rounded-full hover:bg-black/5 transition-colors border-2 border-transparent hover:border-[#062319]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="green" icon={<CheckCircle2 className="w-4 h-4 text-[#FFD800]" />}>
              ✅ Passport Downloaded
            </Badge>
            <Badge variant="pink" icon={<Sparkles className="w-3.5 h-3.5 text-white" />}>
              X Post Prepared
            </Badge>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif-editorial font-black text-[#062319] tracking-tight pt-1">
            Almost done! Attach your Passport image
          </h3>

          <p className="text-xs sm:text-sm text-[#062319]/80 font-medium leading-relaxed">
            We’ve automated every supported step. Follow these 3 simple steps to complete your post on X:
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="flex flex-col gap-3 bg-[#FAF0D4] rounded-xl p-4 border-2 border-[#062319] hh-shadow-sm">
          <div className="flex items-start gap-3 text-left">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#006B3C] text-[#FFD800] font-mono-hh font-bold text-xs shrink-0 mt-0.5 border border-[#062319]">
              1
            </div>
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-display-hh font-bold text-[#062319]">Image Downloaded</span>
              <span className="text-[#062319]/80 text-xs">
                Your 3x Retina Builder Passport PNG is saved in your downloads folder.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left border-t border-[#062319]/15 pt-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#006B3C] text-[#FFD800] font-mono-hh font-bold text-xs shrink-0 mt-0.5 border border-[#062319]">
              2
            </div>
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-display-hh font-bold text-[#062319]">X Compose Opened</span>
              <span className="text-[#062319]/80 text-xs">
                X opened in a new tab with your pre-filled caption & verification link.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left border-t border-[#062319]/15 pt-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD800] text-[#062319] font-mono-hh font-bold text-xs shrink-0 mt-0.5 border border-[#062319]">
              3
            </div>
            <div className="flex flex-col text-xs sm:text-sm">
              <span className="font-display-hh font-bold text-[#062319]">Attach & Publish</span>
              <span className="text-[#062319]/80 text-xs">
                Click the 📷 image button in X, select your downloaded PNG, and publish!
              </span>
            </div>
          </div>
        </div>

        {/* Technical Rationale Note */}
        <div className="flex items-start gap-2.5 bg-[#FFD800]/20 p-3 rounded-lg border-2 border-[#062319] text-[11px] text-[#062319] text-left">
          <Info className="w-4 h-4 text-[#006B3C] shrink-0 mt-0.5" />
          <span>
            <strong>Browser Security Standard:</strong> Modern browsers prevent websites from directly injecting local files into external sites. We streamlined everything allowed into a single click!
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Button
            variant="outline"
            onClick={handleReopenX}
            leftIcon={<ExternalLink className="w-4 h-4 text-[#062319]" />}
            className="w-full sm:w-auto text-xs"
          >
            Re-open X Compose
          </Button>

          <Button
            variant="accent"
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

