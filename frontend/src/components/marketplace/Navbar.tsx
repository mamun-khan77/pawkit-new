import { Heart, Menu, PawPrint, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <nav className="container flex items-center justify-between h-18 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl gradient-hero flex items-center justify-center shadow-pop group-hover:rotate-12 transition-transform">
            <PawPrint className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight">Pawkit<span className="text-primary">.</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold hover:text-primary transition-colors">Home</Link>
          <a href="/#services" className="text-sm font-semibold hover:text-primary transition-colors">Services</a>
          <a href="/#browse" className="text-sm font-semibold hover:text-primary transition-colors">Browse</a>
          <a href="/#categories" className="text-sm font-semibold hover:text-primary transition-colors">Categories</a>
          <Link to="/contact" className="text-sm font-semibold hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {(user.role === 'SELLER' || user.role === 'BOTH' || user.role === 'ADMIN') && (
                <Link to="/add-pet">
                  <Button variant="hero" size="default" className="hidden md:inline-flex">List a Pet</Button>
                </Link>
              )}
              <Button variant="ghost" onClick={() => logout()}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="font-bold">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="hero" className="font-bold">Sign Up</Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden"><Menu /></Button>
        </div>
      </nav>
    </header>
  );
};