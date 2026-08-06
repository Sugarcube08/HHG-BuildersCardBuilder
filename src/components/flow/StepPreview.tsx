import React, { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { downloadImage } from '../../engine/export/download';
import { shareToX } from '../../engine/export/share';
import { generateQrDataUrl } from '../../engine/qr/generateQr';
import { getCardTheme } from '../../engine/theme/cardComposer';
import hackerHouseLogo from '../../assets/logos/Hacker house.png';
import footerTrees from '../../assets/decorations/footer trees.png';
import goaHindiSvg from '../../assets/decorations/goa_hindi.svg';
import { Download, Share2, Edit3, CheckCircle2, Shield, QrCode, Sparkles } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const { builderData, imageData, setStep, generatedCard, builderId, qrUrl, isRestoredFromUrl } =
    useBuilder();
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const theme = getCardTheme(builderData.role);

  // Generate QR code Data URL
  useEffect(() => {
    let isMounted = true;
    generateQrDataUrl(qrUrl, { width: 180 })
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
            Digital Builder Passport
          </Badge>
          {isRestoredFromUrl && (
            <Badge variant="pink" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              ✓ Verified Restored
            </Badge>
          )}
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Official Hacker House Identity
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
          Your card has been formatted as an official digital passport with scannable QR verification.
        </p>
      </div>

      {/* Digital Passport Card Container */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#0B3B2B] text-white border-4 border-[#0F172A] rounded-3xl p-6 sm:p-7 hh-shadow-yellow relative overflow-hidden flex flex-col items-center gap-5">
          {/* Decorative Trees Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
            <img src={footerTrees} alt="Trees background" className="w-full h-full object-cover" />
          </div>

          {/* Top Branding Header */}
          <div className="w-full flex items-center justify-between border-b-2 border-emerald-800/80 pb-3.5 relative z-10">
            <div className="flex items-center gap-2">
              <img src={hackerHouseLogo} alt="HH Logo" className="h-8 w-auto" />
              <span className="font-black text-sm tracking-tight text-white">HACKER HOUSE</span>
            </div>
            <Badge variant="yellow" className="text-[10px] py-0.5 px-2">
              GOA 2026
            </Badge>
          </div>

          {/* Photo Frame Container (Framed with Corner Accents) */}
          <div className="w-full relative z-10 flex flex-col items-center justify-center min-h-[220px] bg-[#07281E] border-3 border-[#0F172A] rounded-2xl p-4 shadow-lg">
            {/* Corner Decorative Accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#FF2E93] rounded-tl-sm" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#FF2E93] rounded-tr-sm" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#FF2E93] rounded-bl-sm" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#FF2E93] rounded-br-sm" />

            {imageData.previewUrl ? (
              <img
                src={imageData.previewUrl}
                alt={builderData.fullName}
                className="max-h-56 max-w-full rounded-xl border-2 border-white/20 object-contain shadow-md"
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
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {builderData.fullName || 'Harsh Raikwar'}
            </h3>

            {/* Dynamic Role Badge with role-personalized background tint */}
            <span
              style={{ backgroundColor: theme.roleBadgeBg, color: theme.roleBadgeText }}
              className="text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-[#0F172A] hh-shadow-sm"
            >
              {builderData.role || 'Full Stack Developer'}
            </span>

            <p className="text-xs italic text-emerald-200/90 max-w-xs mt-1 font-medium">
              {builderData.tagline || '"The System Architect"'}
            </p>

            {builderData.techStack && (
              <div className="flex flex-wrap justify-center gap-1.5 mt-1.5">
                {builderData.techStack.split(',').map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-white/10 text-emerald-200 px-2.5 py-0.5 rounded-md border border-white/10 font-mono font-bold"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Builder ID Card Box */}
          <div className="w-full bg-[#07281E] border-2 border-emerald-700/60 rounded-xl py-2 px-4 flex items-center justify-between text-xs font-mono relative z-10">
            <span className="text-emerald-300 font-bold">BUILDER ID</span>
            <span className="text-white font-extrabold tracking-widest">{builderId}</span>
          </div>

          {/* Prominent Scannable QR Identity Box */}
          <div className="w-full bg-[#FAF7F2] text-[#0F172A] border-3 border-[#0F172A] rounded-2xl p-3.5 flex items-center gap-4 relative z-10 hh-shadow-sm text-left">
            <div className="w-16 h-16 shrink-0 rounded-xl bg-white p-1 border-2 border-[#0F172A] flex items-center justify-center overflow-hidden">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Scannable Builder Identity QR" className="w-full h-full object-contain" />
              ) : (
                <QrCode className="w-8 h-8 text-slate-400" />
              )}
            </div>

            <div className="flex flex-col gap-0.5 leading-tight">
              <div className="flex items-center gap-1 text-xs font-black text-[#0B3B2B]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2E93]" />
                <span>SCAN TO VERIFY IDENTITY</span>
              </div>
              <p className="text-[11px] font-bold text-slate-600 font-mono">
                Official Digital Builder Passport
              </p>
              <p className="text-[10px] font-extrabold text-[#FF2E93] font-mono">
                Hacker House Goa 2026
              </p>
            </div>
          </div>

          {/* Card Footer Branding */}
          <div className="w-full flex items-center justify-between border-t border-emerald-800/80 pt-3 relative z-10 text-[11px] font-mono text-emerald-300">
            <div className="flex items-center gap-1">
              <img src={goaHindiSvg} alt="Goa Hindi" className="h-4 w-auto opacity-80" />
              <span>#FrameInGoa</span>
            </div>
            <div className="flex items-center gap-1 font-bold text-white">
              <Sparkles className="w-3 h-3 text-[#FFB800]" />
              <span>GOA 2026</span>
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
            ? '✓ Verified Builder Passport restored from QR code URL payload.'
            : 'Digital Builder Passport formatted with scannable QR verification.'}
        </span>
      </Card>
    </div>
  );
};
