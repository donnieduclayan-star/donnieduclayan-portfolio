import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { experiences } from "../../data/portfolioData";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import TextReveal from "../ui/TextReveal";

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-linked timeline line draw
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden px-6 md:px-12">
      {/* Subtle accent glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[150px]" />

      <div ref={sectionRef} className="mx-auto max-w-5xl relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
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
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Timeline Structure with SVG line draw */}
        <div ref={timelineRef} className="relative pl-6 md:pl-10 ml-4 md:ml-12 flex flex-col gap-12">
          {/* Background track */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />

          {/* Animated SVG line draw on scroll */}
          <motion.div
            style={{
              height: lineHeight,
              opacity: lineOpacity,
            }}
            className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-accent via-purple-500 to-accent/30 origin-top"
          />

          {/* Traveling glow dot along timeline */}
          <motion.div
            style={{
              top: lineHeight,
              opacity: lineOpacity,
            }}
            className="absolute left-[-3px] w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)] z-10"
          />

          {experiences.map((exp, idx) => (
            <motion.div
              key={`${exp.role}-${idx}`}
              initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Timeline Marker Point with pulse animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: idx * 0.2 + 0.3,
                }}
                className="absolute -left-[37px] md:-left-[53px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-secondary border border-white/10 shadow-lg shadow-accent/10"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(99, 102, 241, 0.4)",
                      "0 0 0 8px rgba(99, 102, 241, 0)",
                      "0 0 0 0 rgba(99, 102, 241, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.5,
                  }}
                  className="h-2 w-2 rounded-full bg-accent"
                />
              </motion.div>

              {/* Timeline Content Card */}
              <motion.div
                whileHover={{
                  y: -3,
                  transition: { duration: 0.3 },
                }}
                className="glass-card rounded-2xl p-6 md:p-8"
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/8 pb-4 mb-6">
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
                    transition={{ delay: idx * 0.2 + 0.4 }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted glass px-3 py-1 rounded-full self-start md:self-center"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </motion.div>
                </div>

                {/* Responsibilities with stagger + checkmark draw-in */}
                <div className="flex flex-col gap-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <motion.div
                      key={rIdx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.2 + 0.5 + rIdx * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                          delay: idx * 0.2 + 0.6 + rIdx * 0.08,
                        }}
                      >
                        <CheckCircle2 className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                      </motion.div>
                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {resp}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack/Skills Used tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t border-white/8">
                  {exp.skillsUsed.map((skill, sIdx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.2 + 0.8 + sIdx * 0.04,
                      }}
                      className="text-xs bg-white/5 border border-white/8 px-3 py-1 rounded-full text-dark/80 font-medium hover:border-accent/30 hover:text-accent transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
