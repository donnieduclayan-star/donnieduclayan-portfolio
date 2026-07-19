import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isOpen, onClose }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-secondary p-4 shadow-xl border border-border max-w-sm"
        >
          {type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
          )}
          
          <div className="flex-1 text-sm font-medium text-dark">
            {message}
          </div>

          <button
            onClick={onClose}
            aria-label="Dismiss message"
            className="rounded-lg p-1 text-muted hover:bg-primary hover:text-dark transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
