import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Velocity-reactive width: line expands as it enters viewport, contracts as it leaves
  const rawWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "60%", "10%"]);
  const width = useSpring(rawWidth, { stiffness: 120, damping: 30 });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative py-8 md:py-12 flex items-center justify-center">
      <motion.div
        style={{ width, opacity }}
        className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent relative"
      >
        {/* Glow effect */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"
        />
      </motion.div>
    </div>
  );
}
