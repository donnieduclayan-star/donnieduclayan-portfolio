import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%", rotateX: 90, opacity: 0 }}
            animate={isInView ? { y: "0%", rotateX: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
