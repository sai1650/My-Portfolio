import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';

export const ThreeOrb: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.4;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Root interactive group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // --- 1. CORE POINT CLOUD WITH DYNAMIC DISPLACEMENT ---
    const innerGeo = new THREE.IcosahedronGeometry(1.25, 5);
    const posAttr = innerGeo.attributes.position;
    const originalPositions = new Float32Array(posAttr.array);
    const pointCount = posAttr.count;

    const colors = new Float32Array(pointCount * 3);
    const colorCyan = new THREE.Color('#00C8FF');
    const colorViolet = new THREE.Color('#7955FF');
    const colorBlue = new THREE.Color('#246BFD');
    const colorWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < pointCount; i++) {
      const y = posAttr.getY(i);
      const ratio = (y + 1.25) / 2.5;
      const mixed = new THREE.Color();
      if (ratio < 0.45) {
        mixed.lerpColors(colorCyan, colorBlue, ratio / 0.45);
      } else if (ratio < 0.85) {
        mixed.lerpColors(colorBlue, colorViolet, (ratio - 0.45) / 0.4);
      } else {
        mixed.lerpColors(colorViolet, colorWhite, (ratio - 0.85) / 0.15);
      }
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    innerGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(innerGeo, pointsMat);
    rootGroup.add(pointsMesh);

    // --- 2. DUAL CONCENTRIC WIREFRAME GEODESIC SHELLS ---
    const outerGeo1 = new THREE.IcosahedronGeometry(1.68, 2);
    const wireMat1 = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const shell1 = new THREE.Mesh(outerGeo1, wireMat1);
    rootGroup.add(shell1);

    const outerGeo2 = new THREE.DodecahedronGeometry(1.95, 1);
    const wireMat2 = new THREE.MeshBasicMaterial({
      color: 0x7955ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const shell2 = new THREE.Mesh(outerGeo2, wireMat2);
    rootGroup.add(shell2);

    // --- 3. DYNAMIC ORBITING TELEMETRY RINGS ---
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.012, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3.2;
    ring1.rotation.y = Math.PI / 5.5;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.28, 0.008, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7955ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.8;
    ring2.rotation.y = Math.PI / 2.7;
    rootGroup.add(ring2);

    // --- 4. ORBITING TELEMETRY SATELLITE NODES ---
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satCount = 4;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const satColors = [0x00c8ff, 0x246bfd, 0x7955ff, 0x10b981];

    for (let i = 0; i < satCount; i++) {
      const satMat = new THREE.MeshBasicMaterial({
        color: satColors[i % satColors.length],
        blending: THREE.AdditiveBlending,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      satellites.push(sat);
      satelliteGroup.add(sat);
    }

    // --- 5. FLOATING AMBIENT QUANTUM DUST PARTICLES ---
    const dustCount = 240;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 7.5;
      dustPositions[i + 1] = (Math.random() - 0.5) * 7.5;
      dustPositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x00c8ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // --- INTERACTIVE MOUSE PARALLAX & DRAG INERTIA ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        rootGroup.rotation.y += dragVelocity.x;
        rootGroup.rotation.x += dragVelocity.y;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      sound.playClick();
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        rootGroup.rotation.y += dragVelocity.x;
        rootGroup.rotation.x += dragVelocity.y;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse tracking
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!isDragging) {
        // Natural rotation & drag inertia damping
        rootGroup.rotation.y += 0.003 + dragVelocity.x;
        rootGroup.rotation.x += 0.001 + dragVelocity.y;
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;
      }

      rootGroup.position.x = mouseX * 0.35;
      rootGroup.position.y = mouseY * 0.35;

      // Shell counter-rotations
      shell1.rotation.y = elapsedTime * 0.12;
      shell1.rotation.x = elapsedTime * 0.06;
      shell2.rotation.y = -elapsedTime * 0.09;
      shell2.rotation.z = elapsedTime * 0.08;

      // Rings counter-rotation
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.z = -elapsedTime * 0.2;

      // Orbiting satellites
      satellites.forEach((sat, idx) => {
        const angle = elapsedTime * 0.7 + (idx * Math.PI * 2) / satCount;
        const radius = 2.15 + Math.sin(elapsedTime * 1.5 + idx) * 0.15;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.y = Math.sin(angle * 0.8) * 0.9;
        sat.position.z = Math.sin(angle) * radius;
      });

      // Harmonic wave displacement on core points
      const positions = innerGeo.attributes.position;
      for (let i = 0; i < pointCount; i++) {
        const u = i * 3;
        const ox = originalPositions[u];
        const oy = originalPositions[u + 1];
        const oz = originalPositions[u + 2];

        // Complex spherical wave ripple
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const wave = Math.sin(dist * 4.5 - elapsedTime * 2.8 + oy * 2.0) * 0.07;
        const pulse = Math.cos(elapsedTime * 1.8 + ox * 1.5) * 0.03;
        const factor = 1 + (wave + pulse) / (dist || 1);

        positions.setXYZ(i, ox * factor, oy * factor, oz * factor);
      }
      positions.needsUpdate = true;

      // Ambient dust drift
      dustPoints.rotation.y = elapsedTime * 0.02;
      dustPoints.rotation.x = Math.sin(elapsedTime * 0.03) * 0.08;

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
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      innerGeo.dispose();
      pointsMat.dispose();
      outerGeo1.dispose();
      wireMat1.dispose();
      outerGeo2.dispose();
      wireMat2.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing relative"
      title="Click and drag to interact with the Quantum Neural Core"
    >
      {/* Interactive HUD hint badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-cyan-400 flex items-center gap-2 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>INTERACTIVE CORE &bull; DRAG TO ROTATE</span>
      </div>
    </div>
  );
};
