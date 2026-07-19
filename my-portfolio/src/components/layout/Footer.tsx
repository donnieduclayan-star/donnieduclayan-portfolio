import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { personalInfo } from "../../data/portfolioData";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  // Monitor scroll height to toggle Back-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  const socialLinks = [
    { Icon: FaGithub, href: personalInfo.socials.github, label: "GitHub" },
    { Icon: FaLinkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
    { Icon: FaFacebook, href: personalInfo.socials.facebook, label: "Facebook" },
    { Icon: Mail, href: personalInfo.socials.email, label: "Email" },
  ];

  return (
    <footer ref={footerRef} className="bg-secondary border-t border-white/8 mt-20 py-12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Brand & Copyright — fade up on reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          <h3 className="font-display text-lg font-bold text-dark">
            <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
            <span className="font-serif italic font-semibold text-dark/70 ml-1">
              {personalInfo.name.split(" ").slice(1).join(" ")}
            </span>
          </h3>
          <p className="text-sm text-muted mt-1">
            Information Technology Graduate • Professional Portfolio
          </p>
          <p className="text-xs text-muted/60 mt-4">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </motion.div>

        {/* Middle: Links with stagger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted"
        >
          {["about", "skills", "experience", "projects", "contact"].map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item}`}
              onClick={(e) => handleLinkClick(e, `#${item}`)}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ y: -2 }}
              className="hover:text-accent transition-colors capitalize"
            >
              {item}
            </motion.a>
          ))}
        </motion.div>

        {/* Right Side: Social Media Icons with spring hover */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3"
        >
          {socialLinks.map(({ Icon, href, label }, idx) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={`${label} Profile`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + idx * 0.06 }}
              whileHover={{
                rotate: [0, -10, 10, 0],
                scale: 1.15,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
              className="flex items-center justify-center w-9 h-9 rounded-xl glass text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Floating Back To Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center h-11 w-11 rounded-full glass text-accent shadow-lg shadow-accent/10 hover:bg-accent hover:text-white transition-all duration-300 focus:outline-none"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  );
}
