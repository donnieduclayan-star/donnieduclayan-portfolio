import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "../../data/portfolioData";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";

export default function Education() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-transparent relative overflow-hidden px-6 md:px-12">
      {/* Subtle gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div ref={sectionRef} className="mx-auto max-w-5xl relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <GraduationCap className="h-3.5 w-3.5" />
            Background
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="Education & " delay={0.1} />
            <span className="font-serif italic text-accent/80">Coursework</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Education Clean Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltCard className="rounded-3xl glass-card p-6 md:p-10">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/8 pb-6 mb-8">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 0.4,
                }}
                className="rounded-2xl bg-accent/10 p-3 text-accent border border-accent/20 hidden sm:block"
              >
                <GraduationCap className="h-7 w-7" />
              </motion.div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-dark">
                  {education.degree}
                </h3>
                <p className="text-sm font-semibold text-accent mt-1">
                  {education.institution}
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted glass px-3 py-1 rounded-full self-start md:self-center"
            >
              <Calendar className="h-3.5 w-3.5" />
              {education.period}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Bio & Achievements */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-muted leading-relaxed text-sm sm:text-base"
              >
                {education.description}
              </motion.p>

              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Key Achievements
                </h4>
                <div className="flex flex-col gap-3">
                  {education.achievements.map((ach, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + idx * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-start gap-2.5"
                    >
                      {/* Bullet with draw-in animation */}
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.6 + idx * 0.1,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0"
                      />
                      <span className="text-sm text-muted leading-relaxed">{ach}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Coursework Grid — wave cascade pattern */}
            <div className="lg:col-span-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Relevant Coursework
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {education.coursework.map((course, idx) => {
                  // Wave pattern: row + col delay for top-left to bottom-right cascade
                  const row = Math.floor(idx / 2);
                  const col = idx % 2;
                  const waveDelay = 0.6 + (row + col) * 0.08;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(4px)" }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                      transition={{
                        duration: 0.4,
                        delay: waveDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -2,
                        borderColor: "rgba(99, 102, 241, 0.3)",
                        transition: { duration: 0.2 },
                      }}
                      className="p-3.5 rounded-xl bg-white/3 border border-white/6 transition-all duration-200"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-dark">{course}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
}
