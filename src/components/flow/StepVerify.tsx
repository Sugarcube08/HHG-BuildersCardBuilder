'use client';

import React, { useRef, useState, useEffect } from 'react';
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
import { Download, Share2, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';

export const StepVerify: React.FC = () => {
  const { builderData, imageData, builderId, qrUrl, shareUrl, resetFlow } = useBuilder();

  const exportRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isPreparingShare, setIsPreparingShare] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

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

  const handleDownload = async () => {
    if (isExporting || isPreparingShare || !exportRef.current) return;
    setIsExporting(true);

    try {
      await exportBuilderCard(exportRef.current, builderData.fullName, { pixelRatio: 3 });
    } catch (err) {
      console.error('Download export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadAndShare = async () => {
    if (isExporting || isPreparingShare || !exportRef.current) return;
    setIsPreparingShare(true);

    try {
      await downloadAndShareToX(
        exportRef.current,
        builderData.fullName,
        builderData.role,
        builderId,
        shareUrl
      );
      setIsShareModalOpen(true);
    } catch (err) {
      console.error('Download & Share workflow failed:', err);
    } finally {
      setIsPreparingShare(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-xl mx-auto text-center">
      {/* Official Credential Header */}
      <div className="flex flex-col gap-3 items-center w-full">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="green" icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}>
            ✓ Official Verified Credential
          </Badge>
          <Badge variant="yellow" className="font-mono">
            {builderId}
          </Badge>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Hacker House Builder Passport
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md">
          This digital identity was verified on-chain and registered for Hacker House Goa 2026.
        </p>
      </div>

      {/* CANONICAL BUILDER PASSPORT DOM CARD */}
      <ExportBoundary ref={exportRef}>
        <BuilderCard
          builderData={builderData}
          imageData={imageData}
          builderId={builderId}
          qrDataUrl={qrDataUrl}
        />
      </ExportBoundary>

      {/* Public Action Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
        <Button
          variant="primary"
          onClick={handleDownload}
          isLoading={isExporting}
          leftIcon={<Download className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {isExporting ? 'Capturing 3x PNG...' : 'Download Passport'}
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

        <Button
          variant="outline"
          onClick={resetFlow}
          leftIcon={<PlusCircle className="w-4 h-4 text-[#0B3B2B]" />}
          className="w-full sm:w-auto"
        >
          Create Yours
        </Button>
      </div>

      {/* Verification Details Box */}
      <Card variant="sand" shadow="sm" className="max-w-md text-xs text-slate-600 flex flex-col gap-2 p-4 text-left">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          <span>Credential Verification Status</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Verified Builder Passport issued for <strong className="text-[#0F172A]">{builderData.fullName || 'Builder'}</strong> ({builderData.role}). Valid for official entry and identity verification at Hacker House Goa 2026.
        </p>
        <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>SHARE LINK:</span>
          <span className="font-bold text-[#0B3B2B] truncate max-w-[240px]">{shareUrl}</span>
        </div>
      </Card>

      {/* Share Feedback Instruction Modal */}
      <ShareFeedbackModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        fullName={builderData.fullName}
        role={builderData.role}
        builderId={builderId}
        shareUrl={shareUrl}
      />
    </div>
  );
};
