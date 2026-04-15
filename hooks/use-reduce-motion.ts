'use client';
import { useState, useEffect } from "react";

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
