import { useRef } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

interface ScrollVelocitySkewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollVelocitySkew({ children, className = "" }: ScrollVelocitySkewProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position and calculate velocity
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map scroll velocity to a skew degree (limited to safe bounds for premium aesthetics)
  const rawSkew = useTransform(scrollVelocity, [-3000, 3000], [-4, 4]);

  // Smooth spring physics for organic momentum skew
  const skewY = useSpring(rawSkew, {
    stiffness: 120,
    damping: 22,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      style={{ skewY }}
      className={`will-change-transform origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
