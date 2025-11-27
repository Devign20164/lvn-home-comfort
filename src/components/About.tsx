import { Heart, Shield, Users } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-gradient-section-alt" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About LVN Home Care
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            At LVN Home Care, we believe every individual deserves to age with dignity, 
            comfort, and independence in the place they love most—their own home. 
            Our mission is to provide compassionate, reliable, and personalized non-medical 
            home care services that enhance quality of life and bring peace of mind to families.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8 rounded-2xl bg-gradient-card hover:shadow-vibrant transition-all duration-300 animate-fade-in hover:scale-105">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-glow mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Compassionate Care</h3>
            <p className="text-muted-foreground">
              We treat every client with the respect, kindness, and dignity they deserve.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-card hover:shadow-vibrant transition-all duration-300 animate-fade-in hover:scale-105" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-glow mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Trusted Professionals</h3>
            <p className="text-muted-foreground">
              Our carefully selected caregivers are trained, background-checked, and dedicated.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-card hover:shadow-vibrant transition-all duration-300 animate-fade-in hover:scale-105" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-glow mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">Personalized Support</h3>
            <p className="text-muted-foreground">
              Every care plan is tailored to meet individual needs, preferences, and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
