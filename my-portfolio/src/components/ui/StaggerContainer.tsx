import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export default function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  direction = "up",
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  const getInitial = () => {
    switch (direction) {
      case "left": return { opacity: 0, x: -60 };
      case "right": return { opacity: 0, x: 60 };
      case "scale": return { opacity: 0, scale: 0.8 };
      default: return { opacity: 0, y: 40 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "left":
      case "right": return { opacity: 1, x: 0 };
      case "scale": return { opacity: 1, scale: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: getInitial(),
    visible: {
      ...getAnimate(),
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}
