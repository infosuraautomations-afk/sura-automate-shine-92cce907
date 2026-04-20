import { Globe, Bot, Zap, BarChart } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Custom Websites",
    description: "Modern, responsive websites tailored to any niche or industry",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Smart chatbots that engage and support your customers 24/7",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline workflows and eliminate repetitive tasks",
  },
  {
    icon: BarChart,
    title: "Integrations",
    description: "Connect all your tools into one seamless system",
  },
];

export const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Why Sura Automations?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We specialize in building beautiful, high-performance websites for every type of business — and powering them with intelligent AI chatbots. Whatever your niche, we craft digital experiences that convert visitors into customers.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
