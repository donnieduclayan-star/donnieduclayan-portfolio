import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications } from "../../data/portfolioData";
import { Calendar, BadgeCheck, FileCheck } from "lucide-react";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-transparent relative overflow-hidden px-4 sm:px-6 md:px-12">
      <div ref={sectionRef} className="mx-auto max-w-[1400px] relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            Credentials
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="Professional " delay={0.1} />
            <span className="font-serif italic text-accent/80">Certifications</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 25, scale: 0.9, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.5,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full group">
                <div>
                  {/* Certificate Graphic with seal stamp animation */}
                  <div className="w-full h-32 rounded-xl bg-primary/50 border border-white/6 overflow-hidden mb-6 flex items-center justify-center relative group-hover:border-accent/20 transition-all duration-300">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <svg
                      viewBox="0 0 100 100"
                      className="w-16 h-16 text-accent/20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="15" y="10" width="70" height="80" rx="4" fill="#12121a" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <line x1="25" y1="25" x2="75" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <line x1="25" y1="35" x2="65" y2="35" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <line x1="25" y1="45" x2="55" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

                      {/* Seal with stamp animation */}
                      <circle cx="50" cy="70" r="10" fill="#12121a" stroke="#6366f1" strokeWidth="1.5" />
                      <polygon points="46,72 44,80 50,77 56,80 54,72" fill="#6366f1" opacity="0.8" />
                    </svg>

                    {/* Animated seal stamp */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 15,
                        delay: 0.5 + idx * 0.12,
                      }}
                      className="absolute"
                    >
                      <FileCheck className="h-6 w-6 text-accent" />
                    </motion.div>
                  </div>

                  {/* Details */}
                  <h3 className="font-display text-sm sm:text-base font-bold text-dark leading-snug group-hover:text-accent transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-accent font-semibold mt-1">
                    {cert.organization}
                  </p>
                </div>

                {/* Bottom details */}
                <div className="mt-6 pt-3 border-t border-white/8 flex items-center justify-between text-[10px] font-semibold text-muted">
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + idx * 0.12 }}
                    className="flex items-center gap-1"
                  >
                    <Calendar className="h-3 w-3" />
                    {cert.date}
                  </motion.span>
                  {cert.credentialId && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + idx * 0.12 }}
                      className="font-mono text-dark bg-white/5 px-2 py-0.5 rounded border border-white/8"
                    >
                      {cert.credentialId}
                    </motion.span>
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
