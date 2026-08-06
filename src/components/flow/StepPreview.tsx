'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { generateQrDataUrl } from '../../engine/qr/generateQr';
import { exportBuilderCard } from '../../engine/export/exportBuilderCard';
import { shareToX } from '../../engine/export/share';
import { BuilderCard } from '../BuilderCard/BuilderCard';
import { ExportBoundary } from '../BuilderCard/ExportBoundary';
import { Download, Share2, Edit3, CheckCircle2 } from 'lucide-react';

export const StepPreview: React.FC = () => {
  const { builderData, imageData, setStep, builderId, qrUrl, isRestoredFromUrl } =
    useBuilder();

  const exportRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
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

  // Single Source of Truth Export Action:
  // Captures the exact BuilderCard DOM node directly from the ExportBoundary ref.
  const handleDownload = async () => {
    if (isExporting || !exportRef.current) return;
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

  const handleShare = () => {
    shareToX(builderData.fullName, builderData.role, builderId, qrUrl);
    setStep('SHARE');
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-xl mx-auto text-center">
      {/* Page Title & Status */}
      <div className="flex flex-col gap-2.5 items-center w-full">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="green" className="w-fit">
            Canonical Digital Passport
          </Badge>
          {isRestoredFromUrl && (
            <Badge variant="pink" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              ✓ Verified Restored
            </Badge>
          )}
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Hacker House Builder Passport
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md">
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
          isLoading={isExporting}
          leftIcon={<Download className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {isExporting ? 'Capturing 3x PNG...' : 'Download PNG'}
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

      {/* Notice Card */}
      {exportError ? (
        <Card variant="sand" shadow="sm" className="max-w-md text-xs text-rose-600 flex items-center gap-2.5 py-3 px-4 border-rose-500">
          <span>⚠️ {exportError}</span>
        </Card>
      ) : (
        <Card variant="sand" shadow="sm" className="max-w-md text-xs text-slate-600 flex items-center gap-2.5 py-3 px-4">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          <span>
            {isRestoredFromUrl
              ? '✓ Verified Builder Passport restored from QR code URL payload.'
              : 'Single source of truth DOM capture: preview and downloaded PNG are 100% identical.'}
          </span>
        </Card>
      )}
    </div>
  );
};
