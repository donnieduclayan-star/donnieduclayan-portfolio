import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.2]);

  // Orbital dot travels along the line
  const dotX = useTransform(scrollYProgress, [0, 0.5, 1], ["-50%", "0%", "50%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.8, 1, 0.8, 0]);
  const dotScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.6, 1.2, 0.6]);
  const glowIntensity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);

  return (
    <div ref={ref} className="w-full flex items-center justify-center py-6 relative">
      {/* Main line */}
      <motion.div
        style={{ scaleX, opacity }}
        className="h-[1px] w-[60%] max-w-xl bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-center"
      />

      {/* Traveling orbital dot */}
      <motion.div
        style={{
          x: dotX,
          opacity: dotOpacity,
          scale: dotScale,
        }}
        className="absolute left-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent z-10"
      />

      {/* Center glow pulse */}
      <motion.div
        style={{ opacity: glowIntensity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent/20 blur-xl pointer-events-none"
      />

      {/* Subtle side diamonds */}
      <motion.div
        style={{ opacity: glowIntensity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-12"
      >
        <div className="w-1 h-1 rotate-45 bg-accent/40" />
        <div className="w-1.5 h-1.5 rotate-45 bg-accent/60" />
        <div className="w-1 h-1 rotate-45 bg-accent/40" />
      </motion.div>
    </div>
  );
}
