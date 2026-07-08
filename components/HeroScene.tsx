'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sparkles, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/**
 * NOTE ON THE 3D MODEL
 * ---------------------------------------------------------------------------
 * This scene renders a stylised, abstract "silk drapery" form built from
 * primitives + a distort shader, standing in for a couture garment in
 * motion. It keeps the bundle tiny and works with zero external assets.
 *
 * For a photorealistic 3D female fashion model (as referenced in the brief),
 * drop a rigged .glb export (e.g. from Ready Player Me, a Marvelous Designer
 * garment bake, or a commissioned scan) into /public/models/model.glb and
 * replace <DraperyForm /> below with:
 *
 *   const { scene } = useGLTF('/models/model.glb');
 *   return <primitive object={scene} scale={1.4} position={[0, -1.6, 0]} />;
 *
 * Everything else in this file (lighting, particles, scroll camera) will
 * continue to work unchanged around the swapped-in model.
 * ---------------------------------------------------------------------------
 */

function DraperyForm() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={meshRef} scale={1.7}>
          <torusKnotGeometry args={[1, 0.32, 220, 32, 2, 3]} />
          <MeshDistortMaterial
            color="#c9a24b"
            metalness={0.85}
            roughness={0.2}
            distort={0.28}
            speed={1.4}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
      <mesh ref={innerRef} scale={0.55}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 1.2;
      scrollRef.current = Math.min(1, window.scrollY / max);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    const s = scrollRef.current;
    camera.position.z = 6 - s * 2.2;
    camera.position.y = 0.2 + s * 1.4;
    camera.rotation.x = -s * 0.12;
    camera.fov = 45 + s * 6;
    camera.updateProjectionMatrix();
  });

  return null;
}

function MouseParallaxGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (target.current.x - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-target.current.y - groupRef.current.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene() {
  const dpr = useMemo(() => (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1), []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.2, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 6, 14]} />
      <ambientLight intensity={0.35} />
      <spotLight position={[5, 6, 5]} angle={0.35} penumbra={1} intensity={2.2} color="#e4c887" castShadow />
      <pointLight position={[-5, -2, -3]} intensity={0.8} color="#c9a24b" />
      <Environment preset="studio" />

      <MouseParallaxGroup>
        <DraperyForm />
      </MouseParallaxGroup>

      <Sparkles count={140} scale={[9, 6, 6]} size={2.4} speed={0.35} color="#e4c887" opacity={0.7} />
      <ScrollCamera />
    </Canvas>
  );
}
