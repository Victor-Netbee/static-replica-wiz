import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCart, fmt } from "@/lib/cart";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, remove, total, clear } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const goCheckout = () => {
    setOpen(false);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 inset-y-0 w-full sm:max-w-md bg-background shadow-elevated flex flex-col animate-slide-in-right">
        <header className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="font-display font-black text-xl">Coșul tău</div>
          <button onClick={() => setOpen(false)} className="p-2 -mr-2" aria-label="Închide">
            <X className="w-6 h-6" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="font-bold text-lg mb-1">Coșul e gol</div>
            <p className="text-muted-foreground text-sm mb-6">Adaugă câteva delicatese ca să începi.</p>
            <button
              onClick={() => setOpen(false)}
              className="bg-primary text-primary-foreground rounded-full px-6 h-11 font-semibold hover:bg-primary-hover transition"
            >
              Vezi meniul
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div key={item.key} className="bg-card rounded-2xl p-3 flex gap-3 shadow-card animate-scale-in">
                  <div className="w-20 h-20 bg-surface rounded-xl flex items-center justify-center shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="font-bold truncate">{item.name}</div>
                      <button onClick={() => remove(item.key)} className="text-muted-foreground hover:text-destructive transition" aria-label="Șterge">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {(item.size || item.dough) && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {[item.size, item.dough].filter(Boolean).join(" · ")}
                      </div>
                    )}
                    {item.toppings && item.toppings.length > 0 && (
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        + {item.toppings.join(", ")}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-surface rounded-full p-1">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="w-7 h-7 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition flex items-center justify-center"
                          aria-label="Minus"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition flex items-center justify-center"
                          aria-label="Plus"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-bold text-primary">{fmt(item.unitPrice * item.qty)} lei</div>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={clear} className="text-sm text-muted-foreground hover:text-destructive w-full py-2">
                Golește coșul
              </button>
            </div>

            <footer className="border-t border-border p-5 space-y-3 bg-background">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{fmt(total)} lei</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Livrare</span>
                <span className="text-success font-semibold">Gratis</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{fmt(total)} lei</span>
              </div>
              <button
                onClick={goCheckout}
                className="w-full bg-primary text-primary-foreground rounded-full h-13 py-3.5 font-bold shadow-cta hover:bg-primary-hover hover:-translate-y-0.5 transition"
              >
                Comandă acum
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
