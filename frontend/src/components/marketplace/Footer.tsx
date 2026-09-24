import { PawPrint } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-14 grid md:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center"><PawPrint className="w-4 h-4 text-primary-foreground" /></div>
          <span className="text-xl font-black">Pawkit<span className="text-primary">.</span></span>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">Bangladesh's most loved marketplace for buying, selling and adopting pets.</p>
      </div>
      <FooterCol title="Marketplace" links={["Browse pets", "List a pet", "Adoption", "Featured listings"]} />
      <FooterCol title="Resources" links={["Pet care guides", "Vet directory", "Vaccination schedule", "Community"]} />
      <FooterCol title="Company" links={["About", "Contact", "Privacy", "Terms"]} />
    </div>
    <div className="border-t border-border">
      <div className="container py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} Pawkit. Made with 🐾 in Dhaka.</span>
        <span>All pets listed are screened by our team.</span>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: string[] }) => (
  <div>
    <h4 className="text-sm font-black uppercase tracking-wider mb-3">{title}</h4>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a></li>
      ))}
    </ul>
  </div>
);