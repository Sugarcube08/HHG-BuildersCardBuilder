import React, { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { downloadImage } from '../../engine/export/download';
import { shareToX } from '../../engine/export/share';
import { generateQrDataUrl } from '../../engine/qr/generateQr';
import hackerHouseLogo from '../../assets/logos/Hacker house.png';
import footerTrees from '../../assets/decorations/footer trees.png';
import goaHindiSvg from '../../assets/decorations/goa_hindi.svg';
import { Download, Share2, Edit3, CheckCircle2, Shield } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const { builderData, imageData, setStep, generatedCard, builderId, qrUrl, isRestoredFromUrl } =
    useBuilder();
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  // Generate crisp QR code Data URL whenever qrUrl updates
  useEffect(() => {
    let isMounted = true;
    generateQrDataUrl(qrUrl, { width: 120 })
      .then((dataUrl) => {
        if (isMounted) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch((err) => console.error('Failed to generate QR data URL:', err));

    return () => {
      isMounted = false;
    };
  }, [qrUrl]);

  const handleDownload = () => {
    if (generatedCard.blob || generatedCard.dataUrl) {
      downloadImage(
        generatedCard.blob || generatedCard.dataUrl!,
        `hhg-2026-${builderData.fullName.toLowerCase().replace(/\s+/g, '-')}.png`
      );
    } else {
      setStep('DOWNLOAD');
    }
  };

  const handleShare = () => {
    shareToX(builderData.fullName, builderData.role);
    setStep('SHARE');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
      {/* Title & Instructions */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="green" className="w-fit">
            Step 4 of 6 • Preview
          </Badge>
          {isRestoredFromUrl && (
            <Badge variant="pink" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              ✓ Verified Builder Restored
            </Badge>
          )}
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Your HH Goa 2026 Builder Identity
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
          Official Digital Builder Identity generated with encoded QR restoration URL.
        </p>
      </div>

      {/* Builder Card Container */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#0B3B2B] text-white border-4 border-[#0F172A] rounded-3xl p-6 sm:p-7 hh-shadow-yellow relative overflow-hidden flex flex-col items-center gap-5">
          {/* Decorative Trees Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <img src={footerTrees} alt="Trees background" className="w-full h-full object-cover" />
          </div>

          {/* Top Branding Header */}
          <div className="w-full flex items-center justify-between border-b border-emerald-800/80 pb-3.5 relative z-10">
            <div className="flex items-center gap-2">
              <img src={hackerHouseLogo} alt="HH Logo" className="h-8 w-auto" />
              <span className="font-extrabold text-sm tracking-tight text-white">HACKER HOUSE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="pink" className="text-[9px] py-0.5 px-2 font-mono">
                {builderId}
              </Badge>
            </div>
          </div>

          {/* Photo Frame Container (Preserving original aspect ratio) */}
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

          {/* Builder Information Section */}
          <div className="w-full flex flex-col items-center gap-2 relative z-10">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {builderData.fullName || 'Harsh Raikwar'}
            </h3>

            <span className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider bg-[#FFB800] px-3.5 py-1 rounded-full border-2 border-[#0F172A] hh-shadow-sm">
              {builderData.role || 'Full Stack Developer'}
            </span>

            <p className="text-xs italic text-emerald-200/90 max-w-xs mt-1">
              {builderData.tagline || '"The System Architect"'}
            </p>

            {builderData.techStack && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-1.5">
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

          {/* Card Footer Branding with QR Code Box & Verification */}
          <div className="w-full flex items-center justify-between border-t border-emerald-800/80 pt-3.5 relative z-10 text-[11px] font-mono text-emerald-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white p-1 border border-[#0F172A] flex items-center justify-center text-[#0F172A] overflow-hidden">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Builder Identity QR Code" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[9px]">QR</span>
                )}
              </div>
              <div className="flex flex-col text-left text-[10px]">
                <span className="font-bold text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 inline" /> Verified Builder
                </span>
                <span className="text-emerald-300/80">#FrameInGoa</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <img src={goaHindiSvg} alt="Goa Hindi" className="h-4 w-auto opacity-80" />
              <span className="font-bold text-white">GOA 2026</span>
            </div>
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

      {/* Verification Notice */}
      <Card variant="sand" shadow="sm" className="max-w-md text-xs text-slate-600 flex items-center gap-2.5 py-3 px-4">
        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
        <span>
          {isRestoredFromUrl
            ? '✓ Verified Builder Identity restored from scannable QR payload.'
            : 'Official Digital Builder Identity generated with scannable QR payload.'}
        </span>
      </Card>
    </div>
  );
};
