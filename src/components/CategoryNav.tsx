import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export function CategoryNav() {
  const [active, setActive] = useState(categories[0].id);
  const [showMore, setShowMore] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      let current = categories[0].id;
      for (const c of categories) {
        const el = document.getElementById(`cat-${c.id}`);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - 160 <= 0) current = c.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <div
          ref={scrollerRef}
          className="flex items-center gap-1 md:gap-2 overflow-x-auto scrollbar-hide py-3 pr-24"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => jump(c.id)}
              className={`shrink-0 px-4 md:px-5 h-10 md:h-11 rounded-full font-semibold text-sm md:text-base transition-all whitespace-nowrap ${
                active === c.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pl-6 bg-linear-to-r from-transparent to-background">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="shrink-0 flex items-center gap-1 px-4 h-10 md:h-11 rounded-full hover:bg-surface font-semibold text-sm md:text-base"
          >
            Mai mult <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showMore && (
          <div className="absolute right-4 md:right-6 top-full mt-2 bg-card rounded-2xl shadow-elevated border border-border p-2 min-w-48 animate-scale-in origin-top-right">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => { jump(c.id); setShowMore(false); }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface font-medium"
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
