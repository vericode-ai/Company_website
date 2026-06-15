import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vericode AI | Next-generation AI IDE',
  description:
    'Plan, code, debug, test, and deploy with autonomous AI agents that work across your editor, terminal, browser, and workspace.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
