import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowRight, Download, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { personalInfo, stats } from "../../data/portfolioData";
import heroImage from "../../assets/profile-transparent.png";
import MagneticButton from "../ui/MagneticButton";
import AnimatedCounter from "../ui/AnimatedCounter";
import SplitText from "../ui/SplitText";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Parallax Scroll Setup
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Multi-layer parallax at different depths — refined easing
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yProfile = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yStats = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);
  const blurFade = useTransform(scrollYProgress, [0, 0.5], [0, 12]);

  // Gradient mesh hue shift on scroll
  const meshHue = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Detect first scroll to hide scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Role switching animation interval
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const navbarHeight = 80;
      const targetPosition = contactSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden pt-24 pb-16 px-6 md:px-12 noise-overlay"
    >
      {/* Gradient Mesh Background with scroll hue shift */}
      <motion.div
        className="absolute inset-0 gradient-mesh"
        style={{
          filter: useTransform(meshHue, (h) => `hue-rotate(${h}deg)`),
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--color-border-val) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-val) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Content Layout */}
      <motion.div
        style={{
          opacity: opacityFade,
          scale: scaleFade,
          filter: useTransform(blurFade, (b) => `blur(${b}px)`),
        }}
        className="relative z-10 mx-auto max-w-6xl w-full flex flex-col gap-10"
      >
        {/* 2-Column Grid for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Profile Image */}
          <motion.div
            style={{ y: yProfile }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
            >
              {/* Glow ring behind profile */}
              <motion.div
                animate={{
                  scale: [1.1, 1.15, 1.1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-transparent to-purple-500/10 blur-3xl"
              />

              {/* Profile Image with float */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-56 sm:w-64 md:w-72 lg:w-80 flex items-center justify-center z-10 cursor-pointer"
              >
                <img
                  src={heroImage}
                  alt="Donnie Duclayan"
                  className="w-full h-auto object-cover drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)] hover:drop-shadow-[0_20px_40px_rgba(99,102,241,0.5)] transition-all duration-500"
                  style={{ objectPosition: 'center 35%' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Text & CTAs */}
          <motion.div
            style={{ y: yText }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-accent mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent pulse-glow" />
              Available for Opportunities
            </motion.div>

            {/* Name with SplitText character animation */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-dark tracking-tight leading-[1.1]"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block"
              >
                Hi, I'm
              </motion.span>{" "}
              <br className="hidden sm:inline" />
              <SplitText
                text={personalInfo.name.split(" ")[0]}
                className="gradient-text"
                delay={0.4}
                charDelay={0.05}
                spring
              />{" "}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif italic font-semibold text-dark/70"
              >
                {personalInfo.name.split(" ").slice(1).join(" ")}
              </motion.span>
            </motion.h1>

            {/* Role Switching Carousel with enhanced transition */}
            <div className="h-10 mt-4 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: -45 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-xl sm:text-2xl font-semibold text-accent/90 inline-block"
                  style={{ transformOrigin: "center", perspective: "600px" }}
                >
                  {personalInfo.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Professional Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
            >
              An Information Technology graduate offering a unique blend of core technical knowledge, software system building proficiency, and strategic leadership.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
            >
              <MagneticButton>
                <button
                  onClick={handleScrollToContact}
                  className="group flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-hover hover:shadow-accent-glow transition-all duration-300 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Let's Connect
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
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
                  className="flex items-center justify-center gap-2 w-full sm:w-auto rounded-full glass px-7 py-3.5 text-sm font-semibold text-dark hover:text-accent transition-all duration-300 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </MagneticButton>
            </motion.div>

            {/* Socials with stagger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { Icon: FaGithub, href: personalInfo.socials.github, label: "GitHub" },
                { Icon: FaLinkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
                { Icon: FaFacebook, href: personalInfo.socials.facebook, label: "Facebook" },
                { Icon: Mail, href: personalInfo.socials.email, label: "Email" },
              ].map(({ Icon, href, label }, idx) => (
                <MagneticButton key={label}>
                  <motion.a
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel={label !== "Email" ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 15, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 1.5 + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-xl glass text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
                    aria-label={`${label} Profile`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </motion.a>
                </MagneticButton>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: yStats }}
          className="w-full max-w-4xl mx-auto mt-4 px-4 hidden sm:block"
        >
          <div className="glass rounded-2xl px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.8 + idx * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-2xl font-bold text-dark">
                  <AnimatedCounter target={stat.value} />{stat.suffix}
                </div>
                <div className="text-[11px] font-medium text-muted mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Premium Animated Scroll Indicator ── */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          >
            {/* Mouse icon */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-start justify-center w-7 h-11 rounded-full border-2 border-muted/30 bg-white/[0.02]"
            >
              <motion.div
                animate={{ y: [2, 10, 2], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 rounded-full bg-accent mt-2 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              />
            </motion.div>

            {/* Label */}
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-[10px] font-semibold text-muted uppercase tracking-[0.2em]"
            >
              Scroll to explore
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
