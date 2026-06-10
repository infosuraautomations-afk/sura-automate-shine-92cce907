import { MapPin, Code2, Heart } from "lucide-react";

export const Founder = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12 animate-fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              The Story Behind <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Sura Automations</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Avatar / Initials card */}
            <div className="md:col-span-2 animate-fade-in-up">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-primary-glow rounded-3xl blur opacity-40 group-hover:opacity-70 transition" />
                <div className="relative aspect-square rounded-3xl bg-card border border-border shadow-glow flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow mb-4">
                    SB
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Suraj Bishwokarma</h3>
                  <p className="text-primary font-medium text-sm mt-1">Founder & Lead Developer</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Nepal · Worldwide Clients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-3 space-y-5 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <p className="text-lg text-foreground leading-relaxed">
                Hey, I'm <span className="font-semibold text-primary">Suraj Bishwokarma</span> — the founder of Sura Automations. What started as me building little websites for friends' shops has grown into a full agency that ships modern websites and AI chatbots for businesses around the world.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'm a bit obsessed with two things: clean, fast-loading websites that actually convert visitors into customers, and smart automations that quietly save business owners hours every week. Most of my early clients were cafés, hotels, and small restaurants here in Nepal — which is exactly why we know that niche inside out.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today the team works with cafés, hotels, schools, agencies, gyms, real estate, and online stores. Different industries, same promise: honest pricing, regular updates, and a website you're genuinely proud to share.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-card/60 border border-border">
                  <Code2 className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">50+ Projects</p>
                  <p className="text-xs text-muted-foreground">Built & launched</p>
                </div>
                <div className="p-4 rounded-xl bg-card/60 border border-border">
                  <Heart className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Real Support</p>
                  <p className="text-xs text-muted-foreground">We pick up the phone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
