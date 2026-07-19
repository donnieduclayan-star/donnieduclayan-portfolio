import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface InfiniteMarqueeProps {
  items: string[];
  /** Base scroll speed in px/s */
  speed?: number;
  /** Direction: left or right */
  direction?: "left" | "right";
  /** Whether scroll velocity affects speed */
  scrollAware?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export default function InfiniteMarquee({
  items,
  speed = 40,
  direction = "left",
  scrollAware = true,
  className = "",
  itemClassName = "",
  separator = "•",
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 200,
    damping: 50,
  });

  const velocityFactor = useTransform(smoothVelocity, [-1, 0, 1], [0.5, 1, 1.5], {
    clamp: true,
  });

  // Measure a single set of items
  useEffect(() => {
    if (containerRef.current) {
      const firstSet = containerRef.current.querySelector("[data-marquee-set]");
      if (firstSet) {
        setSetWidth((firstSet as HTMLElement).offsetWidth);
      }
    }
  }, [items]);

  const directionMultiplier = direction === "left" ? -1 : 1;

  useAnimationFrame((_, delta) => {
    // Track scroll velocity
    const currentScroll = scrollY.get();
    const now = Date.now();
    const dt = Math.max(now - lastTime.current, 1);
    scrollVelocity.set((currentScroll - lastScrollY.current) / dt);
    lastScrollY.current = currentScroll;
    lastTime.current = now;

    if (setWidth === 0) return;

    const velocityMul = scrollAware ? velocityFactor.get() : 1;
    const moveBy = directionMultiplier * speed * velocityMul * (delta / 1000);

    let newX = baseX.get() + moveBy;

    // Seamless wrap
    if (direction === "left" && newX <= -setWidth) {
      newX += setWidth;
    } else if (direction === "right" && newX >= 0) {
      newX -= setWidth;
    }

    baseX.set(newX);
  });

  // We need enough repetitions for seamless looping
  const repetitions = 4;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      ref={containerRef}
    >
      <motion.div
        className="inline-flex whitespace-nowrap"
        style={{ x: baseX }}
      >
        {Array.from({ length: repetitions }).map((_, repIdx) => (
          <div
            key={repIdx}
            className="inline-flex items-center shrink-0"
            {...(repIdx === 0 ? { "data-marquee-set": true } : {})}
          >
            {items.map((item, idx) => (
              <div key={`${repIdx}-${idx}`} className="inline-flex items-center shrink-0">
                <span className={`inline-block px-4 ${itemClassName}`}>
                  {item}
                </span>
                <span className="inline-block text-accent/30 text-sm mx-1">
                  {separator}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
