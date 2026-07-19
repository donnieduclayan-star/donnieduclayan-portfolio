import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Compass, ChevronDown } from "lucide-react";

interface SectionInfo {
  id: string;
  label: string;
}

const SECTIONS: SectionInfo[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "skills", label: "Expertise" },
  { id: "experience", label: "Journey" },
  { id: "projects", label: "Portfolio" },
  { id: "leadership", label: "Governance" },
  { id: "education", label: "Background" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" }
];

export default function ScrollHUD() {
  const [activeSection, setActiveSection] = useState("Home");
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();

  // Watch scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // Watch scroll y to toggle HUD visibility (hide in first few viewports if desired, or show after scroll > 100)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 120);
  });

  // Monitor intersection for active section labels
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = SECTIONS.find((s) => s.id === entry.target.id);
          if (matched) {
            setActiveSection(matched.label);
            setActiveIdx(SECTIONS.indexOf(matched));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNextSection = () => {
    const nextIdx = (activeIdx + 1) % SECTIONS.length;
    const nextSectionId = SECTIONS[nextIdx].id;
    const nextElement = document.getElementById(nextSectionId);
    
    if (nextElement) {
      const navbarHeight = 80;
      const targetPosition = nextElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  // Radial track calculations
  const radius = 16;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3.5 pl-3.5 pr-4 py-2.5 rounded-full glass border border-white/10 shadow-lg shadow-black/25 backdrop-blur-md"
        >
          {/* Radial Progress indicator with interior indicator */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r={radius}
                className="stroke-white/5 fill-transparent"
                strokeWidth={strokeWidth}
              />
              <motion.circle
                cx="18"
                cy="18"
                r={radius}
                className="stroke-accent fill-transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-4 h-4 text-accent/80 animate-pulse" />
            </div>
          </div>

          {/* Section details */}
          <div className="flex flex-col select-none pr-1">
            <span className="text-[9px] font-bold text-accent/60 uppercase tracking-widest leading-none">
              HUD Navigation
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xs font-bold text-muted">
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSection}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-xs font-extrabold text-dark tracking-wide whitespace-nowrap"
                >
                  {activeSection}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Action button to proceed forward */}
          <motion.button
            onClick={handleNextSection}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="w-7 h-7 rounded-full flex items-center justify-center glass border border-white/5 text-muted hover:text-accent transition-colors"
            title="Next Section"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
