import React from 'react';
import type { Metadata } from 'next';
import App from '../../../src/App';
import { decodeBase64ToPayload } from '../../../src/engine/qr/decodeBuilder';
import { validateBuilderPayload } from '../../../src/engine/qr/validation';

interface Props {
  params: Promise<{ builderId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const builderId = resolvedParams.builderId || 'HH26-BUILDER';

  let builderName = 'Verified Builder';
  let builderRole = 'Hacker';

  const builderParam = typeof resolvedSearch.builder === 'string' ? resolvedSearch.builder : undefined;
  if (builderParam) {
    const raw = decodeBase64ToPayload(builderParam);
    const payload = validateBuilderPayload(raw);
    if (payload) {
      builderName = payload.name || builderName;
      builderRole = payload.role || builderRole;
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://hackerhousegoa2026.dev';
  const canonicalUrl = `${baseUrl}/builder/${builderId}${builderParam ? `?builder=${builderParam}` : ''}`;
  
  const title = `Hacker House Goa 2026 — ${builderName} (${builderRole})`;
  const description = `Official Hacker House Goa 2026 Digital Identity Credential for ${builderName} [ID: ${builderId}].`;

  return {
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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function BuilderPage() {
  return <App />;
}
