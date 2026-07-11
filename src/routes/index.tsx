import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { BundleModal } from "@/components/BundleModal";
import { AppPromo } from "@/components/AppPromo";
import { Footer } from "@/components/Footer";
import { categories, products, type Product } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <HeroCarousel />
      <CategoryNav />

      <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-10 grid lg:grid-cols-[1fr_280px] gap-8">
        <div>
          {categories.map((cat) => {
            const items = products.filter((p) => p.categoryId === cat.id);
            if (items.length === 0) return null;
            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="mb-12 scroll-mt-40">
                <h2 className="text-3xl md:text-4xl font-black font-display mb-6 md:mb-8">{cat.name}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside>
          <AppPromo />
        </aside>
      </main>

      <Footer />
      {selected?.isBundle ? (
        <BundleModal product={selected} onClose={() => setSelected(null)} />
      ) : (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
