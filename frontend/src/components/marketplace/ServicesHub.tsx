import { ShoppingBag, Heart, Search, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Buy a Pet",
    desc: "Browse our marketplace to find your perfect new companion from verified sellers.",
    icon: <ShoppingBag className="w-8 h-8" />,
    link: "/?type=SALE#browse",
    tint: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Adopt a Pet",
    desc: "Give a loving home to a rescue pet or an animal in need of rehoming.",
    icon: <Heart className="w-8 h-8" />,
    link: "/?type=ADOPTION#browse",
    tint: "from-secondary/40 to-secondary/10",
    iconColor: "text-secondary",
  },
  {
    title: "Lost & Found",
    desc: "Report a lost pet or help someone find theirs with our dedicated reporting tool.",
    icon: <Search className="w-8 h-8" />,
    link: "/report",
    tint: "from-accent/30 to-accent/5",
    iconColor: "text-accent",
  },
  {
    title: "List a Pet",
    desc: "Looking to sell or rehome? Create a listing safely and easily on Pawkit.",
    icon: <Upload className="w-8 h-8" />,
    link: "/add-pet",
    tint: "from-primary-glow/30 to-primary-glow/5",
    iconColor: "text-primary-glow",
  },
];

export const ServicesHub = () => {
  return (
    <section id="services" className="container py-20 bg-muted/30 border-y border-border">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">What we offer</div>
          <h2 className="text-4xl md:text-5xl">Your <span className="text-gradient-hero">all-in-one</span> hub.</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <Link
            to={s.link}
            key={s.title}
            className={`group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${s.tint} border-2 border-foreground/5 hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 shadow-soft`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-background shadow-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${s.iconColor}`}>
              {s.icon}
            </div>
            <h3 className="text-2xl font-black mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground font-medium leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
