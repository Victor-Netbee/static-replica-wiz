import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import type { Product } from "@/lib/data";
import { productById } from "@/lib/data";
import { useCart, fmt } from "@/lib/cart";
import { ProductModal } from "./ProductModal";

type SlotState = { productId: string };

export function BundleModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add, setOpen } = useCart();
  const [slots, setSlots] = useState<SlotState[]>([]);
  const [swapSlotIdx, setSwapSlotIdx] = useState<number | null>(null);
  const [customizeFor, setCustomizeFor] = useState<Product | null>(null);

  useEffect(() => {
    if (product?.isBundle && product.bundleSlots) {
      setSlots(product.bundleSlots.map((s) => ({ productId: s.defaultProductId })));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  // Sum of individual prices → shown as strikethrough / undiscounted
  const rawTotal = useMemo(
    () => slots.reduce((s, x) => s + productById(x.productId).basePrice, 0),
    [slots],
  );

  if (!product || !product.isBundle || !product.bundleSlots) return null;

  const finalPrice = product.basePrice; // bundle fixed price
  const originalStrike = product.originalPrice ?? Math.max(rawTotal, finalPrice + 20);

  const handleAdd = () => {
    add({
      key: `${product.id}-${slots.map((s) => s.productId).join("-")}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      toppings: slots.map((s) => productById(s.productId).name),
      unitPrice: finalPrice,
    });
    onClose();
    setTimeout(() => setOpen(true), 150);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
        <div className="relative bg-card w-full md:max-w-4xl md:mx-4 md:rounded-3xl rounded-t-3xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-elevated animate-slide-up">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Composite image side */}
          <div className="md:w-1/2 relative bg-linear-to-br from-promo-green/80 to-promo-green flex items-center justify-center p-6 md:p-10 shrink-0 overflow-hidden min-h-[240px]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
            <div className="relative grid grid-cols-2 gap-2 w-full max-w-sm">
              {slots.slice(0, 4).map((s, i) => (
                <img
                  key={i}
                  src={productById(s.productId).image}
                  alt=""
                  className="w-full aspect-square object-contain drop-shadow-lg animate-scale-in"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
                />
              ))}
            </div>
          </div>

          {/* Slots side */}
          <div className="md:w-1/2 overflow-y-auto flex flex-col">
            <div className="p-6 md:p-8 pb-32">
              <h2 className="text-2xl md:text-3xl font-black font-display mb-2 pr-12">{product.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">{product.description}</p>

              <div className="space-y-3">
                {slots.map((slot, idx) => {
                  const p = productById(slot.productId);
                  return (
                    <div key={idx} className="bg-card rounded-2xl border border-border p-3 flex gap-3 items-center animate-fade-in">
                      <div className="w-16 h-16 bg-surface rounded-xl flex items-center justify-center shrink-0">
                        <img src={p.image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">{p.name}</div>
                        {p.ingredients && (
                          <p className="text-xs text-muted-foreground line-clamp-1">{p.ingredients.join(", ")}</p>
                        )}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setSwapSlotIdx(idx)}
                            className="text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 rounded-full px-3 py-1 transition"
                          >
                            Înlocuiește
                          </button>
                          {product.bundleSlots![idx].customizable && (
                            <button
                              onClick={() => setCustomizeFor(p)}
                              className="text-xs font-semibold text-muted-foreground hover:text-foreground rounded-full px-2 py-1 transition"
                            >
                              Personalizează
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky CTA */}
            <div className="sticky bottom-0 p-4 md:p-5 bg-card border-t border-border">
              <div className="flex items-baseline gap-3 mb-3">
                <div className="text-2xl font-black font-display">{fmt(finalPrice)} lei</div>
                <div className="text-sm text-muted-foreground line-through">{fmt(originalStrike)} lei</div>
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-primary text-primary-foreground rounded-full h-14 font-bold text-base md:text-lg shadow-cta hover:bg-primary-hover hover:-translate-y-0.5 transition"
              >
                În coș
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swap picker */}
      {swapSlotIdx !== null && (
        <SwapPicker
          slot={product.bundleSlots[swapSlotIdx]}
          onPick={(pid) => {
            setSlots((prev) => prev.map((s, i) => (i === swapSlotIdx ? { productId: pid } : s)));
            setSwapSlotIdx(null);
          }}
          onClose={() => setSwapSlotIdx(null)}
        />
      )}

      {/* Customize existing pizza (topping-only overlay) */}
      {customizeFor && (
        <ProductModal product={customizeFor} onClose={() => setCustomizeFor(null)} />
      )}
    </>
  );
}

function SwapPicker({
  slot,
  onPick,
  onClose,
}: {
  slot: { swappableProductIds: string[] };
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <div className="relative bg-card w-full md:max-w-md md:mx-4 md:rounded-3xl rounded-t-3xl max-h-[85vh] overflow-hidden shadow-elevated animate-slide-up">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <button onClick={onClose} className="p-1 -ml-1" aria-label="Înapoi">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-display font-black text-lg">Alege înlocuitorul</div>
        </div>
        <div className="p-3 overflow-y-auto max-h-[70vh] grid grid-cols-2 gap-2">
          {slot.swappableProductIds.map((pid) => {
            const p = productById(pid);
            return (
              <button
                key={pid}
                onClick={() => onPick(pid)}
                className="text-left bg-card rounded-2xl border border-border p-3 hover:border-primary hover:shadow-card transition"
              >
                <div className="aspect-square bg-surface rounded-xl flex items-center justify-center mb-2">
                  <img src={p.image} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="font-semibold text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground">{fmt(p.basePrice)} lei</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
