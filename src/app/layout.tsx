import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Vericode AI | Next-generation AI IDE',
  description:
    'Plan, code, debug, test, and deploy with autonomous AI agents that work across your editor, terminal, browser, and workspace.',
  icons: {
    icon: [{ url: '/vericode-logo-mark-white.png', type: 'image/png' }],
    shortcut: ['/vericode-logo-mark-white.png'],
    apple: [{ url: '/vericode-logo-mark.png', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
