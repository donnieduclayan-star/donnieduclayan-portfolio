import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Delay before animation starts */
  delay?: number;
  /** Stagger between each character */
  charDelay?: number;
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right";
  /** Whether to animate once or every time */
  once?: boolean;
  /** HTML tag to render */
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  /** Whether to use spring physics */
  spring?: boolean;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  charDelay = 0.03,
  direction = "up",
  once = true,
  as: Tag = "span",
  spring = true,
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-5% 0px" });

  const getInitial = () => {
    switch (direction) {
      case "down": return { y: "-110%", rotateX: -80, opacity: 0 };
      case "left": return { x: "50%", opacity: 0 };
      case "right": return { x: "-50%", opacity: 0 };
      default: return { y: "110%", rotateX: 80, opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "down":
      case "up":
        return { y: "0%", rotateX: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: "0%", opacity: 1 };
    }
  };

  const springTransition = {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
    mass: 0.8,
  };

  const easingTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  // Split by words, then by characters within each word
  const words = text.split(" ");

  let charIndex = 0;

  return (
    <Tag ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden mr-[0.25em]">
          {word.split("").map((char) => {
            const idx = charIndex++;
            return (
              <motion.span
                key={`${wIdx}-${idx}`}
                initial={getInitial()}
                animate={isInView ? getAnimate() : getInitial()}
                transition={{
                  ...(spring ? springTransition : easingTransition),
                  delay: delay + idx * charDelay,
                }}
                className="inline-block will-change-transform"
                style={{
                  transformOrigin: direction === "up" ? "bottom" : "top",
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
