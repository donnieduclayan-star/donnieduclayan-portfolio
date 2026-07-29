import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Stage 1: Transition from Welcome message to Name introduction after 2 seconds
    const timer1 = setTimeout(() => setStep(1), 2000);
    // Stage 2: Reveal the technical loading bar and credentials
    const timer2 = setTimeout(() => setStep(2), 3200);
    // Stage 3: Split curtain wipe animation to enter the main portfolio
    const timer3 = setTimeout(() => setIsLoading(false), 4400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden"
        >
          {/* Top curtain panel */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="flex-1 bg-primary relative"
          >
            <div className="absolute inset-0 gradient-mesh opacity-40" />
          </motion.div>

          {/* Center content strip */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="font-display text-sm font-medium text-accent tracking-[0.35em] uppercase text-center"
                >
                  Welcome to My Portfolio
                </motion.div>
              )}

              {step >= 1 && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Dynamic Logo Mark D R D */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                      delay: 0.1
                    }}
                    className="relative w-28 h-28 mb-6 flex items-center justify-center"
                  >
                    {/* Pulsing glow ring background */}
                    <div className="absolute inset-0 rounded-full bg-accent/10 blur-md pulse-glow" />

                    {/* SVG border drawing */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="44"
                        stroke="url(#logo-grad)"
                        strokeWidth="2.2"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                      />
                      <defs>
                        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Logo Letters */}
                    <div className="relative font-display font-extrabold text-2xl tracking-[0.15em] text-dark flex items-center justify-center pl-1.5 select-none">
                      <span>D</span>
                      <span className="font-serif italic text-accent font-normal text-lg translate-y-0.5 mx-0.5">R</span>
                      <span>D</span>
                    </div>
                  </motion.div>

                  {/* Morphing name with character stagger */}
                  <div className="flex overflow-hidden">
                    {"Donnie".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: "120%", rotateX: 90, opacity: 0 }}
                        animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.06 + 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-display text-4xl sm:text-5xl font-extrabold gradient-text inline-block"
                        style={{ transformOrigin: "bottom" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>

                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="font-serif italic text-xl text-muted/80 mt-1"
                  >
                    R. Duclayan
                  </motion.span>

                  {step >= 2 && (
                    <>
                      {/* Loading bar */}
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden origin-left"
                      >
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full relative"
                        >
                          {/* Shimmer effect on progress bar */}
                          <div className="absolute inset-0 shimmer-slide" />
                        </motion.div>
                      </motion.div>


                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom curtain panel */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="flex-1 bg-primary relative"
          >
            <div className="absolute inset-0 gradient-mesh opacity-20 rotate-180" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
