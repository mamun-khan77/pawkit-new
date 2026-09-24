import { Search, MessageCircle, Heart } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover", desc: "Browse thousands of vaccinated, healthy pets from trusted sellers near you.", color: "gradient-hero" },
  { icon: MessageCircle, title: "Connect", desc: "Chat directly with the seller, ask for vet records, schedule a visit.", color: "gradient-sunset" },
  { icon: Heart, title: "Bring home", desc: "Reserve your pet, complete the handover, and start your new chapter.", color: "gradient-ocean" },
];

export const HowItWorks = () => (
  <section id="how" className="gradient-soft py-24">
    <div className="container">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">How it works</div>
        <h2 className="text-4xl md:text-5xl">From <span className="text-gradient-hero">scroll</span> to snuggle in 3 steps.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="relative bg-card rounded-3xl p-8 border-2 border-foreground/5 shadow-soft hover:shadow-pop hover:-translate-y-1 transition-all">
            <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center shadow-pop mb-5`}>
              <s.icon className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="text-7xl font-black absolute top-4 right-6 text-foreground/5">0{i + 1}</div>
            <h3 className="text-2xl font-black mb-2">{s.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);