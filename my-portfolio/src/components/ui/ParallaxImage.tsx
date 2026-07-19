import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Parallax speed multiplier (negative = opposite direction) */
  speed?: number;
  /** Whether image scales on scroll */
  scaleOnScroll?: boolean;
  /** Whether to use clip-path reveal */
  clipReveal?: boolean;
  className?: string;
  imgClassName?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  scaleOnScroll = false,
  clipReveal = false,
  className = "",
  imgClassName = "",
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={clipReveal ? { clipPath } : undefined}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          ...(scaleOnScroll ? { scale } : {}),
        }}
        className={`w-full h-full object-cover ${imgClassName}`}
        loading="lazy"
      />
    </motion.div>
  );
}
