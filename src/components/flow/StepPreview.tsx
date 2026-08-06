import React, { useEffect, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { downloadImage } from '../../engine/export/download';
import { shareToX } from '../../engine/export/share';
import { generateQrDataUrl } from '../../engine/qr/generateQr';
import { getCardTheme } from '../../engine/theme/cardComposer';
import { composeBuilderCard } from '../../engine/canvas/canvasRenderer';
import hackerHouseLogo from '../../assets/logos/Hacker house.png';
import footerTrees from '../../assets/decorations/footer trees.png';

import { Download, Share2, Edit3, CheckCircle2, Shield, QrCode, Sparkles, Layout, User } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const {
    builderData,
    imageData,
    setStep,
    generatedCard,
    setGeneratedCard,
    builderId,
    qrUrl,
    isRestoredFromUrl,
    cardFormat,
    setCardFormat,
  } = useBuilder();

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isGeneratingCanvas, setIsGeneratingCanvas] = useState<boolean>(false);

  const theme = getCardTheme(builderData.role);

  // Generate QR Data URL
  useEffect(() => {
    let isMounted = true;
    generateQrDataUrl(qrUrl, { width: 260 })
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

  // Re-compose high-res canvas whenever format, builder data, or image changes
  useEffect(() => {
    let isMounted = true;
    setIsGeneratingCanvas(true);

    const buildCanvas = async () => {
      let imageElement: HTMLImageElement | null = null;

      if (imageData.previewUrl) {
        imageElement = new Image();
        imageElement.src = imageData.previewUrl;
        await new Promise((resolve) => {
          imageElement!.onload = resolve;
          imageElement!.onerror = resolve;
        });
      }

      try {
        const result = await composeBuilderCard({
          imageElement,
          imageMeta: imageData.meta,
          builderDetails: builderData,
          qrUrl,
          format: cardFormat,
        });

        if (isMounted) {
          setGeneratedCard(result);
          setIsGeneratingCanvas(false);
        }
      } catch (err) {
        console.error('Canvas composition error:', err);
        if (isMounted) {
          setIsGeneratingCanvas(false);
        }
      }
    };

    void buildCanvas();

    return () => {
      isMounted = false;
    };
  }, [builderData, imageData.previewUrl, imageData.meta, qrUrl, cardFormat, setGeneratedCard]);

  const handleDownload = () => {
    if (generatedCard.blob || generatedCard.dataUrl) {
      downloadImage(
        generatedCard.blob || generatedCard.dataUrl!,
        `hhg-2026-${builderData.fullName.toLowerCase().replace(/\s+/g, '-')}-${cardFormat}.png`
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
    <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto text-center">
      {/* Header Title & Format Switcher */}
      <div className="flex flex-col gap-3 items-center w-full">
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
          Hacker House Goa 2026 Identity
        </h2>

        {/* Format Selector Pills */}
        <div className="flex items-center justify-center gap-2 bg-[#FAF7F2] p-1.5 rounded-2xl border-2.5 border-[#0F172A] hh-shadow-sm mt-1">
          <button
            type="button"
            onClick={() => setCardFormat('passport')}
            className={`flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl transition-all ${
              cardFormat === 'passport'
                ? 'bg-[#0B3B2B] text-white border-2 border-[#0F172A] hh-shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layout className="w-4 h-4 text-[#FF2E93]" />
            <span>16:9 Social Passport (For X & LinkedIn)</span>
          </button>

          <button
            type="button"
            onClick={() => setCardFormat('badge')}
            className={`flex items-center gap-2 text-xs font-black px-4 py-2 rounded-xl transition-all ${
              cardFormat === 'badge'
                ? 'bg-[#0B3B2B] text-white border-2 border-[#0F172A] hh-shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <User className="w-4 h-4 text-[#FFB800]" />
            <span>1:1 Avatar Badge</span>
          </button>
        </div>
      </div>

      {/* Rendered Canvas Preview Card Box */}
      <div className="w-full">
        {cardFormat === 'passport' ? (
          /* 16:9 LANDSCAPE BUILDER PASSPORT PREVIEW */
          <div className="bg-[#0B3B2B] text-white border-4 border-[#0F172A] rounded-3xl p-6 sm:p-8 hh-shadow-yellow relative overflow-hidden flex flex-col gap-6 text-left">
            {/* Ambient Trees Background Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
              <img src={footerTrees} alt="Trees background" className="w-full h-full object-cover" />
            </div>

            {/* Header Banner */}
            <div className="w-full flex items-center justify-between border-b-2 border-emerald-800/80 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <img src={hackerHouseLogo} alt="HH Logo" className="h-9 w-auto" />
                <span className="font-black text-lg tracking-tight text-white">HACKER HOUSE GOA</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="pink" className="text-xs py-1 px-3 font-mono">
                  #FrameInGoa
                </Badge>
                <Badge variant="yellow" className="text-xs py-1 px-3 font-mono">
                  GOA 2026
                </Badge>
              </div>
            </div>

            {/* Two Columnpassport Content Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Photo Frame Container (≈35% width) */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="w-full relative flex flex-col items-center justify-center min-h-[260px] bg-[#07281E] border-3 border-[#0F172A] rounded-2xl p-4 shadow-xl">
                  {/* Corner Accent Tags */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#FF2E93]" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#FF2E93]" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#FF2E93]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#FF2E93]" />

                  {imageData.previewUrl ? (
                    <img
                      src={imageData.previewUrl}
                      alt={builderData.fullName}
                      className="max-h-64 max-w-full rounded-xl border-2 border-white/20 object-contain shadow-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-emerald-300">
                      <Shield className="w-12 h-12 mb-2" />
                      <span className="text-xs font-mono">No Image Uploaded</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Column: Builder Identity Information (≈45% width) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
                  {builderData.fullName || 'HARSH RAIKWAR'}
                </h3>

                <span
                  style={{ backgroundColor: theme.roleBadgeBg, color: theme.roleBadgeText }}
                  className="w-fit text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full border-2 border-[#0F172A] hh-shadow-sm"
                >
                  {builderData.role || 'Full Stack Developer'}
                </span>

                <p className="text-sm italic text-emerald-200/90 font-medium">
                  {builderData.tagline || '"The System Architect"'}
                </p>

                {builderData.techStack && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-xs font-mono font-bold text-emerald-300 mr-1 self-center">STACK:</span>
                    {builderData.techStack.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/10 text-emerald-200 px-2.5 py-0.5 rounded-md border border-white/10 font-mono font-bold"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Builder ID Card Box */}
                <div className="mt-2 bg-[#07281E] border-2 border-emerald-700/60 rounded-xl py-2 px-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">BUILDER PASSPORT</span>
                  <span className="text-white font-extrabold tracking-widest">{builderId}</span>
                </div>
              </div>

              {/* Right Column: Prominent QR Verification Block (≈20% width) */}
              <div className="md:col-span-3 flex flex-col items-center text-center">
                <div className="w-full bg-[#FAF7F2] text-[#0F172A] border-3 border-[#0F172A] rounded-2xl p-4 flex flex-col items-center gap-3 hh-shadow-sm">
                  <div className="w-36 h-36 rounded-xl bg-white p-1.5 border-2 border-[#0F172A] flex items-center justify-center overflow-hidden">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="Scannable Builder Identity QR" className="w-full h-full object-contain" />
                    ) : (
                      <QrCode className="w-12 h-12 text-slate-400" />
                    )}
                  </div>

                  <div className="flex flex-col gap-0.5 leading-tight">
                    <span className="text-xs font-black text-[#0B3B2B] flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2E93]" /> SCAN TO VERIFY
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 font-mono">
                      Digital Builder Passport
                    </span>
                    <span className="text-[10px] font-extrabold text-[#FF2E93] font-mono">
                      HH Goa 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex items-center justify-between border-t border-emerald-800/80 pt-3 relative z-10 text-xs font-mono text-emerald-300">
              <div className="flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>VERIFIED BUILDER PASSPORT</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>GOA, INDIA • MARCH 2026</span>
              </div>
            </div>
          </div>
        ) : (
          /* 1:1 SQUARE AVATAR BADGE PREVIEW */
          <div className="w-full max-w-md mx-auto">
            <div className="bg-[#0B3B2B] text-white border-4 border-[#0F172A] rounded-3xl p-6 sm:p-7 hh-shadow-yellow relative overflow-hidden flex flex-col items-center gap-5 text-center">
              <div className="w-full flex items-center justify-between border-b border-emerald-800/80 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <img src={hackerHouseLogo} alt="HH Logo" className="h-7 w-auto" />
                  <span className="font-black text-xs tracking-tight text-white">HACKER HOUSE</span>
                </div>
                <Badge variant="yellow" className="text-[9px] py-0.5 px-2">
                  GOA 2026
                </Badge>
              </div>

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

              <div className="w-full flex flex-col items-center gap-2 relative z-10">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {builderData.fullName || 'Harsh Raikwar'}
                </h3>
                <span
                  style={{ backgroundColor: theme.roleBadgeBg, color: theme.roleBadgeText }}
                  className="text-xs font-extrabold uppercase px-3 py-1 rounded-full border-2 border-[#0F172A]"
                >
                  {builderData.role || 'Full Stack Developer'}
                </span>
                <p className="text-xs italic text-emerald-200/90 max-w-xs">
                  {builderData.tagline || '"The System Architect"'}
                </p>
              </div>

              <div className="w-full flex items-center justify-between border-t border-emerald-800/80 pt-3 relative z-10 text-[11px] font-mono text-emerald-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white p-0.5 border border-[#0F172A]">
                    {qrDataUrl && <img src={qrDataUrl} alt="QR" className="w-full h-full object-contain" />}
                  </div>
                  <span className="text-[10px] font-bold text-white">Verified Badge</span>
                </div>
                <span className="font-bold text-white">#FrameInGoa</span>
              </div>
            </div>
          </div>
        )}
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
          isLoading={isGeneratingCanvas}
          leftIcon={<Download className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Download PNG ({cardFormat === 'passport' ? '16:9' : '1:1'})
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
            : 'Digital Builder Passport formatted for X, LinkedIn, and social media.'}
        </span>
      </Card>
    </div>
  );
};
