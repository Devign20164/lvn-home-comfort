import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-care.jpg";

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-section">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Compassionate caregiver assisting elderly person" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/90 to-background/85" />
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Compassionate Home Care Designed for Your Lifestyle
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed">
            Professional, personalized non-medical home care services that help seniors live safely, 
            comfortably, and independently in their own homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-gradient-primary text-white text-lg px-8 py-6 rounded-full shadow-vibrant hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Request Information
            </Button>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
