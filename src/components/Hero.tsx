import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden hero-intro">

      <div className="container mx-auto px-4 py-10 sm:py-14 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-5 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 text-primary">
            <span className="studio-mark" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-semibold">Sura Automations · Independent web studio</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.12]">
            Custom websites for
            <br />
            <span className="hero-highlight">
              Every Business.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A small studio led by Suraj Bishwokarma. We build websites that feel right for your business, with AI chatbots and practical automation when they’re useful.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => scrollToSection("portfolio")}
              className="group px-5 sm:px-7 shadow-elegant"
            >
              See Our Work
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="px-5 sm:px-7"
            >
              Let's Talk <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
