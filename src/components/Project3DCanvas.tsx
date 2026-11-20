import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Project3DCanvasProps {
  projectId: string;
}

export const Project3DCanvas: React.FC<Project3DCanvasProps> = ({ projectId }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    let gl: WebGLRenderingContext | null = null;
    try {
      const testCanvas = document.createElement('canvas');
      gl = (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    } catch {
      return;
    }
    if (!gl) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group
    const root = new THREE.Group();
    scene.add(root);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const orangeLight = new THREE.PointLight(0xff5722, 3.5, 15);
    orangeLight.position.set(3, 4, 3);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x00c8ff, 2.5, 15);
    cyanLight.position.set(-3, -2, 2);
    scene.add(cyanLight);

    // Materials
    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff5722,
      emissive: 0xff3300,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x00c8ff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.7,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff5722,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const darkTitanium = new THREE.MeshStandardMaterial({
      color: 0x1a1a24,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Per-Project 3D Geometry
    const animatedObjects: any[] = [];

    if (projectId.includes('agent') || projectId.includes('1')) {
      // SCENE 1: 3D Autonomous Multi-Agent Network
      // Center supervisor node
      const centerGeo = new THREE.IcosahedronGeometry(0.55, 2);
      const centerNode = new THREE.Mesh(centerGeo, orangeMat);
      root.add(centerNode);
      animatedObjects.push(centerNode);

      // Orbiting agent worker nodes
      const nodeCount = 5;

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = 1.9;
        const worker = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), cyanMat);
        worker.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 0.8, Math.sin(angle) * radius);
        root.add(worker);

        // Packet trail
        const packet = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        root.add(packet);
        animatedObjects.push({ type: 'packet', mesh: packet, start: centerNode, end: worker, speed: 0.02 + i * 0.005, progress: Math.random() });
      }

      // Outer cybernetic ring
      const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 64);
      const ring = new THREE.Mesh(ringGeo, wireMat);
      ring.rotation.x = Math.PI / 2;
      root.add(ring);
      animatedObjects.push({ type: 'ring', mesh: ring });

    } else if (projectId.includes('rag') || projectId.includes('2')) {
      // SCENE 2: 3D Vector Embedding Space
      // Dense 3D point cloud of 350 embedding vectors
      const ptCount = 320;
      const ptGeo = new THREE.BufferGeometry();
      const pos = new Float32Array(ptCount * 3);
      const col = new Float32Array(ptCount * 3);
      const colorOrange = new THREE.Color('#FF5722');
      const colorCyan = new THREE.Color('#00C8FF');

      for (let i = 0; i < ptCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 3.4;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 3.2;

        const mix = Math.random();
        const c = mix > 0.6 ? colorOrange : colorCyan;
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;
      }
      ptGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      ptGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const ptMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.85 });
      const points = new THREE.Points(ptGeo, ptMat);
      root.add(points);
      animatedObjects.push(points);

      // Scanning Hyperplane (Vector Cosine Query)
      const planeGeo = new THREE.PlaneGeometry(3.6, 3.6);
      const planeMat = new THREE.MeshBasicMaterial({ color: 0xff5722, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = Math.PI / 4;
      root.add(plane);
      animatedObjects.push({ type: 'plane', mesh: plane });

      // Core Query Vector Node
      const queryNode = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), orangeMat);
      root.add(queryNode);
      animatedObjects.push(queryNode);

    } else if (projectId.includes('vision') || projectId.includes('3')) {
      // SCENE 3: 3D Vision Transformer Attention Lattice
      // 3D Polygonal Specimen Mesh
      const latGeo = new THREE.DodecahedronGeometry(1.2, 1);
      const latMesh = new THREE.Mesh(latGeo, wireMat);
      root.add(latMesh);
      animatedObjects.push(latMesh);

      // Internal Neural Attention Core
      const coreGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const coreMesh = new THREE.Mesh(coreGeo, orangeMat);
      root.add(coreMesh);
      animatedObjects.push(coreMesh);

      // Rotating 3D Attention Scan Rings (16x16 patch projector)
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.02, 16, 64), new THREE.MeshBasicMaterial({ color: 0x00c8ff, wireframe: true }));
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.02, 16, 64), new THREE.MeshBasicMaterial({ color: 0xff5722, wireframe: true }));
      root.add(ring1);
      root.add(ring2);
      animatedObjects.push({ type: 'dualRings', r1: ring1, r2: ring2 });

    } else {
      // SCENE 4 & 5: 3D Distributed Microservice Cloud / Financial Engine
      // 3D Titanium Server Blocks with Glowing Data Layers
      const group = new THREE.Group();
      for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && z === 0) continue;
          const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 0.5), darkTitanium);
          box.position.set(x * 1.1, 0, z * 1.1);
          group.add(box);

          // Top glow cap
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.48), (x + z) % 2 === 0 ? orangeMat : cyanMat);
          cap.position.set(x * 1.1, 0.42, z * 1.1);
          group.add(cap);
        }
      }
      // Central Gateway Hub
      const centerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32), orangeMat);
      group.add(centerHub);
      root.add(group);
      animatedObjects.push(group);

      // Orbiting laser particle ring
      const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.02, 16, 64), wireMat);
      orbitRing.rotation.x = Math.PI / 3;
      root.add(orbitRing);
      animatedObjects.push({ type: 'orbit', mesh: orbitRing });
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousPos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPos = { x: e.clientX, y: e.clientY };
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - previousPos.x;
        const dy = e.clientY - previousPos.y;
        root.rotation.y += dx * 0.008;
        root.rotation.x += dy * 0.008;
        previousPos = { x: e.clientX, y: e.clientY };
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

      // Gentle natural spin if not actively dragging
      if (!isDragging) {
        root.rotation.y += 0.005 + mouseX * 0.002;
        root.rotation.x = Math.sin(elapsed * 0.5) * 0.15 + mouseY * 0.2;
      }

      // Animate sub-objects
      animatedObjects.forEach((obj) => {
        if (obj.type === 'packet') {
          obj.progress = (obj.progress + obj.speed) % 1;
          obj.mesh.position.lerpVectors(obj.start.position, obj.end.position, obj.progress);
        } else if (obj.type === 'ring') {
          obj.mesh.rotation.z = elapsed * 0.4;
        } else if (obj.type === 'plane') {
          obj.mesh.rotation.z = elapsed * 0.3;
          obj.mesh.position.y = Math.sin(elapsed * 1.5) * 0.4;
        } else if (obj.type === 'dualRings') {
          obj.r1.rotation.x = elapsed * 0.5;
          obj.r1.rotation.y = elapsed * 0.3;
          obj.r2.rotation.y = -elapsed * 0.4;
          obj.r2.rotation.z = elapsed * 0.2;
        } else if (obj.type === 'orbit') {
          obj.mesh.rotation.z = elapsed * 0.4;
        } else if (obj.rotation) {
          obj.rotation.y = elapsed * 0.3;
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
  }, [projectId]);

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden bg-black/70 border border-white/10 shadow-2xl group cursor-grab active:cursor-grabbing">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full flex items-center justify-center" />

      {/* 3D HUD Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FF5722]">
        <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
        <span>INTERACTIVE 3D WEBGL SIMULATION // DRAG TO ROTATE</span>
      </div>
    </div>
  );
};
