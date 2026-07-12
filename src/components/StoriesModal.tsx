import { useEffect, useRef, useState, useCallback } from "react";
import { X, Pause, Play, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import type { Promo } from "@/lib/data";

const STORY_DURATION = 6000; // ms per slide

type Props = {
  promos: Promo[];
  startPromoId: string;
  onClose: () => void;
  onCta?: (promo: Promo) => void;
};

export function StoriesModal({ promos, startPromoId, onClose, onCta }: Props) {
  const initialIdx = Math.max(0, promos.findIndex((p) => p.id === startPromoId));
  const [promoIdx, setPromoIdx] = useState(initialIdx);
  const [slideIdx, setSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 for current slide
  const [paused, setPaused] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const promo = promos[promoIdx];
  const slide = promo?.stories[slideIdx];

  const goNext = useCallback(() => {
    setProgress(0);
    elapsedRef.current = 0;
    if (!promo) return;
    if (slideIdx < promo.stories.length - 1) {
      setSlideIdx(slideIdx + 1);
    } else if (promoIdx < promos.length - 1) {
      setPromoIdx(promoIdx + 1);
      setSlideIdx(0);
    } else {
      onClose();
    }
  }, [promo, slideIdx, promoIdx, promos.length, onClose]);

  const goPrev = useCallback(() => {
    setProgress(0);
    elapsedRef.current = 0;
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    } else if (promoIdx > 0) {
      const prev = promos[promoIdx - 1];
      setPromoIdx(promoIdx - 1);
      setSlideIdx(prev.stories.length - 1);
    }
  }, [slideIdx, promoIdx, promos]);

  // Progress ticker
  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    startRef.current = performance.now() - elapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      elapsedRef.current = elapsed;
      const p = Math.min(1, elapsed / STORY_DURATION);
      setProgress(p);
      if (p >= 1) {
        goNext();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, slideIdx, promoIdx, goNext]);

  // Reset elapsed on slide change
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [slideIdx, promoIdx]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === " ") { e.preventDefault(); setPaused((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  if (!promo || !slide) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm animate-fade-in flex items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 text-white/90 hover:text-white transition p-2"
        aria-label="Închide"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Prev arrow */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute left-4 lg:left-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full text-white/80 hover:text-white hover:bg-white/10 items-center justify-center transition"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Story card */}
      <div
        key={`${promoIdx}-${slideIdx}`}
        className="relative w-[92vw] max-w-[440px] h-[85vh] max-h-[820px] rounded-2xl overflow-hidden shadow-elevated animate-scale-in flex flex-col"
        style={{ backgroundColor: slide.bg }}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
          {promo.stories.map((_, i) => {
            const fill = i < slideIdx ? 1 : i === slideIdx ? progress : 0;
            return (
              <div key={i} className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden">
                <div
                  className="h-full bg-white"
                  style={{ width: `${fill * 100}%`, transition: i === slideIdx ? "none" : "width 0.2s" }}
                />
              </div>
            );
          })}
        </div>

        {/* Pause button */}
        <button
          onClick={(e) => { e.stopPropagation(); setPaused((v) => !v); }}
          className="absolute top-4 right-3 z-10 text-white/90 hover:text-white p-1.5 mt-2"
          aria-label={paused ? "Redă" : "Pauză"}
        >
          {paused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>

        {/* Tap zones for prev/next */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-0 bottom-0 w-1/3 z-[5]"
          aria-label="Anterior"
        />
        <button
          onClick={goNext}
          className="absolute right-0 top-0 bottom-0 w-1/3 z-[5]"
          aria-label="Următor"
        />

        {/* Background image */}
        <img
          src={slide.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70 animate-scale-in"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />

        {/* Content */}
        <div className="relative z-[1] flex flex-col h-full p-6 pt-14 text-white text-center">
          {slide.eyebrow && (
            <div className="mx-auto inline-block bg-black/40 backdrop-blur-sm text-white/95 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 animate-fade-in">
              {slide.eyebrow}
            </div>
          )}
          <h2 className="font-display font-black text-4xl md:text-5xl leading-[1.05] tracking-tight mb-5 animate-slide-up drop-shadow">
            {slide.title}
          </h2>
          {slide.priceLabel && (
            <div className="mx-auto inline-block bg-[oklch(0.6_0.17_145)] text-white font-bold text-lg px-5 py-2.5 rounded-full mb-6 animate-bounce-in shadow-cta">
              {slide.priceLabel}
            </div>
          )}
          {slide.bullets && (
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-white/95 font-medium text-base md:text-lg mb-4">
              {slide.bullets.map((b, i) => (
                <span
                  key={i}
                  className="animate-fade-in"
                  style={{ animationDelay: `${150 + i * 100}ms`, animationFillMode: "backwards" }}
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          <div className="flex-1" />

          {/* CTA */}
          <button
            onClick={() => { onCta?.(promo); onClose(); }}
            className="mx-auto flex items-center justify-center gap-2 bg-white text-foreground font-bold rounded-full h-14 px-8 min-w-[240px] hover:bg-white/95 hover:-translate-y-0.5 transition-all shadow-elevated animate-slide-up"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <ShoppingBag className="w-5 h-5" />
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Next arrow */}
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full text-white/80 hover:text-white hover:bg-white/10 items-center justify-center transition"
        aria-label="Următor"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
}
