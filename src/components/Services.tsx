import { Heart, Users, Home, Car, Coffee, Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Heart,
    title: "Personal Care",
    description: "Assistance with bathing, grooming, dressing, toileting, and mobility support to maintain dignity and comfort."
  },
  {
    icon: Users,
    title: "Companionship",
    description: "Friendly conversation, activities, social engagement, and emotional support to combat loneliness."
  },
  {
    icon: Home,
    title: "Homemaker Services",
    description: "Light housekeeping, meal preparation, laundry, and maintaining a clean, safe living environment."
  },
  {
    icon: Car,
    title: "Transportation & Errands",
    description: "Safe transportation to appointments, grocery shopping, pharmacy visits, and community activities."
  },
  {
    icon: Coffee,
    title: "Respite Care",
    description: "Temporary relief for family caregivers, ensuring your loved one receives quality care while you rest."
  },
  {
    icon: Brain,
    title: "Specialized Support",
    description: "Expert care for dementia, Alzheimer's, fall prevention, and post-hospital recovery needs."
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-gradient-section-alt" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive non-medical home care services tailored to support independence, 
            safety, and quality of life in the comfort of home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-md hover:shadow-vibrant transition-all duration-300 animate-fade-in group bg-gradient-card hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-primary mb-4 group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
