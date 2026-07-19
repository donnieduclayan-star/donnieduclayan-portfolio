import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  symbol: string;
  speed: number;
  opacity: number;
  delay: number;
}

const CODE_SYMBOLS = ["</>", "{}", "//", "=>", "&&", "++", "[]", "()", "**", "!=", "let", "fn", "::"];

export default function ScrollParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-200vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", "-150vh"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0vh", "-250vh"]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 10 + 10,
      symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.15 + 0.03,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  const getTransform = (speed: number) => {
    if (speed > 2) return y3;
    if (speed > 1.5) return y1;
    return y2;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            left: `${p.x}%`,
            y: getTransform(p.speed),
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.speed > 1.5 ? 15 : -15, 0],
          }}
          transition={{
            x: { duration: 8 + p.delay, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute top-[50vh] font-mono text-accent select-none"
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
