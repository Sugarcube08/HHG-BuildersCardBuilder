'use client';

import React, { useRef, useState } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { UploadCloud, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

export const StepUpload: React.FC = () => {
  const { imageData, setUploadedFile, setStep } = useBuilder();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      void setUploadedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      void setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto text-center">
      {/* Title & Instructions */}
      <div className="flex flex-col gap-2">
        <Badge variant="green" className="w-fit mx-auto">
          Step 2 of 6
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">Upload Your Photo</h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Select a photo to feature on your HH Goa 2026 card. Square, portrait, or landscape are all supported with zero auto-cropping.
        </p>
      </div>

      {/* Main Upload Dropzone or Image Preview */}
      <Card
        variant="default"
        shadow="lg"
        className={`w-full p-8 border-dashed border-3 transition-all ${
          isDragging
            ? 'border-[#FF2E93] bg-pink-50/50 scale-[1.01]'
            : imageData.previewUrl
            ? 'border-[#0B3B2B] bg-emerald-50/20'
            : 'border-slate-300 hover:border-[#0B3B2B]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        {imageData.previewUrl ? (
          <div className="flex flex-col items-center gap-5">
            {/* Image Preview Container with Rich Metadata Display */}
            <div className="relative group max-w-xs mx-auto">
              <img
                src={imageData.previewUrl}
                alt="Uploaded preview"
                className="max-h-64 rounded-xl border-2 border-[#0F172A] object-contain shadow-md"
              />
              {imageData.meta && (
                <Badge
                  variant="dark"
                  className="absolute top-2 right-2 text-[10px] lowercase font-mono bg-[#0F172A]/90 text-white"
                >
                  {imageData.meta.orientation} ({imageData.meta.width}×{imageData.meta.height} • {imageData.meta.ratio.toFixed(2)})
                </Badge>
              )}
            </div>

            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-bold text-[#0B3B2B] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Photo Loaded Successfully</span>
              </p>
              <p className="text-xs text-slate-500 font-mono">{imageData.fileName}</p>
            </div>

            {/* Replace Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Choose Different Photo
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-4 cursor-pointer py-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border-2 border-[#0F172A] flex items-center justify-center text-[#FF2E93] hh-shadow-sm group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-base font-extrabold text-[#0F172A]">
                Drag & Drop photo here, or <span className="text-[#FF2E93] underline">Browse</span>
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Supports JPG, PNG, WebP • Up to 10MB
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Badge variant="outline" className="text-[10px]">
                📷 Square (1:1)
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                📱 Portrait (3:4)
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                🖼️ Landscape (16:9)
              </Badge>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Actions */}
      <div className="flex items-center justify-between w-full pt-4">
        <Button
          variant="ghost"
          onClick={() => setStep('LANDING')}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={() => setStep('DETAILS')}
          disabled={!imageData.previewUrl}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Builder Details
        </Button>
      </div>
    </div>
  );
};
