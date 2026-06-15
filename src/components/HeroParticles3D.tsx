'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { Color, MathUtils, Object3D } from 'three';
import type { InstancedMesh } from 'three';

const BLUE_COLORS = ['#0a5cff', '#1b63ff', '#2f6dff', '#3c72f4', '#5168d9'];
const WARM_COLORS = ['#ff3b30', '#db3f87', '#9b4fb1', '#6b5bd9'];

function seededParticle(index: number, axis: number) {
  const value = Math.sin(index * 91.17 + axis * 37.31) * 10000;
  return value - Math.floor(value);
}

function CursorParticleHalo() {
  const meshRef = useRef<InstancedMesh>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const sideRef = useRef(1);
  const dummy = useMemo(() => new Object3D(), []);
  const particles = useMemo(() => {
    const count = 150;
    return Array.from({ length: count }, (_, index) => ({
      angle: seededParticle(index + 1700, 0) * Math.PI * 2,
      radius: 1.05 + seededParticle(index + 1700, 1) ** 1.18 * 5.55,
      speed: 0.08 + seededParticle(index + 1700, 2) * 0.28,
      depth: (seededParticle(index + 1700, 3) - 0.5) * 0.86,
      wobble: seededParticle(index + 1700, 4) * Math.PI * 2,
      length: 0.032 + seededParticle(index + 1700, 5) * 0.074,
      thickness: 0.009 + seededParticle(index + 1700, 6) * 0.012,
      tilt: (seededParticle(index + 1700, 7) - 0.5) * 0.18,
      warm: seededParticle(index + 1700, 8) > 0.72,
    }));
  }, []);
  const colors = useMemo(() => {
    return particles.map((particle, index) => {
      const palette = particle.warm ? WARM_COLORS : BLUE_COLORS;
      return new Color(palette[index % palette.length]);
    });
  }, [particles]);

  useEffect(() => {
    if (!meshRef.current) return;

    colors.forEach((color, index) => {
      meshRef.current?.setColorAt(index, color);
    });
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [colors]);

  useEffect(() => {
    const updateTarget = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const y = 0.5 - event.clientY / Math.max(window.innerHeight, 1);
      const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
      targetRef.current.x = x * 8.8 * aspect;
      targetRef.current.y = y * 8.1;
      activeRef.current = true;
      sideRef.current = x < 0 ? -1 : 1;
    };
    const deactivate = (event: PointerEvent) => {
      if (event.relatedTarget === null) activeRef.current = false;
    };
    const deactivateOnBlur = () => {
      activeRef.current = false;
    };

    window.addEventListener('pointermove', updateTarget, { passive: true });
    window.addEventListener('pointerout', deactivate, { passive: true });
    window.addEventListener('blur', deactivateOnBlur);

    return () => {
      window.removeEventListener('pointermove', updateTarget);
      window.removeEventListener('pointerout', deactivate);
      window.removeEventListener('blur', deactivateOnBlur);
    };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;

    const elapsed = clock.getElapsedTime();
    const current = currentRef.current;
    const target = targetRef.current;
    const active = activeRef.current;
    const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    const waveX = sideRef.current * (4.75 * aspect + Math.sin(elapsed * 0.55) * 0.38);
    const waveY = Math.sin(elapsed * 0.42) * 0.35;
    const nextX = active ? target.x : waveX;
    const nextY = active ? target.y : waveY;
    current.x = MathUtils.damp(current.x, nextX, 7.5, delta);
    current.y = MathUtils.damp(current.y, nextY, 7.5, delta);

    particles.forEach((particle, index) => {
      const angle = particle.angle + elapsed * particle.speed;
      const pulse = Math.sin(elapsed * 1.6 + particle.wobble) * 0.18;
      const activeRadius = particle.radius + pulse;

      if (active) {
        const x = current.x + Math.cos(angle) * activeRadius;
        const y = current.y + Math.sin(angle) * activeRadius * 0.78;
        const z = -1.35 + particle.depth + Math.sin(angle * 1.7 + elapsed) * 0.14;
        const scaleBoost = 1 + Math.max(0, 1 - activeRadius / 6.9) * 0.55;

        dummy.position.set(x, y, z);
        dummy.rotation.set(0, 0, angle + particle.tilt);
        dummy.scale.set(particle.length * scaleBoost, particle.thickness * scaleBoost, 1);
      } else {
        const line = index / Math.max(particles.length - 1, 1) - 0.5;
        const wave = Math.sin(elapsed * (0.95 + particle.speed * 0.4) + line * 11 + particle.wobble);
        const x = current.x + wave * 0.58;
        const y = current.y + line * 7.2 + Math.sin(elapsed * 0.7 + particle.wobble) * 0.2;
        const z = -1.35 + particle.depth + wave * 0.28;

        dummy.position.set(x, y, z);
        dummy.rotation.set(0, 0, sideRef.current * 1.42 + wave * 0.08);
        dummy.scale.set(particle.length * 0.8, particle.thickness * 0.74, 1);
      }

      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial transparent opacity={0.62} depthWrite={false} vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

export function HeroParticles3D() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen opacity-75">
      <Canvas camera={{ position: [0, 0, 8.4], fov: 54 }} dpr={[1, 1.15]} gl={{ antialias: false, alpha: true }}>
        <CursorParticleHalo />
      </Canvas>
    </div>
  );
}
