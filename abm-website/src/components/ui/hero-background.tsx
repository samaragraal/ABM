"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDelta: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 5000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.6 + 0.3,
        opacity: Math.random() * 0.65 + 0.1,
        opacityDelta: (Math.random() * 0.005 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        p.opacity += p.opacityDelta;
        if (p.opacity > 0.8 || p.opacity < 0.08) p.opacityDelta *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 181, 255, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 149, 255, ${(1 - dist / 100) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Canvas particle field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      />

      {/* ── Glow orbs ──────────────────────────────────────────────────── */}

      {/* Primary blue — top left, large slow drift */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "-20%",
          left: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.22) 0%, transparent 70%)",
          animation: "glow-drift-a 16s ease-in-out infinite",
          filter: "blur(2px)",
          zIndex: 2,
        }}
      />

      {/* Indigo — bottom right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: "65vw",
          height: "65vw",
          maxWidth: 650,
          maxHeight: 650,
          bottom: "-25%",
          right: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(99,60,220,0.18) 0%, transparent 70%)",
          animation: "glow-drift-b 20s ease-in-out infinite",
          filter: "blur(2px)",
          zIndex: 2,
        }}
      />

      {/* Cyan accent — top right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: "45vw",
          height: "45vw",
          maxWidth: 460,
          maxHeight: 460,
          top: "-10%",
          right: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 70%)",
          animation: "glow-drift-c 13s ease-in-out infinite",
          filter: "blur(3px)",
          zIndex: 2,
        }}
      />

      {/* Deep violet — bottom left */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 500,
          maxHeight: 500,
          bottom: "-15%",
          left: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, transparent 70%)",
          animation: "glow-drift-d 22s ease-in-out infinite",
          filter: "blur(2px)",
          zIndex: 2,
        }}
      />

      {/* Small hot-blue pulse — center top */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: "30vw",
          height: "30vw",
          maxWidth: 320,
          maxHeight: 320,
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.16) 0%, transparent 65%)",
          animation: "glow-pulse 9s ease-in-out infinite",
          filter: "blur(1px)",
          zIndex: 2,
        }}
      />

      {/* Small indigo pulse — center bottom */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: "28vw",
          height: "28vw",
          maxWidth: 280,
          maxHeight: 280,
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.13) 0%, transparent 65%)",
          animation: "glow-pulse 12s ease-in-out infinite reverse",
          filter: "blur(1px)",
          zIndex: 2,
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.028,
          animation: "grain-shift 0.12s steps(1) infinite",
          zIndex: 3,
        }}
      />
    </>
  );
}
