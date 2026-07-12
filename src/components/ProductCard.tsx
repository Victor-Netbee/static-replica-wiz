import type { Product } from "@/lib/data";
import { fmt } from "@/lib/cart";

const badgeColor = (c?: string) =>
  c === "orange" ? "bg-promo-orange text-white"
  : c === "green" ? "bg-promo-green text-white"
  : c === "lime" ? "bg-promo-lime text-foreground"
  : "bg-promo-pink text-foreground";

export function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 flex flex-col animate-slide-up min-h-[320px] md:min-h-[360px]"
    >
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {product.badge && (
        <span className={`absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full ${badgeColor(product.badge.color)}`}>
          {product.badge.text}
        </span>
      )}
      <div className="relative z-10 mt-auto p-4 md:p-5">
        <h3 className="font-bold text-lg md:text-xl mb-1 text-white drop-shadow-sm">{product.name}</h3>
        <p className="text-sm text-white/80 line-clamp-2 mb-3 md:mb-4">{product.description}</p>
        <span className="inline-flex items-center bg-white/95 hover:bg-white text-foreground rounded-full px-4 md:px-5 h-10 md:h-11 font-bold text-sm md:text-base transition group-hover:bg-primary group-hover:text-primary-foreground">
          {product.configurable ? "de la " : ""}{fmt(product.basePrice)} lei
        </span>
      </div>
    </button>
  );
}
