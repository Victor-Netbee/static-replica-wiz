import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, User, Menu, Globe } from "lucide-react";
import { useCart } from "@/lib/cart";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { count, setOpen, bump } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-surface-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary font-medium hover:opacity-80 transition">Angajări</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Contacte</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Oferte</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Puncte fidelitate</a>
          </div>
          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition">
            <Globe className="w-4 h-4" />
            <span>RO</span>
          </button>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Meniu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl md:text-2xl shadow-cta group-hover:scale-105 transition-transform">
              P
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-black text-lg md:text-2xl leading-none">pizza express</div>
              <div className="text-[11px] md:text-xs text-muted-foreground mt-0.5">livrăm în toată Iași</div>
            </div>
          </Link>

          <div className="hidden lg:flex flex-col items-start ml-6">
            <div className="text-sm">
              Livrare pizza <span className="text-primary font-semibold">Iași</span>
            </div>
            <div className="text-xs text-muted-foreground">
              35 min · <span className="text-warning">★ 4.85</span>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-start">
            <div className="font-bold text-lg">*1234</div>
            <div className="text-xs text-muted-foreground">Comenzi telefonic</div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setOpen(true)}
              key={bump}
              className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 md:px-5 h-11 md:h-12 font-semibold shadow-cta hover:bg-primary-hover transition-all hover:-translate-y-0.5 animate-pulse-cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Coș</span>
              {count > 0 && (
                <span className="bg-white text-primary rounded-full min-w-6 h-6 px-1.5 text-xs font-bold flex items-center justify-center animate-bounce-in">
                  {count}
                </span>
              )}
            </button>
            <button className="hidden md:flex items-center gap-2 border border-border rounded-full px-5 h-12 font-semibold hover:bg-surface transition">
              <User className="w-4 h-4" />
              Intră
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
