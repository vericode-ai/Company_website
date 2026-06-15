'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

type InteractiveCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
} & Omit<HTMLMotionProps<'article'>, 'children' | 'className'>;

export function InteractiveCard({ children, className = '', intensity = 10, onPointerEnter, onPointerMove, onPointerLeave, ...props }: InteractiveCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 260, damping: 26 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 260, damping: 26 });
  const glowX = useTransform(pointerX, [-0.5, 0.5], ['18%', '82%']);
  const glowY = useTransform(pointerY, [-0.5, 0.5], ['18%', '82%']);

  return (
    <motion.article
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -7, scale: 1.012 }}
      whileTap={{ scale: 0.992 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        cardRef.current?.animate(
          [
            { boxShadow: '0 20px 70px rgba(0,0,0,0.08)' },
            { boxShadow: '0 30px 90px rgba(0,0,0,0.18)' },
            { boxShadow: '0 22px 70px rgba(0,0,0,0.1)' },
          ],
          { duration: 620, easing: 'cubic-bezier(.22,1,.36,1)' },
        );
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        event.currentTarget.style.setProperty('--spot-x', `${x * 100}%`);
        event.currentTarget.style.setProperty('--spot-y', `${y * 100}%`);
        pointerX.set(x - 0.5);
        pointerY.set(y - 0.5);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        pointerX.set(0);
        pointerY.set(0);
      }}
      className={`fancy-interactive group relative overflow-hidden will-change-transform ${className}`}
      {...props}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute h-36 w-36 rounded-full bg-black/[0.1] blur-2xl"
        style={{ left: glowX, top: glowY, x: '-50%', y: '-50%' }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.42)_45%,transparent_70%)] opacity-0 transition duration-700 group-hover:translate-x-[120%] group-hover:opacity-100"
      />
      <div className="relative" style={{ transform: 'translateZ(24px)' }}>
        {children}
      </div>
    </motion.article>
  );
}
