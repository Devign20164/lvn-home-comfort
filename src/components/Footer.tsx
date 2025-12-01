import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-secondary to-foreground text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">

              LVN Home Care Services
            </h3>
            <p className="text-white/80 leading-relaxed">
              Compassionate, professional non-medical home care services
              dedicated to helping seniors live safely and independently.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-white/80">
              <li>155 N. Riverview drive unit 100 </li>
              <li>Anaheim hills , CA 92808</li>
              <li>+1 (714) 872-2502</li>
              <li>Lvnhomecareservices@gmail.com</li>
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
