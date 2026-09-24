import { Button } from "@/components/ui/button";

export const CTA = () => (
  <section className="container py-20">
    <div className="relative overflow-hidden rounded-[2.5rem] gradient-hero p-10 md:p-16 shadow-pop">
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
      <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
        <div className="text-primary-foreground">
          <h2 className="text-4xl md:text-6xl mb-4">Got a pet to rehome?</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-xl">
            List in 2 minutes. Reach 50,000+ pet lovers across Bangladesh. Free for your first listing.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row md:flex-col gap-3">
          <Button variant="pop" size="xl" className="bg-card text-foreground">Start a listing</Button>
          <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10 border-2 border-primary-foreground/30">Learn more</Button>
        </div>
      </div>
    </div>
  </section>
);