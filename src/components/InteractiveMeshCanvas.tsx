'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  Object3D,
} from 'three';
import type { InstancedMesh, LineSegments } from 'three';

type PointerField = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
};

type SceneProps = {
  reducedMotion: boolean;
  simplified: boolean;
};

function seededValue(index: number, axis: number) {
  const value = Math.sin(index * 127.13 + axis * 53.71) * 10000;
  return value - Math.floor(value);
}

function usePointerField() {
  const pointerRef = useRef<PointerField>({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointerRef.current.targetX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      pointerRef.current.targetY = 0.5 - event.clientY / Math.max(window.innerHeight, 1);
      pointerRef.current.active = event.pointerType !== 'touch';
    };
    const clearPointer = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', clearPointer, { passive: true });
    window.addEventListener('blur', clearPointer);

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('blur', clearPointer);
    };
  }, []);

  return pointerRef;
}

function ParticleMeshField({ pointerRef, reducedMotion, simplified }: SceneProps & { pointerRef: RefObject<PointerField> }) {
  const nodeRef = useRef<InstancedMesh>(null);
  const lineRef = useRef<LineSegments>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const columns = simplified ? 14 : 26;
  const rows = simplified ? 9 : 15;
  const nodes = useMemo(() => {
    const width = 13.8;
    const height = 7.3;
    return Array.from({ length: columns * rows }, (_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const x = (column / Math.max(columns - 1, 1) - 0.5) * width;
      const y = (row / Math.max(rows - 1, 1) - 0.5) * height;
      const jitterX = (seededValue(index + 1200, 0) - 0.5) * 0.16;
      const jitterY = (seededValue(index + 1200, 1) - 0.5) * 0.16;
      return {
        column,
        row,
        x: x + jitterX,
        y: y + jitterY,
        z: -2.8 + seededValue(index + 1200, 2) * 2.2,
        phase: seededValue(index + 1200, 3) * Math.PI * 2,
        color: ['#3B82F6', '#22D3EE', '#8B5CF6'][Math.floor(seededValue(index + 1200, 4) * 3)],
      };
    });
  }, [columns, rows]);
  const linePairs = useMemo(() => {
    const pairs: Array<[number, number]> = [];
    nodes.forEach((node, index) => {
      if (node.column < columns - 1) pairs.push([index, index + 1]);
      if (node.row < rows - 1) pairs.push([index, index + columns]);
      if (!simplified && node.column < columns - 1 && node.row < rows - 1 && (index + node.row) % 4 === 0) pairs.push([index, index + columns + 1]);
    });
    return pairs;
  }, [columns, nodes, rows, simplified]);
  const lineGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(linePairs.length * 6), 3));
    return geometry;
  }, [linePairs.length]);

  useEffect(() => {
    if (!nodeRef.current) return;
    nodes.forEach((node, index) => nodeRef.current?.setColorAt(index, new Color(node.color)));
    if (nodeRef.current.instanceColor) nodeRef.current.instanceColor.needsUpdate = true;
    return () => lineGeometry.dispose();
  }, [lineGeometry, nodes]);

  useFrame(({ clock }, delta) => {
    const pointer = pointerRef.current;
    pointer.x = MathUtils.damp(pointer.x, pointer.active ? pointer.targetX : Math.sin(clock.elapsedTime * 0.17) * 0.2, 5.5, delta);
    pointer.y = MathUtils.damp(pointer.y, pointer.active ? pointer.targetY : Math.cos(clock.elapsedTime * 0.13) * 0.12, 5.5, delta);

    const elapsed = reducedMotion ? 1 : clock.elapsedTime;
    const pointerX = pointer.x * 9.2;
    const pointerY = pointer.y * 5.6;
    const resolved = nodes.map((node) => {
      const distance = Math.hypot(node.x - pointerX, node.y - pointerY);
      const reaction = pointer.active ? Math.max(0, 1 - distance / 3.2) : 0;
      const wave =
        Math.sin(node.x * 0.88 + elapsed * 0.62 + node.phase) * 0.32 +
        Math.cos(node.y * 1.05 + elapsed * 0.5 + node.phase) * 0.22;
      const push = reaction * 0.42;
      const directionX = distance > 0.001 ? (node.x - pointerX) / distance : 0;
      const directionY = distance > 0.001 ? (node.y - pointerY) / distance : 0;

      return {
        x: node.x + directionX * push + Math.sin(elapsed * 0.24 + node.phase) * 0.08,
        y: node.y + directionY * push + Math.cos(elapsed * 0.2 + node.phase) * 0.08,
        z: node.z + wave + reaction * 0.72,
        reaction,
      };
    });

    if (nodeRef.current) {
      resolved.forEach((node, index) => {
        const scale = (simplified ? 0.04 : 0.034) * (1 + node.reaction * 2.4);
        dummy.position.set(node.x, node.y, node.z);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        nodeRef.current?.setMatrixAt(index, dummy.matrix);
      });
      nodeRef.current.instanceMatrix.needsUpdate = true;
    }

    if (lineRef.current) {
      const attribute = lineGeometry.getAttribute('position') as BufferAttribute;
      const array = attribute.array as Float32Array;
      linePairs.forEach(([start, end], pairIndex) => {
        const offset = pairIndex * 6;
        array[offset] = resolved[start].x;
        array[offset + 1] = resolved[start].y;
        array[offset + 2] = resolved[start].z;
        array[offset + 3] = resolved[end].x;
        array[offset + 4] = resolved[end].y;
        array[offset + 5] = resolved[end].z;
      });
      attribute.needsUpdate = true;
    }
  });

  return (
    <group rotation={[-0.42, 0, 0]} position={[0.45, -0.7, -0.9]}>
      <lineSegments ref={lineRef} geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial color="#22D3EE" transparent opacity={simplified ? 0.18 : 0.24} blending={AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodeRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0.94} depthWrite={false} vertexColors toneMapped={false} blending={AdditiveBlending} />
      </instancedMesh>
    </group>
  );
}

function ParticleField({ pointerRef, reducedMotion, simplified }: SceneProps & { pointerRef: RefObject<PointerField> }) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const particles = useMemo(() => {
    const count = simplified ? 72 : 170;
    return Array.from({ length: count }, (_, index) => ({
      baseX: (seededValue(index, 0) - 0.5) * 14,
      baseY: (seededValue(index, 1) - 0.5) * 6.6,
      baseZ: -3.8 + seededValue(index, 2) * 5.5,
      speed: 0.12 + seededValue(index, 3) * 0.38,
      size: 0.018 + seededValue(index, 4) * 0.045,
      phase: seededValue(index, 5) * Math.PI * 2,
      color: ['#3B82F6', '#22D3EE', '#8B5CF6'][Math.floor(seededValue(index, 6) * 3)],
    }));
  }, [simplified]);

  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, index) => meshRef.current?.setColorAt(index, new Color(particle.color)));
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [particles]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pointer = pointerRef.current;
    const elapsed = reducedMotion ? 1 : clock.elapsedTime;

    particles.forEach((particle, index) => {
      const orbit = reducedMotion ? 0 : Math.sin(elapsed * particle.speed + particle.phase);
      const pointerX = pointer.x * 7.5;
      const pointerY = pointer.y * 4.6;
      const distance = Math.hypot(particle.baseX - pointerX, particle.baseY - pointerY);
      const reaction = pointer.active ? Math.max(0, 1 - distance / 3.4) : 0;
      const pushX = reaction * (particle.baseX - pointerX) * 0.28;
      const pushY = reaction * (particle.baseY - pointerY) * 0.28;

      dummy.position.set(
        particle.baseX + orbit * 0.15 + pushX,
        particle.baseY + Math.cos(elapsed * particle.speed + particle.phase) * 0.13 + pushY,
        particle.baseZ + Math.sin(elapsed * 0.24 + particle.phase) * 0.18,
      );
      const scale = particle.size * (1 + reaction * 2.1);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]} frustumCulled={false}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.82} depthWrite={false} vertexColors toneMapped={false} blending={AdditiveBlending} />
    </instancedMesh>
  );
}

function NeuralNetwork({ pointerRef, reducedMotion, simplified }: SceneProps & { pointerRef: RefObject<PointerField> }) {
  const nodeRef = useRef<InstancedMesh>(null);
  const lineRef = useRef<LineSegments>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const nodes = useMemo(() => {
    const count = simplified ? 13 : 24;
    return Array.from({ length: count }, (_, index) => ({
      x: (seededValue(index + 600, 0) - 0.5) * 11.8,
      y: (seededValue(index + 600, 1) - 0.5) * 4.9 + 0.55,
      z: -2.7 + seededValue(index + 600, 2) * 3.1,
      phase: seededValue(index + 600, 3) * Math.PI * 2,
      color: seededValue(index + 600, 4) > 0.52 ? '#22D3EE' : '#8B5CF6',
    }));
  }, [simplified]);
  const linePairs = useMemo(
    () =>
      nodes.flatMap((_, index) => {
        if (index % 3 === 0) return [[index, (index + 4) % nodes.length]];
        if (index % 4 === 0) return [[index, (index + 7) % nodes.length]];
        return [[index, (index + 2) % nodes.length]];
      }),
    [nodes],
  );
  const lineGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(linePairs.length * 6), 3));
    return geometry;
  }, [linePairs.length]);

  useEffect(() => {
    if (!nodeRef.current) return;
    nodes.forEach((node, index) => nodeRef.current?.setColorAt(index, new Color(node.color)));
    if (nodeRef.current.instanceColor) nodeRef.current.instanceColor.needsUpdate = true;
    return () => lineGeometry.dispose();
  }, [lineGeometry, nodes]);

  useFrame(({ clock }) => {
    const elapsed = reducedMotion ? 1 : clock.elapsedTime;
    const pointer = pointerRef.current;
    const resolved = nodes.map((node) => {
      const glow = Math.sin(elapsed * 0.8 + node.phase) * 0.08;
      const cursorLift = pointer.active ? Math.max(0, 1 - Math.hypot(node.x - pointer.x * 7.5, node.y - pointer.y * 4.6) / 4) * 0.42 : 0;
      return {
        x: node.x + Math.sin(elapsed * 0.22 + node.phase) * 0.18,
        y: node.y + Math.cos(elapsed * 0.2 + node.phase) * 0.16 + cursorLift,
        z: node.z + glow,
      };
    });

    if (nodeRef.current) {
      resolved.forEach((node, index) => {
        dummy.position.set(node.x, node.y, node.z);
        dummy.scale.setScalar(0.045);
        dummy.updateMatrix();
        nodeRef.current?.setMatrixAt(index, dummy.matrix);
      });
      nodeRef.current.instanceMatrix.needsUpdate = true;
    }

    if (lineRef.current) {
      const attribute = lineGeometry.getAttribute('position') as BufferAttribute;
      const array = attribute.array as Float32Array;
      linePairs.forEach(([start, end], pairIndex) => {
        const offset = pairIndex * 6;
        array[offset] = resolved[start].x;
        array[offset + 1] = resolved[start].y;
        array[offset + 2] = resolved[start].z;
        array[offset + 3] = resolved[end].x;
        array[offset + 4] = resolved[end].y;
        array[offset + 5] = resolved[end].z;
      });
      attribute.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={lineRef} geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial color="#3B82F6" transparent opacity={simplified ? 0.16 : 0.24} blending={AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodeRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial transparent opacity={0.9} vertexColors toneMapped={false} blending={AdditiveBlending} />
      </instancedMesh>
    </group>
  );
}

function MeshScene({ reducedMotion, simplified }: SceneProps) {
  const pointerRef = usePointerField();

  return (
    <>
      <color attach="background" args={['#05060A']} />
      <ambientLight intensity={0.5} />
      <ParticleMeshField pointerRef={pointerRef} reducedMotion={reducedMotion} simplified={simplified} />
      <NeuralNetwork pointerRef={pointerRef} reducedMotion={reducedMotion} simplified={simplified} />
      <ParticleField pointerRef={pointerRef} reducedMotion={reducedMotion} simplified={simplified} />
    </>
  );
}

export function InteractiveMeshCanvas({ reducedMotion, simplified }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.1, 8.7], fov: simplified ? 56 : 50 }}
      dpr={simplified ? [1, 1.1] : [1, 1.45]}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
    >
      <MeshScene reducedMotion={reducedMotion} simplified={simplified} />
    </Canvas>
  );
}
