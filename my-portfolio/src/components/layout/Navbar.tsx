import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";
import MagneticButton from "../ui/MagneticButton";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  // Scroll-direction-aware nav: hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
    setScrolled(latest > 20);
  });

  // Monitor scroll for active section highlight
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      NAV_ITEMS.forEach((item) => {
        const el = document.querySelector(item.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navbarHeight = 80;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-black/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Brand Name — entrance animation */}
        <MagneticButton>
          <motion.a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-lg font-bold tracking-tight text-dark hover:text-accent transition-colors duration-300 block"
          >
            <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
            <span className="text-muted font-normal ml-1">.dev</span>
          </motion.a>
        </MagneticButton>

        {/* Desktop Links with stagger entrance */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, idx) => (
            <MagneticButton key={item.label}>
              <motion.a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 block ${
                  activeSection === item.href
                    ? "text-accent"
                    : "text-muted hover:text-dark"
                }`}
              >
                {item.label}
                {/* Sliding active pill indicator */}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-lg bg-accent/10 -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </motion.a>
            </MagneticButton>
          ))}

          {/* Download Resume Button */}
          <MagneticButton>
            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="ml-4 flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-accent hover:bg-accent hover:text-white transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              Resume
            </motion.a>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden rounded-xl glass p-2.5 text-dark hover:text-accent transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0 glass border-t border-border/50 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className={`text-base font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${
                    activeSection === item.href
                      ? "text-accent bg-accent/10"
                      : "text-muted hover:text-dark hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 border border-accent/20 py-3 text-base font-medium text-accent hover:bg-accent hover:text-white transition-colors mt-2"
              >
                <Download className="h-5 w-5" />
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
