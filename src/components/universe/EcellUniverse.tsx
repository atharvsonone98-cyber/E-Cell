import React, { useEffect, useRef, useState } from 'react';

interface EcellUniverseProps {
  currentPath: string;
}

interface StarParticle {
  x: number;
  y: number;
  z: number; // 0 (distant) to 1 (close)
  size: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  color: string;
}

interface PulsePhoton {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export const EcellUniverse: React.FC<EcellUniverseProps> = ({ currentPath }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interaction & Camera state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const scrollRef = useRef({ progress: 0, targetProgress: 0 });
  const cameraRef = useRef({ x: 0, y: 0, zoom: 1, targetZoom: 1, targetX: 0, targetY: 0 });
  
  // Story stage indicator
  const [currentScrollStage, setCurrentScrollStage] = useState<number>(1);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check prefers-reduced-motion and screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Update target camera based on current route path
  useEffect(() => {
    if (currentPath === '/events') {
      cameraRef.current.targetX = 140;
      cameraRef.current.targetY = -60;
      cameraRef.current.targetZoom = 1.2;
    } else if (currentPath === '/about') {
      cameraRef.current.targetX = 0;
      cameraRef.current.targetY = 0;
      cameraRef.current.targetZoom = 1.35;
    } else if (currentPath === '/committee' || currentPath === '/team') {
      cameraRef.current.targetX = -140;
      cameraRef.current.targetY = 70;
      cameraRef.current.targetZoom = 1.2;
    } else if (currentPath === '/achievements') {
      cameraRef.current.targetX = 110;
      cameraRef.current.targetY = 110;
      cameraRef.current.targetZoom = 1.2;
    } else if (currentPath === '/gallery') {
      cameraRef.current.targetX = -120;
      cameraRef.current.targetY = -80;
      cameraRef.current.targetZoom = 1.2;
    } else {
      // Home default
      cameraRef.current.targetX = 0;
      cameraRef.current.targetY = 0;
      cameraRef.current.targetZoom = 1.0;
    }
  }, [currentPath]);

  // Scroll listener for 7-stage universe journey
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      
      scrollRef.current.targetProgress = progress;

      // Determine stage (1 to 7)
      let stage = 1;
      if (progress < 0.12) stage = 1;
      else if (progress < 0.28) stage = 2;
      else if (progress < 0.45) stage = 3;
      else if (progress < 0.60) stage = 4;
      else if (progress < 0.74) stage = 5;
      else if (progress < 0.88) stage = 6;
      else stage = 7;

      setCurrentScrollStage(stage);

      // On home page, interpolate camera target smoothly based on scroll stage
      if (currentPath === '/') {
        if (stage === 1) {
          cameraRef.current.targetX = 0;
          cameraRef.current.targetY = 0;
          cameraRef.current.targetZoom = 1.0;
        } else if (stage === 2) {
          cameraRef.current.targetX = 0;
          cameraRef.current.targetY = 20;
          cameraRef.current.targetZoom = 1.2;
        } else if (stage === 3) {
          cameraRef.current.targetX = 120;
          cameraRef.current.targetY = -50;
          cameraRef.current.targetZoom = 1.15;
        } else if (stage === 4) {
          cameraRef.current.targetX = -130;
          cameraRef.current.targetY = 60;
          cameraRef.current.targetZoom = 1.15;
        } else if (stage === 5) {
          cameraRef.current.targetX = 100;
          cameraRef.current.targetY = 100;
          cameraRef.current.targetZoom = 1.15;
        } else if (stage === 6) {
          cameraRef.current.targetX = -110;
          cameraRef.current.targetY = -70;
          cameraRef.current.targetZoom = 1.2;
        } else if (stage === 7) {
          cameraRef.current.targetX = 0;
          cameraRef.current.targetY = 0;
          cameraRef.current.targetZoom = 1.08;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Mouse move listener for smooth 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Primary Canvas Universe Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Generate Stars & Dust Layer
    const starCount = isMobile ? 80 : 180;
    const stars: StarParticle[] = [];
    const starPalette = ['#60A5FA', '#818CF8', '#A78BFA', '#38BDF8', '#E2E8F0', '#FFFFFF'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random(),
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
        color: starPalette[Math.floor(Math.random() * starPalette.length)]
      });
    }

    // Traveling Photon Pulses along connections
    const photonPulses: PulsePhoton[] = [];
    for (let p = 0; p < 8; p++) {
      photonPulses.push({
        fromIndex: Math.floor(Math.random() * 7),
        toIndex: Math.floor(Math.random() * 7),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        color: p % 2 === 0 ? '#38BDF8' : '#818CF8'
      });
    }

    // Orbital Constellation Definitions
    const orbits = [
      { name: 'EVENTS', radiusX: isMobile ? 130 : 210, radiusY: isMobile ? 95 : 150, tilt: -0.22, speed: 0.0004, color: '#38BDF8', count: 5 },
      { name: 'TEAM', radiusX: isMobile ? 180 : 300, radiusY: isMobile ? 130 : 210, tilt: 0.35, speed: -0.0003, color: '#818CF8', count: 6 },
      { name: 'STUDENTS', radiusX: isMobile ? 220 : 390, radiusY: isMobile ? 160 : 270, tilt: -0.12, speed: 0.00025, color: '#A78BFA', count: 18 },
      { name: 'ACHIEVEMENTS', radiusX: isMobile ? 260 : 470, radiusY: isMobile ? 190 : 330, tilt: 0.45, speed: -0.0002, color: '#FBBF24', count: 4 },
      { name: 'INITIATIVES', radiusX: isMobile ? 300 : 550, radiusY: isMobile ? 220 : 380, tilt: -0.28, speed: 0.00018, color: '#34D399', count: 4 },
      { name: 'GALLERY', radiusX: isMobile ? 340 : 630, radiusY: isMobile ? 250 : 440, tilt: 0.18, speed: -0.00015, color: '#F43F5E', count: 5 },
      { name: 'STORIES', radiusX: isMobile ? 380 : 710, radiusY: isMobile ? 280 : 500, tilt: -0.38, speed: 0.00012, color: '#60A5FA', count: 4 }
    ];

    let angleGlobal = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!reducedMotion) {
        angleGlobal += dt * 0.15;
      }

      // Smooth camera interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      
      cameraRef.current.x += (cameraRef.current.targetX - cameraRef.current.x) * 0.04;
      cameraRef.current.y += (cameraRef.current.targetY - cameraRef.current.y) * 0.04;
      cameraRef.current.zoom += (cameraRef.current.targetZoom - cameraRef.current.zoom) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouseRef.current.x * 25 - cameraRef.current.x;
      const centerY = height / 2 + mouseRef.current.y * 20 - cameraRef.current.y;
      const zoom = cameraRef.current.zoom;

      // -------------------------------------------------------------
      // LAYER 1: Parallax Stars
      // -------------------------------------------------------------
      stars.forEach(star => {
        if (!reducedMotion) {
          star.phase += star.pulseSpeed;
        }
        const alpha = Math.max(0.08, Math.min(0.85, star.baseAlpha + Math.sin(star.phase) * 0.25));
        
        const px = centerX + (star.x - mouseRef.current.x * 40 * (1 - star.z)) * zoom;
        const py = centerY + (star.y - mouseRef.current.y * 40 * (1 - star.z)) * zoom;

        if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * (0.8 + star.z * 0.4) * zoom, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha * (0.4 + star.z * 0.6);
          ctx.fill();
        }
      });

      // -------------------------------------------------------------
      // LAYER 2: 7 Orbital Constellation Paths & Nodes
      // -------------------------------------------------------------
      const calculatedOrbitNodes: { x: number; y: number; orbitIndex: number; color: string }[] = [];

      orbits.forEach((orbit, orbitIdx) => {
        const rx = orbit.radiusX * zoom;
        const ry = orbit.radiusY * zoom;
        const orbitAngle = orbit.tilt;

        // Draw faint orbital ring ellipse
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(orbitAngle);

        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        const isOrbitFocused = (currentScrollStage === orbitIdx + 1) || (currentPath.includes(orbit.name.toLowerCase()));
        ctx.globalAlpha = isOrbitFocused ? 0.25 : 0.06;
        ctx.lineWidth = isOrbitFocused ? 1.4 : 0.9;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Place nodes along this orbit
        for (let n = 0; n < orbit.count; n++) {
          const nodeAngleOffset = (n / orbit.count) * Math.PI * 2 + angleGlobal * orbit.speed * 20;
          
          const unrotatedX = Math.cos(nodeAngleOffset) * rx;
          const unrotatedY = Math.sin(nodeAngleOffset) * ry;

          const cosT = Math.cos(orbitAngle);
          const sinT = Math.sin(orbitAngle);
          const nx = centerX + (unrotatedX * cosT - unrotatedY * sinT);
          const ny = centerY + (unrotatedX * sinT + unrotatedY * cosT);

          calculatedOrbitNodes.push({
            x: nx,
            y: ny,
            orbitIndex: orbitIdx,
            color: orbit.color
          });

          const isStudentOrbit = orbitIdx === 2;
          const nodeRadius = isStudentOrbit ? 2.0 * zoom : 3.5 * zoom;

          // Ambient node aura
          ctx.beginPath();
          ctx.arc(nx, ny, nodeRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = orbit.color;
          ctx.globalAlpha = isOrbitFocused ? 0.22 : 0.08;
          ctx.fill();

          // Core node solid point
          ctx.beginPath();
          ctx.arc(nx, ny, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = isOrbitFocused ? 0.9 : 0.55;
          ctx.fill();
        }
      });

      // -------------------------------------------------------------
      // Connective Constellation Lines & Traveling Light Photons
      // -------------------------------------------------------------
      if (calculatedOrbitNodes.length > 0) {
        ctx.lineWidth = 0.75;

        // Radial spokes connecting nodes back to E-Cell Core
        for (let i = 0; i < Math.min(8, calculatedOrbitNodes.length); i += 2) {
          const node = calculatedOrbitNodes[i];
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = node.color;
          ctx.globalAlpha = 0.06;
          ctx.stroke();
        }

        // Intra-constellation connecting arcs
        for (let i = 0; i < calculatedOrbitNodes.length - 1; i++) {
          const n1 = calculatedOrbitNodes[i];
          const n2 = calculatedOrbitNodes[i + 1];
          if (n1.orbitIndex === n2.orbitIndex) {
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 * zoom) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = n1.color;
              ctx.globalAlpha = 0.1;
              ctx.stroke();
            }
          }
        }

        // Advance and render Traveling Photons
        photonPulses.forEach((photon) => {
          if (!reducedMotion) {
            photon.progress += photon.speed;
            if (photon.progress >= 1) {
              photon.progress = 0;
              photon.fromIndex = Math.floor(Math.random() * calculatedOrbitNodes.length);
              photon.toIndex = (photon.fromIndex + 1 + Math.floor(Math.random() * 4)) % calculatedOrbitNodes.length;
            }
          }

          const nFrom = calculatedOrbitNodes[photon.fromIndex % calculatedOrbitNodes.length];
          const nTo = calculatedOrbitNodes[photon.toIndex % calculatedOrbitNodes.length];

          if (nFrom && nTo) {
            const px = nFrom.x + (nTo.x - nFrom.x) * photon.progress;
            const py = nFrom.y + (nTo.y - nFrom.y) * photon.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.2 * zoom, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = 0.8;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px, py, 5.0 * zoom, 0, Math.PI * 2);
            ctx.fillStyle = photon.color;
            ctx.globalAlpha = 0.3;
            ctx.fill();
          }
        });
      }

      // -------------------------------------------------------------
      // LAYER 3: The Glowing E-CELL SSGMCE Core Hub
      // -------------------------------------------------------------
      const coreRadius = (isMobile ? 38 : 50) * zoom;

      // Outer volumetric core aura pulses
      const auraPulse = Math.sin(time * 0.002) * 6;
      const auraGradient = ctx.createRadialGradient(
        centerX, centerY, 5 * zoom,
        centerX, centerY, (coreRadius + 40 + auraPulse) * zoom
      );
      auraGradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      auraGradient.addColorStop(0.35, 'rgba(129, 140, 248, 0.18)');
      auraGradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.06)');
      auraGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, (coreRadius + 40 + auraPulse) * zoom, 0, Math.PI * 2);
      ctx.fillStyle = auraGradient;
      ctx.globalAlpha = 0.85;
      ctx.fill();

      // Rotating fine orbital energy rings around core
      for (let r = 0; r < 3; r++) {
        const ringRadius = (coreRadius + 12 + r * 14) * zoom;
        const ringAngle = (time * (0.0003 + r * 0.0002) * (r % 2 === 0 ? 1 : -1));
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ringAngle);
        ctx.beginPath();
        ctx.ellipse(0, 0, ringRadius, ringRadius * 0.75, 0, 0, Math.PI * 2);
        ctx.strokeStyle = r === 0 ? '#38BDF8' : r === 1 ? '#818CF8' : '#C084FC';
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Satellite point on each core ring
        const satX = Math.cos(time * 0.001 * (r + 1)) * ringRadius;
        const satY = Math.sin(time * 0.001 * (r + 1)) * (ringRadius * 0.75);
        ctx.beginPath();
        ctx.arc(satX, satY, 2.0 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.75;
        ctx.fill();
        ctx.restore();
      }

      // Core Solid Glass Disc
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#060B1A';
      ctx.globalAlpha = 0.92;
      ctx.fill();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.8;
      ctx.stroke();

      // Center Core Typography
      ctx.font = `800 ${Math.round((isMobile ? 12 : 14) * zoom)}px "Plus Jakarta Sans", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.globalAlpha = 1.0;
      ctx.fillText('E-CELL', centerX, centerY - 10 * zoom);

      ctx.font = `700 ${Math.round((isMobile ? 9 : 10) * zoom)}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = '#38BDF8';
      ctx.fillText('SSGMCE', centerX, centerY + 5 * zoom);

      ctx.font = `600 ${Math.round((isMobile ? 6 : 7) * zoom)}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('BUILD. LAUNCH. LEAD.', centerX, centerY + 18 * zoom);

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, isMobile, currentScrollStage, currentPath]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dynamic Celestial Universe Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block z-0" 
      />

      {/* Atmospheric Cinematic Fog Layer */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-45 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 75%)'
        }}
      />
    </div>
  );
};
