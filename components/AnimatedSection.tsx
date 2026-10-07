'use client';
import { ReactNode, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
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

// A heading or line that settles into focus as it enters: a little rise, a soft
// blur that clears. Starts visible enough to read, so nothing waits on the observer.
export const SettleIn = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => {
  const calm = useReduceMotion() || !!useReducedMotion();
  return (
    <motion.div
      initial={calm ? false : { y: 18, opacity: 0.3, filter: "blur(4px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer =({ children, className = "" }: { children: ReactNode; className?: string }) => {
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

/**
 * One item in a list that rises into place as it scrolls into view. Items further
 * down a list start a beat later. Never starts invisible, so nothing looks broken.
 */
export const RevealItem = ({
  children,
  index = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "li";
}) => {
  const calm = useReduceMotion() || !!useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      initial={calm ? false : { y: 22, scale: 0.98, opacity: 0.55 }}
      whileInView={{ y: 0, scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={calm ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.55, delay: Math.min(index, 6) * 0.07 }}
      className={className}
    >
      {children}
    </Comp>
  );
};

/**
 * A number that counts up once when it scrolls into view. If it is already on screen
 * when the page loads (or motion is reduced), it simply shows the final value.
 */
export const CountUp = ({ to, suffix = "", duration = 1.2 }: { to: number; suffix?: string; duration?: number }) => {
  const calm = useReduceMotion() || !!useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [value, setValue] = useState(to);
  const armed = useRef(false);

  // Below the fold on load: start from zero, so the count is there to see
  useEffect(() => {
    if (calm || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      armed.current = true;
      setValue(0);
    }
  }, [calm]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
};
