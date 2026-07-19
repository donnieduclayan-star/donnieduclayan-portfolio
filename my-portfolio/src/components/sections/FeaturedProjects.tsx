import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../../data/portfolioData";
import type { Project } from "../../data/portfolioData";
import { ExternalLink, Info, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Modal from "../ui/Modal";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";

export default function FeaturedProjects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden px-6 md:px-12">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/4 rounded-full blur-[150px]" />

      <div ref={sectionRef} className="mx-auto max-w-7xl relative z-10">

        {/* Section Title */}
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

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-dark">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard
                className="rounded-3xl glass-card p-6 md:p-8 flex flex-col justify-between group h-full cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Gradient sweep on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/8 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                />

                <div className="relative z-10">
                  {/* Device Mockup with hover parallax */}
                  <div className="w-full h-48 sm:h-56 rounded-2xl bg-primary/50 border border-white/6 overflow-hidden mb-6 flex items-center justify-center p-4 relative group-hover:border-accent/20 transition-all duration-300">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-accent/8 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProjectMockup type={project.mockType} />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <h3 className="font-display text-xl font-bold text-dark group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack tags with stagger */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech, tIdx) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: idx * 0.15 + 0.4 + tIdx * 0.03,
                        }}
                        className="text-[10px] font-semibold bg-white/5 px-2.5 py-1 rounded-md text-muted border border-white/8"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 mt-8 pt-4 border-t border-white/8 relative z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                    className="flex items-center justify-center gap-1.5 rounded-full glass text-dark px-4 py-2.5 text-xs font-semibold hover:border-accent/30 hover:text-accent transition-all duration-200 cursor-pointer"
                  >
                    <Info className="h-3.5 w-3.5" />
                    Details
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center gap-1.5 rounded-full glass px-4 py-2.5 text-xs font-semibold text-muted hover:text-dark hover:border-accent/30 transition-colors"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                    Code
                  </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-1.5 rounded-full glass px-4 py-2.5 text-xs font-semibold text-muted hover:text-dark hover:border-accent/30 transition-colors ml-auto"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Demo
                </a>
              </div>
            </TiltCard>
          </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        <Modal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title || ""}
        >
          {selectedProject && (
            <div className="flex flex-col gap-5">
              {/* Visual System Display */}
              <div className="w-full">
                {selectedProject.id === "dti-erecords" ? (
                  <ERecordsGallery />
                ) : (
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                    <ProjectMockup type={selectedProject.mockType} />
                  </div>
                )}
              </div>

              {/* Action links */}
              <div className="flex gap-4 pt-4 border-t border-white/8 mt-2">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl glass hover:border-accent/30 text-dark py-3 text-sm font-bold transition-colors"
                >
                  <FaGithub className="h-4 w-4" />
                  Source Code
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white py-3 text-sm font-bold shadow-lg shadow-accent/15 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Preview
                </a>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </section>
  );
}

// Micro graphics mockups representing visual projects
function ProjectMockup({ type }: { type: Project["mockType"] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (type === "yesdo") {
    return (
      <div className="w-full h-full flex flex-col bg-primary border border-white/6 rounded-lg shadow-inner overflow-hidden font-mono text-[9px] text-muted">
        {/* Mock window header */}
        <div className="bg-secondary px-3 py-2 border-b border-white/8 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] border border-white/8 ml-4 font-sans text-muted">yesdo.gov/dashboard</div>
        </div>
        {/* Mock workspace */}
        <div className="p-3 flex-1 grid grid-cols-12 gap-3 bg-primary">
          <div className="col-span-3 border-r border-white/8 flex flex-col gap-1.5">
            <div className="h-2 bg-accent/25 rounded-sm w-[70%]" />
            <div className="h-1.5 bg-white/8 rounded-sm" />
            <div className="h-1.5 bg-white/8 rounded-sm" />
            <div className="h-1.5 bg-white/8 rounded-sm" />
          </div>
          <div className="col-span-9 flex flex-col gap-3">
            {/* Stats */}
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
            {/* Bar chart mockup */}
            <div className="flex-1 border border-white/8 rounded p-2 flex flex-col justify-end gap-1 relative overflow-hidden bg-white/3">
              <span className="absolute top-1 left-2 text-[7px] font-sans font-bold text-muted">Fiscal Allocation (YESDO)</span>
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

  if (type === "plantrack") {
    return (
      <div className="w-full h-full flex flex-col bg-primary border border-white/6 rounded-lg shadow-inner overflow-hidden font-mono text-[9px] text-muted">
        {/* Mock window header */}
        <div className="bg-secondary px-3 py-2 border-b border-white/8 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] border border-white/8 ml-4 font-sans text-muted">dti.gov.ph/plantrack</div>
        </div>
        {/* Mock Kanban */}
        <div className="p-3 flex-1 bg-primary grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-[7px] font-sans font-bold text-muted border-b border-white/8 pb-1">TODO</span>
            <div className="bg-white/5 border border-white/8 p-2 rounded shadow-sm flex flex-col gap-1.5">
              <div className="h-1.5 bg-white/10 rounded-sm w-[90%]" />
              <div className="h-1 bg-white/10 rounded-sm w-[40%]" />
              <span className="text-[6px] font-bold text-red-400 bg-red-500/10 px-1 py-0.2 rounded border border-red-500/20 self-start">High</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[7px] font-sans font-bold text-muted border-b border-white/8 pb-1">IN PROGRESS</span>
            <div className="bg-white/5 border border-white/8 p-2 rounded shadow-sm flex flex-col gap-1.5">
              <div className="h-1.5 bg-accent/40 rounded-sm w-[80%]" />
              <div className="h-1.5 bg-white/10 rounded-sm w-[60%]" />
              <div className="h-1 bg-white/10 rounded-sm w-[30%]" />
              <span className="text-[6px] font-bold text-accent bg-accent/10 px-1 py-0.2 rounded border border-accent/20 self-start">Ongoing</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[7px] font-sans font-bold text-muted border-b border-white/8 pb-1">COMPLETED</span>
            <div className="bg-white/5 border border-white/8 p-2 rounded shadow-sm flex flex-col gap-1.5 opacity-75">
              <div className="h-1.5 bg-white/10 rounded-sm w-[95%]" />
              <span className="text-[6px] font-bold text-emerald-400 bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20 self-start">Done</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "hris") {
    const screenshots = [
      { src: "/screenshots/erecords-login.png", label: "Login" },
      { src: "/screenshots/erecords-dashboard.png", label: "Dashboard" },
      { src: "/screenshots/erecords-add-event.png", label: "Add Event" },
      { src: "/screenshots/erecords-event-scheduled.png", label: "Scheduled" },
      { src: "/screenshots/erecords-profile.png", label: "Profile" }
    ];

    return (
      <div className="w-full h-full flex flex-col bg-[#0b0f19] border border-white/6 rounded-lg overflow-hidden text-muted">
        {/* Mock window header */}
        <div className="bg-secondary px-3 py-2 border-b border-white/8 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
            <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] border border-white/8 ml-2 text-muted truncate max-w-[100px]">
              dti-erecords.gov/portal
            </div>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {screenshots.map((s, idx) => (
              <button
                key={s.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`px-1.5 py-0.5 rounded text-[8px] font-sans font-bold transition-all ${
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
        {/* Render actual system screenshot */}
        <div className="flex-1 bg-black/20 relative overflow-hidden flex items-center justify-center">
          <img
            src={screenshots[currentIndex].src}
            alt={screenshots[currentIndex].label}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  // Portfolio
  return (
    <div className="w-full h-full flex flex-col bg-primary border border-white/6 rounded-lg shadow-inner overflow-hidden font-mono text-[9px] text-muted">
      <div className="bg-secondary px-3 py-2 border-b border-white/8 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <div className="bg-white/5 rounded px-2 py-0.5 text-[8px] border border-white/8 ml-4 font-sans text-muted">donnieduclayan.dev</div>
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
            <div className="w-10 h-10 rounded-full border border-dashed border-accent/50 flex items-center justify-center text-[10px] font-bold text-accent">D</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ERecordsGallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slides = [
    "/screenshots/erecords-login.png",
    "/screenshots/erecords-dashboard.png",
    "/screenshots/erecords-add-event.png",
    "/screenshots/erecords-event-scheduled.png",
    "/screenshots/erecords-profile.png",
  ];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95
    })
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="mt-2">
      {/* Browser Mockup Layout */}
      <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#0f1016] shadow-2xl flex flex-col w-full aspect-[16/10] group/gallery">
        
        {/* Browser Top Bar */}
        <div className="bg-[#12121a] px-4 py-2.5 border-b border-white/5 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/40" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
            <span className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>
          <div className="bg-white/5 rounded-md px-3 py-0.5 text-[9px] font-mono text-muted/80 text-center max-w-[180px] truncate select-none">
            dti-erecords.gov/portal
          </div>
          <div className="w-8" />
        </div>

        {/* Viewport - light background for seamless white screenshot blending */}
        <div className="relative flex-1 bg-[#f8fafc] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={slides[current]}
              alt={`E-ReCORDS screenshot ${current + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 220, damping: 25 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="absolute inset-0 w-full h-full object-contain p-4 md:p-6 select-none"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        {/* Left Arrow (styled for light background visibility) */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-dark shadow-md border border-black/5 flex items-center justify-center transition-all opacity-0 group-hover/gallery:opacity-100 cursor-pointer"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4.5 w-4.5 text-secondary" />
        </button>

        {/* Right Arrow (styled for light background visibility) */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-dark shadow-md border border-black/5 flex items-center justify-center transition-all opacity-0 group-hover/gallery:opacity-100 cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight className="h-4.5 w-4.5 text-secondary" />
        </button>

        {/* Counter Badge */}
        <div className="absolute top-12 right-3 z-10 px-2.5 py-1 rounded-full bg-secondary/80 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-white/95 select-none">
          {current + 1} / {slides.length}
        </div>

        {/* Dots (contrast dots for light background) */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`rounded-full transition-all duration-300 ${
                current === index
                  ? "w-4 h-1.5 bg-accent"
                  : "w-1.5 h-1.5 bg-accent/25 hover:bg-accent/45"
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
