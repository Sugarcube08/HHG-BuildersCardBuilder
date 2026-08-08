'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { generateQrDataUrl } from '../../engine/qr/generateQr';
import { exportBuilderCard } from '../../engine/export/exportBuilderCard';
import { downloadAndShareToX } from '../../engine/export/share';
import { BuilderCard } from '../BuilderCard/BuilderCard';
import { ExportBoundary } from '../BuilderCard/ExportBoundary';
import { ShareFeedbackModal } from '../common/ShareFeedbackModal';
import { Download, Share2, Edit3, CheckCircle2, Sparkles } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const { builderData, imageData, setStep, builderId, qrUrl, isRestoredFromUrl } =
    useBuilder();

  const exportRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isPreparingShare, setIsPreparingShare] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Generate QR Data URL for display inside BuilderCard
  useEffect(() => {
    let isMounted = true;
    generateQrDataUrl(qrUrl, { width: 220 })
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

  // Standalone PNG Download Action
  const handleDownload = async () => {
    if (isExporting || isPreparingShare || !exportRef.current) return;
    setIsExporting(true);
    setExportError(null);

    try {
      await exportBuilderCard(exportRef.current, builderData.fullName, { pixelRatio: 3 });
    } catch (err) {
      console.error('Download export failed:', err);
      setExportError('Download failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Honest "Download & Share on X" Sequenced Workflow Action
  const handleDownloadAndShare = async () => {
    if (isExporting || isPreparingShare || !exportRef.current) return;
    setIsPreparingShare(true);
    setExportError(null);

    try {
      await downloadAndShareToX(
        exportRef.current,
        builderData.fullName,
        builderData.role,
        builderId,
        qrUrl
      );
      setIsShareModalOpen(true);
    } catch (err) {
      console.error('Download & Share workflow failed:', err);
      setExportError('Preparing post failed. Please try again.');
    } finally {
      setIsPreparingShare(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-xl mx-auto text-center">
      {/* Page Title & Status */}
      <div className="flex flex-col gap-2.5 items-center w-full">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="yellow" className="w-fit">
            Canonical Digital Passport
          </Badge>
          {isRestoredFromUrl && (
            <Badge variant="pink" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              ✓ Verified Restored
            </Badge>
          )}
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif-editorial font-black text-[#FFF8E5] tracking-tight">
          Hacker House Builder Passport
        </h2>

        <p className="text-xs sm:text-sm text-[#FFF8E5]/90 font-sans max-w-md">
          Single source of truth — your on-screen preview and downloaded PNG are 100% pixel-identical.
        </p>
      </div>

      {/* CANONICAL BUILDER PASSPORT DOM PREVIEW & EXPORT BOUNDARY */}
      <ExportBoundary ref={exportRef}>
        <BuilderCard
          builderData={builderData}
          imageData={imageData}
          builderId={builderId}
          qrDataUrl={qrDataUrl}
        />
      </ExportBoundary>

      {/* Action Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
        <Button
          variant="outline"
          onClick={() => setStep('DETAILS')}
          leftIcon={<Edit3 className="w-4 h-4 text-[#062319]" />}
          className="w-full sm:w-auto"
        >
          Edit Details
        </Button>

        <Button
          variant="primary"
          onClick={handleDownload}
          isLoading={isExporting}
          leftIcon={<Download className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {isExporting ? 'Capturing 3x PNG...' : 'Download PNG'}
        </Button>

        <Button
          variant="accent"
          onClick={handleDownloadAndShare}
          isLoading={isPreparingShare}
          leftIcon={<Share2 className="w-4 h-4 text-white" />}
          className="w-full sm:w-auto font-bold"
        >
          {isPreparingShare ? 'Preparing X Post...' : 'Download & Share on X'}
        </Button>
      </div>

      {/* Notice Card */}
      {exportError ? (
        <Card variant="sand" shadow="sm" className="max-w-md text-xs text-rose-700 flex items-center gap-2.5 py-3 px-4 border-2 border-rose-600 bg-rose-50">
          <span>⚠️ {exportError}</span>
        </Card>
      ) : (
        <Card variant="sand" shadow="sm" className="max-w-md text-xs text-[#062319] flex items-center gap-2.5 py-3.5 px-4 bg-[#FFF8E5] border-3 border-[#062319]">
          <Sparkles className="w-4.5 h-4.5 text-[#FF0080] shrink-0" />
          <span className="text-left leading-normal font-sans">
            <strong>Honest 1-Click Sharing:</strong> Downloads your 3x Passport PNG and opens X Compose with your verification link prefilled.
          </span>
        </Card>
      )}

      {/* Share Feedback Instruction Modal */}
      <ShareFeedbackModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        fullName={builderData.fullName}
        role={builderData.role}
        builderId={builderId}
        shareUrl={qrUrl}
      />
    </div>
  );
};

