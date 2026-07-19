import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  onClick?: () => void;
}

export default function TiltCard({ children, className = "", glareColor = "rgba(16,185,129,0.08)", onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTransform({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
    });
    setGlare({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glareColor}, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
