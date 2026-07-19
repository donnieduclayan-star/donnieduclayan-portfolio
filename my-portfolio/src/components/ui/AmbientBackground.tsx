import { useScroll, useTransform, motion } from "framer-motion";

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  // Each glow fades in and out as you scroll through its portion
  const glow1 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const glow2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.42], [0, 1, 1, 0]);
  const glow3 = useTransform(scrollYProgress, [0.32, 0.42, 0.52, 0.58], [0, 1, 1, 0]);
  const glow4 = useTransform(scrollYProgress, [0.48, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const glow5 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.92], [0, 1, 1, 0]);
  const glow6 = useTransform(scrollYProgress, [0.82, 0.9, 0.96, 1], [0, 1, 1, 0]);

  const glows = [
    { opacity: glow1, x: "15%",  y: "5%",   color: "rgba(99, 102, 241, 0.16)", size: 600 },
    { opacity: glow2, x: "75%",  y: "18%",  color: "rgba(139, 92, 246, 0.14)", size: 550 },
    { opacity: glow3, x: "20%",  y: "35%",  color: "rgba(16, 185, 129, 0.12)", size: 500 },
    { opacity: glow4, x: "80%",  y: "50%",  color: "rgba(99, 102, 241, 0.14)", size: 580 },
    { opacity: glow5, x: "15%",  y: "68%",  color: "rgba(139, 92, 246, 0.12)", size: 520 },
    { opacity: glow6, x: "75%",  y: "85%",  color: "rgba(59, 130, 246, 0.15)", size: 560 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {glows.map((g, i) => (
        <motion.div
          key={i}
          style={{
            opacity: g.opacity,
            left: g.x,
            top: g.y,
            width: g.size,
            height: g.size,
            background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute rounded-full blur-3xl"
        />
      ))}
    </div>
  );
}
