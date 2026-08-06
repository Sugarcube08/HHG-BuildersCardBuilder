import React from 'react';
import type { Metadata } from 'next';
import App from '../../../../src/App';
import { decodeBuilderPayload, validatePayload, getDynamicBaseUrl } from '../../../../src/engine/share/payload';

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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function BuilderPayloadPage() {
  return <App />;
}
