import { MapPin, Code2, Heart } from "lucide-react";

export const Founder = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">

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
                I care about two things: websites that make your business easier to discover, and smart automations that take repetitive work off your plate. Every business is different, so I start with your goals — what your customers need, what makes your work special, and where a better website can help.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're running a school, an agency, a fitness business, an online store, or something completely different, you're welcome here. Let's build something that feels like your business, with clear communication and a website you're proud to share.
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
