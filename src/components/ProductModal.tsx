import { useEffect, useMemo, useState } from "react";
import { X, Info } from "lucide-react";
import type { Product } from "@/lib/data";
import { sizes, doughs, toppings } from "@/lib/data";
import { useCart, fmt } from "@/lib/cart";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add, setOpen } = useCart();
  const [sizeId, setSizeId] = useState<(typeof sizes)[number]["id"]>("30");
  const [doughId, setDoughId] = useState<(typeof doughs)[number]["id"]>("traditional");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setSizeId("30");
      setDoughId("traditional");
      setSelectedToppings([]);
      setRemoved([]);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  const price = useMemo(() => {
    if (!product) return 0;
    if (!product.configurable) return product.basePrice;
    const size = sizes.find((s) => s.id === sizeId)!;
    const toppingSum = selectedToppings.reduce((s, id) => s + (toppings.find((t) => t.id === id)?.price || 0), 0);
    return product.basePrice + size.deltaPrice + toppingSum;
  }, [product, sizeId, selectedToppings]);

  if (!product) return null;

  const currentSize = sizes.find((s) => s.id === sizeId)!;
  const currentDough = doughs.find((d) => d.id === doughId)!;
  const activeIngredients = (product.ingredients || []).filter((i) => !removed.includes(i));

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleRemove = (ing: string) => {
    setRemoved((prev) => (prev.includes(ing) ? prev.filter((x) => x !== ing) : [...prev, ing]));
  };

  const handleAdd = () => {
    const key = product.configurable
      ? `${product.id}-${sizeId}-${doughId}-${[...selectedToppings].sort().join(",")}-${[...removed].sort().join(",")}`
      : product.id;
    add({
      key,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: product.configurable ? `${currentSize.cm} cm` : undefined,
      dough: product.configurable ? currentDough.label : undefined,
      toppings: selectedToppings.map((id) => toppings.find((t) => t.id === id)!.name),
      unitPrice: price,
    });
    onClose();
    setTimeout(() => setOpen(true), 150);
  };

  return (
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

        {/* Image side */}
        <div className="md:w-1/2 relative bg-linear-to-b from-surface to-surface-2 flex items-center justify-center p-6 md:p-10 shrink-0 overflow-hidden">
          {/* decorative dotted plate */}
          <div className="absolute inset-6 md:inset-10 rounded-full border-2 border-dashed border-border/60 pointer-events-none" />
          <img
            src={product.image}
            alt={product.name}
            className="relative w-56 h-56 md:w-[380px] md:h-[380px] object-contain animate-scale-in transition-transform duration-500"
            style={{ transform: `scale(${sizeId === "25" ? 0.82 : sizeId === "30" ? 0.92 : 1})` }}
          />
        </div>

        {/* Details side */}
        <div className="md:w-1/2 overflow-y-auto flex flex-col">
          <div className="p-6 md:p-8 pb-32">
            <div className="flex items-start justify-between gap-3 mb-1 pr-12">
              <h2 className="text-2xl md:text-3xl font-black font-display leading-tight">{product.name}</h2>
              <button className="text-muted-foreground hover:text-foreground shrink-0 mt-1" aria-label="Info"><Info className="w-5 h-5" /></button>
            </div>

            {product.configurable && (
              <p className="text-sm text-muted-foreground mb-3">
                {currentSize.cm} cm, blat {currentDough.label.toLowerCase()}
                {product.weightG ? `, ${product.weightG} gr` : ""}
              </p>
            )}

            {/* Removable ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <p className="text-sm text-foreground/90 mb-6 leading-relaxed">
                {activeIngredients.map((ing, idx) => (
                  <span key={ing}>
                    <button
                      onClick={() => product.configurable && toggleRemove(ing)}
                      className={`${product.configurable ? "underline decoration-dotted underline-offset-4 hover:text-primary" : ""} transition`}
                    >
                      {ing}
                    </button>
                    {product.configurable && (
                      <button
                        onClick={() => toggleRemove(ing)}
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground text-[10px] ml-1 hover:bg-destructive hover:text-white transition align-middle"
                        aria-label={`Scoate ${ing}`}
                      >
                        ×
                      </button>
                    )}
                    {idx < activeIngredients.length - 1 && ", "}
                  </span>
                ))}
                {removed.length > 0 && (
                  <>
                    {" "}
                    <button onClick={() => setRemoved([])} className="text-primary text-xs font-semibold ml-2">
                      restabilește ({removed.length})
                    </button>
                  </>
                )}
              </p>
            )}

            {product.configurable && (
              <>
                {/* Size pills */}
                <div className="bg-surface rounded-full p-1 flex mb-3">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSizeId(s.id)}
                      className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
                        sizeId === s.id ? "bg-card shadow" : "text-muted-foreground"
                      }`}
                    >
                      {s.cm} cm
                    </button>
                  ))}
                </div>

                {/* Dough pills */}
                <div className="bg-surface rounded-full p-1 flex mb-6">
                  {doughs.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDoughId(d.id)}
                      className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition ${
                        doughId === d.id ? "bg-card shadow" : "text-muted-foreground"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Toppings grid */}
                <h3 className="font-bold text-lg mb-3">Adaugă topping</h3>
                <div className="grid grid-cols-3 gap-2">
                  {toppings.map((t) => {
                    const on = selectedToppings.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => toggleTopping(t.id)}
                        className={`relative rounded-2xl border-2 p-2 transition text-left bg-card ${
                          on ? "border-primary shadow-cta" : "border-border hover:border-primary/40"
                        }`}
                      >
                        {on && (
                          <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-bounce-in">
                            ✓
                          </span>
                        )}
                        <div className="aspect-square flex items-center justify-center mb-1">
                          <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-xs font-semibold leading-tight line-clamp-2 min-h-8">{t.name}</div>
                        <div className="text-sm font-bold mt-1">{fmt(t.price)} lei</div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {product.originalPrice && !product.configurable && (
              <p className="text-sm text-muted-foreground">
                Preț original: <span className="line-through">{fmt(product.originalPrice)} lei</span>
              </p>
            )}
          </div>

          {/* Sticky CTA */}
          <div className="sticky bottom-0 p-4 md:p-5 bg-card border-t border-border">
            <button
              onClick={handleAdd}
              className="w-full bg-primary text-primary-foreground rounded-full h-14 font-bold text-base md:text-lg shadow-cta hover:bg-primary-hover hover:-translate-y-0.5 transition"
            >
              Adaugă pentru {fmt(price)} lei
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
