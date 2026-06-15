'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  relX: number;
  relY: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  angle: number;
  hue: number;
  alpha: number;
  drift: number;
  zone: 'burst' | 'warm' | 'sparse';
};

function seededValue(index: number, axis: number) {
  const value = Math.sin(index * 113.37 + axis * 41.91) * 10000;
  return value - Math.floor(value);
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let animationId = 0;
    let lastDrawTime = 0;
    const frameInterval = 1000 / 30;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles: Particle[] = [];
    const defaultCenter = { x: 0, y: 0 };
    const currentCenter = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0, active: false, side: 1 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      const burstCenterX = width * 0.5;
      const burstCenterY = Math.min(height * 0.52, 470);
      const spread = Math.min(width, height) * 0.68;
      const burstCount = 170;
      const warmCount = 38;
      const sparseCount = 72;
      defaultCenter.x = burstCenterX;
      defaultCenter.y = burstCenterY;
      currentCenter.x = cursor.active ? cursor.x : burstCenterX;
      currentCenter.y = cursor.active ? cursor.y : burstCenterY;

      for (let index = 0; index < burstCount; index += 1) {
        const angle = seededValue(index, 0) * Math.PI * 2;
        const radius = (0.1 + seededValue(index, 1) ** 1.35 * 0.94) * spread;
        const x = burstCenterX + Math.cos(angle) * radius * 0.95;
        const y = burstCenterY + Math.sin(angle) * radius * 1.12;

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          relX: x - burstCenterX,
          relY: y - burstCenterY,
          vx: (seededValue(index, 2) - 0.5) * 0.22,
          vy: (seededValue(index, 3) - 0.5) * 0.18,
          length: 3.5 + seededValue(index, 4) * 7.5,
          width: 1.35 + seededValue(index, 5) * 1.95,
          angle,
          hue: 218 + seededValue(index, 6) * 46,
          alpha: 0.42 + seededValue(index, 7) * 0.46,
          drift: seededValue(index, 8) * Math.PI * 2,
          zone: 'burst',
        });
      }

      for (let index = 0; index < warmCount; index += 1) {
        const particleIndex = index + burstCount;
        const x = width * (0.035 + seededValue(particleIndex, 0) * 0.18);
        const y = Math.min(height * 0.82, 760) * (0.5 + seededValue(particleIndex, 1) * 0.42);
        const angle = Math.atan2(y - burstCenterY, x - burstCenterX);

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          relX: x - burstCenterX,
          relY: y - burstCenterY,
          vx: (seededValue(particleIndex, 2) - 0.5) * 0.16,
          vy: (seededValue(particleIndex, 3) - 0.5) * 0.16,
          length: 3.5 + seededValue(particleIndex, 4) * 6,
          width: 1.6 + seededValue(particleIndex, 5) * 1.8,
          angle,
          hue: seededValue(particleIndex, 6) > 0.42 ? 348 + seededValue(particleIndex, 7) * 20 : 28 + seededValue(particleIndex, 8) * 32,
          alpha: 0.5 + seededValue(particleIndex, 9) * 0.42,
          drift: seededValue(particleIndex, 10) * Math.PI * 2,
          zone: 'warm',
        });
      }

      for (let index = 0; index < sparseCount; index += 1) {
        const particleIndex = index + burstCount + warmCount;
        const x = width * (0.5 + seededValue(particleIndex, 0) * 0.48);
        const y = Math.min(height * 0.92, 840) * (0.08 + seededValue(particleIndex, 1) * 0.86);
        const angle = Math.atan2(y - burstCenterY, x - burstCenterX);

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          relX: x - burstCenterX,
          relY: y - burstCenterY,
          vx: (seededValue(particleIndex, 2) - 0.5) * 0.1,
          vy: (seededValue(particleIndex, 3) - 0.5) * 0.1,
          length: 1.2 + seededValue(particleIndex, 4) * 2.8,
          width: 0.7 + seededValue(particleIndex, 5) * 0.9,
          angle,
          hue: 220 + seededValue(particleIndex, 6) * 34,
          alpha: 0.1 + seededValue(particleIndex, 7) * 0.24,
          drift: seededValue(particleIndex, 8) * Math.PI * 2,
          zone: 'sparse',
        });
      }
    };

    const updateCursor = (event: PointerEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      cursor.active = true;
      cursor.side = event.clientX < width / 2 ? -1 : 1;
    };

    const deactivateCursor = (event: PointerEvent) => {
      if (event.relatedTarget === null) cursor.active = false;
    };

    const deactivateOnBlur = () => {
      cursor.active = false;
    };

    const draw = (timestamp = 0) => {
      animationId = window.requestAnimationFrame(draw);
      if (!reducedMotion && timestamp - lastDrawTime < frameInterval) return;
      lastDrawTime = timestamp;

      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(Math.min(0.72, 900 / Math.max(height, 1)), '#ffffff');
      gradient.addColorStop(1, '#ffffff');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      const sideWaveX = cursor.side < 0 ? width * 0.16 : width * 0.84;
      const sideWaveY = height * 0.5 + Math.sin(frame / 90) * Math.min(height * 0.08, 54);
      const targetCenterX = cursor.active ? cursor.x : sideWaveX;
      const targetCenterY = cursor.active ? cursor.y : sideWaveY;
      currentCenter.x += (targetCenterX - currentCenter.x) * 0.1;
      currentCenter.y += (targetCenterY - currentCenter.y) * 0.1;
      const heroCenterY = Math.min(height * 0.52, 470);
      const centerDistance = Math.hypot(currentCenter.x - width * 0.5, currentCenter.y - heroCenterY);
      const centerReaction = cursor.active ? Math.max(0, 1 - centerDistance / Math.max(Math.min(width, height) * 0.55, 1)) : 0;
      const fieldSpread = Math.min(width, height) * 0.68;

      particles.forEach((particle, index) => {
        const radius = Math.hypot(particle.relX, particle.relY);
        const radialAngle = Math.atan2(particle.relY, particle.relX);
        const normalizedRadius = Math.min(radius / Math.max(fieldSpread, 1), 1);
        const innerWeight = Math.max(0, 1 - normalizedRadius);
        const zoneScale = cursor.active
          ? particle.zone === 'sparse'
            ? 1.18 + centerReaction * 0.34
            : 1.08 + centerReaction * (particle.zone === 'warm' ? 0.22 : 0.38)
          : particle.zone === 'sparse'
            ? 0.45
            : 0.28;
        const cursorPush =
          cursor.active && particle.zone !== 'sparse'
            ? centerReaction * (particle.zone === 'warm' ? 72 : 118) * (0.22 + innerWeight)
            : centerReaction * 28 * innerWeight;
        const ringRipple = cursor.active
          ? Math.sin(frame / 32 + particle.drift + normalizedRadius * 8) * centerReaction * 16
          : 0;
        const sideWave = cursor.active ? 0 : Math.sin(frame / 42 + particle.drift + particle.relY * 0.012) * 42;

        if (!reducedMotion) {
          const wave = Math.sin(frame / 120 + particle.drift) * (particle.zone === 'sparse' ? 1.1 : 2.8);
          const activeRadius = radius * zoneScale + cursorPush + ringRipple;
          particle.x =
            currentCenter.x +
            (cursor.active ? Math.cos(radialAngle) * activeRadius : particle.relX * zoneScale) +
            sideWave +
            particle.vx * 12 +
            Math.cos(particle.drift + frame / 150) * wave;
          particle.y =
            currentCenter.y +
            (cursor.active ? Math.sin(radialAngle) * activeRadius * 1.08 : particle.relY * 0.82) +
            particle.vy * 12 +
            Math.sin(particle.drift + frame / 170) * wave;
        } else {
          const activeRadius = radius * zoneScale + cursorPush;
          particle.x = currentCenter.x + (cursor.active ? Math.cos(radialAngle) * activeRadius : particle.relX * zoneScale);
          particle.y = currentCenter.y + (cursor.active ? Math.sin(radialAngle) * activeRadius * 1.08 : particle.relY * 0.82);
        }

        const dashAngle = Math.atan2(particle.y - currentCenter.y, particle.x - currentCenter.x) + Math.sin(frame / 180 + particle.drift) * 0.08;
        const reactionLength = 1 + centerReaction * (particle.zone === 'burst' ? 0.82 : 0.32);
        const halfLength = (particle.length * reactionLength) / 2;
        const startX = particle.x - Math.cos(dashAngle) * halfLength;
        const startY = particle.y - Math.sin(dashAngle) * halfLength;
        const endX = particle.x + Math.cos(dashAngle) * halfLength;
        const endY = particle.y + Math.sin(dashAngle) * halfLength;
        const alpha = Math.min(0.96, particle.alpha * (particle.zone === 'sparse' ? 0.72 : 1) * (1 + centerReaction * 0.28));

        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.strokeStyle = `hsla(${particle.hue}, 88%, ${particle.zone === 'sparse' ? 44 : 54}%, ${alpha})`;
        context.lineWidth = particle.width * (1 + centerReaction * (particle.zone === 'burst' ? 0.18 : 0.08));
        context.lineCap = 'round';
        context.stroke();

        if (index % 23 === 0 && particle.zone !== 'sparse') {
          const next = particles[(index + 9) % particles.length];
          const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
          if (distance < 86) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = `hsla(${particle.hue}, 88%, 56%, ${0.035 * (1 - distance / 86)})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      });

      frame += 1;
    };

    const handleResize = () => {
      resize();
      seed();
    };

    resize();
    seed();
    draw();
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', updateCursor, { passive: true });
    window.addEventListener('pointerout', deactivateCursor, { passive: true });
    window.addEventListener('blur', deactivateOnBlur);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', updateCursor);
      window.removeEventListener('pointerout', deactivateCursor);
      window.removeEventListener('blur', deactivateOnBlur);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-90" />;
}
