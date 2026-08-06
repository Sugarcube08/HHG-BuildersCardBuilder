import React from 'react';
import type { Metadata } from 'next';
import App from '../../../src/App';

interface Props {
  params: Promise<{ builderId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const builderId = resolvedParams.builderId || 'HH26-BUILDER';

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://hackerhousegoa2026.dev';
  const canonicalUrl = `${baseUrl}/builder/${builderId}`;
  
  const ogImageUrl = typeof resolvedSearch.builder === 'string'
    ? `${baseUrl}/api/og?builder=${resolvedSearch.builder}`
    : `${baseUrl}/og-preview.png`;

  return {
    title: `Hacker House Goa 2026 — Verified Builder Passport (${builderId})`,
    description: `Official Hacker House Goa 2026 Digital Identity Credential for ${builderId}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Verified Builder Passport — ${builderId}`,
      description: `Official Hacker House Goa 2026 Digital Identity Credential (${builderId}).`,
      url: canonicalUrl,
      siteName: 'Hacker House Goa 2026',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Hacker House Goa 2026 Builder Passport (${builderId})`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Verified Builder Passport — ${builderId}`,
      description: `Official Hacker House Goa 2026 Digital Identity Credential (${builderId}).`,
      images: [ogImageUrl],
    },
  };
}

export default function BuilderPage() {
  return <App />;
}
