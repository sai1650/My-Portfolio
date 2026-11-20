import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

export const ComputationalSculpture: React.FC = () => {
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
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Root Group for Architectural Sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // 2. Cinematic Lighting for Metallic Materials
    const ambientLight = new THREE.AmbientLight(0x0e1322, 1.8);
    scene.add(ambientLight);

    const mainCyanLight = new THREE.PointLight(0x00c8ff, 3.5, 18);
    mainCyanLight.position.set(3, 4, 4);
    scene.add(mainCyanLight);

    const rimVioletLight = new THREE.PointLight(0x7955ff, 3.2, 18);
    rimVioletLight.position.set(-4, -2, 3);
    scene.add(rimVioletLight);

    const topWhiteLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topWhiteLight.position.set(0, 8, 2);
    scene.add(topWhiteLight);

    // 3. Metallic Architectural Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x121724,
      metalness: 0.92,
      roughness: 0.22,
      flatShading: true,
    });

    const brushedSteelMat = new THREE.MeshStandardMaterial({
      color: 0x1e2638,
      metalness: 0.85,
      roughness: 0.35,
      flatShading: true,
    });

    const electricBlueNeonMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      wireframe: false,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const violetNeonMat = new THREE.MeshBasicMaterial({
      color: 0x7955ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const wireframeAccentMat = new THREE.MeshBasicMaterial({
      color: 0x246bfd,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    // 4. ARCHITECTURAL MONOLITHS & CANTILEVERED PRISMS
    // Central Oblique Monolith
    const monolithGeo = new THREE.CylinderGeometry(0.3, 0.7, 2.8, 6);
    const monolith = new THREE.Mesh(monolithGeo, darkMetalMat);
    monolith.rotation.z = Math.PI / 12;
    monolith.rotation.x = Math.PI / 16;
    sculptureGroup.add(monolith);

    // Intersecting Horizontal Cantilever Slab
    const slabGeo1 = new THREE.BoxGeometry(2.6, 0.14, 1.1);
    const slab1 = new THREE.Mesh(slabGeo1, brushedSteelMat);
    slab1.position.set(0.1, 0.3, 0);
    slab1.rotation.y = Math.PI / 5;
    slab1.rotation.z = -Math.PI / 24;
    sculptureGroup.add(slab1);

    // Cross-Angle Architectural Blade
    const slabGeo2 = new THREE.BoxGeometry(2.1, 0.1, 0.8);
    const slab2 = new THREE.Mesh(slabGeo2, darkMetalMat);
    slab2.position.set(-0.2, -0.6, 0.2);
    slab2.rotation.y = -Math.PI / 3.8;
    slab2.rotation.z = Math.PI / 16;
    sculptureGroup.add(slab2);

    // Vertical Computational Pillar
    const pillarGeo = new THREE.BoxGeometry(0.22, 2.4, 0.22);
    const pillar = new THREE.Mesh(pillarGeo, brushedSteelMat);
    pillar.position.set(0.8, -0.2, -0.3);
    pillar.rotation.y = Math.PI / 6;
    sculptureGroup.add(pillar);

    // 5. SUBTLE ELECTRIC-BLUE & VIOLET LIGHT STRIPS
    // Neon Light Strip 1 (running along top cantilever)
    const stripGeo1 = new THREE.BoxGeometry(2.62, 0.02, 0.04);
    const strip1 = new THREE.Mesh(stripGeo1, electricBlueNeonMat);
    strip1.position.set(0.1, 0.38, 0.54);
    strip1.rotation.y = Math.PI / 5;
    strip1.rotation.z = -Math.PI / 24;
    sculptureGroup.add(strip1);

    // Neon Light Strip 2 (running along vertical pillar)
    const stripGeo2 = new THREE.BoxGeometry(0.03, 2.42, 0.03);
    const strip2 = new THREE.Mesh(stripGeo2, electricBlueNeonMat);
    strip2.position.set(0.92, -0.2, -0.18);
    sculptureGroup.add(strip2);

    // Neon Light Strip 3 (violet horizontal channel)
    const stripGeo3 = new THREE.BoxGeometry(2.12, 0.02, 0.04);
    const strip3 = new THREE.Mesh(stripGeo3, violetNeonMat);
    strip3.position.set(-0.2, -0.54, 0.61);
    strip3.rotation.y = -Math.PI / 3.8;
    strip3.rotation.z = Math.PI / 16;
    sculptureGroup.add(strip3);

    // 6. NESTED COMPUTATIONAL GEOMETRIC FRAMES
    // Outer floating wireframe architectural cage
    const frameGeo1 = new THREE.IcosahedronGeometry(1.85, 1);
    const outerFrame = new THREE.Mesh(frameGeo1, wireframeAccentMat);
    sculptureGroup.add(outerFrame);

    const frameGeo2 = new THREE.OctahedronGeometry(2.2, 1);
    const outerFrame2 = new THREE.Mesh(
      frameGeo2,
      new THREE.MeshBasicMaterial({
        color: 0x7955ff,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
      })
    );
    sculptureGroup.add(outerFrame2);

    // 7. ORBITING METALLIC SATELLITE PLATES
    const plateGroup = new THREE.Group();
    sculptureGroup.add(plateGroup);

    const plates: THREE.Mesh[] = [];
    const plateCount = 3;
    for (let i = 0; i < plateCount; i++) {
      const pGeo = new THREE.BoxGeometry(0.45, 0.04, 0.3);
      const pMesh = new THREE.Mesh(pGeo, brushedSteelMat);
      // add thin cyan edge on each plate
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.46, 0.015, 0.02),
        electricBlueNeonMat
      );
      edge.position.z = 0.15;
      pMesh.add(edge);
      plateGroup.add(pMesh);
      plates.push(pMesh);
    }

    // 8. INTERACTIVE MOUSE PARALLAX & DRAG DYNAMICS
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;
    let isDragging = false;
    let previousPos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.35;

      if (isDragging) {
        const deltaX = e.clientX - previousPos.x;
        const deltaY = e.clientY - previousPos.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        sculptureGroup.rotation.y += dragVelocity.x;
        sculptureGroup.rotation.x += dragVelocity.y;
        previousPos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY * 0.0008;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPos = { x: e.clientX, y: e.clientY };
      sound.playClick();
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousPos.x;
        const deltaY = e.touches[0].clientY - previousPos.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        sculptureGroup.rotation.y += dragVelocity.x;
        sculptureGroup.rotation.x += dragVelocity.y;
        previousPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 9. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      camera.position.x = currentX * 0.7;
      camera.position.y = 0.5 + currentY * 0.5 - scrollY;
      camera.lookAt(0, 0, 0);

      // Subtle continuous architectural rotation
      if (!isDragging) {
        sculptureGroup.rotation.y += 0.0035 + dragVelocity.x;
        sculptureGroup.rotation.x += 0.001 + dragVelocity.y;
        dragVelocity.x *= 0.93;
        dragVelocity.y *= 0.93;
      }

      // Outer wireframe counter-rotations
      outerFrame.rotation.y = elapsedTime * 0.06;
      outerFrame.rotation.x = elapsedTime * 0.03;
      outerFrame2.rotation.y = -elapsedTime * 0.04;
      outerFrame2.rotation.z = elapsedTime * 0.02;

      // Orbiting computational plates
      plates.forEach((p, idx) => {
        const angle = elapsedTime * 0.55 + (idx * Math.PI * 2) / plateCount;
        const radius = 1.95;
        p.position.x = Math.cos(angle) * radius;
        p.position.z = Math.sin(angle) * radius;
        p.position.y = Math.sin(elapsedTime * 1.2 + idx) * 0.45;
        p.rotation.y = -angle;
        p.rotation.x = Math.sin(elapsedTime + idx) * 0.2;
      });

      // Neon pulse intensity
      const pulse = Math.sin(elapsedTime * 2.5) * 0.15 + 0.85;
      electricBlueNeonMat.opacity = pulse;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      monolithGeo.dispose();
      slabGeo1.dispose();
      slabGeo2.dispose();
      pillarGeo.dispose();
      stripGeo1.dispose();
      stripGeo2.dispose();
      stripGeo3.dispose();
      frameGeo1.dispose();
      frameGeo2.dispose();
      darkMetalMat.dispose();
      brushedSteelMat.dispose();
      electricBlueNeonMat.dispose();
      violetNeonMat.dispose();
      wireframeAccentMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center p-8">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-cyan-500/20 text-center font-mono text-xs text-slate-400 max-w-sm">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            &lt;/&gt;
          </div>
          <div className="font-bold text-white text-sm mb-1">ARCHITECTURAL INSTALLATION</div>
          <div>COMPUTATIONAL SYSTEMS // HIGH-PERFORMANCE STATIC MODE</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[450px] sm:min-h-[550px] lg:min-h-[640px] flex items-center justify-center cursor-grab active:cursor-grabbing relative select-none"
      title="Click and drag to interact with the Computational Architectural Installation"
    >
      {/* Interactive Telemetry Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono text-cyan-400 flex items-center gap-2 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>COMPUTATIONAL SCULPTURE // DRAG TO ROTATE</span>
      </div>
    </div>
  );
};
