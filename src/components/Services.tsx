import { Bot, Zap, Globe, BarChart3, Link2, Briefcase } from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Intelligent conversational AI that engages customers 24/7 and automates support.",
    highlight: "24/7 Support"
  },
  {
    icon: Zap,
    title: "Automation Systems",
    description: "Streamline repetitive tasks and workflows to save time and reduce errors.",
    highlight: "Save Time"
  },
  {
    icon: Globe,
    title: "Website & App Development",
    description: "Modern, responsive websites and applications built with cutting-edge technology.",
    highlight: "Modern Tech"
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    description: "Data visualization and analytics dashboards for better business insights.",
    highlight: "Data-Driven"
  },
  {
    icon: Link2,
    title: "API Integrations",
    description: "Seamlessly connect your tools and platforms for unified workflows.",
    highlight: "Seamless"
  },
  {
    icon: Briefcase,
    title: "Business Process Automation",
    description: "End-to-end automation solutions tailored to your business needs.",
    highlight: "Custom Solutions"
  },
];

export const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-primary-glow/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-primary/10 rounded-lg rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive automation solutions tailored to your business needs
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-3 animate-fade-in relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon with glow effect */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md group-hover:shadow-lg group-hover:shadow-primary/20">
                    <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Highlight badge */}
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                    {service.highlight}
                  </span>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    onClick={scrollToContact}
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
