import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function ScrollSpy() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero
      setIsVisible(window.scrollY > 400);

      const navbarHeight = 100;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navbarHeight + 100) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group flex items-center gap-2 cursor-pointer"
                aria-label={`Go to ${section.label}`}
              >
                {/* Label tooltip */}
                <motion.span
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                  className="text-[10px] font-semibold uppercase tracking-wider text-accent pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  style={{ opacity: isActive ? 1 : undefined }}
                >
                  {section.label}
                </motion.span>

                {/* Dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.6,
                    backgroundColor: isActive ? "#6366f1" : "rgba(255, 255, 255, 0.2)",
                  }}
                  whileHover={{ scale: 1, backgroundColor: "#6366f1" }}
                  transition={{ duration: 0.2 }}
                  className="w-2.5 h-2.5 rounded-full border border-white/10"
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
