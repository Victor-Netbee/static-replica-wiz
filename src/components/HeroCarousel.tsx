import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { promos } from "@/lib/data";
import { StoriesModal } from "./StoriesModal";

const bgFor = (c: string) =>
  c === "orange" ? "bg-promo-orange"
  : c === "green" ? "bg-promo-green"
  : c === "lime" ? "bg-promo-lime"
  : "bg-promo-yellow";

const textFor = (c: string) =>
  c === "lime" || c === "yellow" ? "text-foreground" : "text-white";

export function HeroCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const scroll = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <section className="bg-surface py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div
          ref={scroller}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        >
          {promos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className={`snap-start shrink-0 relative overflow-hidden rounded-3xl ${bgFor(p.color)} ${textFor(p.color)} w-[280px] md:w-[320px] h-[220px] md:h-[260px] text-left group transition-transform hover:-translate-y-1 hover:shadow-elevated animate-slide-up cursor-pointer`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
            >
              {p.badge && (
                <span className="absolute top-4 right-4 z-10 bg-promo-pink text-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {p.badge}
                </span>
              )}
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <div className="text-xl md:text-2xl font-black font-display leading-tight text-white drop-shadow">
                  {p.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-elevated items-center justify-center hover:scale-110 transition z-10"
          aria-label="Următoarele"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
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
