import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";
import Toast from "../ui/Toast";
import { Mail, Send, MapPin, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";
import MagneticButton from "../ui/MagneticButton";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsLoading(true);

    // 1. Try to save the message to your local PostgreSQL database (if running)
    const apiHost = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000";
    let dbSaved = false;
    try {
      const dbResponse = await fetch(`${apiHost}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (dbResponse.ok) {
        dbSaved = true;
        console.log("Message successfully logged to PostgreSQL database.");
      }
    } catch {
      console.warn("Local PostgreSQL database is offline. Skipping database logging.");
    }

    // 2. Send the email directly to your inbox using FormSubmit.co API
    try {
      const emailRecipient = personalInfo.emailRaw || "donnieduclayan@gmail.com";
      const emailResponse = await fetch(`https://formsubmit.co/ajax/${emailRecipient}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _subject: `Portfolio Contact: ${data.subject}`,
          message: data.message,
          _autoresponder: `Thank you for reaching out, ${data.name}! I have successfully received your message regarding "${data.subject}". I will review it and get back to you as soon as possible.\n\nBest regards,\nDonnie Duclayan`
        }),
      });

      if (emailResponse.ok) {
        setToastType("success");
        setToastMessage(
          dbSaved
            ? "Your message was sent to Donnie & saved in the database!"
            : "Your message has been sent directly to Donnie's inbox!"
        );
        setIsToastOpen(true);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
        reset();
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error("FormSubmit.co failed, attempting default email client...", err);
    }

    // 3. Fallback: Open client's default mail client with pre-filled details
    const emailRecipient = personalInfo.emailRaw || "donnieduclayan@gmail.com";
    const subjectEncoded = encodeURIComponent(data.subject);
    const bodyEncoded = encodeURIComponent(
      `Hi ${personalInfo.name},\n\nMy name is ${data.name} (${data.email}).\n\n${data.message}`
    );
    const mailtoUrl = `mailto:${emailRecipient}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setIsLoading(false);
    setToastType("success");
    setToastMessage("Opening your email client to send the message...");
    setIsToastOpen(true);
    reset();

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-transparent relative overflow-hidden px-4 sm:px-6 md:px-12">
      {/* Ambient gradient */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[150px]" />

      <div ref={sectionRef} className="mx-auto max-w-[1400px] relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-semibold text-accent mb-4"
          >
            <Send className="h-3.5 w-3.5" />
            Connect
          </motion.div>


          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-dark leading-[1.1]">
            <TextReveal text="Let's Build Something " delay={0.1} />
            <span className="font-serif italic text-accent/80">Together</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-base text-muted max-w-lg mx-auto"
          >
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-1 w-16 bg-gradient-to-r from-accent to-purple-500 rounded mx-auto origin-left"
          />
        </div>

        {/* Form and Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Direct Info & Social Cards — staggered reveal */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-dark">
                Let's discuss opportunities
              </h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                Whether you're looking for an IT support specialist, system administrator, system developer, or simply want to connect—feel free to drop a message or reach out on social channels!
              </p>
            </div>

            {/* Direct Information details — stagger cascade */}
            <div className="flex flex-col gap-4 mt-2">
              {[
                { icon: Mail, label: "Email Me", value: personalInfo.emailRaw, href: personalInfo.socials.email, isLink: true },
                { icon: Phone, label: "Call Me", value: personalInfo.phone, isLink: false },
                { icon: MapPin, label: "Location", value: personalInfo.location, isLink: false },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <TiltCard className="flex items-center gap-4 p-4 rounded-xl glass-card">
                    <motion.div
                      className="rounded-lg bg-accent/10 p-2.5 text-accent border border-accent/20"
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted">{item.label}</span>
                      {item.isLink ? (
                        <a href={item.href} className="text-sm font-semibold text-dark hover:text-accent block mt-0.5 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm font-semibold text-dark block mt-0.5">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Quick Link Cards with magnetic hover */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: FaLinkedin, href: personalInfo.socials.linkedin, label: "LinkedIn", hoverColor: "hover:text-accent" },
                { Icon: FaGithub, href: personalInfo.socials.github, label: "GitHub", hoverColor: "hover:text-dark" },
                { Icon: FaFacebook, href: personalInfo.socials.facebook, label: "Facebook", hoverColor: "hover:text-blue-500" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <MagneticButton className="w-full">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl glass-card text-muted ${item.hoverColor} transition-all duration-300 w-full h-full`}
                    >
                      <item.Icon className="h-4 w-4" />
                      <span className="text-[10px] font-semibold">{item.label}</span>
                    </a>
                  </MagneticButton>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full"
          >
            <TiltCard className="glass-card rounded-3xl p-6 md:p-8 w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                {/* Name & Email in one line on tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5 group/field">
                    <label htmlFor="name" className="text-xs font-semibold text-dark group-focus-within/field:text-accent transition-colors duration-200">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-dark placeholder:text-muted/50 bg-white/3 border-white/8 focus:bg-white/8 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-300 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold text-red-400"
                      >
                        {errors.name.message}
                      </motion.span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5 group/field">
                    <label htmlFor="email" className="text-xs font-semibold text-dark group-focus-within/field:text-accent transition-colors duration-200">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-dark placeholder:text-muted/50 bg-white/3 border-white/8 focus:bg-white/8 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-300 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold text-red-400"
                      >
                        {errors.email.message}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5 group/field">
                  <label htmlFor="subject" className="text-xs font-semibold text-dark group-focus-within/field:text-accent transition-colors duration-200">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Inquiry about System Admin role"
                    {...register("subject", { required: "Subject is required" })}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-dark placeholder:text-muted/50 bg-white/3 border-white/8 focus:bg-white/8 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-300 ${
                      errors.subject ? "border-red-500" : ""
                    }`}
                  />
                  {errors.subject && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-red-400"
                    >
                      {errors.subject.message}
                    </motion.span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5 group/field">
                  <label htmlFor="message" className="text-xs font-semibold text-dark group-focus-within/field:text-accent transition-colors duration-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Hi Donnie, I'd like to talk about a potential opportunity at our company..."
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message should be at least 10 characters long"
                      }
                    })}
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-dark placeholder:text-muted/50 bg-white/3 border-white/8 focus:bg-white/8 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all duration-300 resize-none ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  {errors.message && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-red-400"
                    >
                      {errors.message.message}
                    </motion.span>
                  )}
                </div>

                {/* Submit Button with success morph */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white px-5 py-3.5 text-sm font-semibold w-full disabled:bg-accent/60 transition-all shadow-lg shadow-accent/20 cursor-pointer relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        Sent Successfully!
                      </motion.div>
                    ) : isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Message...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

              </form>
            </TiltCard>
          </motion.div>

        </div>

        {/* Success Toast */}
        <Toast
          message={toastMessage}
          type={toastType}
          isOpen={isToastOpen}
          onClose={() => setIsToastOpen(false)}
        />

      </div>
    </section>
  );
}
