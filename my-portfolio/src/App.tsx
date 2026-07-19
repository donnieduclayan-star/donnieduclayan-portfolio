import ScrollProgressBar from "./components/layout/ScrollProgressBar";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import AboutMe from "./components/sections/AboutMe";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import Leadership from "./components/sections/Leadership";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import SectionReveal from "./components/ui/SectionReveal";
import ScrollSpy from "./components/ui/ScrollSpy";
import BackToTop from "./components/ui/BackToTop";
import SectionDivider from "./components/ui/SectionDivider";
import Preloader from "./components/ui/Preloader";
import AmbientBackground from "./components/ui/AmbientBackground";
import HoneycombBackground from "./components/ui/HoneycombBackground";
import InfiniteMarquee from "./components/ui/InfiniteMarquee";
import ScrollVelocity from "./components/ui/ScrollVelocity";
import ScrollHUD from "./components/ui/ScrollHUD";
import ScrollVelocitySkew from "./components/ui/ScrollVelocitySkew";
import { motion } from "framer-motion";

const TECH_STACK = [
  "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js",
  "Express", "Vite", "Framer Motion", "HTML5", "CSS3", "JavaScript",
  "Git", "REST API", "System Admin", "IT Support", "Networking",
];

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-primary selection:bg-accent selection:text-white overflow-hidden"
    >
      {/* Ambient Background Effects */}
      <AmbientBackground />
      <HoneycombBackground />

      {/* Intro Preloader Screen */}
      <Preloader />
      <CustomCursor />

      {/* Top Scroll Reading Progress */}
      <ScrollProgressBar />

      {/* Side Navigation Dots */}
      <ScrollSpy />

      {/* Floating Scroll HUD Navigation Indicator */}
      <ScrollHUD />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full">
        {/* Home/Hero Section */}
        <Hero />

        {/* Tech Stack Marquee Strip */}
        <div className="relative z-10 border-y border-white/6 bg-secondary/50 backdrop-blur-sm">
          <InfiniteMarquee
            items={TECH_STACK}
            speed={35}
            direction="left"
            scrollAware
            className="py-4"
            itemClassName="font-display text-sm font-semibold text-muted/60 uppercase tracking-wider"
            separator="✦"
          />
        </div>

        <SectionDivider />

        {/* About Section */}
        <SectionReveal variant="up">
          <ScrollVelocitySkew>
            <AboutMe />
          </ScrollVelocitySkew>
        </SectionReveal>

        <SectionDivider />

        {/* Skills Section */}
        <SectionReveal variant="blur">
          <ScrollVelocitySkew>
            <Skills />
          </ScrollVelocitySkew>
        </SectionReveal>

        {/* Scroll Velocity Text Separator */}
        <div className="relative z-10 overflow-hidden py-2 opacity-[0.06]">
          <ScrollVelocity
            text="SKILLS · EXPERTISE · PROFICIENCY · CAPABILITIES"
            baseVelocity={1.5}
            textClassName="font-display text-7xl sm:text-8xl font-black uppercase tracking-tight text-dark"
          />
        </div>

        <SectionDivider />

        {/* Experience Section */}
        <SectionReveal variant="left">
          <ScrollVelocitySkew>
            <Experience />
          </ScrollVelocitySkew>
        </SectionReveal>

        <SectionDivider />

        {/* Projects Section */}
        <SectionReveal variant="scale">
          <ScrollVelocitySkew>
            <FeaturedProjects />
          </ScrollVelocitySkew>
        </SectionReveal>

        {/* Scroll Velocity Text Separator */}
        <div className="relative z-10 overflow-hidden py-2 opacity-[0.06]">
          <ScrollVelocity
            text="PROJECTS · SYSTEMS · DEVELOPMENT · INNOVATION"
            baseVelocity={-1.5}
            textClassName="font-display text-7xl sm:text-8xl font-black uppercase tracking-tight text-dark"
          />
        </div>

        <SectionDivider />

        {/* Leadership Section */}
        <SectionReveal variant="right">
          <ScrollVelocitySkew>
            <Leadership />
          </ScrollVelocitySkew>
        </SectionReveal>

        <SectionDivider />

        {/* Education Section */}
        <SectionReveal variant="clip">
          <ScrollVelocitySkew>
            <Education />
          </ScrollVelocitySkew>
        </SectionReveal>

        <SectionDivider />

        {/* Certifications Section */}
        <SectionReveal variant="scale">
          <ScrollVelocitySkew>
            <Certifications />
          </ScrollVelocitySkew>
        </SectionReveal>

        <SectionDivider />

        {/* Contact Section */}
        <SectionReveal variant="up">
          <ScrollVelocitySkew>
            <Contact />
          </ScrollVelocitySkew>
        </SectionReveal>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
