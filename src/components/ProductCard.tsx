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
      className="group relative text-left bg-card rounded-3xl p-4 md:p-5 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 flex flex-col animate-slide-up"
    >
      {product.badge && (
        <span className={`absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full ${badgeColor(product.badge.color)}`}>
          {product.badge.text}
        </span>
      )}
      <div className="aspect-square flex items-center justify-center mb-3 md:mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
        />
      </div>
      <h3 className="font-bold text-base md:text-lg mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4 flex-1">{product.description}</p>
      <div className="mt-auto">
        <span className="inline-flex items-center bg-surface hover:bg-surface-2 rounded-full px-4 md:px-5 h-10 md:h-11 font-bold text-sm md:text-base transition group-hover:bg-primary group-hover:text-primary-foreground">
          {product.configurable ? "de la " : ""}{fmt(product.basePrice)} lei
        </span>
      </div>
    </button>
  );
}
