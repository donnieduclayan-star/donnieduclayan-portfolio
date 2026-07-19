import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface ScrollVelocityProps {
  text: string;
  baseVelocity?: number;
  className?: string;
  textClassName?: string;
}

function useScrollVelocity() {
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useAnimationFrame(() => {
    const current = scrollY.get();
    const now = Date.now();
    const dt = Math.max(now - lastTime.current, 1);
    const velocity = (current - lastScrollY.current) / dt;
    scrollVelocity.set(velocity);
    lastScrollY.current = current;
    lastTime.current = now;
  });

  return scrollVelocity;
}

export default function ScrollVelocity({
  text,
  baseVelocity = 2,
  className = "",
  textClassName = "",
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const scrollVelocity = useScrollVelocity();
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 50,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Ensure enough repetitions to cover the viewport
      const needed = Math.ceil((window.innerWidth * 2) / (containerWidth / 4)) + 2;
      setRepetitions(Math.max(needed, 4));
    }
  }, [text]);

  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000) * 50;

    // Reverse direction based on scroll direction
    const velocity = velocityFactor.get();
    if (velocity < 0) {
      directionFactor.current = -1;
    } else if (velocity > 0) {
      directionFactor.current = 1;
    }

    // Add scroll velocity influence
    moveBy += directionFactor.current * velocity * 30 * (delta / 1000);

    let newX = baseX.get() + moveBy;

    // Wrap around seamlessly
    const wrapAt = -100 / repetitions;
    if (newX < wrapAt * (repetitions / 2)) {
      newX = 0;
    } else if (newX > 0) {
      newX = wrapAt * (repetitions / 2);
    }

    baseX.set(newX);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      className={`overflow-hidden whitespace-nowrap py-4 ${className}`}
      ref={containerRef}
    >
      <motion.div className="inline-flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            className={`inline-block mr-8 ${textClassName}`}
          >
            {text}
            <span className="inline-block mx-6 text-accent/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
