import { Heart, MapPin, Shield, Mail, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const PetCard = ({ pet }: { pet: any }) => {
  const imageUrl = pet.images && pet.images.length > 0 ? pet.images[0].url : "";
  const location = pet.district || "Unknown";
  const ageDisplay = `${pet.age} ${pet.ageUnit?.toLowerCase()}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (pet.seller?.email) {
      navigator.clipboard.writeText(pet.seller.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="group bg-card rounded-3xl overflow-hidden border-2 border-foreground/5 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 shadow-soft hover:shadow-pop flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-muted shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${pet.name}, a ${ageDisplay} ${pet.breed} for sale in ${location}`}
            width={768}
            height={768}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        {pet.featured && (
          <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-black px-3 py-1.5 rounded-full shadow-soft">
            ⭐ Featured
          </span>
        )}
        <button
          aria-label={`Save ${pet.name}`}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft"
        >
          <Heart className="w-4 h-4" />
        </button>
        {pet.vaccinated && (
          <span className="absolute bottom-3 left-3 bg-accent/95 text-accent-foreground text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
            <Shield className="w-3 h-3" /> Vaccinated
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl font-black leading-tight">{pet.name}</h3>
            <p className="text-sm text-muted-foreground font-medium">{pet.breed}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-black text-gradient-hero">
              {pet.price ? `৳${pet.price.toLocaleString()}` : 'Free'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs mb-auto pb-4">
          <span className="px-2.5 py-1 rounded-full bg-muted font-semibold">{ageDisplay}</span>
          <span className="px-2.5 py-1 rounded-full bg-muted font-semibold">{pet.gender}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium truncate pr-2">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="hero" className="shrink-0">Contact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Contact Seller</DialogTitle>
                <DialogDescription>
                  Reach out to the seller to inquire about {pet.name}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="bg-muted/50 p-6 rounded-2xl border border-border mt-4">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-1">{pet.seller?.name || 'Pawkit Seller'}</h4>
                    <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {location}
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-border flex items-center gap-2">
                    <div className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium truncate">
                      {pet.seller?.email || 'No email provided'}
                    </div>
                    {pet.seller?.email && (
                      <Button variant="outline" size="icon" onClick={handleCopy} className="rounded-xl shrink-0">
                        {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {pet.seller?.email && (
                <div className="mt-2">
                  <Button className="w-full rounded-xl" size="lg" asChild>
                    <a href={`mailto:${pet.seller.email}?subject=Inquiry about ${pet.name} on Pawkit`}>
                      Open Email App
                    </a>
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </article>
  );
};