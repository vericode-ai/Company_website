'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Clock3, Download, X } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type DownloadComingSoonContextValue = {
  openDownloadComingSoon: () => void;
};

const DownloadComingSoonContext = createContext<DownloadComingSoonContextValue | null>(null);

export function useDownloadComingSoon() {
  const context = useContext(DownloadComingSoonContext);

  if (!context) {
    throw new Error('useDownloadComingSoon must be used within DownloadComingSoonProvider');
  }

  return context.openDownloadComingSoon;
}

export function DownloadComingSoonProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDownloadComingSoon = useCallback(() => setOpen(true), []);
  const closeDownloadComingSoon = useCallback(() => setOpen(false), []);
  const contextValue = useMemo(() => ({ openDownloadComingSoon }), [openDownloadComingSoon]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDownloadComingSoon();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeDownloadComingSoon, open]);

  return (
    <DownloadComingSoonContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDownloadComingSoon}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="download-coming-soon-title"
              className="relative w-full max-w-md rounded-[1.65rem] border border-neutral-200 bg-white p-6 text-center text-neutral-950 shadow-[0_32px_110px_rgba(0,0,0,0.24)]"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close coming soon card"
                onClick={closeDownloadComingSoon}
                className="pill-focus absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-400 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                <Download className="h-6 w-6" />
              </div>
              <p className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-700">
                <Clock3 className="h-3.5 w-3.5" />
                Coming soon
              </p>
              <h2 id="download-coming-soon-title" className="mt-4 text-3xl font-semibold tracking-normal">
                Downloads are coming soon
              </h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Vericode AI installers are not available yet. The desktop workspace is being prepared for release.
              </p>
              <button
                type="button"
                onClick={closeDownloadComingSoon}
                className="pill-focus mt-7 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </DownloadComingSoonContext.Provider>
  );
}
