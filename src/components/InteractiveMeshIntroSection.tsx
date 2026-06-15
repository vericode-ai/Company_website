'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, TerminalSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

const InteractiveMeshCanvas = dynamic(
  () => import('./InteractiveMeshCanvas').then((module) => module.InteractiveMeshCanvas),
  { ssr: false },
);

const codeFragments = [
  'const agent = await VeriCode.plan(task)',
  'debug.trace(issue).explain()',
  'tests.run({ proof: true })',
  'fix.apply(context)',
  'build.beyondLimits()',
  'workspace.learn(repo)',
  'review.evidence.capture()',
  'ship.when(confident)',
];

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function InteractiveMeshIntroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [simplified, setSimplified] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMode = () => setSimplified(mediaQuery.matches);
    const frameId = window.requestAnimationFrame(() => {
      setWebglAvailable(canUseWebGL());
      updateMode();
    });

    mediaQuery.addEventListener('change', updateMode);
    return () => {
      window.cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener('change', updateMode);
    };
  }, []);

  const fragmentStyles = useMemo(
    () =>
      codeFragments.map((_, index) => ({
        left: `${8 + ((index * 17) % 78)}%`,
        top: `${14 + ((index * 23) % 64)}%`,
        animationDelay: `${index * 0.42}s`,
        animationDuration: `${9 + (index % 4) * 1.7}s`,
      })),
    [],
  );

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section || event.pointerType === 'touch') return;

    const bounds = section.getBoundingClientRect();
    section.style.setProperty('--mesh-cursor-x', `${event.clientX - bounds.left}px`);
    section.style.setProperty('--mesh-cursor-y', `${event.clientY - bounds.top}px`);
    section.style.setProperty('--mesh-cursor-opacity', '1');
  };

  const handlePointerLeave = () => {
    sectionRef.current?.style.setProperty('--mesh-cursor-opacity', '0');
  };

  return (
    <section
      ref={sectionRef}
      id="workspace"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="mesh-intro-section relative isolate mx-[10px] flex min-h-screen overflow-hidden rounded-[28px] border border-white/10 bg-[#05060A] text-[#F8FAFC]"
    >
      <div className="absolute inset-0 bg-black" />
      <motion.div
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.2, delay: 0.18, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 z-20 bg-black"
      />
      <div aria-hidden className="mesh-intro-ripple pointer-events-none absolute inset-0 z-10" />
      <div aria-hidden className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_28%_42%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_76%_58%,rgba(139,92,246,0.18),transparent_35%),linear-gradient(180deg,rgba(5,6,10,0)_0%,rgba(5,6,10,0.28)_50%,rgba(5,6,10,0.82)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[2] bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[length:72px_72px] opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_72%)]" />

      <div className="absolute inset-0 z-0">
        {webglAvailable ? (
          <InteractiveMeshCanvas reducedMotion={Boolean(prefersReducedMotion)} simplified={simplified || Boolean(prefersReducedMotion)} />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_72%,rgba(34,211,238,0.24),transparent_42%),linear-gradient(180deg,#05060A,#000000)]" />
        )}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3]">
        {codeFragments.map((fragment, index) => (
          <span
            key={fragment}
            style={fragmentStyles[index]}
            className="mesh-code-fragment absolute hidden max-w-[15rem] whitespace-nowrap font-mono text-[11px] text-cyan-100/45 blur-[0.1px] sm:block"
          >
            {fragment}
          </span>
        ))}
      </div>

      <div className="container-page relative z-10 flex min-h-screen items-center pt-24">
        <div className="max-w-4xl pb-24 pt-16 sm:pb-28 lg:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-6xl font-semibold tracking-normal text-[#F8FAFC] drop-shadow-[0_0_42px_rgba(34,211,238,0.24)] sm:text-7xl lg:text-[7.5rem] lg:leading-[0.9]"
          >
            VeriCode AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.72, delay: 1.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-pretty text-2xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Code Smarter. Debug Faster. Build Beyond Limits.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.72, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#94A3B8] sm:text-lg sm:leading-8"
          >
            An intelligent AI workspace for coding, debugging, learning, and building software faster.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.68, delay: 1.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9"
          >
            <a
              href="#product"
              className="mesh-intro-button pill-focus group inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_42px_rgba(34,211,238,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-100/70 hover:bg-cyan-200/18 hover:shadow-[0_0_62px_rgba(34,211,238,0.36)]"
            >
              <TerminalSquare className="h-4 w-4 text-cyan-200" />
              Enter Workspace
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-b from-transparent via-[#05060A]/80 to-white" />
    </section>
  );
}
