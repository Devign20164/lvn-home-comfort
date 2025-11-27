import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-secondary to-foreground text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                <Heart className="h-5 w-5 text-white" />
              </div>
              LVN Home Care
            </h3>
            <p className="text-white/80 leading-relaxed">
              Compassionate, professional non-medical home care services 
              dedicated to helping seniors live safely and independently.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-white/80">
              <li>City Center & Downtown</li>
              <li>Northern Suburbs</li>
              <li>Eastern Districts</li>
              <li>Western Communities</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 mb-4">
            Licensed & Insured | Certified Non-Medical Home Care Provider
          </p>
          <p className="text-white/60 text-sm">
            © {currentYear} LVN Home Care. All rights reserved. | Committed to dignity, respect, and compassionate care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
