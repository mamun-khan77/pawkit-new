import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-pets.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-secondary/40 animate-blob blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/30 animate-blob blur-3xl opacity-50" style={{ animationDelay: "3s" }} />

      <div className="container relative grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center py-16 md:py-24">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-secondary text-sm font-bold">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Bangladesh's #1 pet marketplace</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            Find your <br />
            <span className="text-gradient-hero">furry</span> soulmate.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Browse thousands of healthy, vaccinated pets from trusted sellers and shelters across Bangladesh. Adopt, buy, or just fall in love.
          </p>

          {/* Search bar */}
          <div className="bg-card rounded-3xl shadow-pop p-2 flex flex-col sm:flex-row gap-2 max-w-2xl border-2 border-foreground/5">
            <div className="flex items-center gap-2 px-4 flex-1">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                placeholder="Try 'Labrador puppy'"
                className="bg-transparent border-0 outline-none w-full py-3 text-sm font-medium placeholder:text-muted-foreground"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 border-l border-border">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                placeholder="Dhaka"
                className="bg-transparent border-0 outline-none w-32 py-3 text-sm font-medium placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="hero" size="lg">Search</Button>
          </div>

          <div className="flex flex-wrap gap-8 pt-4">
            <Stat n="12K+" label="Happy pets rehomed" />
            <Stat n="3.5K" label="Verified sellers" />
            <Stat n="64" label="Districts covered" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 gradient-hero rounded-[3rem] rotate-3 shadow-pop" />
          <img
            src={heroImg}
            alt="A happy puppy and kitten ready to be adopted"
            width={1536}
            height={1024}
            className="relative rounded-[3rem] w-full object-cover aspect-[4/3] shadow-pop"
          />
          <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-pop border-2 border-foreground/5 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-ocean flex items-center justify-center text-2xl">🦴</div>
              <div>
                <div className="text-xs text-muted-foreground font-semibold">Today</div>
                <div className="font-black">42 new listings</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 bg-secondary rounded-2xl px-4 py-3 shadow-pop border-2 border-foreground/5 animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="text-xs font-bold">100% vaccinated 💉</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div>
    <div className="text-3xl font-black text-gradient-hero">{n}</div>
    <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{label}</div>
  </div>
);