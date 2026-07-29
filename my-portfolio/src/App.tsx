import ScrollProgressBar from "./components/layout/ScrollProgressBar";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import AboutMe from "./components/sections/AboutMe";
import Experience from "./components/sections/Experience";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import Education from "./components/sections/Education";
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
import SmoothScroll from "./components/ui/SmoothScroll";
import ScrollTextReveal from "./components/ui/ScrollTextReveal";
import ScrollVelocity from "./components/ui/ScrollVelocity";
import ScrollHUD from "./components/ui/ScrollHUD";
import ScrollVelocitySkew from "./components/ui/ScrollVelocitySkew";
import { motion } from "framer-motion";

export default function App() {
  return (
    <SmoothScroll>
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

          {/* ── Cinematic Scroll Text Reveal ── */}
          <ScrollTextReveal
            text="Building Technology That Powers Success. From software development and IT support to hardware solutions and project management, I deliver reliable technology that drives innovation and solves real-world challenges."
          />

          <SectionDivider />

          {/* About Section */}
          <SectionReveal variant="up">
            <ScrollVelocitySkew>
              <AboutMe />
            </ScrollVelocitySkew>
          </SectionReveal>

          <SectionDivider />


          {/* Experience Section — with scroll-linked timeline */}
          <SectionReveal variant="up">
            <ScrollVelocitySkew>
              <Experience />
            </ScrollVelocitySkew>
          </SectionReveal>

          <SectionDivider />

          {/* Projects Section — horizontal scroll-pinned showcase */}
          <FeaturedProjects />

          {/* Scroll Velocity Text Separator */}
          <div className="relative z-10 overflow-hidden py-2 opacity-[0.06]">
            <ScrollVelocity
              text="PROJECTS · SYSTEMS · DEVELOPMENT · INNOVATION"
              baseVelocity={-1.5}
              textClassName="font-display text-7xl sm:text-8xl font-black uppercase tracking-tight text-dark"
            />
          </div>

          <SectionDivider />

          {/* Education Section */}
          <SectionReveal variant="clip">
            <ScrollVelocitySkew>
              <Education />
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
    </SmoothScroll>
  );
}
