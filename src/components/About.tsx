import { Bot, Zap, Globe, BarChart } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that engages customers 24/7",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline workflows and eliminate repetitive tasks",
  },
  {
    icon: Globe,
    title: "Smart Websites",
    description: "Modern, responsive web solutions that convert",
  },
  {
    icon: BarChart,
    title: "Integrations",
    description: "Connect all your tools into one seamless system",
  },
];

export const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Why Sura Automations?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We help companies save time and scale faster through automation and AI tools. 
              From smart dashboards to intelligent chatbots — we build systems that work for you.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 shadow-card hover:shadow-elegant transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
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
