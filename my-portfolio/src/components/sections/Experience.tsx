import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { experiences } from "../../data/portfolioData";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import TextReveal from "../ui/TextReveal";

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll progress for the timeline line
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.6]);

  return (
    <section id="experience" className="py-16 md:py-24 bg-transparent relative overflow-hidden px-4 sm:px-6 md:px-12">
      {/* Subtle accent glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[150px]" />

      <div ref={sectionRef} className="mx-auto max-w-[1100px] relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-3"
          >
            <Briefcase className="h-3.5 w-3.5" />
            Journey
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="Work History & Key " delay={0.1} />
            <span className="font-serif italic text-accent/80">Roles</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* ── Timeline Container ── */}
        <div ref={timelineRef} className="relative">
          {/* Timeline track — static background line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-white/8" />

          {/* Timeline progress — scroll-linked glowing line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 w-[2px] bg-gradient-to-b from-accent via-accent to-purple-500 origin-top"
          >
            {/* Glowing dot at the tip */}
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_16px_4px_rgba(99,102,241,0.5)] border-2 border-primary"
            />
          </motion.div>

          {/* Experience Cards */}
          <div className="flex flex-col gap-12 md:gap-16 relative">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={`${exp.role}-${idx}`}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline node dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: idx * 0.12 + 0.2,
                      }}
                      className="w-3.5 h-3.5 rounded-full border-2 border-accent bg-primary shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${
                      isLeft ? "md:pr-0" : "md:pl-0"
                    }`}
                  >
                    <motion.div
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.25 },
                      }}
                      className="glass-card rounded-2xl p-6 md:p-7 flex flex-col justify-between h-full"
                    >
                      <div>
                        {/* Header info */}
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/8 pb-4 mb-5">
                          <div>
                            <h3 className="font-display text-xl font-bold text-dark">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-semibold text-accent mt-0.5">
                              {exp.company}
                            </p>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: idx * 0.12 + 0.2 }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted glass px-3 py-1 rounded-full shrink-0"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            {exp.period}
                          </motion.div>
                        </div>

                        {/* Responsibilities */}
                        <div className="flex flex-col gap-3">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <motion.div
                              key={rIdx}
                              initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{
                                duration: 0.4,
                                delay: idx * 0.12 + 0.3 + rIdx * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="flex items-start gap-3"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 12,
                                  delay: idx * 0.12 + 0.35 + rIdx * 0.05,
                                }}
                              >
                                <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                              </motion.div>
                              <p className="text-sm text-muted leading-relaxed">
                                {resp}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack/Skills Used tags */}
                      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/8">
                        {exp.skillsUsed.map((skill, sIdx) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 6 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                              duration: 0.3,
                              delay: idx * 0.12 + 0.4 + sIdx * 0.03,
                            }}
                            className="text-xs bg-white/5 border border-white/8 px-3 py-1 rounded-full text-dark/80 font-medium hover:border-accent/30 hover:text-accent transition-colors duration-200"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
