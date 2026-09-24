import dog from "@/assets/cat-dog.jpg";
import cat from "@/assets/cat-cat.jpg";
import bird from "@/assets/cat-bird.jpg";
import rabbit from "@/assets/cat-rabbit.jpg";

const categories = [
  { name: "Dogs", count: "2,140 pets", img: dog, tint: "from-primary/20 to-primary/5" },
  { name: "Cats", count: "1,520 pets", img: cat, tint: "from-primary-glow/30 to-primary-glow/5" },
  { name: "Birds", count: "680 pets", img: bird, tint: "from-secondary/40 to-secondary/10" },
  { name: "Small Pets", count: "320 pets", img: rabbit, tint: "from-accent/30 to-accent/5" },
];

export const Categories = () => {
  return (
    <section id="categories" className="container py-20">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Browse by category</div>
          <h2 className="text-4xl md:text-5xl">Pick your <span className="text-gradient-hero">vibe</span>.</h2>
        </div>
        <a href="#browse" className="text-sm font-bold hover:text-primary transition-colors">View all →</a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c, i) => (
          <a
            href="#browse"
            key={c.name}
            className={`group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${c.tint} border-2 border-foreground/5 hover:border-primary/30 hover:-translate-y-2 transition-all duration-300 shadow-soft`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="aspect-square mb-4 overflow-hidden rounded-2xl">
              <img
                src={c.img}
                alt={`${c.name} pets available on Pawkit`}
                width={512}
                height={512}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-black">{c.name}</h3>
            <p className="text-sm text-muted-foreground font-medium">{c.count}</p>
          </a>
        ))}
      </div>
    </section>
  );
};