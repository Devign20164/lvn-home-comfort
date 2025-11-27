import { Check } from "lucide-react";

const reasons = [
  "Experienced, compassionate, and professionally trained caregivers",
  "Personalized care plans designed around your unique needs",
  "Flexible scheduling from a few hours to 24/7 support",
  "Comprehensive safety assessments and fall prevention strategies",
  "Licensed, bonded, and insured for your peace of mind",
  "Regular supervision and quality assurance checks",
  "Open communication with families every step of the way",
  "Specialization in dementia care and post-hospital support"
];

const WhyChooseUs = () => {
return (
    <section className="py-20 bg-gradient-section" id="why-us">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose LVN Home Care?
            </h2>
            <p className="text-lg md:text-xl text-secondary">
              We're committed to delivering the highest standard of non-medical home care 
              with professionalism, reliability, and heart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-gradient-card rounded-xl hover:shadow-vibrant transition-all duration-300 animate-fade-in hover:scale-105"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center mt-1 shadow-sm">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-foreground font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
