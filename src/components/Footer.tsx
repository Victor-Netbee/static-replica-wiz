import { Facebook, Instagram, Youtube, Smartphone, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl">P</div>
              <div className="font-display font-black text-xl">pizza express</div>
            </div>
            <p className="text-sm opacity-70">
              Pizza proaspătă, livrată rapid în Iași. Comandă online sau prin aplicație.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Companie</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Despre noi</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Cariere</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Franciză</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Clienți</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Ajutor</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Termeni</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Confidențialitate</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition">Puncte de fidelitate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> *1234</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Iași, România</li>
              <li className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Aplicație iOS & Android</li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition flex items-center justify-center"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition flex items-center justify-center"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary transition flex items-center justify-center"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs opacity-50 flex flex-wrap justify-between gap-2">
          <div>© {new Date().getFullYear()} Pizza Express. Proiect demonstrativ.</div>
          <div>Realizat pentru scop educațional</div>
        </div>
      </div>
    </footer>
  );
}
