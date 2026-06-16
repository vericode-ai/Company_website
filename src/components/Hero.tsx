'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IDEPreview } from './IDEPreview';
import { useDownloadComingSoon } from './DownloadComingSoon';
import { LogoMark } from './Logo';

const HeroParticles3D = dynamic(() => import('./HeroParticles3D').then((module) => module.HeroParticles3D), { ssr: false });
const HERO_HEADLINE = 'Build verified software with VeriCode AI';
const TYPE_START_DELAY_MS = 1200;
const TYPE_CHARACTER_DELAY_MS = 70;

function TypingHeadline({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState('');
  const textLines = text.split('\n');
  const visibleLines = visibleText.split('\n');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let index = 0;
    let intervalId: number | undefined;
    const startDelay = window.setTimeout(() => {
      if (reducedMotion) {
        setVisibleText(text);
        return;
      }

      setVisibleText('');
      intervalId = window.setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(intervalId);
        }
      }, TYPE_CHARACTER_DELAY_MS);
    }, TYPE_START_DELAY_MS);

    return () => {
      window.clearTimeout(startDelay);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [text]);

  return (
    <span className="relative block">
      <span aria-hidden="true" className="invisible">
        {textLines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {visibleLines.map((line, index) => (
          <span key={index} className="block">
            {line}
            {index === visibleLines.length - 1 ? (
              <span className="type-cursor-rainbow ml-1 inline-block h-[0.78em] w-[0.055em] translate-y-[0.08em] align-baseline" />
            ) : null}
          </span>
        ))}
      </span>
    </span>
  );
}

export function Hero() {
  const heroHeadlineDisplay = 'Build verified software\nwith VeriCode AI';
  const openDownloadComingSoon = useDownloadComingSoon();

  return (
    <section id="home" className="surface-light relative isolate overflow-hidden pt-28 sm:pt-32 lg:min-h-[980px] lg:pt-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-[980px] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_58%,rgba(250,250,250,0.92)_82%,rgba(255,255,255,0)_100%)]" />
      <div className="precision-grid absolute inset-x-0 top-12 -z-10 mx-auto h-[780px] max-w-7xl opacity-80" />
      <div className="absolute inset-x-0 top-20 -z-10 mx-auto h-[760px] max-w-7xl bg-[radial-gradient(ellipse_at_50%_4%,rgba(0,0,0,0.035),transparent_34%),radial-gradient(ellipse_at_52%_72%,rgba(0,0,0,0.025),transparent_48%)]" />
      <HeroParticles3D />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto h-[720px] max-w-7xl">
        <div className="absolute inset-x-10 top-24 h-72 rounded-[50%] border border-black/[0.045] shadow-[inset_0_0_90px_rgba(0,0,0,0.025)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]" />
        <div className="absolute inset-x-28 top-16 h-96 rounded-[50%] border border-black/[0.04] [mask-image:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]" />
        <div className="absolute inset-x-4 top-40 h-96 bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1.8px)] bg-[length:28px_28px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_68%)]" />
      </div>
      <div className="container-page">
        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <div aria-hidden className="absolute -inset-x-10 -top-10 -z-10 h-[470px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.96),rgba(255,255,255,0.72)_48%,rgba(250,250,250,0.28)_72%,transparent_84%)] blur-xl" />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <LogoMark className="h-16 w-16 rounded-[1.35rem] shadow-[0_20px_62px_rgba(0,0,0,0.08)]" />
          </motion.div>
          <motion.h1
            aria-label={HERO_HEADLINE}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-title-shine max-w-5xl text-balance text-5xl font-semibold tracking-normal sm:text-7xl lg:text-[6.35rem] lg:leading-[0.88]"
          >
            <TypingHeadline text={heroHeadlineDisplay} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-3xl text-pretty text-lg font-medium leading-8 text-neutral-600 sm:text-xl"
          >
            VeriCode AI plans changes, edits your repo, runs checks, captures proof, and turns every agent task into a
            reviewable engineering handoff.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <button
              type="button"
              id="download"
              onClick={openDownloadComingSoon}
              className="pill-focus inline-flex items-center justify-center gap-2 rounded-full border border-black bg-black px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_46px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_22px_60px_rgba(0,0,0,0.18)]"
            >
              <Download className="h-4 w-4" />
              Download for Windows
            </button>
            <a
              href="#use-cases"
              className="pill-focus chrome-edge inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_14px_35px_rgba(0,0,0,0.06)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:text-black"
            >
              Explore use cases
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl lg:mt-14">
          <IDEPreview />
        </div>
      </div>
      <div className="container-page mt-10 flex justify-center lg:mt-8">
        <a
          aria-label="Scroll to product section"
          href="#product"
          className="hidden h-12 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm backdrop-blur sm:flex"
        >
          <span className="h-3 w-px rounded-full bg-black" />
        </a>
      </div>
    </section>
  );
}
