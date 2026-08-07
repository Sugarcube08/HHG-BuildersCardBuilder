'use client';

import React, { useRef, useState, useEffect } from 'react';
import { BuilderCard } from '../../../../src/components/BuilderCard/BuilderCard';
import { ExportBoundary } from '../../../../src/components/BuilderCard/ExportBoundary';
import { Button } from '../../../../src/components/common/Button';
import { Card } from '../../../../src/components/common/Card';
import { Badge } from '../../../../src/components/common/Badge';
import { generateQrDataUrl } from '../../../../src/engine/qr/generateQr';
import { exportBuilderCard } from '../../../../src/engine/export/exportBuilderCard';
import { downloadAndShareToX } from '../../../../src/engine/export/share';
import { generateBuilderUrl } from '../../../../src/engine/share/payload';
import { Header } from '../../../../src/components/layout/Header';
import { Footer } from '../../../../src/components/layout/Footer';
import { ShareFeedbackModal } from '../../../../src/components/common/ShareFeedbackModal';
import { Download, Share2, ShieldCheck, PlusCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  payload: {
    v: 1;
    id: string;
    name: string;
    role: string;
    tagline: string;
    stack: string;
    ts: number;
    meta?: { w: number; h: number; r: number; o: string };
  };
  rawPayload: string;
}

export const BuilderCardView: React.FC<Props> = ({ payload }) => {
  const exportRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isPreparingShare, setIsPreparingShare] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const builderData = {
    fullName: payload.name,
    role: payload.role,
    tagline: payload.tagline,
    techStack: payload.stack,
    twitterHandle: '',
  };

  const imageData = {
    file: null,
    previewUrl: null,
    fileName: null,
    meta: payload.meta
      ? {
          width: payload.meta.w,
          height: payload.meta.h,
          ratio: payload.meta.r,
          orientation: payload.meta.o as any,
        }
      : null,
  };

  const canonicalShareUrl = generateBuilderUrl(builderData, imageData.meta);

  useEffect(() => {
    let isMounted = true;
    generateQrDataUrl(canonicalShareUrl, { width: 220 })
      .then((dataUrl) => {
        if (isMounted) {
          setQrDataUrl(dataUrl);
        }
      })
      .catch((err) => console.error('Failed to generate QR data URL:', err));

    return () => {
      isMounted = false;
    };
  }, [canonicalShareUrl]);

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
        payload.id,
        canonicalShareUrl
      );
      setIsShareModalOpen(true);
    } catch (err) {
      console.error('Download & Share workflow failed:', err);
    } finally {
      setIsPreparingShare(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0F172A] relative selection:bg-[#FF2E93] selection:text-white">
      <Header />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-8 text-center">
          {/* Header */}
          <div className="flex flex-col gap-3 items-center w-full">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="green" icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}>
                ✓ Official Verified Credential
              </Badge>
              <Badge variant="yellow" className="font-mono">
                {payload.id}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Hacker House Builder Passport
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md">
              Verified Digital Passport for {builderData.fullName} ({builderData.role}).
            </p>
          </div>

          {/* Builder Card Single Source of Truth */}
          <ExportBoundary ref={exportRef}>
            <BuilderCard
              builderData={builderData}
              imageData={imageData}
              builderId={payload.id}
              qrDataUrl={qrDataUrl}
            />
          </ExportBoundary>

          {/* Action Buttons */}
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
              onClick={() => {
                window.location.href = '/';
              }}
              leftIcon={<PlusCircle className="w-4 h-4 text-[#0B3B2B]" />}
              className="w-full sm:w-auto"
            >
              Create Yours
            </Button>
          </div>

          {/* Verification Box */}
          <Card variant="sand" shadow="sm" className="max-w-md text-xs text-slate-600 flex flex-col gap-2 p-4 text-left">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <span>Credential Verification Status</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Verified Builder Passport issued for <strong className="text-[#0F172A]">{builderData.fullName}</strong> ({builderData.role}). Valid for official entry and identity verification at Hacker House Goa 2026.
            </p>
            <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>SHARE LINK:</span>
              <span className="font-bold text-[#0B3B2B] truncate max-w-[240px]">{canonicalShareUrl}</span>
            </div>
          </Card>
        </div>
      </main>

      {/* Share Feedback Instruction Modal */}
      <ShareFeedbackModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        fullName={builderData.fullName}
        role={builderData.role}
        builderId={payload.id}
        shareUrl={canonicalShareUrl}
      />

      <Footer />
    </div>
  );
};
