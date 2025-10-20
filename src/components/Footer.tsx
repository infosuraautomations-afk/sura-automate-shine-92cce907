import { Mail, MessageCircle, Instagram } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-sm border-t border-primary/20 text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Sura Automations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building intelligent AI systems, chatbots, and custom automation for every business type.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <button onClick={scrollToTop} className="text-muted-foreground hover:text-primary transition-colors text-left">
                  Home
                </button>
                <button onClick={() => scrollToSection("services")} className="text-muted-foreground hover:text-primary transition-colors text-left">
                  Services
                </button>
                <button onClick={() => scrollToSection("reviews")} className="text-muted-foreground hover:text-primary transition-colors text-left">
                  Reviews
                </button>
                <button onClick={() => scrollToSection("contact")} className="text-muted-foreground hover:text-primary transition-colors text-left">
                  Contact
                </button>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href="mailto:infosuraautomations@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">infosuraautomations@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/9779807470285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+977 9807470285</span>
                </a>
                <a
                  href="https://www.instagram.com/surajbishwokarmaa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">@surajbishwokarmaa</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm text-center md:text-left">
                © 2025 Sura Automations. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm text-center md:text-right">
                Developed by <a 
                  href="https://www.instagram.com/surajbishwokarmaa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:text-accent transition-colors duration-300"
                >
                  Suraj Bishwokarma
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
