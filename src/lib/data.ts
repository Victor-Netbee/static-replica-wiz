import margherita from "@/assets/pizza-margherita.png";
import pepperoni from "@/assets/pizza-pepperoni.png";
import quattro from "@/assets/pizza-quattro.png";
import hawaii from "@/assets/pizza-hawaii.png";
import veggie from "@/assets/pizza-veggie.png";
import bbq from "@/assets/pizza-bbq.png";
import nuggets from "@/assets/snack-nuggets.png";
import fries from "@/assets/snack-fries.png";
import cinnabon from "@/assets/dessert-cinnabon.png";
import cola from "@/assets/drink-cola.png";
import orange from "@/assets/drink-orange.png";
import beer from "@/assets/beer-can.png";

import topPepperoni from "@/assets/top-pepperoni.png";
import topJalapeno from "@/assets/top-jalapeno.png";
import topFeta from "@/assets/top-feta.png";
import topMushroom from "@/assets/top-mushroom.png";
import topMozzarella from "@/assets/top-mozzarella.png";
import topBacon from "@/assets/top-bacon.png";
import topOlives from "@/assets/top-olives.png";
import topOnion from "@/assets/top-onion.png";

import heroPepperoni from "@/assets/hero-pepperoni.jpg";
import heroDiscount from "@/assets/hero-discount.jpg";
import heroSummer from "@/assets/hero-summer.jpg";
import heroCombo from "@/assets/hero-combo.jpg";

export type Category = { id: string; name: string };

export const categories: Category[] = [
  { id: "combo", name: "Combo" },
  { id: "pizza-belsug", name: "Pizza din belșug" },
  { id: "pizza", name: "Pizza" },
  { id: "togo", name: "Pizza to Go" },
  { id: "gustari", name: "Gustări" },
  { id: "bauturi", name: "Băuturi" },
  { id: "bere", name: "Bere" },
  { id: "desert", name: "Desert" },
];

export type SizeOption = { id: "25" | "30" | "35"; cm: number; deltaPrice: number };
export type DoughOption = { id: "traditional" | "thin"; label: string };
export type Topping = { id: string; name: string; price: number; image: string };

export const sizes: SizeOption[] = [
  { id: "25", cm: 25, deltaPrice: 0 },
  { id: "30", cm: 30, deltaPrice: 10 },
  { id: "35", cm: 35, deltaPrice: 20 },
];

export const doughs: DoughOption[] = [
  { id: "traditional", label: "Tradițional" },
  { id: "thin", label: "Subțire" },
];

export const toppings: Topping[] = [
  { id: "pepperoni", name: "Salam Chorizo", price: 4, image: topPepperoni },
  { id: "jalapeno", name: "Ardei Jalapeno", price: 3, image: topJalapeno },
  { id: "feta", name: "Brânză feta", price: 4, image: topFeta },
  { id: "mushroom", name: "Ciuperci", price: 3, image: topMushroom },
  { id: "mozzarella", name: "Mozzarella", price: 5, image: topMozzarella },
  { id: "bacon", name: "Bacon", price: 6, image: topBacon },
  { id: "olives", name: "Măsline", price: 3, image: topOlives },
  { id: "onion", name: "Ceapă roșie", price: 2, image: topOnion },
];

export type BundleSlot = {
  id: string;
  defaultProductId: string;
  swappableProductIds: string[]; // options for "Înlocuiește"
  customizable: boolean; // if configurator opens on "Personalizează"
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  basePrice: number;
  configurable: boolean;
  // Recipe: removable ingredients & fixed weight
  ingredients?: string[];
  weightG?: number;
  badge?: { text: string; color: "orange" | "green" | "pink" | "lime" };
  // Bundle-only
  isBundle?: boolean;
  originalPrice?: number; // strikethrough
  bundleSlots?: BundleSlot[];
};

export const products: Product[] = [
  // ---------- Combo (bundles) ----------
  {
    id: "combo-bere",
    name: "Combo cu bere cadou",
    description: "Două pizza de 35 cm pentru gașcă, plus 4 beri din partea noastră.",
    image: pepperoni,
    categoryId: "combo",
    basePrice: 113.99,
    originalPrice: 149.94,
    configurable: false,
    isBundle: true,
    badge: { text: "bere cadou", color: "pink" },
    bundleSlots: [
      { id: "s1", defaultProductId: "pepperoni", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s2", defaultProductId: "quattro", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s3", defaultProductId: "beer", swappableProductIds: ["beer","cola","orange"], customizable: false },
      { id: "s4", defaultProductId: "beer", swappableProductIds: ["beer","cola","orange"], customizable: false },
      { id: "s5", defaultProductId: "beer", swappableProductIds: ["beer","cola","orange"], customizable: false },
      { id: "s6", defaultProductId: "beer", swappableProductIds: ["beer","cola","orange"], customizable: false },
    ],
  },
  {
    id: "combo-25",
    name: "Combo până la 25%",
    description: "3 pizza mari cu reducere. Alege combinația preferată.",
    image: quattro,
    categoryId: "combo",
    basePrice: 117.96,
    originalPrice: 149.94,
    configurable: false,
    isBundle: true,
    badge: { text: "până la 25%", color: "pink" },
    bundleSlots: [
      { id: "s1", defaultProductId: "pepperoni", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s2", defaultProductId: "hawaii", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s3", defaultProductId: "quattro", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
    ],
  },
  {
    id: "combo-drink",
    name: "Combo cu băuturi gratuite",
    description: "2 pizza mari + 2 băuturi cadou.",
    image: hawaii,
    categoryId: "combo",
    basePrice: 102.96,
    originalPrice: 129.94,
    configurable: false,
    isBundle: true,
    badge: { text: "băuturi gratuite", color: "pink" },
    bundleSlots: [
      { id: "s1", defaultProductId: "hawaii", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s2", defaultProductId: "margherita", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s3", defaultProductId: "cola", swappableProductIds: ["cola","orange","beer"], customizable: false },
      { id: "s4", defaultProductId: "cola", swappableProductIds: ["cola","orange","beer"], customizable: false },
    ],
  },
  {
    id: "combo-salata",
    name: "Combo profitabil",
    description: "Pizza + gustare la alegere, la un preț mai mic.",
    image: veggie,
    categoryId: "combo",
    basePrice: 73.98,
    originalPrice: 89.98,
    configurable: false,
    isBundle: true,
    badge: { text: "profitabil", color: "pink" },
    bundleSlots: [
      { id: "s1", defaultProductId: "veggie", swappableProductIds: ["pepperoni","margherita","quattro","hawaii","veggie","bbq"], customizable: true },
      { id: "s2", defaultProductId: "nuggets", swappableProductIds: ["nuggets","fries"], customizable: false },
    ],
  },

  // ---------- Pizza din belșug ----------
  {
    id: "mix-belsug",
    name: "Bacon din belșug",
    description: "Blat pufos cu porție dublă de bacon și pui.",
    image: bbq,
    categoryId: "pizza-belsug",
    basePrice: 36.99,
    configurable: true,
    weightG: 558,
    ingredients: ["Sos de pizza", "Piept de pui", "Mozzarella", "Bacon", "Ceapă roșie", "Sos barbeque"],
  },
  {
    id: "rustica-belsug",
    name: "Rustica din belșug",
    description: "Blat pufos, ingrediente din belșug.",
    image: pepperoni,
    categoryId: "pizza-belsug",
    basePrice: 35.99,
    configurable: true,
    weightG: 620,
    ingredients: ["Sos de pizza", "Mozzarella", "Salam pepperoni", "Ardei", "Măsline"],
  },
  {
    id: "quattro-belsug",
    name: "Quattro Stagioni din belșug",
    description: "Patru arome într-o pizza pufoasă.",
    image: quattro,
    categoryId: "pizza-belsug",
    basePrice: 35.99,
    configurable: true,
    weightG: 580,
    ingredients: ["Sos de pizza", "Mozzarella", "Șuncă", "Ciuperci", "Măsline", "Ardei"],
  },

  // ---------- Pizza ----------
  {
    id: "margherita",
    name: "Margherita",
    description: "Clasica italiană.",
    image: margherita,
    categoryId: "pizza",
    basePrice: 27.99,
    configurable: true,
    weightG: 420,
    ingredients: ["Sos de roșii", "Mozzarella", "Busuioc proaspăt"],
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Pentru iubitorii de picant.",
    image: pepperoni,
    categoryId: "pizza",
    basePrice: 32.99,
    configurable: true,
    weightG: 460,
    ingredients: ["Sos de roșii", "Mozzarella", "Salam pepperoni"],
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description: "Patru brânzeturi rafinate.",
    image: quattro,
    categoryId: "pizza",
    basePrice: 35.99,
    configurable: true,
    weightG: 500,
    ingredients: ["Sos alb", "Mozzarella", "Parmezan", "Gorgonzola", "Cheddar"],
  },
  {
    id: "hawaii",
    name: "Hawaii",
    description: "Dulce-sărat, cu ananas.",
    image: hawaii,
    categoryId: "pizza",
    basePrice: 31.99,
    configurable: true,
    weightG: 480,
    ingredients: ["Sos de roșii", "Mozzarella", "Șuncă", "Ananas"],
  },
  {
    id: "veggie",
    name: "Vegetariană",
    description: "Legume proaspete.",
    image: veggie,
    categoryId: "pizza",
    basePrice: 29.99,
    configurable: true,
    weightG: 460,
    ingredients: ["Sos de roșii", "Mozzarella", "Ciuperci", "Măsline", "Ardei", "Porumb"],
  },
  {
    id: "bbq",
    name: "BBQ Chicken",
    description: "Pui grill cu sos afumat.",
    image: bbq,
    categoryId: "pizza",
    basePrice: 34.99,
    configurable: true,
    weightG: 500,
    ingredients: ["Sos BBQ", "Mozzarella", "Piept de pui", "Ceapă roșie"],
  },

  // ---------- Pizza to Go ----------
  { id: "togo-pep", name: "Pepperoni to Go", description: "Pizza felie 25 cm", image: pepperoni, categoryId: "togo", basePrice: 18.99, configurable: false },
  { id: "togo-mar", name: "Margherita to Go", description: "Pizza felie 25 cm", image: margherita, categoryId: "togo", basePrice: 15.99, configurable: false },

  // ---------- Gustări ----------
  { id: "nuggets", name: "Nuggets de pui", description: "9 bucăți + sos", image: nuggets, categoryId: "gustari", basePrice: 19.99, configurable: false },
  { id: "fries", name: "Cartofi prăjiți", description: "Porție mare cu ketchup", image: fries, categoryId: "gustari", basePrice: 12.99, configurable: false },

  // ---------- Băuturi ----------
  { id: "cola", name: "Cola 0.5L", description: "Băutură răcoritoare", image: cola, categoryId: "bauturi", basePrice: 8.99, configurable: false },
  { id: "orange", name: "Suc de portocale 0.5L", description: "100% natural", image: orange, categoryId: "bauturi", basePrice: 9.99, configurable: false },

  // ---------- Bere ----------
  { id: "beer", name: "Bere blondă 0.5L", description: "Doză 500ml", image: beer, categoryId: "bere", basePrice: 7.99, configurable: false },

  // ---------- Desert ----------
  { id: "cinnabon", name: "Cinnabon cu ciocolată", description: "6 bucăți", image: cinnabon, categoryId: "desert", basePrice: 14.99, configurable: false },
];

export const productById = (id: string) => products.find((p) => p.id === id)!;

export type StorySlide = {
  id: string;
  image: string;
  eyebrow?: string;
  title: string;
  priceLabel?: string;
  bullets?: string[];
  bg: string;
  cta: string;
};

export type Promo = {
  id: string;
  title: string;
  color: "orange" | "green" | "lime" | "yellow";
  image: string;
  badge?: string;
  stories: StorySlide[];
};

export const promos: Promo[] = [
  {
    id: "p1", title: "Weekend delicios", color: "orange", image: heroPepperoni,
    stories: [
      { id: "p1s1", image: heroPepperoni, eyebrow: "Weekend", title: "Pizza preferată la preț special", priceLabel: "de la 24,99 lei", bg: "#7a1a1a", cta: "Comandă acum" },
      { id: "p1s2", image: heroDiscount, eyebrow: "Doar sâmbătă & duminică", title: "A doua pizza -50%", bg: "#8a2a1a", cta: "Vezi meniul" },
    ],
  },
  {
    id: "p2", title: "70% reducere la a doua pizza", color: "orange", image: heroDiscount,
    stories: [
      { id: "p2s1", image: heroDiscount, eyebrow: "Ofertă", title: "70% reducere la a doua pizza", priceLabel: "aplicat automat", bg: "#c2410c", cta: "Alege pizza" },
      { id: "p2s2", image: heroPepperoni, title: "Se aplică la cea mai ieftină pizza", bullets: ["✦ orice mărime", "✦ orice blat", "✦ fără cupon"], bg: "#9a3412", cta: "Comandă acum" },
      { id: "p2s3", image: heroCombo, title: "Adaugă și o gustare", priceLabel: "de la 12,99 lei", bg: "#7c2d12", cta: "Vezi gustările" },
    ],
  },
  {
    id: "p3", title: "Are gustul verii", color: "green", image: heroSummer,
    stories: [
      { id: "p3s1", image: heroSummer, eyebrow: "Sezon", title: "Are gustul verii", bg: "#166534", cta: "Descoperă" },
      { id: "p3s2", image: heroSummer, title: "Legume proaspete de sezon", bullets: ["✦ roșii cherry", "✦ busuioc", "✦ mozzarella"], bg: "#14532d", cta: "Comandă acum" },
    ],
  },
  {
    id: "p4", title: "Fan combo", color: "green", image: heroCombo,
    stories: [
      { id: "p4s1", image: heroCombo, eyebrow: "Combo", title: "Fan combo", priceLabel: "doar la 113,99 lei", bg: "#065f46", cta: "Comandă acum" },
      { id: "p4s2", image: heroCombo, title: "2 pizza mari + băuturi cadou", bullets: ["✦ 4 beri incluse", "✦ blat la alegere"], bg: "#064e3b", cta: "Vezi combo" },
    ],
  },
  {
    id: "p5", title: "Gustări noi", color: "lime", image: heroPepperoni, badge: "nou",
    stories: [
      { id: "p5s1", image: fries, eyebrow: "Gustări noi", title: "Cartofi gratinați", priceLabel: "doar la 28,99 lei",
        bullets: ["✦ cu pui", "✦ cu șuncă", "✦ cu bacon", "✦ cu cârnați"], bg: "#3f0a0a", cta: "Comandă acum" },
      { id: "p5s2", image: nuggets, eyebrow: "Nou în meniu", title: "Nuggets crocanți", priceLabel: "9 buc. + sos", bg: "#4a0e0e", cta: "Adaugă în coș" },
    ],
  },
  {
    id: "p6", title: "50% reducere", color: "orange", image: heroCombo,
    stories: [
      { id: "p6s1", image: heroCombo, eyebrow: "Ofertă", title: "50% reducere", priceLabel: "la combo-uri selectate", bg: "#9a3412", cta: "Vezi ofertele" },
    ],
  },
];
