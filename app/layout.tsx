import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { BuilderProvider } from '../src/context/BuilderContext';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://hackerhousegoa2026.dev';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Hacker House Goa 2026 — Digital Builder Identity',
  description: 'Generate, verify, and share your official Hacker House Goa 2026 Digital Builder Passport.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Hacker House Goa 2026 — Verified Builder Passport',
    description: 'Official Hacker House Goa 2026 Digital Identity Credential.',
    url: baseUrl,
    siteName: 'Hacker House Goa 2026',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hacker House Goa 2026 — Verified Builder Passport',
    description: 'Official Hacker House Goa 2026 Digital Identity Credential.',
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
