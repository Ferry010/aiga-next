'use client';
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";

// Content is always fully visible. The only motion is a short upward slide as a
// section enters the viewport, so nothing ever sits faded out waiting for a
// scroll event (which read as a broken page on phones and slow connections).

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const reduced = useReduceMotion();
  return (
    <motion.div
      initial={reduced ? false : { y: 14 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={reduced ? { duration: 0 } : { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const reduced = useReduceMotion();
  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.06 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const reduced = useReduceMotion();
  return (
    <motion.div
      variants={{
        hidden: reduced ? { y: 0 } : { y: 14 },
        visible: { y: 0, transition: { duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
