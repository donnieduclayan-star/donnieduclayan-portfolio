import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../../data/portfolioData";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";
import { Wrench, Cpu } from "lucide-react";

// Custom SVG high-end inline brand logos matching exactly your stack
const BrandLogos: Record<string, React.ComponentType<{ className?: string }>> = {
  react: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10 text-[#61dafb] drop-shadow-[0_0_8px_rgba(97,218,251,0.5)]">
      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  node: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#339933] drop-shadow-[0_0_8px_rgba(51,153,51,0.4)]" fill="currentColor">
      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.75 14.25L12 20.25V13.5l6.75-3.9v6.65zM5.25 9.6l6.75 3.9v6.75l-6.75-3.9V9.6zM12 11.25L5.25 7.35 12 3.45l6.75 3.9L12 11.25z"/>
    </svg>
  ),
  postgres: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#336791] drop-shadow-[0_0_8px_rgba(51,103,145,0.4)]" fill="currentColor">
      <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm1 14.5c0 .3-.2.5-.5.5h-1a.5.5 0 01-.5-.5v-4h2v4zm2-5h-6V9.5c0-.8.7-1.5 1.5-1.5h3c.8 0 1.5.7 1.5 1.5V11.5z" />
    </svg>
  ),
  jwt: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#df1a5b] drop-shadow-[0_0_8px_rgba(223,26,91,0.4)]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  ),
  security: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#00bcd4] drop-shadow-[0_0_8px_rgba(0,188,212,0.4)]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8M9 11h6" />
    </svg>
  ),
  docker: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#2496ed] drop-shadow-[0_0_8px_rgba(36,150,237,0.4)]" fill="currentColor">
      <path d="M13.962 10.775h-2.43V8.344h2.43v2.431zM11.233 10.775H8.802v-2.43h2.431v2.431zM11.233 8.04H8.802V5.611h2.431V8.04zM13.962 8.04h-2.43V5.611h2.43V8.04zM16.69 10.775h-2.43V8.344h2.43v2.431zM16.69 8.04h-2.43V5.611h2.43V8.04zM19.418 10.775h-2.428V8.344h2.428v2.431zM6.505 10.775H4.074v-2.43h2.431v2.431zM23.999 11.268c-.065-.054-.361-.273-.827-.5-1.084-.533-2.612-.224-3.32.223-.112.073-.186.155-.246.236l-.014.019v.004h-.002v2.463c-.15.422-.437.8-.813 1.054a2.766 2.766 0 01-1.399.412H2.38a.56.56 0 00-.54.409c-.58 1.942.279 3.868 2.553 4.298 6.55 1.237 13.568.647 18.232-3.153 1.026-.836 1.458-1.921 1.424-3.414-.02-1.002-.023-1.996-.05-2.051z"/>
    </svg>
  ),
  api: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#10b981] drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="5" r="3" fill="currentColor" />
      <circle cx="5" cy="19" r="3" fill="currentColor" />
      <circle cx="19" cy="19" r="3" fill="currentColor" />
      <path d="M5 16v-3a4 4 0 014-4h6a4 4 0 014 4v3" />
      <path d="M12 8v5" />
    </svg>
  ),
  js: () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#f7df1e] drop-shadow-[0_0_8px_rgba(247,223,30,0.4)]" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e"/>
      <path d="M11 12v3.5c0 .8-.5 1.3-1.3 1.3H9.2c-.7 0-1.1-.3-1.1-1v-.5h1.2v.4c0 .3.2.4.5.4h.4c.3 0 .4-.2.4-.6V12h1.4zm6.6 2.3c0 .8-.6 1.4-1.4 1.4h-1.5c-.8 0-1.3-.5-1.3-1.3v-.3h1.2v.2c0 .3.2.4.5.4h.6c.3 0 .4-.1.4-.4v-1c0-.3-.2-.4-.5-.4h-.8c-.8 0-1.3-.4-1.3-1.2v-.8c0-.8.5-1.3 1.3-1.3h1.4c.8 0 1.2.5 1.2 1.2v.3H15v-.2c0-.3-.2-.4-.4-.4h-.5c-.3 0-.4.1-.4.4v.8c0 .3.2.4.5.4h.8c.8 0 1.4.4 1.4 1.2v1.1z" fill="black"/>
    </svg>
  )
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden px-6 md:px-12">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={sectionRef} className="mx-auto max-w-7xl relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <Wrench className="h-3.5 w-3.5" />
            Core Technology Stack
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="Technical & Architecture " delay={0.1} />
            <span className="font-serif italic text-accent/80">Capabilities</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Clean 4-Column Grid for the 8 Core Stack elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => {
            const hasLogo = skill.logoId && BrandLogos[skill.logoId];
            const LogoComponent = hasLogo ? BrandLogos[skill.logoId!] : null;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="glass-card p-6 rounded-2xl flex flex-col items-center justify-between text-center h-full group relative overflow-hidden">
                  {/* Subtle brand glow behind on card hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/0 group-hover:to-accent/3 transition-all duration-500 rounded-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center w-full h-full">
                    {/* Centered Brand Logo Box */}
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-accent/30 group-hover:bg-accent/5 flex items-center justify-center mb-5 transition-all duration-500"
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                      }}
                    >
                      {LogoComponent ? (
                        <LogoComponent />
                      ) : (
                        <div className="text-accent">
                          <Cpu className="h-8 w-8" />
                        </div>
                      )}
                    </motion.div>

                    {/* Title & Type classification */}
                    <div className="mb-3">
                      <h3 className="font-display text-base font-bold text-dark leading-tight group-hover:text-accent transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-accent/70 mt-1.5 block font-semibold select-none">
                        {skill.tags[0]}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-[11px] text-muted/80 leading-relaxed mb-4 max-w-[200px]">
                      {skill.description}
                    </p>

                    {/* Tags List */}
                    <div className="flex flex-wrap justify-center gap-1 mt-auto">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-semibold bg-white/5 border border-white/8 px-2 py-0.5 rounded-md text-muted select-none group-hover:border-accent/25 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
