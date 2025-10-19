import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:infosuraautomations@gmail.com";
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/9779807470285", "_blank");
  };

  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-card border border-border shadow-elegant hover:shadow-glow transition-all duration-300 animate-scale-in">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="group p-6 rounded-xl bg-background border-2 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Email Us</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      infosuraautomations@gmail.com
                    </p>
                  </div>
                </div>
              </button>

              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="group p-6 rounded-xl bg-background border-2 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground mb-1">WhatsApp</p>
                    <p className="text-foreground font-semibold group-hover:text-primary transition-colors">
                      +977 9807470285
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
