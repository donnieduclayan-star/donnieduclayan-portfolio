import { useEffect, useRef } from "react";

export default function HoneycombBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Grid Math Config
    const hexRadius = 22;
    const hexHeight = hexRadius * Math.sqrt(3);
    const horizDist = hexRadius * 1.5;
    const vertDist = hexHeight;

    // Draw single hexagon path
    const drawHex = (context: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      context.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.closePath();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;
      const forceRadius = 130; // Radius where hexagons "break" and dissolve

      const cols = Math.ceil(width / horizDist) + 2;
      const rows = Math.ceil(height / vertDist) + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          // Calculate grid coordinates with vertical offsets
          const cx = col * horizDist;
          const cy = row * vertDist + (col % 2 === 0 ? 0 : vertDist / 2);

          let r = hexRadius;
          let drawCx = cx;
          let drawCy = cy;
          let opacity = 0.015; // Standard subtle background line opacity

          if (isMouseActive) {
            const dx = cx - mx;
            const dy = cy - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < forceRadius) {
              const ratio = dist / forceRadius; // 0 (at cursor) to 1 (at edge of circle)
              
              // Scale down based on cursor proximity (scale drops to 0)
              r = hexRadius * Math.pow(ratio, 1.8);
              
              // Fade out (opacity drops to 0 at cursor)
              opacity = 0.015 * Math.pow(ratio, 2);

              // Displace coordinates away from mouse (push effect)
              const angle = Math.atan2(dy, dx);
              const push = (1 - ratio) * 16;
              drawCx = cx + Math.cos(angle) * push;
              drawCy = cy + Math.sin(angle) * push;
            }
          }

          if (r > 0.5) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.75;
            drawHex(ctx, drawCx, drawCy, r);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-40"
      style={{ background: "transparent" }}
    />
  );
}
