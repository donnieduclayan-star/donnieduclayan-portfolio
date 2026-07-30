import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { educationList } from "../../data/portfolioData";
import { GraduationCap, Calendar, Layers } from "lucide-react";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";

export default function Education() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-16 md:py-20 bg-transparent relative overflow-hidden px-4 sm:px-6 md:px-12">
      {/* Ambient lighting accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div ref={sectionRef} className="mx-auto max-w-[1400px] relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-3"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Educational Journey
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="Education & " delay={0.1} />
            <span className="font-serif italic text-accent/80">Background</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* 3-Column Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {educationList.map((item, idx) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex"
            >
              <TiltCard className="rounded-3xl glass-card p-6 md:p-8 flex flex-col justify-between w-full h-full relative overflow-hidden group border border-white/8 hover:border-accent/30 transition-all duration-300">
                {/* Level Tag & Period */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                      {item.level}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted font-mono">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* School & Degree */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-dark leading-tight group-hover:text-accent transition-colors duration-300">
                      {item.institution}
                    </h3>
                    <p className="text-sm font-medium text-muted/80 mt-1">
                      {item.degree}
                    </p>
                  </div>

                  {/* Capstone Highlight for College */}
                  {item.capstone && (
                    <div className="bg-accent/10 border border-accent/25 rounded-2xl p-4 flex flex-col gap-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5" />
                        Capstone Project
                      </span>
                      <p className="text-xs font-semibold text-dark leading-relaxed">
                        {item.capstone}
                      </p>
                    </div>
                  )}

                  {/* Overview Description */}
                  {item.description && (
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
