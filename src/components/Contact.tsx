import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: "Thank you for your inquiry!",
        description: "We've received your message and will contact you shortly. A confirmation email has been sent to your inbox.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-section" id="contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
            We're here to answer your questions and help you find the right care solution
            for your loved one. Reach out today for a free consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8 animate-slide-in-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground mb-1">Main Line: +1 (714) 872-2502</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground">Lvnhomecareservices@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Office</h3>
                <p className="text-muted-foreground">
                  155 N. Riverview drive unit 100<br />
                  Anaheim Hills, CA 92808
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in-right">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-12"
              />
            </div>
            <div>
              <Textarea
                placeholder="Tell us about your care needs..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[150px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-primary text-white h-12 text-lg rounded-full hover:shadow-vibrant hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
