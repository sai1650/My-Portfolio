import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState<'init' | 'name' | 'role' | 'zoom' | 'done'>('init');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup for Intro Orb & Particle Trails
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Glowing energy core point
    const coreGeo = new THREE.IcosahedronGeometry(0.1, 4);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Dynamic light trails & particles
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 1.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 1.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 1.5;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x246bfd,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Outer Expanding Ring
    const ringGeo = new THREE.RingGeometry(0.3, 0.32, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7955ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const time = clock.getElapsedTime();

      // Core development & scale over time
      const scale = Math.min(1 + time * 0.6, 2.2);
      coreMesh.scale.set(scale, scale, scale);
      coreMesh.rotation.y = time * 0.8;
      coreMesh.rotation.x = time * 0.5;

      ring.rotation.z = -time * 0.5;
      ring.scale.set(scale * 1.4, scale * 1.4, 1);

      // Particle motion
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += particleVelocities[i].x;
        pos[i * 3 + 1] += particleVelocities[i].y;
        pos[i * 3 + 2] += particleVelocities[i].z;

        // Orbit pull
        const dist = Math.hypot(pos[i * 3], pos[i * 3 + 1]);
        if (dist > 3) {
          pos[i * 3] = (Math.random() - 0.5) * 0.5;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Camera forward movement on zoom stage
      if (camera.position.z > 1.2 && clock.getElapsedTime() > 2.5) {
        camera.position.z -= 0.04;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Timed choreography matching brief
    // 0s - 0.9s: SYSTEM INITIALIZED
    // 0.9s - 1.9s: SAI GADDAM
    // 1.9s - 2.8s: AI ENGINEER / DIGITAL BUILDER
    // 2.8s - 3.4s: Zoom into main site
    const t1 = setTimeout(() => setStage('name'), 900);
    const t2 = setTimeout(() => setStage('role'), 1900);
    const t3 = setTimeout(() => setStage('zoom'), 2800);
    const t4 = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 3500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 cursor-pointer ${
        stage === 'zoom'
          ? 'scale-110 opacity-0 pointer-events-none'
          : stage === 'done'
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
      }`}
      title="Click anywhere to skip intro"
    >
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Sequential Editorial Text Reveals */}
      <div className="relative z-10 text-center select-none px-4">
        {/* Step 1: SYSTEM INITIALIZED */}
        <div
          className={`font-mono text-xs tracking-[0.3em] uppercase text-[#00C8FF] transition-all duration-500 mb-3 ${
            stage === 'init'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-40 translate-y-0 scale-95'
          }`}
        >
          SYSTEM INITIALIZED
        </div>

        {/* Step 2: SAI GADDAM */}
        <h1
          className={`font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight text-white transition-all duration-700 ${
            stage === 'name' || stage === 'role' || stage === 'zoom'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          SAI GADDAM
        </h1>

        {/* Step 3: AI ENGINEER / DIGITAL BUILDER */}
        <div
          className={`font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-slate-300 transition-all duration-500 mt-3 ${
            stage === 'role' || stage === 'zoom'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          AI ENGINEER &bull; DIGITAL BUILDER
        </div>
      </div>

      {/* Skip button in bottom corner */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={onComplete}
          className="px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          SKIP INTRO [ESC]
        </button>
      </div>
    </div>
  );
};
