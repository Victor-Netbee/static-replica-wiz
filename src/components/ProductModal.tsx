import { useEffect, useMemo, useState } from "react";
import { X, Plus, Minus, Check } from "lucide-react";
import type { Product } from "@/lib/data";
import { sizes, doughs, toppings } from "@/lib/data";
import { useCart, fmt } from "@/lib/cart";

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { add, setOpen } = useCart();
  const [sizeId, setSizeId] = useState<(typeof sizes)[number]["id"]>("30");
  const [doughId, setDoughId] = useState<(typeof doughs)[number]["id"]>("traditional");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setSizeId("30");
      setDoughId("traditional");
      setSelectedToppings([]);
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

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAdd = () => {
    const key = product.configurable
      ? `${product.id}-${sizeId}-${doughId}-${[...selectedToppings].sort().join(",")}`
      : product.id;
    add({
      key,
      productId: product.id,
      name: product.name,
      image: product.image,
      size: product.configurable ? `${sizes.find((s) => s.id === sizeId)!.cm} cm` : undefined,
      dough: product.configurable ? doughs.find((d) => d.id === doughId)!.label : undefined,
      toppings: selectedToppings.map((id) => toppings.find((t) => t.id === id)!.name),
      unitPrice: price,
    });
    onClose();
    setTimeout(() => setOpen(true), 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div className="relative bg-card w-full md:max-w-3xl md:mx-4 md:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-elevated animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition shadow"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="md:w-1/2 bg-surface flex items-center justify-center p-6 md:p-10 shrink-0">
          <img src={product.image} alt={product.name} className="w-56 h-56 md:w-full md:h-auto md:max-h-[400px] object-contain animate-scale-in" />
        </div>

        {/* Details */}
        <div className="md:w-1/2 overflow-y-auto p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black font-display mb-2">{product.name}</h2>
          <p className="text-muted-foreground text-sm mb-5">{product.description}</p>

          {product.ingredients && (
            <div className="mb-6 text-sm text-muted-foreground">
              {product.ingredients.join(", ")}
            </div>
          )}

          {product.configurable && (
            <>
              {/* Size */}
              <div className="bg-surface rounded-2xl p-1 flex mb-5">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSizeId(s.id)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                      sizeId === s.id ? "bg-card shadow text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.cm} cm
                  </button>
                ))}
              </div>

              {/* Dough */}
              <div className="bg-surface rounded-2xl p-1 flex mb-6">
                {doughs.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDoughId(d.id)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                      doughId === d.id ? "bg-card shadow text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    Blat {d.label.toLowerCase()}
                  </button>
                ))}
              </div>

              {/* Toppings */}
              <div className="mb-6">
                <div className="font-bold mb-3">Adaugă la pizza</div>
                <div className="grid grid-cols-2 gap-2">
                  {toppings.map((t) => {
                    const on = selectedToppings.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        onClick={() => toggleTopping(t.id)}
                        className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition text-left ${
                          on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${on ? "bg-primary text-primary-foreground" : "border-2 border-border"}`}>
                          {on ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold truncate">{t.name}</span>
                          <span className="block text-xs text-muted-foreground">+{fmt(t.price)} lei</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <button
            onClick={handleAdd}
            className="w-full bg-primary text-primary-foreground rounded-full h-14 font-bold text-lg shadow-cta hover:bg-primary-hover transition hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            <span>În coș</span>
            <span className="opacity-70">·</span>
            <span>{fmt(price)} lei</span>
          </button>
        </div>
      </div>
    </div>
  );
}
