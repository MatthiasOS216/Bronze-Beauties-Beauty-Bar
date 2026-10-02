'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import type { Group, PointLight } from 'three';

/**
 * "The Bronze Drop": a slowly morphing liquid-metal form wrapped in a fine
 * golden mist (a nod to the spray-tan mist). The environment is built from
 * procedural light panels, so no HDR file is downloaded.
 */
function Drop({ compact }: { compact: boolean }) {
  const group = useRef<Group>(null);
  const key = useRef<PointLight>(null);
  const { pointer, viewport } = useThree();
  // Desktop: sit to the right of the headline. Mobile: tuck into the top-right corner, behind the eyebrow.
  const anchor: [number, number, number] = compact
    ? [viewport.width * 0.32, viewport.height * 0.24, -0.6]
    : [viewport.width * 0.25, 0, 0];

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      g.rotation.y += delta * 0.12;
      g.rotation.x += (pointer.y * 0.25 - g.rotation.x) * 0.04;
    }
    const l = key.current;
    if (l) {
      // Key light follows the cursor: the surface catches light where you point.
      l.position.x += (pointer.x * viewport.width * 0.6 - l.position.x) * 0.06;
      l.position.y += (pointer.y * viewport.height * 0.6 - l.position.y) * 0.06;
    }
  });

  return (
    <>
      <pointLight ref={key} position={[2, 1, 3]} intensity={18} color="#ffd9a0" distance={12} />
      <group ref={group} position={anchor}>
        <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
          <mesh scale={compact ? 0.9 : 1.3}>
            <icosahedronGeometry args={[1, compact ? 48 : 96]} />
            <MeshDistortMaterial
              color="#c8894a"
              metalness={1}
              roughness={0.16}
              distort={0.34}
              speed={1.3}
              envMapIntensity={2.1}
            />
          </mesh>
        </Float>
      </group>
      <Sparkles
        count={compact ? 70 : 180}
        scale={compact ? [5, 6, 3] : [8, 5.5, 4]}
        size={compact ? 2.2 : 2.8}
        speed={0.28}
        opacity={0.85}
        color="#e8cf95"
        noise={0.6}
      />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#3b2416']} />
        <Lightformer form="rect" intensity={6} color="#ffe2b0" position={[0, 4, -6]} scale={[14, 3, 1]} />
        <Lightformer form="rect" intensity={3} color="#f3c98a" position={[0, -4, -4]} scale={[14, 2, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#d9a45a" position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#7a4a24" position={[6, -1, 0]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.1} color="#e7b77a" position={[0, 0, 9]} scale={[16, 10, 1]} />
        <Lightformer form="ring" intensity={3} color="#fff1d6" position={[2, 2, 5]} scale={2.2} />
      </Environment>
    </>
  );
}

export default function BronzeDrop({ onReady }: { onReady?: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [compact] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden));
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
          requestAnimationFrame(() => onReady?.());
        }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.15} />
        <Drop compact={compact} />
      </Canvas>
    </div>
  );
}
