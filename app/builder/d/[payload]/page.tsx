import React from 'react';
import type { Metadata } from 'next';
import { decodeBuilderPayload, validatePayload, getDynamicBaseUrl } from '../../../../src/engine/share/payload';
import { BuilderCardView } from './BuilderCardView';

interface Props {
  params: Promise<{ payload: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const rawPayload = resolvedParams.payload || '';
  const imgParam = typeof resolvedSearch.img === 'string' ? resolvedSearch.img : undefined;

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
  const canonicalUrl = `${baseUrlStr.endsWith('/') ? baseUrlStr : `${baseUrlStr}/`}builder/d/${rawPayload}${imgParam ? `?img=${imgParam}` : ''}`;
  
  const ogImageUrl = imgParam
    ? `${baseUrlStr.endsWith('/') ? baseUrlStr : `${baseUrlStr}/`}api/share/image/${imgParam}`
    : `${baseUrlStr.endsWith('/') ? baseUrlStr : `${baseUrlStr}/`}builder/d/${rawPayload}/opengraph-image`;

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
      <div className="min-h-screen flex items-center justify-center bg-[#042E1F] p-4 text-center">
        <div className="bg-[#FFF8E5] p-8 rounded-2xl border-3 border-[#062319] hh-shadow-yellow max-w-md text-[#062319]">
          <h2 className="text-xl font-serif-editorial font-bold text-[#062319] mb-2">Invalid Builder Passport Link</h2>
          <p className="text-sm text-[#062319]/80 font-sans mb-5">The shared payload URL is invalid or corrupted.</p>
          <a href="/" className="inline-block bg-[#006B3C] text-[#FFF8E5] px-6 py-3 rounded-xl font-display-hh font-extrabold text-sm border-3 border-[#062319] hh-shadow-sm hover:bg-[#00874E]">
            Create a New Passport
          </a>
        </div>
      </div>
    );
  }

  return <BuilderCardView payload={validated} rawPayload={rawPayload} />;
}
