import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LineRevealProps {
  /** Direction of the line */
  direction?: "vertical" | "horizontal";
  /** Length in pixels or percentage */
  length?: string;
  /** Stroke color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Extra classname for the container */
  className?: string;
  /** Whether to use scroll-linked or viewport-triggered animation */
  scrollLinked?: boolean;
  /** Optional glow effect */
  glow?: boolean;
}

export default function LineReveal({
  direction = "vertical",
  length = "100%",
  color = "rgba(99, 102, 241, 0.5)",
  strokeWidth = 2,
  className = "",
  scrollLinked = true,
  glow = false,
}: LineRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.6]);
  const transformPercent = useTransform(pathLength, (v) => `${v * 100}%`);

  const isVertical = direction === "vertical";

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        width: isVertical ? `${strokeWidth + 4}px` : length,
        height: isVertical ? length : `${strokeWidth + 4}px`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={isVertical ? `0 0 ${strokeWidth + 4} 100` : `0 0 100 ${strokeWidth + 4}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* Background track */}
        <line
          x1={isVertical ? (strokeWidth + 4) / 2 : 0}
          y1={isVertical ? 0 : (strokeWidth + 4) / 2}
          x2={isVertical ? (strokeWidth + 4) / 2 : 100}
          y2={isVertical ? 100 : (strokeWidth + 4) / 2}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated line */}
        <motion.line
          x1={isVertical ? (strokeWidth + 4) / 2 : 0}
          y1={isVertical ? 0 : (strokeWidth + 4) / 2}
          x2={isVertical ? (strokeWidth + 4) / 2 : 100}
          y2={isVertical ? 100 : (strokeWidth + 4) / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            pathLength: scrollLinked ? pathLength : undefined,
            opacity: scrollLinked ? opacity : undefined,
          }}
          {...(!scrollLinked && {
            initial: { pathLength: 0, opacity: 0 },
            whileInView: { pathLength: 1, opacity: 1 },
            viewport: { once: true, margin: "-10%" },
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          })}
        />
      </svg>

      {/* Glow dot at the drawing tip */}
      {glow && (
        <motion.div
          style={{
            opacity,
            top: isVertical ? transformPercent : "50%",
            left: isVertical ? "50%" : transformPercent,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]"
        />
      )}
    </div>
  );
}
