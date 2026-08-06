import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { BuilderProvider } from '../src/context/BuilderContext';

export const metadata: Metadata = {
  title: 'Hacker House Goa 2026 — Digital Builder Identity',
  description: 'Generate, verify, and share your official Hacker House Goa 2026 Digital Builder Passport.',
  openGraph: {
    title: 'Hacker House Goa 2026 — Verified Builder Passport',
    description: 'Official Hacker House Goa 2026 Digital Identity Credential.',
    url: 'https://hackerhousegoa2026.dev',
    siteName: 'Hacker House Goa 2026',
    images: [
      {
        url: 'https://hackerhousegoa2026.dev/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Hacker House Goa 2026 Builder Passport',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hacker House Goa 2026 — Verified Builder Passport',
    description: 'Official Hacker House Goa 2026 Digital Identity Credential.',
    images: ['https://hackerhousegoa2026.dev/og-preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BuilderProvider>{children}</BuilderProvider>
      </body>
    </html>
  );
}
