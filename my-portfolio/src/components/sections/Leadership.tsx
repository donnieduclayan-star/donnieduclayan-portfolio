import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Trophy, Shield, GraduationCap, DollarSign, Users, Mic, Landmark } from "lucide-react";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";

interface LeadershipArea {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
}

const LEADERSHIP_AREAS: LeadershipArea[] = [
  {
    title: "Community Programs",
    description: "Designed local development protocols and organized disaster relief logistics and volunteer deployment during emergency operations.",
    icon: Shield,
    metric: "500+ Beneficiaries"
  },
  {
    title: "Sports & Recreation",
    description: "Arranged community basketball and sports leagues promoting youth wellness, discipline, and local cooperation.",
    icon: Trophy,
    metric: "300+ Participants"
  },
  {
    title: "Youth Development",
    description: "Conducted educational webinars and IT introductory courses, equipping student council teams with core technical skills.",
    icon: GraduationCap,
    metric: "4 Seminars Run"
  },
  {
    title: "Budget Management",
    description: "Supervised public youth budget allocations and prepared financial statements following legal audits.",
    icon: DollarSign,
    metric: "100% Audit Compliance"
  },
  {
    title: "Team Leadership",
    description: "Coordinated assemblies of youth council members, directing project subcommittees and organizing outreach schedules.",
    icon: Users,
    metric: "10+ Council Members"
  },
  {
    title: "Public Speaking",
    description: "Represented the youth constituency in LGU municipal sessions, proposing projects and passing resolutions.",
    icon: Mic,
    metric: "50+ Assemblies"
  }
];

export default function Leadership() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Subtle parallax for the narrative card
  const narrativeRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ["start end", "end start"],
  });
  const narrativeY = useTransform(scrollYProgress, [0, 1], ["10px", "-10px"]);

  return (
    <section id="leadership" className="py-16 md:py-20 bg-transparent relative overflow-hidden px-4 sm:px-6 md:px-12">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div ref={sectionRef} className="mx-auto max-w-[1400px] relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <Landmark className="h-3.5 w-3.5" />
            Governance
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
            <TextReveal text="SK Chairperson Leadership " delay={0.1} />
            <span className="font-serif italic text-accent/80">Impact</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Narrative Intro Card with parallax */}
        <motion.div
          ref={narrativeRef}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: narrativeY }}
        >
          <TiltCard className="glass-card rounded-3xl p-6 md:p-10 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Executive Governance</span>
              <h3 className="font-display text-xl font-extrabold text-dark mt-1">SK Chairperson elected 2023 - 2026</h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Serving as Sangguniang Kabataan (SK) Chairperson, Donnie spearheaded public administration and community development. This role demanded strict compliance with audit procedures, strategic planning, cross-functional collaboration, and the management of public funds to execute local youth development strategies.
              </p>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.5,
              }}
              className="glass rounded-2xl p-6 shrink-0 w-full md:w-auto text-center"
            >
              <span className="text-xs text-muted block">Office Term</span>
              <span className="font-display text-2xl font-black gradient-text block mt-1">3 Years</span>
              <span className="text-[10px] font-semibold text-accent block mt-1">Active Public Service</span>
            </motion.div>
          </TiltCard>
        </motion.div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP_AREAS.map((area, idx) => {
            const AreaIcon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TiltCard className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="rounded-xl bg-accent/10 p-2.5 text-accent border border-accent/20"
                        whileHover={{
                          rotate: [0, -15, 15, 0],
                          scale: 1.15,
                          transition: { duration: 0.4 },
                        }}
                        initial={{ rotate: -90, scale: 0 }}
                        animate={isInView ? { rotate: 0, scale: 1 } : {}}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 12,
                          delay: 0.5 + idx * 0.1,
                        }}
                      >
                        <AreaIcon className="h-5 w-5" />
                      </motion.div>
                      <h3 className="font-display text-base font-bold text-dark">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                      {area.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-3 border-t border-white/8">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="inline-flex text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20"
                    >
                      {area.metric}
                    </motion.span>
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
