import { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { personalInfo, stats } from "../../data/portfolioData";
import type { Stat } from "../../data/portfolioData";
import { Award, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";
import StaggerContainer from "../ui/StaggerContainer";

export default function AboutMe() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-transparent relative overflow-hidden px-6 md:px-12">
      {/* Subtle gradient accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />

      <div ref={containerRef} className="mx-auto max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <Sparkles className="h-3.5 w-3.5" />
            My Story
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="A Passion for Technology & " delay={0.1} />
            <span className="font-serif italic text-accent/80">Leadership</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Biography Column — clip-path wipe reveal */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
            animate={isInView ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h3 className="font-display text-xl font-bold text-dark">
              Professional Biography
            </h3>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-muted leading-relaxed"
            >
              {personalInfo.careerObjective}
            </motion.p>

            {/* Value Highlights Cards with Stagger + Tilt + Rotation */}
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
              staggerDelay={0.15}
              direction="up"
            >
              {[
                { icon: Briefcase, title: "IT Specialist", desc: "Infrastructure setups & diagnostics" },
                { icon: GraduationCap, title: "System Dev", desc: "Database structures & clean layouts" },
                { icon: Award, title: "SK Leader", desc: "Community project coordination" },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -4,
                    rotateY: 5,
                    rotateX: -3,
                    transition: { duration: 0.3 },
                  }}
                >
                  <TiltCard className="p-4 rounded-xl glass-card">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={isInView ? { rotate: 0, scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.8 + idx * 0.12,
                      }}
                    >
                      <item.icon className="h-5 w-5 text-accent mb-2" />
                    </motion.div>
                    <h4 className="font-semibold text-dark text-sm">{item.title}</h4>
                    <p className="text-xs text-muted mt-1">{item.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </StaggerContainer>
          </motion.div>

          {/* Stats Column with spring bounce counters */}
          <StaggerContainer
            className="lg:col-span-5 grid grid-cols-2 gap-4"
            staggerDelay={0.12}
            direction="scale"
          >
            {stats.map((stat, idx) => (
              <StatCard key={stat.label} stat={stat} triggerStart={isInView} delayIndex={idx} />
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}

// Micro component for spring-physics counter animation
function StatCard({ stat, triggerStart, delayIndex }: { stat: Stat; triggerStart: boolean; delayIndex: number }) {
  const [count, setCount] = useState(0);
  const springValue = useMotionValue(0);
  const animatedValue = useSpring(springValue, {
    stiffness: 100,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (!triggerStart) return;

    // Spring-driven counter with overshoot
    const timeout = setTimeout(() => {
      springValue.set(stat.value);
    }, delayIndex * 120);

    const unsubscribe = animatedValue.on("change", (v) => {
      setCount(Math.round(v));
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [triggerStart, stat.value, springValue, animatedValue, delayIndex]);

  return (
    <TiltCard className="p-6 rounded-2xl glass-card flex flex-col justify-between min-h-[140px]">
      <div>
        <motion.h4
          className="font-display text-3xl font-extrabold text-dark tracking-tight"
        >
          {count}
          <span className="gradient-text">{stat.suffix}</span>
        </motion.h4>
        <div className="font-display text-sm font-semibold text-dark mt-2">
          {stat.label}
        </div>
      </div>
      <p className="text-xs text-muted mt-2">
        {stat.description}
      </p>
    </TiltCard>
  );
}
