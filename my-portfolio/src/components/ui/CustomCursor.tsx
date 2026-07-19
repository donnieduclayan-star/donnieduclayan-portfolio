import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [trailDots, setTrailDots] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTrailTime = useRef(0);

  const addTrailDot = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastTrailTime.current < 30) return;
    lastTrailTime.current = now;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Only emit trail particles on fast movement
    if (speed < 15) return;

    const id = trailIdRef.current++;
    setTrailDots((prev) => [...prev.slice(-8), { id, x, y }]);

    // Auto-remove after animation
    setTimeout(() => {
      setTrailDots((prev) => prev.filter((d) => d.id !== id));
    }, 400);
  }, []);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setIsVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      addTrailDot(e.clientX, e.clientY);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isBtn =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[data-magnetic="true"]');

      setIsHovered(!!isBtn);

      // Contextual labels
      const link = target.closest("a");
      const button = target.closest("button") || target.closest('[role="button"]');

      if (link) {
        const href = link.getAttribute("href");
        if (href?.startsWith("#")) {
          setCursorLabel("Scroll");
        } else if (href?.startsWith("http") || link.getAttribute("target") === "_blank") {
          setCursorLabel("Open");
        } else {
          setCursorLabel("View");
        }
      } else if (button) {
        setCursorLabel("Click");
      } else {
        setCursorLabel("");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [addTrailDot]);

  if (!isVisible) return null;

  return (
    <>
      {/* Ambient glow that follows cursor */}
      <motion.div
        className="fixed top-0 left-0 z-10 pointer-events-none w-[350px] h-[350px] rounded-full bg-accent/8 blur-[80px]"
        animate={{
          x: mousePosition.x - 175,
          y: mousePosition.y - 175,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          mass: 0.2,
        }}
      />

      {/* Trail particles */}
      <AnimatePresence>
        {trailDots.map((dot) => (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0.6, scale: 1, x: dot.x - 3, y: dot.y - 3 }}
            animate={{ opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 z-[98] w-1.5 h-1.5 rounded-full bg-accent/50 pointer-events-none"
          />
        ))}
      </AnimatePresence>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[100] rounded-full pointer-events-none mix-blend-difference bg-white"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 8),
          y: mousePosition.y - (isHovered ? 24 : 8),
          width: isHovered ? 48 : 16,
          height: isHovered ? 48 : 16,
          opacity: isHovered ? 0.8 : 1,
          // Squeeze on click
          scaleX: isClicking ? 0.8 : 1,
          scaleY: isClicking ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99] rounded-full pointer-events-none border border-accent"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          width: 40,
          height: 40,
          scale: isHovered ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isHovered ? 0 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      />

      {/* Contextual label */}
      <AnimatePresence>
        {isHovered && cursorLabel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="fixed z-[101] pointer-events-none mix-blend-difference"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-[9px] font-bold uppercase tracking-widest text-white">
              {cursorLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
