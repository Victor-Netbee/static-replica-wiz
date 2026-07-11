import { X, Phone, MapPin, Award, Briefcase, Globe } from "lucide-react";
import { useEffect } from "react";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const items = [
    { icon: Briefcase, label: "Angajări la Pizza Express" },
    { icon: Phone, label: "Contacte" },
    { icon: Award, label: "Oferte" },
    { icon: MapPin, label: "Puncte fidelitate" },
    { icon: Globe, label: "Limbă: Română" },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-background shadow-elevated animate-slide-in-right" style={{ animation: "slide-up 0.3s ease-out" }}>
        <div className="p-5 flex items-center justify-between border-b border-border">
          <div className="font-display font-black text-xl">Meniu</div>
          <button onClick={onClose} className="p-2 -mr-2" aria-label="Închide">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-2">
          {items.map((it) => (
            <a
              key={it.label}
              href="#"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-surface transition"
            >
              <it.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{it.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
