import { Navbar } from "@/components/marketplace/Navbar";
import { Hero } from "@/components/marketplace/Hero";
import { ServicesHub } from "@/components/marketplace/ServicesHub";
import { Categories } from "@/components/marketplace/Categories";
import { Browse } from "@/components/marketplace/Browse";
import { HowItWorks } from "@/components/marketplace/HowItWorks";
import { CTA } from "@/components/marketplace/CTA";
import { Footer } from "@/components/marketplace/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ServicesHub />
        <Categories />
        <Browse />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
