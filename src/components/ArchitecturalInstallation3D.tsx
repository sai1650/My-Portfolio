import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

export const ArchitecturalInstallation3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0d11, 0.08);

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 750;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Low-angle dramatic architectural perspective
    camera.position.set(0.6, -0.4, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Root architectural pavilion group
    const pavilionGroup = new THREE.Group();
    scene.add(pavilionGroup);

    // 2. High-Contrast Architectural Lighting
    const ambientLight = new THREE.AmbientLight(0x1a1e28, 1.2);
    scene.add(ambientLight);

    // Main sharp sunbeam highlighting architectural edges
    const sunLight = new THREE.DirectionalLight(0xfff6ea, 3.2);
    sunLight.position.set(5, 8, 6);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // High-visibility Electric Orange Accent Rim Light
    const orangeRim = new THREE.PointLight(0xff5500, 4.5, 20);
    orangeRim.position.set(-3.5, -1.5, 3.5);
    scene.add(orangeRim);

    // Acid Lime Ground Fill Light
    const limeFill = new THREE.PointLight(0xccff00, 2.0, 15);
    limeFill.position.set(3, -4, 2);
    scene.add(limeFill);

    // 3. Brutalist Architectural Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x181c26,
      metalness: 0.88,
      roughness: 0.25,
      flatShading: true,
    });

    const concreteDarkMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      metalness: 0.4,
      roughness: 0.75,
      flatShading: true,
    });

    const brushedSteelMat = new THREE.MeshStandardMaterial({
      color: 0x282f40,
      metalness: 0.92,
      roughness: 0.2,
      flatShading: true,
    });

    const laserOrangeMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const laserLimeMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    // 4. COMPUTATIONAL ARCHITECTURAL MONOLITHS
    const movingSlabs: THREE.Mesh[] = [];

    // Monolith A: Towering Central Oblique Slab
    const slabA = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.2, 0.45), titaniumMat);
    slabA.position.set(-0.6, 0.4, -0.2);
    slabA.rotation.y = Math.PI / 10;
    slabA.rotation.z = -Math.PI / 28;
    pavilionGroup.add(slabA);
    movingSlabs.push(slabA);

    // Monolith B: Massive Horizontal Cantilever Roof Beam
    const slabB = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.28, 1.8), brushedSteelMat);
    slabB.position.set(0.4, 1.2, 0.2);
    slabB.rotation.y = -Math.PI / 8;
    slabB.rotation.z = Math.PI / 32;
    pavilionGroup.add(slabB);
    movingSlabs.push(slabB);

    // Monolith C: Intersecting Stepped Vertical Fin
    const slabC = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.4, 1.2), concreteDarkMat);
    slabC.position.set(1.5, -0.5, -0.4);
    slabC.rotation.y = Math.PI / 6;
    pavilionGroup.add(slabC);
    movingSlabs.push(slabC);

    // Monolith D: Sub-level Platform Foundation
    const slabD = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.2, 3.2), concreteDarkMat);
    slabD.position.set(0, -2.1, 0);
    slabD.rotation.y = -Math.PI / 12;
    pavilionGroup.add(slabD);

    // 5. SURGICAL LASER DATUM LINES (Orange & Acid Lime)
    // Laser 1: Horizontal Orange Guide along Cantilever Beam
    const laser1 = new THREE.Mesh(new THREE.BoxGeometry(4.62, 0.025, 0.04), laserOrangeMat);
    laser1.position.set(0.4, 1.35, 1.1);
    laser1.rotation.y = -Math.PI / 8;
    laser1.rotation.z = Math.PI / 32;
    pavilionGroup.add(laser1);

    // Laser 2: Vertical Acid-Lime Alignment Line on Fin
    const laser2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 3.42, 0.03), laserLimeMat);
    laser2.position.set(1.68, -0.5, 0.21);
    laser2.rotation.y = Math.PI / 6;
    pavilionGroup.add(laser2);

    // Laser 3: Orange Base Registration Line
    const laser3 = new THREE.Mesh(new THREE.BoxGeometry(5.22, 0.02, 0.03), laserOrangeMat);
    laser3.position.set(0, -1.98, 1.62);
    laser3.rotation.y = -Math.PI / 12;
    pavilionGroup.add(laser3);

    // 6. FLOATING MODULAR COMPUTATIONAL FRAMES
    const frameGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const frameMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const frame1 = new THREE.Mesh(frameGeo, frameMat);
    frame1.position.set(-1.8, -0.8, 1.1);
    frame1.rotation.x = Math.PI / 4;
    pavilionGroup.add(frame1);

    const frame2 = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.55, 1),
      new THREE.MeshBasicMaterial({
        color: 0xccff00,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
    );
    frame2.position.set(2.4, 0.6, 0.8);
    pavilionGroup.add(frame2);

    // 7. MOUSE PARALLAX & SCROLL CAMERA DYNAMICS
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollProgress = 0;
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;

      if (isDragging) {
        const deltaX = e.clientX - prevPos.x;
        const deltaY = e.clientY - prevPos.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        pavilionGroup.rotation.y += dragVelocity.x;
        pavilionGroup.rotation.x += dragVelocity.y;
        prevPos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPos = { x: e.clientX, y: e.clientY };
      sound.playClick();
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 8. ANIMATION LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Camera parallax interpolation
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Camera evolves through space as user scrolls
      camera.position.x = 0.6 + currentX * 0.6 - scrollProgress * 1.2;
      camera.position.y = -0.4 + currentY * 0.5 - scrollProgress * 1.5;
      camera.position.z = 5.8 - scrollProgress * 2.2;
      camera.lookAt(0, 0, 0);

      // Subtle mechanical breathing of architectural slabs
      if (!isDragging) {
        pavilionGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.08 + dragVelocity.x;
        pavilionGroup.rotation.x = Math.cos(elapsed * 0.12) * 0.04 + dragVelocity.y;
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;
      }

      // Linear translation of slabs along structural axes
      slabA.position.y = 0.4 + Math.sin(elapsed * 0.4) * 0.06;
      slabB.position.x = 0.4 + Math.cos(elapsed * 0.35) * 0.08;
      frame1.rotation.y = elapsed * 0.2;
      frame2.rotation.z = -elapsed * 0.25;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center p-8">
        <div className="p-8 arch-monolith text-center font-mono text-xs text-slate-400 max-w-sm">
          <div className="font-bold text-white text-sm mb-1 uppercase tracking-wider">
            COMPUTATIONAL ARCHITECTURE
          </div>
          <div>HIGH-PERFORMANCE STATIC MODE ACTIVE</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[480px] sm:min-h-[580px] lg:min-h-[700px] flex items-center justify-center cursor-grab active:cursor-grabbing relative select-none"
      title="Click and drag to rotate the architectural installation"
    >
      {/* Precision Datum Annotation */}
      <div className="absolute bottom-6 right-6 pointer-events-none px-3 py-1 font-mono text-[10px] text-[#ff5500] border border-[#ff5500]/30 bg-black/70 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#ff5500] animate-ping" />
        <span>STRUCTURE LEVEL: 0.00 // AXIS X-01</span>
      </div>
    </div>
  );
};
