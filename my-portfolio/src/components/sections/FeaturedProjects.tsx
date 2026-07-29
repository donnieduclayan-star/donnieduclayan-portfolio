import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../../data/portfolioData";
import type { Project } from "../../data/portfolioData";
import { ChevronLeft, ChevronRight, Star, Layers, ArrowUpRight, Maximize2, X } from "lucide-react";
import TextReveal from "../ui/TextReveal";

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // ── Single state-driven carousel for both desktop and mobile ──
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalPanels = projects.length;

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + totalPanels) % totalPanels);
    },
    [totalPanels]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  // Swipe gesture support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) navigate(1);  // Swipe left → next
      else navigate(-1);          // Swipe right → prev
    }
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="projects"
      className="bg-transparent relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/4 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Section Header ── */}
      <div ref={sectionRef} className="pt-20 md:pt-28 px-4 sm:px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <Star className="h-3.5 w-3.5" />
            Portfolio
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark">
            <TextReveal text="Featured Projects & " delay={0.1} />
            <span className="font-serif italic text-accent/80">Systems</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>
      </div>

      {/* ── Project Showcase ── */}
      <div className="pb-20 px-4 sm:px-6 md:px-12">
        <div className="mx-auto max-w-[1300px] relative">
          {/* Progress bar */}
          <div className="mb-8 h-[3px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((current + 1) / totalPanels) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-accent to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            />
          </div>

          {/* Swipeable card area */}
          <div
            className="relative overflow-hidden rounded-3xl min-h-[500px] md:min-h-[560px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={projects[current].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl glass-card overflow-hidden relative w-full min-h-[500px] md:min-h-[560px]"
              >
                {/* LEFT: Visual / Mockup — Enlarged Layout */}
                <div className="lg:col-span-7 relative bg-primary/40 p-6 md:p-10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-purple-500/5 pointer-events-none" />
                  <motion.span
                    className="absolute top-4 left-6 font-display text-[160px] md:text-[240px] font-black text-dark leading-none select-none pointer-events-none opacity-[0.04]"
                  >
                    {String(current + 1).padStart(2, "0")}
                  </motion.span>
                  <div className="relative z-10 w-full max-w-xl md:max-w-2xl">
                    <ProjectMockup type={projects[current].mockType} title={projects[current].title} />
                  </div>
                </div>

                {/* RIGHT: Project Info */}
                <div className="lg:col-span-5 relative p-6 md:p-10 flex flex-col justify-center overflow-hidden">
                  <div className="flex flex-col gap-5">
                    {/* Project number + Role */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-display text-4xl md:text-5xl font-black gradient-text leading-none">
                        {String(current + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                        {projects[current].role}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-dark leading-tight">
                      {projects[current].title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {projects[current].description}
                    </p>

                    {/* Key Features */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted/60 flex items-center gap-1.5">
                        <Layers className="h-3 w-3" />
                        {projects[current].id === "yesdo-system" ? "Key Responsibilities" : "Key Features"}
                      </span>
                      <ul className="flex flex-col gap-1.5">
                        {projects[current].features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-muted/80 leading-relaxed flex gap-2">
                            <span className="text-accent mt-0.5 shrink-0">
                              <ArrowUpRight className="h-3 w-3" />
                            </span>
                            <span className="line-clamp-2">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {projects[current].techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-semibold bg-white/5 border border-white/8 px-2.5 py-1 rounded-md text-muted hover:border-accent/30 hover:text-accent transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Navigation Controls ── */}
          <div className="flex items-center justify-between mt-8 relative z-20">
            {/* Prev button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-muted hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-pointer shadow-md"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Prev</span>
            </motion.button>

            {/* Dots + Counter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                    }}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      current === idx
                        ? "w-8 h-2 bg-accent shadow-lg shadow-accent/30"
                        : "w-2.5 h-2.5 bg-muted/20 hover:bg-muted/40"
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-muted/50 tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(1)}
              className="group flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-muted hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-pointer shadow-md"
              aria-label="Next project"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Project Mockups ────────────────────────────────────────
function ProjectMockup({ type, title }: { type: Project["mockType"]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getScreenshots = () => {
    if (type === "plantrack") {
      return [
        { src: "/screenshots/plantrack-login.jpg", label: "Login Screen" },
        { src: "/screenshots/plantrack-dashboard-overview.jpg", label: "Dashboard Overview" },
        { src: "/screenshots/plantrack-user-management.jpg", label: "User Management" },
        { src: "/screenshots/plantrack-target-reports.jpg", label: "PGS Target Form" },
        { src: "/screenshots/plantrack-calendar.jpg", label: "Calendar of Activities" },
        { src: "/screenshots/plantrack-schedule.jpg", label: "Schedule Board" },
        { src: "/screenshots/plantrack-submit-report.jpg", label: "Submit Report" },
        { src: "/screenshots/plantrack-reports.jpg", label: "Consolidated Reports" },
      ];
    }
    if (type === "yesdo") {
      return [
        { src: "/screenshots/yesdo-login.jpg", label: "Login Screen" },
        { src: "/screenshots/yesdo-user-list.jpg", label: "User Management" },
        { src: "/screenshots/yesdo-admin-dashboard.jpg", label: "Admin Dashboard" },
        { src: "/screenshots/yesdo-member-portal.jpg", label: "Member Portal" },
        { src: "/screenshots/yesdo-sk-dashboard.jpg", label: "SK Dashboard" },
      ];
    }
    if (type === "hris") {
      return [
        { src: "/screenshots/erecords-login.png", label: "Login Screen" },
        { src: "/screenshots/erecords-dashboard.png", label: "Dashboard" },
        { src: "/screenshots/erecords-add-event.png", label: "Add Event" },
        { src: "/screenshots/erecords-event-scheduled.png", label: "Scheduled Activities" },
        { src: "/screenshots/erecords-profile.png", label: "User Profile" },
      ];
    }
    return null;
  };

  const screenshots = getScreenshots();

  const handleCloseModal = useCallback(() => {
    setIsFullscreen(false);
    setCurrentIndex(0); // Auto-resets back to Login Page (index 0) upon exit!
  }, []);

  // Prevent background scroll when fullscreen modal is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Modal keyboard navigation & escape to close
  useEffect(() => {
    if (!isFullscreen || !screenshots) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseModal();
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % screenshots.length);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, screenshots, handleCloseModal]);

  if (screenshots) {
    const domainLabel = type === "plantrack" ? "dti.gov.ph/plantrack" : type === "yesdo" ? "yesdo.gov.ph" : "dti-erecords.gov.ph";

    return (
      <>
        <div className="w-full aspect-[16/10] sm:aspect-[16/10] flex flex-col bg-[#0b0f19] border border-white/8 rounded-2xl shadow-2xl overflow-hidden text-muted group relative">
          {/* Window header with tab navigation */}
          <div className="bg-secondary px-3.5 py-2.5 border-b border-white/8 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] z-20">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <div className="bg-white/5 rounded px-2.5 py-0.5 text-[9px] border border-white/8 ml-2 text-muted truncate max-w-[130px]">
                {domainLabel}
              </div>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto max-w-[65%] no-scrollbar">
              {screenshots.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`px-2 py-0.5 rounded text-[9px] font-sans font-bold transition-all cursor-pointer whitespace-nowrap ${
                    currentIndex === idx
                      ? "bg-accent text-white"
                      : "text-muted hover:text-dark hover:bg-white/5"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Screen Preview — Larger */}
          <div
            onClick={() => setIsFullscreen(true)}
            className="flex-1 bg-black/20 relative overflow-hidden flex items-center justify-center cursor-pointer group/screen"
          >
            <img
              src={screenshots[currentIndex].src}
              alt={screenshots[currentIndex].label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/screen:scale-105"
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white font-sans text-xs sm:text-sm font-semibold">
              <Maximize2 className="w-6 h-6 text-accent animate-pulse" />
              <span>Click for Enlarged Fullscreen Mode</span>
            </div>
          </div>
        </div>

        {/* ── True Fullscreen Viewport Overlay via React Portal ── */}
        {isFullscreen &&
          createPortal(
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-lg text-white flex flex-col w-screen h-screen overflow-hidden select-none cursor-pointer"
              >
                {/* Top App Header */}
                <div
                  className="bg-[#0e1320]/95 backdrop-blur-xl border-b border-white/10 px-5 md:px-8 py-3.5 flex items-center justify-between shrink-0 relative z-[9999999] cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <span className="font-display font-black text-xl md:text-2xl gradient-text truncate">
                      {title}
                    </span>
                    <span className="hidden sm:inline font-mono text-xs px-3 py-1 rounded-md bg-accent/15 border border-accent/30 text-accent font-semibold">
                      {screenshots[currentIndex].label} ({currentIndex + 1}/{screenshots.length})
                    </span>
                  </div>

                  {/* Top Screenshot Tabs inside Fullscreen Header */}
                  <div className="hidden lg:flex items-center gap-1.5 bg-white/5 p-1.5 rounded-xl border border-white/10">
                    {screenshots.map((s, idx) => (
                      <button
                        key={s.label}
                        onClick={() => setCurrentIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          currentIndex === idx
                            ? "bg-accent text-white shadow-md shadow-accent/40 font-bold"
                            : "text-muted hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Simple Elegant Close Button X */}
                  <button
                    onClick={handleCloseModal}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 hover:text-white text-muted border border-white/15 flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    aria-label="Close Fullscreen View"
                  >
                    <X className="w-5.5 h-5.5" />
                  </button>
                </div>

                {/* Main Fullscreen Display Stage — Enlarged Viewport */}
                <div className="relative flex-1 bg-transparent flex items-center justify-center p-1 md:p-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={screenshots[currentIndex].src}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      src={screenshots[currentIndex].src}
                      alt={screenshots[currentIndex].label}
                      className="w-full h-full max-w-[98vw] max-h-[89vh] object-contain rounded-xl shadow-2xl border border-white/10 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </AnimatePresence>

                  {/* Floating Prev Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-white/20 text-white flex items-center justify-center bg-black/50 hover:bg-accent hover:border-accent transition-all duration-200 cursor-pointer shadow-2xl z-50 group"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 group-hover:-translate-x-0.5 transition-transform" />
                  </button>

                  {/* Floating Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((prev) => (prev + 1) % screenshots.length);
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-white/20 text-white flex items-center justify-center bg-black/50 hover:bg-accent hover:border-accent transition-all duration-200 cursor-pointer shadow-2xl z-50 group"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-7 h-7 md:w-8 md:h-8 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Bottom Navigation Toolbar */}
                <div
                  className="bg-[#0e1320]/95 backdrop-blur-xl border-t border-white/10 px-5 py-3 flex items-center justify-between gap-4 shrink-0 relative z-[9999999] cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-xs text-muted/70 flex items-center gap-2">
                    <span className="font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">
                      ← / → Arrow Keys
                    </span>
                    <span>to switch screens | </span>
                    <span className="font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">
                      Click background
                    </span>
                    <span>to exit</span>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex items-center gap-2.5 overflow-x-auto max-w-full no-scrollbar">
                    {screenshots.map((s, idx) => (
                      <button
                        key={s.src}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer w-20 h-12 md:w-24 md:h-14 shrink-0 ${
                          currentIndex === idx
                            ? "border-accent scale-105 shadow-md shadow-accent/50 opacity-100"
                            : "border-white/10 opacity-50 hover:opacity-90"
                        }`}
                      >
                        <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>,
            document.body
          )}
      </>
    );
  }

  if (type === "yesdo") {
    return (
      <div className="w-full aspect-[16/11] flex flex-col bg-primary border border-white/6 rounded-xl shadow-2xl overflow-hidden font-mono text-[9px] text-muted">
        {/* Window header */}
        <div className="bg-secondary px-3 py-2 border-b border-white/8 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] border border-white/8 ml-4 font-sans text-muted">
            yesdo.gov/dashboard
          </div>
        </div>
        {/* Workspace */}
        <div className="p-3 flex-1 grid grid-cols-12 gap-3 bg-primary">
          <div className="col-span-3 border-r border-white/8 flex flex-col gap-1.5">
            <div className="h-2 bg-accent/25 rounded-sm w-[70%]" />
            <div className="h-1.5 bg-white/8 rounded-sm" />
            <div className="h-1.5 bg-white/8 rounded-sm" />
            <div className="h-1.5 bg-white/8 rounded-sm" />
          </div>
          <div className="col-span-9 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-accent/10 border border-accent/20 p-1.5 rounded flex flex-col">
                <span className="text-[7px] font-bold text-accent">Active Projects</span>
                <span className="text-[11px] font-extrabold text-dark mt-0.5">14</span>
              </div>
              <div className="bg-white/5 border border-white/8 p-1.5 rounded flex flex-col">
                <span className="text-[7px] text-muted">Budget Spent</span>
                <span className="text-[11px] font-extrabold text-dark mt-0.5">$12.4k</span>
              </div>
              <div className="bg-white/5 border border-white/8 p-1.5 rounded flex flex-col">
                <span className="text-[7px] text-muted">Volunteers</span>
                <span className="text-[11px] font-extrabold text-dark mt-0.5">86</span>
              </div>
            </div>
            <div className="flex-1 border border-white/8 rounded p-2 flex flex-col justify-end gap-1 relative overflow-hidden bg-white/3">
              <span className="absolute top-1 left-2 text-[7px] font-sans font-bold text-muted">
                Fiscal Allocation (YESDO)
              </span>
              <div className="flex items-end gap-2.5 h-[50px] px-2">
                <div className="bg-accent/40 rounded-t w-4 h-[30%]" />
                <div className="bg-accent w-4 h-[60%]" />
                <div className="bg-accent/60 rounded-t w-4 h-[45%]" />
                <div className="bg-accent/80 rounded-t w-4 h-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Portfolio fallback
  return (
    <div className="w-full aspect-[16/11] flex flex-col bg-primary border border-white/6 rounded-xl shadow-2xl overflow-hidden font-mono text-[9px] text-muted">
      <div className="bg-secondary px-3 py-2 border-b border-white/8 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] border border-white/8 ml-4 font-sans text-muted">
          donnieduclayan.dev
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-3 bg-primary">
        <div className="flex justify-between items-center border-b border-white/8 pb-1.5">
          <div className="h-2 bg-white/10 rounded-sm w-[20%]" />
          <div className="flex gap-1.5">
            <div className="h-1 bg-white/10 rounded-sm w-4" />
            <div className="h-1 bg-white/10 rounded-sm w-4" />
            <div className="h-1 bg-white/10 rounded-sm w-4" />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-12 gap-3 items-center">
          <div className="col-span-8 flex flex-col gap-2">
            <div className="h-3.5 bg-accent/20 rounded-sm w-[80%]" />
            <div className="h-1.5 bg-white/10 rounded-sm w-full" />
            <div className="h-1.5 bg-white/10 rounded-sm w-[90%]" />
            <div className="h-3 bg-accent rounded-sm w-[40%] mt-1" />
          </div>
          <div className="col-span-4 flex justify-center">
            <div className="w-10 h-10 rounded-full border border-dashed border-accent/50 flex items-center justify-center text-[10px] font-bold text-accent">
              D
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
