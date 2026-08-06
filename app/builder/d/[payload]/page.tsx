import React from 'react';
import type { Metadata } from 'next';
import { decodeBuilderPayload, validatePayload, getDynamicBaseUrl } from '../../../../src/engine/share/payload';
import { BuilderCardView } from './BuilderCardView';

interface Props {
  params: Promise<{ payload: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const rawPayload = resolvedParams.payload || '';

  let builderName = 'Verified Builder';
  let builderRole = 'Hacker';
  let builderId = 'HH26-BUILDER';

  if (rawPayload) {
    const raw = decodeBuilderPayload(rawPayload);
    const validated = validatePayload(raw);
    if (validated) {
      builderName = validated.name || builderName;
      builderRole = validated.role || builderRole;
      builderId = validated.id || builderId;
    }
  }

  const baseUrlStr = getDynamicBaseUrl();
  const baseUrl = new URL(baseUrlStr.endsWith('/') ? baseUrlStr : `${baseUrlStr}/`);
  const canonicalUrl = `${baseUrlStr.endsWith('/') ? baseUrlStr : `${baseUrlStr}/`}builder/d/${rawPayload}`;
  const ogImageUrl = `${canonicalUrl}/opengraph-image`;

  const title = `Hacker House Goa 2026 — ${builderName} (${builderRole})`;
  const description = `Official Hacker House Goa 2026 Digital Identity Credential for ${builderName} [ID: ${builderId}].`;

  return {
    metadataBase: baseUrl,
    title,
    description,
    keywords: ['Hacker House Goa', 'Builder Passport', 'Web3 Identity', 'Goa 2026', builderRole],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Hacker House Goa 2026',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Hacker House Goa 2026 Builder Passport — ${builderName}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BuilderPayloadPage({ params }: Props) {
  const resolvedParams = await params;
  const rawPayload = resolvedParams.payload || '';

  const raw = decodeBuilderPayload(rawPayload);
  const validated = validatePayload(raw);

  if (!validated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] p-4 text-center">
        <div className="bg-white p-8 rounded-2xl border-2.5 border-[#0F172A] hh-shadow-md max-w-md">
          <h2 className="text-xl font-bold text-[#0F172A] mb-2">Invalid Builder Passport Link</h2>
          <p className="text-sm text-slate-600 mb-4">The shared payload URL is invalid or corrupted.</p>
          <a href="/" className="inline-block bg-[#0B3B2B] text-white px-5 py-2.5 rounded-xl font-extrabold text-sm border-2 border-[#0F172A]">
            Create a New Passport
          </a>
        </div>
      </div>
    );
  }

  return <BuilderCardView payload={validated} rawPayload={rawPayload} />;
}
