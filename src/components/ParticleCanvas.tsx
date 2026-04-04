import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  shape: "circle" | "petal" | "star" | "marigold" | "confetti";
}

interface ParticleCanvasProps {
  type: "petals" | "marigold" | "stars" | "confetti" | "sparkle";
  count?: number;
  className?: string;
}

const COLORS: Record<string, string[]> = {
  petals: ["#f4c2c2", "#f7d1cd", "#e8a0bf", "#fce4ec", "#f8bbd0"],
  marigold: ["#f59e0b", "#f97316", "#eab308", "#fbbf24", "#d97706"],
  stars: ["#ffffff", "#fffde7", "#fef3c7", "#e0e7ff"],
  confetti: ["#c8a96e", "#f5e6d3", "#d4af37", "#e8d5b7", "#8b5a2b", "#c0392b", "#e74c3c"],
  sparkle: ["#d4af37", "#f5e6d3", "#fffde7", "#fef3c7"],
};

export default function ParticleCanvas({ type, count = 30, className = "" }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = COLORS[type];
    const shapeMap: Record<string, Particle["shape"]> = {
      petals: "petal",
      marigold: "marigold",
      stars: "star",
      confetti: "confetti",
      sparkle: "circle",
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight - canvas.offsetHeight,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapeMap[type],
    });

    particlesRef.current = Array.from({ length: count }, createParticle);
    // Spread initial particles across full height
    particlesRef.current.forEach((p) => {
      p.y = Math.random() * canvas.offsetHeight;
    });

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawMarigold = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -p.size * 0.3, p.size * 0.3, p.size * 0.6, (i * Math.PI * 2) / 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(Date.now() * 0.003 + p.x));
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawConfetti = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size * 0.3, -p.size * 0.6, p.size * 0.6, p.size * 1.2);
      ctx.restore();
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity * (0.3 + 0.7 * Math.sin(Date.now() * 0.002 + p.y));
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawFns: Record<Particle["shape"], (ctx: CanvasRenderingContext2D, p: Particle) => void> = {
      petal: drawPetal,
      marigold: drawMarigold,
      star: drawStar,
      confetti: drawConfetti,
      circle: drawCircle,
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.offsetHeight + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.offsetWidth;
        }
        if (p.x < -20) p.x = canvas.offsetWidth + 20;
        if (p.x > canvas.offsetWidth + 20) p.x = -20;

        drawFns[p.shape](ctx, p);
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [type, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
