import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

export default function ScrollTextReveal({
  text,
  className = "",
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={`py-24 md:py-32 px-6 md:px-12 relative overflow-hidden ${className}`}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/4 rounded-full blur-[180px] pointer-events-none" />

      <p className="mx-auto max-w-4xl font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.3] md:leading-[1.35] tracking-tight text-center relative z-10">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, range, [
    "var(--color-muted-val)",
    "var(--color-dark-val)",
  ]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.3em] transition-none"
    >
      {children}
    </motion.span>
  );
}
