import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Reveal direction/style */
  variant?: "up" | "left" | "right" | "scale" | "clip" | "blur";
  /** Delay before animation starts */
  delay?: number;
  /** Whether to stagger child elements */
  stagger?: boolean;
  /** Stagger delay between children */
  staggerDelay?: number;
}

export default function SectionReveal({
  children,
  className = "",
  id,
  variant = "up",
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getVariants = () => {
    switch (variant) {
      case "left":
        return {
          hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, filter: "blur(0px)" },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: 60, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, filter: "blur(0px)" },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
          visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
        };
      case "clip":
        return {
          hidden: { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
          visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(20px)", y: 10 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0 },
        };
      default: // "up"
        return {
          hidden: { opacity: 0, y: 50, scale: 0.97, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        };
    }
  };

  const variants = getVariants();

  // Staggered container mode
  if (stagger) {
    return (
      <motion.div
        ref={ref}
        id={id}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
        style={{ perspective: "1200px" }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div
                key={i}
                variants={variants}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {child}
              </motion.div>
            ))
          : (
            <motion.div
              variants={variants}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {children}
            </motion.div>
          )}
      </motion.div>
    );
  }

  // Standard single-element reveal
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={variants.hidden}
      animate={isInView ? variants.visible : variants.hidden}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1200px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
