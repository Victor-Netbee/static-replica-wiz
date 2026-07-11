import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bike, Store, Check, CreditCard, Banknote, Wallet } from "lucide-react";
import { useCart, fmt } from "@/lib/cart";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

type Step = 1 | 2 | 3 | 4;
type Delivery = "delivery" | "pickup";
type Payment = "card" | "cash" | "online";

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [delivery, setDelivery] = useState<Delivery>("delivery");
  const [address, setAddress] = useState({ street: "", nr: "", floor: "", intercom: "", phone: "", name: "" });
  const [payment, setPayment] = useState<Payment>("card");
  const [done, setDone] = useState(false);

  const deliveryFee = delivery === "delivery" ? (total < 50 ? 9.99 : 0) : 0;
  const grand = total + deliveryFee;

  const next = () => setStep((s) => (Math.min(4, s + 1) as Step));
  const back = () => setStep((s) => (Math.max(1, s - 1) as Step));

  const submit = () => {
    setDone(true);
    clear();
  };

  if (items.length === 0 && !done) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <div className="text-2xl font-bold mb-3">Coșul e gol</div>
            <p className="text-muted-foreground mb-6">Adaugă produse pentru a plasa o comandă.</p>
            <Link to="/" className="inline-flex items-center bg-primary text-primary-foreground rounded-full px-6 h-11 font-semibold hover:bg-primary-hover transition">
              La meniu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-black font-display mb-3">Comandă plasată!</h1>
            <p className="text-muted-foreground mb-8">
              Vei primi un SMS cu numărul comenzii în câteva secunde. Timp estimat: <strong className="text-foreground">35 min</strong>.
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="bg-primary text-primary-foreground rounded-full px-6 h-12 font-semibold hover:bg-primary-hover transition"
            >
              Înapoi la meniu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = ["Livrare", "Adresă", "Plată", "Confirmă"];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <div className="max-w-4xl mx-auto w-full px-4 md:px-6 py-6 md:py-10 flex-1">
        <button onClick={() => (step === 1 ? navigate({ to: "/" }) : back())} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Înapoi
        </button>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
          {steps.map((label, i) => {
            const n = (i + 1) as Step;
            const active = step === n;
            const complete = step > n;
            return (
              <div key={label} className="flex items-center gap-2 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                  complete ? "bg-success text-white" : active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"
                }`}>
                  {complete ? <Check className="w-4 h-4" /> : n}
                </div>
                <span className={`text-sm font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {i < steps.length - 1 && <div className="w-6 md:w-10 h-px bg-border ml-2" />}
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[1fr_320px] gap-6">
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-card animate-fade-in">
            {step === 1 && (
              <>
                <h2 className="text-2xl font-black font-display mb-5">Cum vrei să primești?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { id: "delivery", icon: Bike, label: "Livrare", sub: "35 min · gratis peste 50 lei" },
                    { id: "pickup", icon: Store, label: "Ridicare", sub: "15 min · fără taxă" },
                  ] as const).map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setDelivery(o.id)}
                      className={`p-5 rounded-2xl border-2 transition text-left ${delivery === o.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                    >
                      <o.icon className="w-7 h-7 text-primary mb-3" />
                      <div className="font-bold">{o.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{o.sub}</div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-black font-display mb-5">{delivery === "delivery" ? "Adresa de livrare" : "Date de contact"}</h2>
                <div className="grid grid-cols-2 gap-3">
                  <input className="col-span-2 bg-surface rounded-xl px-4 h-12 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Nume complet" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
                  <input className="col-span-2 bg-surface rounded-xl px-4 h-12 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Telefon" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                  {delivery === "delivery" && (
                    <>
                      <input className="col-span-2 bg-surface rounded-xl px-4 h-12 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Stradă" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                      <input className="bg-surface rounded-xl px-4 h-12 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Nr." value={address.nr} onChange={(e) => setAddress({ ...address, nr: e.target.value })} />
                      <input className="bg-surface rounded-xl px-4 h-12 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Etaj / Ap." value={address.floor} onChange={(e) => setAddress({ ...address, floor: e.target.value })} />
                      <input className="col-span-2 bg-surface rounded-xl px-4 h-12 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Interfon" value={address.intercom} onChange={(e) => setAddress({ ...address, intercom: e.target.value })} />
                    </>
                  )}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-black font-display mb-5">Metodă de plată</h2>
                <div className="space-y-2">
                  {([
                    { id: "card", icon: CreditCard, label: "Card la livrare" },
                    { id: "cash", icon: Banknote, label: "Numerar la livrare" },
                    { id: "online", icon: Wallet, label: "Plată online" },
                  ] as const).map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setPayment(o.id)}
                      className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition text-left ${payment === o.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
                    >
                      <o.icon className="w-6 h-6 text-primary" />
                      <span className="font-semibold flex-1">{o.label}</span>
                      <span className={`w-5 h-5 rounded-full border-2 ${payment === o.id ? "border-primary bg-primary" : "border-border"} flex items-center justify-center`}>
                        {payment === o.id && <Check className="w-3 h-3 text-primary-foreground" />}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-2xl font-black font-display mb-5">Verifică comanda</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Mod</span><span className="font-semibold">{delivery === "delivery" ? "Livrare" : "Ridicare"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="font-semibold">{address.name} · {address.phone}</span></div>
                  {delivery === "delivery" && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Adresă</span><span className="font-semibold text-right">{address.street} {address.nr}, et. {address.floor}</span></div>
                  )}
                  <div className="flex justify-between"><span className="text-muted-foreground">Plată</span><span className="font-semibold">{payment === "card" ? "Card la livrare" : payment === "cash" ? "Numerar" : "Online"}</span></div>
                </div>
                <div className="border-t border-border my-5" />
                <div className="space-y-2">
                  {items.map((it) => (
                    <div key={it.key} className="flex justify-between text-sm">
                      <span>{it.qty}× {it.name}</span>
                      <span>{fmt(it.unitPrice * it.qty)} lei</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={back} className="flex-1 border border-border rounded-full h-12 font-semibold hover:bg-surface transition">
                  Înapoi
                </button>
              )}
              {step < 4 ? (
                <button onClick={next} className="flex-1 bg-primary text-primary-foreground rounded-full h-12 font-semibold shadow-cta hover:bg-primary-hover transition">
                  Continuă
                </button>
              ) : (
                <button onClick={submit} className="flex-1 bg-primary text-primary-foreground rounded-full h-12 font-semibold shadow-cta hover:bg-primary-hover transition">
                  Plasează comanda
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="bg-card rounded-3xl p-6 shadow-card h-fit sticky top-24">
            <div className="font-bold mb-4">Sumar comandă</div>
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map((it) => (
                <div key={it.key} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 bg-surface rounded-lg shrink-0 flex items-center justify-center">
                    <img src={it.image} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{it.qty} × {fmt(it.unitPrice)} lei</div>
                  </div>
                  <div className="font-semibold">{fmt(it.unitPrice * it.qty)}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{fmt(total)} lei</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Livrare</span><span>{deliveryFee === 0 ? <span className="text-success font-semibold">Gratis</span> : `${fmt(deliveryFee)} lei`}</span></div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span><span>{fmt(grand)} lei</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
