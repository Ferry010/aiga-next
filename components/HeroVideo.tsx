'use client';
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useReduceMotion } from "@/hooks/use-reduce-motion";
import { trackEvent } from "@/lib/track";

// The 60-second story in the hero: plays muted and on loop (all text is on screen),
// pauses when scrolled away, and lets the visitor turn the sound on. With reduced
// motion it waits for a tap instead of playing by itself.

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const calm = useReduceMotion() || !!useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Only play while the video is on screen
  useEffect(() => {
    const v = ref.current;
    if (!v || calm) return;
    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    // Browsers hold back autoplay in background tabs; start once the tab is visible
    const onVisible = () => {
      if (document.visibilityState === "visible" && inView) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [calm]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      if (v.ended || v.currentTime > 55) v.currentTime = 0;
      v.play().catch(() => {});
      trackEvent("hero_video_sound_on");
    }
  };

  const play = () => {
    ref.current?.play().catch(() => {});
    trackEvent("hero_video_play");
  };

  return (
    <div className="block-lilac rounded-[1.75rem] sm:rounded-[2rem] p-2.5 sm:p-4">
      <div className="relative overflow-hidden rounded-2xl bg-[#E9EBEF] shadow-[0_20px_50px_-24px_hsl(256_56%_33%/0.4)]">
        <video
          ref={ref}
          src="/assets/aiga-hero.mp4"
          poster="/assets/aiga-hero-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          width={1280}
          height={720}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label="Video van 60 seconden: een collega met haast zet klantdata in een gratis AI-tool. Wat er daarna gebeurt, en hoe je het voorkomt."
          className="block aspect-video w-full object-cover"
        />

        {!playing && (
          <button
            type="button"
            onClick={play}
            className="press absolute inset-0 flex items-center justify-center bg-black/5"
            aria-label="Speel de video af"
          >
            <span className="rounded-full bg-primary px-5 py-2.5 text-[0.9375rem] font-semibold text-white shadow-lg">
              Bekijk in 60 seconden
            </span>
          </button>
        )}

        {playing && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            className="press absolute bottom-3 right-3 rounded-full bg-black/70 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-white backdrop-blur-sm"
          >
            {muted ? "Geluid aan" : "Geluid uit"}
          </button>
        )}
      </div>
    </div>
  );
}
