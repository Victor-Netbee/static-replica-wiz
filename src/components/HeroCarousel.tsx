import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { promos } from "@/lib/data";
import { StoriesModal } from "./StoriesModal";

export function HeroCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Drag-to-scroll state
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const updateArrows = () => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  // Pointer drag handlers (mouse + touch via pointer events)
  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = scroller.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };

  return (
    <section className="bg-surface py-4 md:py-5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div
          ref={scroller}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex gap-2.5 md:gap-3 overflow-x-auto scrollbar-hide pb-1 select-none cursor-grab active:cursor-grabbing touch-pan-x"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {promos.map((p, i) => (
            <button
              key={p.id}
              onClick={(e) => {
                if (drag.current.moved) {
                  e.preventDefault();
                  drag.current.moved = false;
                  return;
                }
                setOpenId(p.id);
              }}
              className="scroll-snap-start shrink-0 relative overflow-hidden rounded-2xl w-[calc((100%-5*0.625rem)/6)] min-w-[150px] md:min-w-[180px] aspect-[3/4] text-left group animate-slide-up bg-surface-2"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "backwards", scrollSnapAlign: "start" }}
              draggable={false}
            >
              {p.badge && (
                <span className="absolute top-3 right-3 z-10 bg-promo-pink text-foreground text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {p.badge}
                </span>
              )}
              <img
                src={p.image}
                alt=""
                loading="lazy"
                draggable={false}
                className="absolute inset-0 w-full h-[62%] object-cover pointer-events-none"
              />
              <div className="absolute inset-x-0 bottom-0 h-[42%] bg-primary flex items-end p-3 md:p-4">
                <div className="text-sm md:text-base lg:text-lg font-black font-display leading-tight text-white">
                  {p.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {canPrev && (
          <button
            onClick={() => scroll(-1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-foreground shadow-elevated items-center justify-center hover:scale-110 transition z-10 animate-fade-in"
            aria-label="Anterioarele"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {canNext && (
          <button
            onClick={() => scroll(1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 rounded-full bg-white text-foreground shadow-elevated items-center justify-center hover:scale-110 transition z-10 animate-fade-in"
            aria-label="Următoarele"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {openId && (
        <StoriesModal
          promos={promos}
          startPromoId={openId}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}
