import appStorePromo from "@/assets/hero-combo.jpg";

export function AppPromo() {
  return (
    <div className="hidden lg:block sticky top-40 rounded-3xl overflow-hidden bg-linear-to-br from-primary to-primary-hover text-primary-foreground p-6 shadow-elevated">
      <div className="relative z-10">
        <div className="text-2xl font-black font-display leading-tight mb-2">
          Mai bine<br />în aplicație
        </div>
        <p className="text-sm opacity-90 mb-4">Descarcă și primești bonusuri la fiecare comandă.</p>
        <div className="flex flex-col gap-2">
          <button className="bg-black text-white rounded-xl px-4 py-2.5 font-semibold text-sm hover:opacity-90 transition">
            App Store
          </button>
          <button className="bg-black text-white rounded-xl px-4 py-2.5 font-semibold text-sm hover:opacity-90 transition">
            Google Play
          </button>
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/20" />
      <div className="absolute -top-6 -right-4 w-24 h-24 rounded-full bg-white/10" />
    </div>
  );
}
