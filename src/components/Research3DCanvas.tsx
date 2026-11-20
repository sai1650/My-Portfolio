import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Research3DCanvasProps {
  paperId: string;
}

export const Research3DCanvas: React.FC<Research3DCanvasProps> = ({ paperId }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL
    let gl: WebGLRenderingContext | null = null;
    try {
      const testCanvas = document.createElement('canvas');
      gl = (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    } catch {
      return;
    }
    if (!gl) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group
    const root = new THREE.Group();
    scene.add(root);

    // Light-theme friendly lighting (bright and crisp)
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const orangeLight = new THREE.PointLight(0xff5722, 4.0, 15);
    orangeLight.position.set(3, 4, 3);
    scene.add(orangeLight);

    const violetLight = new THREE.PointLight(0x7c3aed, 3.0, 15);
    violetLight.position.set(-3, -2, 2);
    scene.add(violetLight);

    // Materials
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff5722,
      emissive: 0xff3300,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.7,
    });
    const violetMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.6,
    });
    const glassPlaneMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff5722,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const animatedParts: any[] = [];

    // --- 3D Holographic Paper Monolith & Attention Grid ---
    // Central Holographic Paper Slab
    const paperGeo = new THREE.BoxGeometry(2.0, 2.7, 0.08);
    const paperMesh = new THREE.Mesh(paperGeo, glassPlaneMat);
    root.add(paperMesh);
    animatedParts.push(paperMesh);

    // Multi-Head Self-Attention Token Grid (16 token patches)
    const gridGroup = new THREE.Group();
    const rows = 4;
    const cols = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const patchGeo = new THREE.BoxGeometry(0.35, 0.45, 0.04);
        const isAccent = (r + c) % 3 === 0;
        const patchMat = isAccent ? orangeMat : violetMat;
        const patch = new THREE.Mesh(patchGeo, patchMat);
        patch.position.set((c - 1.5) * 0.44, (r - 1.5) * 0.55, 0.06);
        gridGroup.add(patch);
      }
    }
    paperMesh.add(gridGroup);

    // Orbiting Attention Vectors & Feature Extraction Rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.015, 16, 64), wireMat);
    ring1.rotation.x = Math.PI / 3;
    root.add(ring1);
    animatedParts.push({ type: 'ring', mesh: ring1, speed: 0.4 });

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.015, 16, 64), new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.35 }));
    ring2.rotation.y = Math.PI / 4;
    root.add(ring2);
    animatedParts.push({ type: 'ring', mesh: ring2, speed: -0.3 });

    // Floating Citation / Token Particles
    const tokenCount = 40;
    const tokenGeo = new THREE.BufferGeometry();
    const tokenPositions = new Float32Array(tokenCount * 3);
    for (let i = 0; i < tokenCount; i++) {
      tokenPositions[i * 3] = (Math.random() - 0.5) * 3.5;
      tokenPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.5;
      tokenPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    tokenGeo.setAttribute('position', new THREE.BufferAttribute(tokenPositions, 3));
    const tokenMat = new THREE.PointsMaterial({ color: 0xff5722, size: 0.08, transparent: true, opacity: 0.8 });
    const tokenPoints = new THREE.Points(tokenGeo, tokenMat);
    root.add(tokenPoints);
    animatedParts.push({ type: 'tokens', mesh: tokenPoints });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPos = { x: e.clientX, y: e.clientY };
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevPos.x;
        const dy = e.clientY - prevPos.y;
        root.rotation.y += dx * 0.008;
        root.rotation.x += dy * 0.008;
        prevPos = { x: e.clientX, y: e.clientY };
      } else {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
      }
    };
    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        root.rotation.y += 0.006 + mouseX * 0.002;
        root.rotation.x = Math.sin(elapsed * 0.6) * 0.12 + mouseY * 0.1;
      }

      animatedParts.forEach((part) => {
        if (part.type === 'ring') {
          part.mesh.rotation.z = elapsed * part.speed;
        } else if (part.type === 'tokens') {
          part.mesh.rotation.y = elapsed * 0.15;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [paperId]);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-xl group cursor-grab active:cursor-grabbing">
      <div ref={mountRef} className="w-full h-full flex items-center justify-center" />
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-[10px] font-mono text-[#FF5722] shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
        <span>3D ATTENTION LATTICE // DRAG TO ROTATE RESEARCH MODEL</span>
      </div>
    </div>
  );
};
