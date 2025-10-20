import { Mail, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:infosuraautomations@gmail.com";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/9779807470285", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/surajbishwokarmaa/", "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-glow hover:shadow-glow transition-all duration-500 animate-scale-in">
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's discuss your project today — we reply fast!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Email Us</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                      infosuraautomations@gmail.com
                    </p>
                  </div>
                </div>
              </button>

              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground mb-1">WhatsApp</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                      +977 9807470285
                    </p>
                  </div>
                </div>
              </button>

              {/* Instagram */}
              <button
                onClick={handleInstagramClick}
                className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Instagram</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                      @surajbishwokarmaa
                    </p>
                  </div>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
