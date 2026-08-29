import React, { useEffect, useRef } from 'react';

interface EcellUniverseProps {
  currentPath?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  z: number;
  size: number;
  baseAlpha: number;
  pulseSpeed: number;
  phase: number;
  vx: number;
  vy: number;
  color: string;
}

export const EcellUniverse: React.FC<EcellUniverseProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Smooth Mouse state
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

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

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle field initialization
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 50 : 100;
    const particles: Particle[] = [];
    const colors = ['#60A5FA', '#818CF8', '#A78BFA', '#38BDF8', '#E2E8F0'];

    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particles.push({
        x: px,
        y: py,
        originX: px,
        originY: py,
        z: Math.random(),
        size: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.35 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (LERP)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const mouseNormX = (mouse.x / width - 0.5) * 2; // -1 to 1
      const mouseNormY = (mouse.y / height - 0.5) * 2; // -1 to 1

      // Subtle constellation linkages between close particles (desktop only for performance)
      if (!isMobile) {
        const linkDist = 70;
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDist) {
              const alpha = (1 - dist / linkDist) * 0.08;
              ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Render individual particles
      particles.forEach((p) => {
        p.phase += p.pulseSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle Parallax depth offset
        const parallaxX = mouseNormX * (p.z * 18);
        const parallaxY = mouseNormY * (p.z * 18);

        // Gentle interactive mouse repulsion
        let finalX = p.x + parallaxX;
        let finalY = p.y + parallaxY;

        if (mouse.active) {
          const dx = finalX - mouse.x;
          const dy = finalY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120 * 8;
            finalX += (dx / dist) * force;
            finalY += (dy / dist) * force;
          }
        }

        const currentAlpha = Math.max(
          0.05,
          Math.min(0.7, p.baseAlpha + Math.sin(p.phase) * 0.18)
        );

        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size * (0.8 + p.z * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha * (0.4 + p.z * 0.6);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default EcellUniverse;
