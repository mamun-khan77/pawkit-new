import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { PetCard } from "./PetCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const filters = ["All", "Dogs", "Cats", "Birds", "Small Pets"] as const;
type Filter = typeof filters[number];

interface Pet {
  id: string;
  name: string;
  breed: string;
  species: string;
  age: number;
  ageUnit: string;
  gender: string;
  price: number;
  location: string;
  status: string;
  listingType: string;
  category: string;
  images: { url: string }[];
  seller?: { district: string };
}

export const Browse = () => {
  const [active, setActive] = useState<Filter>("All");
  const [searchParams] = useSearchParams();
  const listingTypeFilter = searchParams.get("type");

  const { data, isLoading, error } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const response = await apiClient.get('/pets');
      return response.data.data as Pet[];
    }
  });

  const pets = data || [];

  const getDbCategory = (filter: Filter) => {
    switch (filter) {
      case "Dogs": return "DOG";
      case "Cats": return "CAT";
      case "Birds": return "BIRD";
      case "Small Pets": return "SMALL_PET";
      default: return "ALL";
    }
  };

  const visible = useMemo(() => {
    let filtered = pets;
    
    // Filter by Sale/Adoption type if present in URL
    if (listingTypeFilter) {
      filtered = filtered.filter(p => p.listingType === listingTypeFilter);
    }
    
    // Filter by animal category (Dogs, Cats, etc.)
    if (active !== "All") {
      filtered = filtered.filter(p => p.category === getDbCategory(active));
    }
    
    return filtered;
  }, [active, pets, listingTypeFilter]);

  return (
    <section id="browse" className="container py-20">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <div className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
            {listingTypeFilter === 'SALE' ? 'Pets for Sale' : listingTypeFilter === 'ADOPTION' ? 'Pets for Adoption' : 'Featured today'}
          </div>
          <h2 className="text-4xl md:text-5xl">Meet your <span className="text-gradient-hero">match</span>.</h2>
        </div>
        <Button variant="pop" size="default" className="rounded-2xl">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${
              active === f
                ? "gradient-hero text-primary-foreground border-transparent shadow-pop"
                : "bg-card border-border hover:border-primary/40"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading pets...</div>
      ) : error ? (
        <div className="text-center py-10 text-destructive">Failed to load pets.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <PetCard key={p.id} pet={p as any} />
          ))}
        </div>
      )}
    </section>
  );
};