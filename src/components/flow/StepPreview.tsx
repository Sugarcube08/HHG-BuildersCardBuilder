import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import hackerHouseLogo from '../../assets/Hacker house.png';
import footerTrees from '../../assets/footer trees.png';
import goaHindiSvg from '../../assets/goa_hindi.svg';
import { Download, Share2, Edit3, CheckCircle2, Shield } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const { builderData, imageData, setStep } = useBuilder();

  const handleDownload = () => {
    setStep('DOWNLOAD');
  };

  const handleShare = () => {
    const text = encodeURIComponent(
      `Ready for Hacker House Goa 2026! 🚀\n\nI'm ${builderData.fullName} building as a ${builderData.role}.\n\n#FrameInGoa #HHGoa2026`
    );
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setStep('SHARE');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
      {/* Title & Instructions */}
      <div className="flex flex-col gap-2">
        <Badge variant="green" className="w-fit mx-auto">
          Step 5 of 7 • Preview
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]">
          Your HH Goa 2026 Builder Card
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
          Your card has been generated with zero image cropping and official event branding.
        </p>
      </div>

      {/* Builder Card Preview Box */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#0B3B2B] text-white border-4 border-[#0F172A] rounded-3xl p-6 sm:p-8 hh-shadow-yellow relative overflow-hidden flex flex-col items-center gap-6">
          {/* Decorative Trees Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <img src={footerTrees} alt="Trees background" className="w-full h-full object-cover" />
          </div>

          {/* Top Branding Header */}
          <div className="w-full flex items-center justify-between border-b border-emerald-800/80 pb-4 relative z-10">
            <div className="flex items-center gap-2">
              <img src={hackerHouseLogo} alt="HH Logo" className="h-8 w-auto" />
              <span className="font-extrabold text-sm tracking-tight text-white">HACKER HOUSE</span>
            </div>
            <Badge variant="yellow" className="text-[9px] py-0.5 px-2">
              GOA 2026
            </Badge>
          </div>

          {/* Photo Frame Container (Zero Auto Crop preserving original aspect ratio) */}
          <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-[220px] bg-[#07281E] border-2 border-white/20 rounded-2xl p-4">
            {imageData.previewUrl ? (
              <img
                src={imageData.previewUrl}
                alt={builderData.fullName}
                className="max-h-56 max-w-full rounded-xl border border-white/30 object-contain shadow-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-emerald-300">
                <Shield className="w-12 h-12 mb-2" />
                <span className="text-xs font-mono">No Image Uploaded</span>
              </div>
            )}
          </div>

          {/* Builder Information Showcase */}
          <div className="w-full flex flex-col items-center gap-2 relative z-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {builderData.fullName || 'Harsh Raikwar'}
            </h3>

            <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">
              {builderData.role || 'Full Stack Developer'}
            </span>

            <p className="text-xs italic text-emerald-200/90 max-w-xs mt-1">
              {builderData.tagline || '"The System Architect"'}
            </p>

            {builderData.techStack && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                {builderData.techStack.split(',').map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-white/10 text-emerald-200 px-2 py-0.5 rounded border border-white/10 font-mono"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Card Footer Branding */}
          <div className="w-full flex items-center justify-between border-t border-emerald-800/80 pt-4 relative z-10 text-[11px] font-mono text-emerald-300">
            <div className="flex items-center gap-1">
              <img src={goaHindiSvg} alt="Goa Hindi" className="h-4 w-auto opacity-80" />
              <span>#FrameInGoa</span>
            </div>
            <span>OFFICIAL BUILDER CARD</span>
          </div>
        </div>
      </div>

      {/* Action Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <Button
          variant="outline"
          onClick={() => setStep('DETAILS')}
          leftIcon={<Edit3 className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Edit Details
        </Button>

        <Button
          variant="primary"
          onClick={handleDownload}
          leftIcon={<Download className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Download PNG
        </Button>

        <Button
          variant="accent"
          onClick={handleShare}
          leftIcon={<Share2 className="w-4 h-4 text-white" />}
          className="w-full sm:w-auto"
        >
          Share to X
        </Button>
      </div>

      {/* Status Notice */}
      <Card variant="sand" shadow="sm" className="max-w-md text-xs text-slate-600 flex items-center gap-2 py-3 px-4">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Card framework is ready for canvas rendering and social sharing integrations.</span>
      </Card>
    </div>
  );
};
