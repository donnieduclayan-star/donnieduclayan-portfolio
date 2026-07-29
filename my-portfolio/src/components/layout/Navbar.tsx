import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Download, Sun, Moon } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";
import MagneticButton from "../ui/MagneticButton";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return (saved === "dark" || saved === "light") ? saved : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const { scrollY } = useScroll();

  // Track scroll for glass backdrop effect
  useMotionValueEvent(scrollY, "change", (latest) => {
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
        y: 0,
        opacity: 1,
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
              onClick={() => {
                // Trigger auto download in background while link opens in new tab
                const downloadLink = document.createElement("a");
                downloadLink.href = personalInfo.resumeUrl;
                downloadLink.download = "Donnie_Duclayan_Resume.pdf";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="ml-4 flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-accent hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Resume
            </motion.a>
          </MagneticButton>

          {/* Theme Toggle Button */}
          <MagneticButton>
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="ml-2 flex items-center justify-center rounded-full glass w-10 h-10 text-dark hover:text-accent transition-all duration-300 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4.5 w-4.5 text-amber-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4.5 w-4.5 text-indigo-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </MagneticButton>
        </div>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="rounded-xl glass p-2.5 text-dark hover:text-accent transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-400" />
            )}
          </motion.button>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="rounded-xl glass p-2.5 text-dark hover:text-accent transition-colors"
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
                      : "text-muted hover:text-dark hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  const downloadLink = document.createElement("a");
                  downloadLink.href = personalInfo.resumeUrl;
                  downloadLink.download = "Donnie_Duclayan_Resume.pdf";
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent/10 border border-accent/20 py-3 text-base font-medium text-accent hover:bg-accent hover:text-white transition-colors mt-2 cursor-pointer"
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
