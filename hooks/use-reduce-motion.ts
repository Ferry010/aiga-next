'use client';
import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export const useReduceMotion = (): boolean => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(document.documentElement.classList.contains("a11y-reduce-motion"));
    const observer = new MutationObserver(() => {
      setReduced(document.documentElement.classList.contains("a11y-reduce-motion"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return reduced;
};

// Calm motion when either the site setting or the system setting asks for it.
// Both hooks are always called, in the same order, on every render (rules of hooks).
export const useCalmMotion = (): boolean => {
  const site = useReduceMotion();
  const system = useReducedMotion();
  return site || !!system;
};
