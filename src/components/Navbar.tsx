'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Workspace', href: '#workspace' },
  { label: 'Blog', href: '#blog' },
  { label: 'Resources', href: '#resources' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.03] bg-white/[0.86] px-4 backdrop-blur-xl">
      <nav className="container-page">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Logo />
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-semibold text-neutral-700 transition-colors duration-200 hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#downloads"
            className="pill-focus hidden rounded-full bg-black px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 md:inline-flex"
          >
            Download
          </a>
          <button
            type="button"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
            className="pill-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-neutral-200 bg-white p-3 shadow-[0_18px_55px_rgba(0,0,0,0.1)] backdrop-blur-2xl md:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-black"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#downloads"
              onClick={() => setOpen(false)}
              className="mt-2 flex justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Download
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
