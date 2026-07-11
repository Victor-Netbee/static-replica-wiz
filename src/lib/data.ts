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

import heroPepperoni from "@/assets/hero-pepperoni.jpg";
import heroDiscount from "@/assets/hero-discount.jpg";
import heroSummer from "@/assets/hero-summer.jpg";
import heroCombo from "@/assets/hero-combo.jpg";

export type Category = {
  id: string;
  name: string;
};

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

export type SizeOption = { id: "25" | "30" | "35"; label: string; cm: number; deltaPrice: number };
export type DoughOption = { id: "traditional" | "thin"; label: string };
export type Topping = { id: string; name: string; price: number };

export const sizes: SizeOption[] = [
  { id: "25", label: "Mică", cm: 25, deltaPrice: 0 },
  { id: "30", label: "Medie", cm: 30, deltaPrice: 10 },
  { id: "35", label: "Mare", cm: 35, deltaPrice: 20 },
];

export const doughs: DoughOption[] = [
  { id: "traditional", label: "Tradițional" },
  { id: "thin", label: "Subțire" },
];

export const toppings: Topping[] = [
  { id: "mozzarella", name: "Mozzarella extra", price: 5 },
  { id: "pepperoni", name: "Pepperoni", price: 6 },
  { id: "ciuperci", name: "Ciuperci", price: 4 },
  { id: "masline", name: "Măsline", price: 4 },
  { id: "sunca", name: "Șuncă", price: 6 },
  { id: "porumb", name: "Porumb", price: 3 },
  { id: "ardei", name: "Ardei iute", price: 3 },
  { id: "bacon", name: "Bacon", price: 6 },
];

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  basePrice: number;
  configurable: boolean;
  badge?: { text: string; color: "orange" | "green" | "pink" | "lime" };
  ingredients?: string[];
};

export const products: Product[] = [
  // Combo
  {
    id: "combo-bere",
    name: "Combo cu bere cadou",
    description: "2 pizza medii + 4 beri",
    image: pepperoni,
    categoryId: "combo",
    basePrice: 129.99,
    configurable: false,
    badge: { text: "bere cadou", color: "pink" },
    ingredients: ["2 pizza medii la alegere", "4 x bere 500ml"],
  },
  {
    id: "combo-25",
    name: "Combo până la 25%",
    description: "3 pizza mari cu reducere",
    image: quattro,
    categoryId: "combo",
    basePrice: 149.99,
    configurable: false,
    badge: { text: "până la 25%", color: "pink" },
    ingredients: ["3 pizza mari la alegere"],
  },
  {
    id: "combo-drink",
    name: "Combo cu băuturi gratuite",
    description: "2 pizza mari + 2 băuturi",
    image: hawaii,
    categoryId: "combo",
    basePrice: 119.99,
    configurable: false,
    badge: { text: "băuturi gratuite", color: "pink" },
    ingredients: ["2 pizza mari", "2 băuturi 500ml"],
  },
  {
    id: "combo-salata",
    name: "Combo profitabil",
    description: "Pizza + salată la alegere",
    image: veggie,
    categoryId: "combo",
    basePrice: 79.99,
    configurable: false,
    badge: { text: "profitabil", color: "pink" },
    ingredients: ["1 pizza medie", "1 salată"],
  },

  // Pizza din belșug
  {
    id: "mix-belsug",
    name: "Dodo Mix belșug",
    description: "35 cm dublă porție",
    image: pepperoni,
    categoryId: "pizza-belsug",
    basePrice: 41.99,
    configurable: true,
  },
  {
    id: "rustica-belsug",
    name: "Rustica belșug",
    description: "35 cm dublă porție",
    image: bbq,
    categoryId: "pizza-belsug",
    basePrice: 35.99,
    configurable: true,
  },
  {
    id: "quattro-belsug",
    name: "Quattro Stagioni belșug",
    description: "35 cm dublă porție",
    image: quattro,
    categoryId: "pizza-belsug",
    basePrice: 35.99,
    configurable: true,
  },

  // Pizza
  {
    id: "margherita",
    name: "Margherita",
    description: "Sos de roșii, mozzarella, busuioc",
    image: margherita,
    categoryId: "pizza",
    basePrice: 27.99,
    configurable: true,
    ingredients: ["Sos roșii", "Mozzarella", "Busuioc proaspăt"],
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Pepperoni, mozzarella, sos roșii",
    image: pepperoni,
    categoryId: "pizza",
    basePrice: 32.99,
    configurable: true,
    ingredients: ["Pepperoni", "Mozzarella", "Sos roșii"],
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description: "Patru brânzeturi, sos alb",
    image: quattro,
    categoryId: "pizza",
    basePrice: 35.99,
    configurable: true,
    ingredients: ["Mozzarella", "Parmezan", "Gorgonzola", "Cheddar"],
  },
  {
    id: "hawaii",
    name: "Hawaii",
    description: "Șuncă, ananas, mozzarella",
    image: hawaii,
    categoryId: "pizza",
    basePrice: 31.99,
    configurable: true,
    ingredients: ["Șuncă", "Ananas", "Mozzarella", "Sos roșii"],
  },
  {
    id: "veggie",
    name: "Vegetariană",
    description: "Ciuperci, măsline, ardei",
    image: veggie,
    categoryId: "pizza",
    basePrice: 29.99,
    configurable: true,
    ingredients: ["Ciuperci", "Măsline", "Ardei", "Porumb"],
  },
  {
    id: "bbq",
    name: "BBQ Chicken",
    description: "Pui, ceapă roșie, sos BBQ",
    image: bbq,
    categoryId: "pizza",
    basePrice: 34.99,
    configurable: true,
    ingredients: ["Pui grill", "Ceapă roșie", "Sos BBQ", "Mozzarella"],
  },

  // Pizza to Go
  {
    id: "togo-pep",
    name: "Pepperoni to Go",
    description: "Pizza felie 25 cm",
    image: pepperoni,
    categoryId: "togo",
    basePrice: 18.99,
    configurable: false,
  },
  {
    id: "togo-mar",
    name: "Margherita to Go",
    description: "Pizza felie 25 cm",
    image: margherita,
    categoryId: "togo",
    basePrice: 15.99,
    configurable: false,
  },

  // Gustări
  {
    id: "nuggets",
    name: "Nuggets de pui",
    description: "9 bucăți + sos",
    image: nuggets,
    categoryId: "gustari",
    basePrice: 19.99,
    configurable: false,
  },
  {
    id: "fries",
    name: "Cartofi prăjiți",
    description: "Porție mare cu ketchup",
    image: fries,
    categoryId: "gustari",
    basePrice: 12.99,
    configurable: false,
  },

  // Băuturi
  {
    id: "cola",
    name: "Cola 0.5L",
    description: "Băutură răcoritoare",
    image: cola,
    categoryId: "bauturi",
    basePrice: 8.99,
    configurable: false,
  },
  {
    id: "orange",
    name: "Suc de portocale 0.5L",
    description: "100% natural",
    image: orange,
    categoryId: "bauturi",
    basePrice: 9.99,
    configurable: false,
  },

  // Bere
  {
    id: "beer",
    name: "Bere blondă 0.5L",
    description: "Doză 500ml",
    image: beer,
    categoryId: "bere",
    basePrice: 7.99,
    configurable: false,
  },

  // Desert
  {
    id: "cinnabon",
    name: "Cinnabon cu ciocolată",
    description: "6 bucăți",
    image: cinnabon,
    categoryId: "desert",
    basePrice: 14.99,
    configurable: false,
  },
];

export type Promo = {
  id: string;
  title: string;
  color: "orange" | "green" | "lime" | "yellow";
  image: string;
  badge?: string;
};

export const promos: Promo[] = [
  { id: "p1", title: "Dodo weekend", color: "orange", image: heroPepperoni },
  { id: "p2", title: "70% reducere la a doua pizza", color: "orange", image: heroDiscount },
  { id: "p3", title: "Are gustul verii", color: "green", image: heroSummer },
  { id: "p4", title: "Fan combo", color: "green", image: heroCombo },
  { id: "p5", title: "Încercați noile noastre produse", color: "lime", image: heroPepperoni, badge: "nou" },
  { id: "p6", title: "50% reducere", color: "orange", image: heroCombo },
];
